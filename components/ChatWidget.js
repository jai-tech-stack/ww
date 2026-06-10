import { useState, useRef, useEffect, useCallback } from 'react';

const WHATSAPP_NUMBER = '919880459502'; // White Wolf WhatsApp (no + or spaces)

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content:
      "Hi! I'm the White Wolf AI assistant 👋\nAsk me about our services, process, or pricing — or leave your details and the team will follow up.",
  },
];

const STORAGE_KEY = 'ww_chat_history';

function buildTranscript(messages) {
  return messages
    .map((m) => `${m.role === 'user' ? 'You' : 'White Wolf AI'}: ${m.content}`)
    .join('\n\n');
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Lead capture
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({ name: '', email: '', phone: '' });
  const [shareState, setShareState] = useState('idle'); // idle | sending | sent | error

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const autoSharedRef = useRef(false);
  const messagesRef = useRef(messages);
  const leadRef = useRef(lead);

  // Keep refs current for the unload handler
  useEffect(() => { messagesRef.current = messages; }, [messages]);
  useEffect(() => { leadRef.current = lead; }, [lead]);

  // Reliable capture: flush the transcript when the tab is hidden/closed
  useEffect(() => {
    const flush = () => {
      if (autoSharedRef.current) return;
      const msgs = messagesRef.current;
      const realUser = msgs.filter((m) => m.role === 'user').length;
      const ld = leadRef.current;
      const hasContact = Boolean(ld.email || ld.phone);
      if (realUser < 3 && !hasContact) return; // only genuine conversations
      autoSharedRef.current = true;
      try {
        const blob = new Blob(
          [JSON.stringify({ messages: msgs, contact: ld, source: 'AI Chat Widget (auto)' })],
          { type: 'application/json' }
        );
        navigator.sendBeacon('/api/chat-share', blob);
      } catch {}
    };
    const onVis = () => { if (document.visibilityState === 'hidden') flush(); };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pagehide', flush);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pagehide', flush);
    };
  }, []);

  // Restore conversation from this browser session
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 1) setMessages(parsed);
      }
    } catch {}
  }, []);

  // Persist conversation
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Open from footer "Chat to Us Now"
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('ww:openchat', handler);
    return () => window.removeEventListener('ww:openchat', handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 60);
  }, [messages, open, showLead]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const userMsgCount = messages.filter((m) => m.role === 'user').length;

  // Silently email the transcript to the team (every real conversation)
  const shareTranscript = useCallback(
    async (contact, silent = false) => {
      const realUser = messages.filter((m) => m.role === 'user').length;
      if (realUser === 0) return false;
      if (!silent) setShareState('sending');
      try {
        const res = await fetch('/api/chat-share', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages, contact: contact || {}, source: 'AI Chat Widget' }),
        });
        if (!res.ok) throw new Error('failed');
        if (!silent) setShareState('sent');
        return true;
      } catch {
        if (!silent) setShareState('error');
        return false;
      }
    },
    [messages]
  );

  // Auto-email the conversation to the team when the widget is closed —
  // only for genuine conversations (3+ visitor messages or contact shared)
  const closeChat = useCallback(() => {
    const hasContact = Boolean(lead.email || lead.phone);
    if (!autoSharedRef.current && (userMsgCount >= 3 || hasContact)) {
      autoSharedRef.current = true;
      shareTranscript(lead, true);
    }
    setOpen(false);
  }, [userMsgCount, shareTranscript, lead]);

  const send = async (preset) => {
    const text = (preset ?? input).trim();
    if (!text || loading) return;

    const next = [...messages, { role: 'user', content: text }];
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
        { role: 'assistant', content: "Sorry, I couldn't connect. Please email us at info@whitewolfone.com" },
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

  // Open WhatsApp with the conversation pre-filled (capped to stay within URL limits)
  const shareToWhatsApp = () => {
    const intro = 'Hi White Wolf, here is my chat from your website:\n\n';
    let transcript = buildTranscript(messages);
    if (transcript.length > 1400) transcript = transcript.slice(-1400) + '\n…(earlier messages trimmed)';
    const body = encodeURIComponent(intro + transcript);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${body}`, '_blank', 'noopener');
    if (!autoSharedRef.current && userMsgCount >= 1) {
      autoSharedRef.current = true;
      shareTranscript(lead, true);
    }
  };

  const submitLead = async (e) => {
    e.preventDefault();
    const ok = await shareTranscript(lead, false);
    if (ok) {
      autoSharedRef.current = true;
      setTimeout(() => setShowLead(false), 1800);
    }
  };

  const hasConversation = userMsgCount >= 1;

  return (
    <>
      {/* Floating trigger */}
      <button
        className={`ww-chat-fab${open ? ' ww-chat-fab--open' : ''}`}
        onClick={() => (open ? closeChat() : setOpen(true))}
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
              <p className="ww-chat-status"><span className="ww-chat-dot" />Online · replies in minutes</p>
            </div>
          </div>
          <button className="ww-chat-close-btn" onClick={closeChat} aria-label="Close chat">
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
              {m.content.split('\n').map((line, j, arr) => (
                <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
              ))}
            </div>
          ))}
          {loading && (
            <div className="ww-chat-bubble ww-chat-bubble--assistant ww-chat-typing"><span /><span /><span /></div>
          )}

          {/* Lead capture form */}
          {showLead && (
            <form className="ww-chat-lead" onSubmit={submitLead}>
              {shareState === 'sent' ? (
                <p className="ww-chat-lead-done">✓ Sent! The team will reach out shortly.</p>
              ) : (
                <>
                  <p className="ww-chat-lead-title">Leave your details — we'll follow up</p>
                  <input className="ww-chat-lead-input" placeholder="Name" value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })} />
                  <input className="ww-chat-lead-input" type="email" placeholder="Email" value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })} />
                  <input className="ww-chat-lead-input" type="tel" placeholder="Phone (optional)" value={lead.phone}
                    onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
                  {shareState === 'error' && <p className="ww-chat-lead-err">Couldn't send — try again.</p>}
                  <button type="submit" className="ww-chat-lead-btn" disabled={shareState === 'sending' || (!lead.email && !lead.phone)}>
                    {shareState === 'sending' ? 'Sending…' : 'Send to team'}
                  </button>
                </>
              )}
            </form>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompts (first message only) */}
        {messages.length === 1 && !showLead && (
          <div className="ww-chat-quick-prompts">
            {['What services do you offer?', 'How do I get a quote?', 'Tell me about AI services'].map((q) => (
              <button key={q} className="ww-chat-quick-btn" onClick={() => send(q)}>{q}</button>
            ))}
          </div>
        )}

        {/* Share actions */}
        {hasConversation && (
          <div className="ww-chat-actions">
            <button className="ww-chat-action ww-chat-action--wa" onClick={shareToWhatsApp}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.5-1.2-2.9s.7-2 1-2.3c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.6.1.3.7 1.1 1.4 1.8.9.8 1.7 1 2 1.2.3.1.5.1.6-.1l.7-.9c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.4.1.2.1.8-.1 1.4z"/></svg>
              WhatsApp
            </button>
            <button className="ww-chat-action ww-chat-action--mail" onClick={() => { setShowLead(true); setShareState('idle'); }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
              Email the team
            </button>
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
          <button className="ww-chat-send-btn" onClick={() => send()} disabled={loading || !input.trim()} aria-label="Send message">
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
