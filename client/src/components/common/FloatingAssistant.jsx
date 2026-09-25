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

      if (res.data?.success && res.data?.reply) {
        setConversationId(res.data.conversationId);
        setMessages((prev) => [...prev, { sender: 'ai', text: res.data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: 'Hello! I am your AI Innovation Companion. How can I help you brainstorm, evolve, evaluate, or defend your capstone project today?',
          },
        ]);
      }
    } catch (err) {
      const fallbackReply = err.response?.data?.message || 'Hello! I am ready to help you brainstorm unique project ideas, evaluate research gaps, refine your architecture, or prepare defense questions.';
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: fallbackReply },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Trigger Button with AI Mascot Style */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-aiCyan-500 via-aiViolet-600 to-aiPink-500 text-white shadow-xl shadow-aiViolet-500/30 hover:scale-105 hover:shadow-aiViolet-500/50 transition-all border border-white/60 group"
          aria-label="Open AI Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white animate-pulse" />
          </div>
          <span className="font-bold text-xs tracking-wide">AI Companion</span>
          {activeProject && (
            <span className="w-2 h-2 rounded-full bg-aiCyan-300 shadow-xs animate-ping"></span>
          )}
        </button>
      )}

      {/* Floating Dialog Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl bg-white/95 backdrop-blur-2xl flex flex-col border border-white/90 shadow-2xl shadow-aiViolet-500/15 animate-in fade-in slide-in-from-bottom-5 text-textDark">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-aiViolet-50 via-aiCyan-50 to-white rounded-t-3xl">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-aiCyan-400 to-aiViolet-600 flex items-center justify-center text-white shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-textDark flex items-center gap-1.5 font-heading">
                  InnoPilot Companion
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-aiMint-100 text-emerald-800 border border-aiMint-200">
                    Live
                  </span>
                </h3>
                <p className="text-[11px] text-textMuted truncate max-w-[210px]">
                  {activeProject ? `Context: ${activeProject.title}` : 'General Project Innovation'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-textMuted hover:text-textDark hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompt Carousel */}
          <div className="px-3 py-2 bg-slate-50/80 border-b border-slate-100 flex gap-1.5 overflow-x-auto scrollbar-none">
            {promptShortcuts.map((shortcut, i) => (
              <button
                key={i}
                onClick={() => handleSend(shortcut)}
                disabled={loading}
                className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] bg-white hover:bg-aiViolet-50 text-textBody hover:text-aiViolet-700 border border-slate-200 transition-all flex-shrink-0 shadow-2xs font-semibold"
              >
                {shortcut}
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-aiCyan-400 to-aiViolet-500 flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-2xs">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl leading-relaxed text-xs sm:text-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-aiCyan-500 via-aiViolet-600 to-aiPink-500 text-white rounded-br-none shadow-md shadow-aiViolet-500/20 font-medium'
                      : 'bg-slate-50 text-textDark rounded-bl-none border border-slate-200 whitespace-pre-line shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-aiViolet-600 text-xs italic font-medium pl-1">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Companion analyzing capstone context...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-slate-100 flex gap-2 bg-white/95 rounded-b-3xl"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={activeProject ? `Ask about ${activeProject.title}...` : 'Ask your AI companion...'}
              className="flex-1 glass-input rounded-2xl px-4 py-2 text-xs focus:ring-1 focus:ring-aiViolet-400"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-aiCyan-500 via-aiViolet-600 to-aiPink-500 text-white text-xs font-bold shadow-md shadow-aiViolet-500/20 hover:scale-105 disabled:opacity-50 transition-all flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingAssistant;
