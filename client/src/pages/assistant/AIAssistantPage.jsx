import React, { useState, useRef, useEffect } from 'react';
import { useProject } from '../../context/ProjectContext';
import { useAuth } from '../../context/AuthContext';
import { aiAPI } from '../../services/api';
import {
  Sparkles,
  Send,
  Bot,
  Lightbulb,
  Cpu,
  Shield,
  Zap,
} from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';

const shortcutCards = [
  {
    title: 'Innovation Upgrade',
    prompt: 'How can I make this project significantly more innovative and research-grade?',
    icon: Zap,
    variant: 'pink',
    color: '#DB2777',
  },
  {
    title: 'Complexity Reduction',
    prompt: 'Which features should I trim or replace to deliver a bulletproof MVP on time?',
    icon: Lightbulb,
    variant: 'peach',
    color: '#EA580C',
  },
  {
    title: 'Technical Defense',
    prompt: 'What are the toughest viva/defense questions professors might ask about this architecture?',
    icon: Shield,
    variant: 'sky',
    color: '#0284C7',
  },
  {
    title: 'First 2-Week Sprint',
    prompt: 'What exact database schemas, endpoints, and libraries should I set up in the first 2 weeks?',
    icon: Cpu,
    variant: 'gold',
    color: '#D97706',
  },
];

const AIAssistantPage = () => {
  const { user } = useAuth();
  const { activeProject } = useProject();

  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${user?.name || 'Researcher'}! I am your contextual AI Innovation Companion.

I have direct access to your current active project (${activeProject ? activeProject.title : 'General Innovation Mode'}), your technical profile (${user?.branch || 'Engineering'}), and previous analyses.

Ask me anything about engineering trade-offs, making your project publishable, reducing architecture complexity, or preparing for your capstone defense!`,
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
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customText = null) => {
    const text = customText || inputMessage;
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
        history: messages.slice(-8),
      });

      if (res.data?.success && res.data?.reply) {
        setConversationId(res.data.conversationId);
        setMessages((prev) => [...prev, { sender: 'ai', text: res.data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: res.data?.message || "I couldn't generate a response right now. Please try again." },
        ]);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "I couldn't generate a response right now. Please check your connection and try again.";
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: errorMsg },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#F9A8C8]/20 via-[#FED7AA]/20 to-[#BAE6FD]/20 border border-[#F9A8C8]/40 text-[#DB2777] text-xs font-bold mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#DB2777]" />
            <span>Module 14 • Contextual Innovation Companion</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D2530] tracking-tight">
            AI Project Companion & Mentor
          </h1>
          <p className="text-xs sm:text-sm text-[#5E5364] mt-1 max-w-2xl leading-relaxed">
            Not a generic chatbot. The companion retains full awareness of your active problem statement, technology stack, feasibility constraints, and roadmap progress.
          </p>
        </div>

        {activeProject && (
          <Badge variant="pink" className="text-xs px-3.5 py-1.5 font-bold shadow-xs">
            Active Context: {activeProject.title} (v{activeProject.currentVersion || 1})
          </Badge>
        )}
      </div>

      {/* Suggested Prompt Shortcut Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {shortcutCards.map((sc, i) => {
          const Icon = sc.icon;
          return (
            <GlassCard
              key={i}
              variant={sc.variant}
              interactive
              onClick={() => handleSend(sc.prompt)}
              className="p-4 cursor-pointer flex flex-col justify-between group transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-xs"
                  style={{ backgroundColor: `${sc.color}15`, color: sc.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#2D2530] group-hover:text-[#DB2777] transition-colors">
                  {sc.title}
                </h4>
              </div>
              <p className="text-[11px] text-[#5E5364] line-clamp-2 leading-relaxed">{sc.prompt}</p>
            </GlassCard>
          );
        })}
      </div>

      {/* Main Full-Page Chat Container */}
      <GlassCard className="p-5 sm:p-6 border-[#F1E4EC] flex flex-col h-[580px] bg-white/95 shadow-xl shadow-[#F9A8C8]/10">
        {/* Chat History Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F9A8C8]/30 to-[#BAE6FD]/30 border border-[#F9A8C8]/40 flex items-center justify-center text-[#DB2777] flex-shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-[#F9A8C8] via-[#FED7AA] to-[#FDE68A] text-[#2D2530] font-medium rounded-br-none shadow-md shadow-[#F9A8C8]/20'
                    : 'bg-[#FFFDFE] text-[#2D2530] rounded-bl-none border border-[#F1E4EC] shadow-xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2.5 text-[#DB2777] text-xs font-semibold pl-2">
              <Sparkles className="w-4 h-4 animate-spin text-[#DB2777]" />
              <span>Synthesizing contextual capstone engineering advice...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="mt-4 pt-3 border-t border-[#F1E4EC] flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={
              activeProject
                ? `Ask anything about ${activeProject.title}...`
                : 'Ask questions about problem identification, frameworks, or novel algorithms...'
            }
            className="flex-1 glass-input rounded-xl px-4 py-2.5 text-xs sm:text-sm bg-white/90 border-[#F1E4EC] focus:border-[#F9A8C8]"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F9A8C8] via-[#FED7AA] to-[#FDE68A] hover:shadow-lg text-[#2D2530] text-xs sm:text-sm font-bold disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-md shadow-[#F9A8C8]/20 hover:scale-105"
          >
            <Send className="w-4 h-4 text-[#2D2530]" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </GlassCard>
    </div>
  );
};

export default AIAssistantPage;
