import React, { useState, useRef, useEffect } from 'react';
import { useProject } from '../../context/ProjectContext';
import { aiAPI } from '../../services/api';
import { Sparkles, Send, X, Bot } from 'lucide-react';

const promptShortcuts = [
  "How can I make this project more innovative?",
  "What is the biggest technical risk?",
  "Which feature should I remove to reduce complexity?",
  "How can I make this suitable for a major project?",
  "What should I implement first for MVP?",
];

const FloatingAssistant = () => {
  const { activeProject } = useProject();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hi! I'm your AI Innovation Companion. I have full context on your active project, requirements, roadmap, and analyses. How can I help you refine or defend your project today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageToSend) => {
    const text = messageToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await aiAPI.assistantChat({
        message: text,
        projectId: activeProject?._id || null,
        conversationId,
      });

      if (res.data.success) {
        setConversationId(res.data.conversationId);
        setMessages((prev) => [...prev, { sender: 'ai', text: res.data.reply }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Sorry, I encountered an issue retrieving the response. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Trigger Button with Multi-Color Gradient */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#F59E0B] text-white shadow-xl shadow-pink-500/25 hover:scale-105 hover:shadow-orange-500/40 transition-all border border-white/50 group"
          aria-label="Open AI Assistant"
        >
          <Sparkles className="w-5 h-5 animate-pulse text-white" />
          <span className="font-semibold text-sm tracking-wide">AI Companion</span>
          {activeProject && (
            <span className="w-2 h-2 rounded-full bg-white shadow-xs"></span>
          )}
        </button>
      )}

      {/* Floating Dialog Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-2xl bg-white/98 backdrop-blur-xl flex flex-col border border-[#F1E4EC] shadow-2xl animate-in fade-in slide-in-from-bottom-5 text-[#2D2530]">
          {/* Header */}
          <div className="p-3.5 border-b border-[#F1E4EC] flex items-center justify-between bg-gradient-to-r from-[#FFF1F6] to-[#FFF7ED] rounded-t-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FFF1F6] border border-[#FBCFE8] flex items-center justify-center text-[#E91E63]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-1.5 font-heading">
                  InnoPilot Companion
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
                    Live
                  </span>
                </h3>
                <p className="text-[11px] text-[#5E5364] truncate max-w-[220px]">
                  {activeProject ? `Context: ${activeProject.title}` : 'General Project Innovation'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-[#5E5364] hover:text-[#2D2530] hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompt Carousel */}
          <div className="px-3 py-2 bg-[#FAF8FB] border-b border-[#F1E4EC] flex gap-1.5 overflow-x-auto scrollbar-none">
            {promptShortcuts.map((shortcut, i) => (
              <button
                key={i}
                onClick={() => handleSend(shortcut)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] bg-white hover:bg-[#FFF7ED] text-[#5E5364] hover:text-[#EA580C] border border-[#F1E4EC] transition-all flex-shrink-0 shadow-2xs font-medium"
              >
                {shortcut}
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-md bg-[#FFF1F6] border border-[#FBCFE8] flex items-center justify-center text-[#E91E63] flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl leading-relaxed text-xs sm:text-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#F59E0B] text-white rounded-br-none shadow-md shadow-pink-500/20'
                      : 'bg-[#FAF8FB] text-[#2D2530] rounded-bl-none border border-[#F1E4EC] whitespace-pre-line shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-[#E91E63] text-xs italic pl-2">
                <Sparkles className="w-4 h-4 animate-spin text-[#FB923C]" />
                <span>Formulating contextual engineering response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-[#F1E4EC] bg-white rounded-b-2xl flex gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                activeProject
                  ? "Ask anything about your current project..."
                  : "Ask about ideas, domains, or architectures..."
              }
              className="flex-1 glass-input rounded-xl px-3.5 py-2 text-xs sm:text-sm placeholder:text-[#8E8295] focus:outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#E91E63] to-[#FB923C] text-white hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingAssistant;
