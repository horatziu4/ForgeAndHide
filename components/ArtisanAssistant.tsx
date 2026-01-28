
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { streamLeatherAdvice } from '../services/geminiService';

interface ArtisanAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArtisanAssistant: React.FC<ArtisanAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to the workshop. I'm the master artisan here. Whether you need advice on conditioning your leather, picking the perfect patina, or finding a gift, I'm at your service. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const stream = await streamLeatherAdvice(userMsg);
      let fullResponse = '';
      
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        const text = chunk.text;
        fullResponse += text;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last.role === 'model') {
            return [...prev.slice(0, -1), { role: 'model', text: fullResponse }];
          }
          return prev;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, my tools seem a bit dull today. Ask me again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-[400px] flex flex-col h-[600px] max-h-[80vh] bg-white shadow-2xl rounded-2xl overflow-hidden border border-stone-200">
      <div className="leather-gradient p-6 text-white flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-bold tracking-tight">Master Artisan</h3>
            <span className="text-[10px] uppercase tracking-widest opacity-80">Style & Care Expert</span>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-6 space-y-4 bg-stone-50"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              m.role === 'user' 
                ? 'bg-amber-900 text-white rounded-br-none' 
                : 'bg-white text-stone-800 rounded-bl-none border border-stone-200'
            }`}>
              {m.text || (isTyping && i === messages.length - 1 ? <div className="flex gap-1"><div className="w-1 h-1 bg-stone-400 rounded-full animate-bounce"></div><div className="w-1 h-1 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]"></div><div className="w-1 h-1 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]"></div></div> : null)}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-stone-100 flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about leather care or style..."
          className="flex-grow px-4 py-3 bg-stone-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-900/20"
        />
        <button 
          disabled={isTyping || !input.trim()}
          type="submit"
          className="p-3 bg-stone-900 text-white rounded-xl hover:bg-amber-950 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ArtisanAssistant;
