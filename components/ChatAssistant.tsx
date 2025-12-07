import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToAssistant } from '../services/geminiService';

interface Props {
  onNavigate: (moduleId: string, sectionId: string) => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatAssistant: React.FC<Props> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi! I am your BIM Python Assistant. Ask me anything or paste your code here for debugging!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await sendMessageToAssistant(userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Custom parser to handle the [[Link]](goto:...) pattern
  const renderMessageText = (text: string) => {
    const parts = text.split(/(\[\[.*?\]\]\(goto:.*?\)|`.*?`)/g);
    
    return parts.map((part, index) => {
      // Handle Navigation Links
      if (part.startsWith('[[') && part.includes(']](goto:')) {
        const match = part.match(/\[\[(.*?)\]\]\(goto:(.*?)\|(.*?)\)/);
        if (match) {
          const [_, label, modId, sectId] = match;
          return (
            <button
              key={index}
              onClick={() => onNavigate(modId, sectId)}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 underline underline-offset-2 mx-1 font-medium bg-blue-900/20 px-1 rounded cursor-pointer"
            >
              <span>{label}</span>
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </button>
          );
        }
      }
      
      // Handle Inline Code
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index} className="bg-slate-950 text-yellow-300 px-1 py-0.5 rounded text-xs font-mono border border-slate-700">{part.slice(1, -1)}</code>;
      }
      
      // Handle Code Blocks (Tripple backticks) - simple handling
      if (part.includes('```')) {
         // This is a simple fallback for code blocks if they appear in text chunks
         return <span key={index} className="whitespace-pre-wrap font-mono text-xs text-slate-300 bg-slate-950 p-2 block rounded my-2">{part.replace(/```python|```/g, '')}</span>
      }

      return <span key={index} className="whitespace-pre-wrap">{part}</span>;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl mb-4 w-96 max-w-[calc(100vw-48px)] transition-all duration-300 pointer-events-auto origin-bottom-right flex flex-col
        ${isOpen ? 'opacity-100 scale-100 translate-y-0 h-[500px]' : 'opacity-0 scale-95 translate-y-10 h-0 overflow-hidden'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 p-4 border-b border-slate-700 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </div>
            <div>
               <h3 className="text-white font-bold text-sm">BIM Assistant</h3>
               <span className="text-xs text-blue-300 flex items-center gap-1">
                 <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                 Online
               </span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-sm' 
                    : 'bg-slate-800 text-slate-200 rounded-bl-sm border border-slate-700'
                }`}
              >
                {renderMessageText(msg.text)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-sm p-3 flex items-center gap-1">
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 rounded-b-2xl">
          <div className="flex items-end gap-2 bg-slate-900 border border-slate-700 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question or paste code..."
              className="flex-1 bg-transparent text-slate-200 text-sm focus:outline-none resize-none max-h-24 p-1 font-sans"
              rows={1}
              style={{ minHeight: '24px' }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
          <div className="text-[10px] text-slate-600 mt-2 text-center">
             AI can make mistakes. Verify code before use.
          </div>
        </div>
      </div>

      {/* Toggle Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-blue-600 hover:bg-blue-500 text-white rounded-full p-4 shadow-xl hover:shadow-2xl hover:shadow-blue-900/40 transition-all duration-300 transform hover:scale-110 active:scale-95 group"
      >
        {isOpen ? (
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        ) : (
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
        )}
      </button>
    </div>
  );
};
