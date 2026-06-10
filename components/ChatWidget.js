import { useState, useRef, useEffect } from 'react';

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content: "Hi! I'm the White Wolf AI assistant 👋\nHow can I help you today? Ask me about our services, process, or anything else.",
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Listen for footer "Chat to Us Now" trigger
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('ww:openchat', handler);
    return () => window.removeEventListener('ww:openchat', handler);
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    if (open) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 60);
    }
  }, [messages, open]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.content }]);
    } catch {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content: "Sorry, I couldn't connect. Please email us at info@whitewolfone.com",
        },
      ]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        className={`ww-chat-fab${open ? ' ww-chat-fab--open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Chat with us'}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="ww-chat-fab-label">Chat with us</span>
          </>
        )}
      </button>

      {/* Chat window */}
      <div className={`ww-chat-window${open ? ' ww-chat-window--open' : ''}`} role="dialog" aria-label="Chat with White Wolf AI">

        {/* Header */}
        <div className="ww-chat-header">
          <div className="ww-chat-header-left">
            <div className="ww-chat-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="ww-chat-header-info">
              <p className="ww-chat-name">White Wolf AI</p>
              <p className="ww-chat-status">
                <span className="ww-chat-dot" />
                Online
              </p>
            </div>
          </div>
          <button className="ww-chat-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="ww-chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`ww-chat-bubble ww-chat-bubble--${m.role}`}>
              {m.content.split('\n').map((line, j) => (
                <span key={j}>{line}{j < m.content.split('\n').length - 1 && <br />}</span>
              ))}
            </div>
          ))}
          {loading && (
            <div className="ww-chat-bubble ww-chat-bubble--assistant ww-chat-typing">
              <span /><span /><span />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompts */}
        {messages.length === 1 && (
          <div className="ww-chat-quick-prompts">
            {['What services do you offer?', 'How do I get a quote?', 'Tell me about AI services'].map((q) => (
              <button
                key={q}
                className="ww-chat-quick-btn"
                onClick={() => {
                  setInput(q);
                  setTimeout(() => send(), 0);
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="ww-chat-input-row">
          <input
            ref={inputRef}
            className="ww-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a message…"
            disabled={loading}
            maxLength={500}
          />
          <button
            className="ww-chat-send-btn"
            onClick={send}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        <p className="ww-chat-footer-note">Powered by White Wolf AI · <a href="/contact">Contact us</a></p>
      </div>
    </>
  );
}
