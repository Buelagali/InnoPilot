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
  },
  {
    title: 'Complexity Reduction',
    prompt: 'Which features should I trim or replace to deliver a bulletproof MVP on time?',
    icon: Lightbulb,
  },
  {
    title: 'Technical Defense',
    prompt: 'What are the toughest viva/defense questions professors might ask about this architecture?',
    icon: Shield,
  },
  {
    title: 'First 2-Week Sprint',
    prompt: 'What exact database schemas, endpoints, and libraries should I set up in the first 2 weeks?',
    icon: Cpu,
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
      });

      if (res.data.success) {
        setConversationId(res.data.conversationId);
        setMessages((prev) => [...prev, { sender: 'ai', text: res.data.reply }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Error formulation response. Please check network or retry.' },
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce4ec] text-[#e91e63] border border-[#f3c5d3] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Module 14 • Contextual Innovation Companion</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3a2630] tracking-tight">
            AI Project Companion & Mentor
          </h1>
          <p className="text-xs sm:text-sm text-[#6b5560] mt-1 max-w-2xl">
            Not a generic chatbot. The companion retains full awareness of your active problem statement, technology stack, feasibility constraints, and roadmap progress.
          </p>
        </div>

        {activeProject && (
          <Badge variant="pink" className="text-xs px-3 py-1.5 font-medium">
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
              interactive
              onClick={() => handleSend(sc.prompt)}
              className="p-3.5 cursor-pointer flex flex-col justify-between group border-[#f3c5d3] hover:border-[#e91e63]/60 bg-gradient-to-b from-white to-[#fff8fa]"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#fce4ec] text-[#e91e63] border border-[#f3c5d3] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-[#3a2630] group-hover:text-[#e91e63] transition-colors">
                  {sc.title}
                </h4>
              </div>
              <p className="text-[11px] text-[#6b5560] line-clamp-2 leading-relaxed">{sc.prompt}</p>
            </GlassCard>
          );
        })}
      </div>

      {/* Main Full-Page Chat Container */}
      <GlassCard className="p-5 sm:p-6 border-[#f3c5d3] flex flex-col h-[580px] bg-white shadow-xl shadow-[#fce4ec]/30">
        {/* Chat History Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-[#fce4ec] border border-[#f3c5d3] flex items-center justify-center text-[#e91e63] flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-[#e91e63] via-[#ec407a] to-[#f43f5e] text-white rounded-br-none shadow-md shadow-[#e91e63]/20'
                    : 'bg-[#fff8fa] text-[#3a2630] rounded-bl-none border border-[#fce4ec]'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2.5 text-[#e91e63] text-xs italic pl-2">
              <Sparkles className="w-4 h-4 animate-spin text-[#e91e63]" />
              <span>Synthesizing contextual capstone engineering advice...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="mt-4 pt-3 border-t border-[#fce4ec] flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={
              activeProject
                ? `Ask anything about ${activeProject.title}...`
                : 'Ask questions about problem identification, frameworks, or novel algorithms...'
            }
            className="flex-1 glass-input rounded-xl px-4 py-2.5 text-xs sm:text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e91e63] via-[#ec407a] to-[#f43f5e] hover:opacity-95 text-white text-xs sm:text-sm font-semibold disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-md shadow-[#e91e63]/20"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </GlassCard>
    </div>
  );
};

export default AIAssistantPage;
