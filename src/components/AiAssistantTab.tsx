import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

export const AiAssistantTab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: '👋 Namaste Pro Player! CM Esports AI Assistant me aapka swagat hai. Main Rohit Chaudhary (CM BADSHAH) ke tournaments ke rules, Room ID timing, wallet payout aur 1v4 tips me aapki madad ke liye taiyar hoon. Niche diye gaye questions par click karein ya apna sawal type karein!',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickQuestions = [
    'Room ID aur Password kab milega?',
    'Match ke official rules kya hain?',
    'Wallet se Paytm/PhonePe me withdraw kaise karein?',
    '1v4 Custom me best sensitivity aur rush strategy batao'
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.sender,
        content: m.text
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      const data = await res.json();
      const reply = data.reply || data.fallback || 'Bhai, ek baar dubara pucho.';

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: 'Bhai, server se connect nahi ho paya. Par yaad rakhein: Room ID & Password match shuru hone se 15 minute pehle aapke My Matches tab me aa jayega! Direct support ke liye Instagram @cmbadshah37 par contact karein.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="bg-[#151b26] border border-gray-800 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/20 border border-[#00f0ff]/50 flex items-center justify-center text-[#00f0ff] text-lg font-bold shrink-0 glow-cyan">
            <i className="fas fa-robot"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-extrabold text-base text-white">
                CM Tournament AI Bot
              </h2>
              <span className="text-[10px] bg-[#00f0ff]/20 text-[#00f0ff] font-bold px-2 py-0.5 rounded border border-[#00f0ff]/30">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Rules, room timings, wallet payouts & Free Fire strategy tips
            </p>
          </div>
        </div>
      </div>

      {/* QUICK SUGGESTION CHIPS */}
      <div className="space-y-1.5">
        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider px-1">
          Aksar Puche Jaane Waale Sawal (FAQ)
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="bg-[#151b26] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 active:scale-95"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* CHAT MESSAGES WINDOW */}
      <div className="bg-[#151b26] border border-gray-800 rounded-2xl p-4 flex flex-col h-[400px] shadow-xl">
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 hide-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-[#ff2a5f] text-white shadow-md rounded-br-none'
                    : 'bg-[#0b0e14] border border-gray-800 text-gray-200 shadow-md rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-500 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-gray-400 bg-[#0b0e14] border border-gray-800 rounded-2xl px-3.5 py-2.5 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping"></span>
              <span>CM AI soch raha hai...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT BAR */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="pt-3 border-t border-gray-800 flex items-center gap-2 mt-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Room time, match rules, ya Free Fire tips pucho..."
            className="flex-1 bg-gray-900 border border-gray-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00f0ff] placeholder-gray-500 transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 bg-[#00f0ff] hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-extrabold text-xs rounded-xl shadow glow-cyan transition cursor-pointer active:scale-95 shrink-0"
          >
            <i className="fas fa-paper-plane mr-1"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
};
