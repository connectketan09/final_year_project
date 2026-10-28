import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useERP } from '../context/ERPContext';
import {
  Bot,
  Send,
  ShieldCheck,
  RotateCcw,
  Database,
  ArrowRight
} from 'lucide-react';

export const AIAssistantSection = () => {
  const { aiMessages, sendAIMessage, clearAIChat, role } = useERP();
  const [inputText, setInputText] = useState<string>('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'How much did we sell this month?',
    'Which denim article has low stock?',
    'What amount is outstanding from buyers?',
    'What is the estimated cost of Classic Denim Jeans?',
    'Show the main expenses in this demo.'
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendAIMessage(inputText);
    setInputText('');
  };

  const handlePromptClick = (prompt: string) => {
    sendAIMessage(prompt);
  };

  return (
    <section id="ai-assistant" className="section-container ai-section">
      <div className="section-header-row">
        <div>
          <div className="section-eyebrow">
            <span className="badge-tag">LLM-POWERED INTELLIGENCE</span>
            <span className="badge-sub">Authorised Data Extraction</span>
          </div>
          <h2 className="section-title">UID Business Assistant</h2>
          <p className="section-subtitle">
            Ask plain-language operational questions. Answers are computed directly from active manufacturing, inventory, costing, and ledger records.
          </p>
        </div>

        <button onClick={clearAIChat} className="btn-outline-compact">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      <div className="ai-chat-card">
        {/* Assistant Header */}
        <div className="ai-header-bar">
          <div className="flex items-center gap-2.5">
            <div className="ai-avatar-glow">
              <Bot className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <div className="ai-name font-bold text-slate-900">UID Business Assistant</div>
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                <span>Active Model: Local Analytics Engine (Zero API Key Required)</span>
              </div>
            </div>
          </div>

          <div className="ai-header-role-badge">
            <span className="text-xs text-slate-500 mr-1.5">Context Role:</span>
            <span className="badge-tag">{role.toUpperCase()}</span>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="ai-suggestions-row">
          <span className="suggestions-label">Example Prompts:</span>
          <div className="suggestions-scroll">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePromptClick(prompt)}
                className="prompt-chip-btn"
              >
                <span>{prompt}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Messages Container */}
        <div className="ai-messages-container">
          {aiMessages.map((msg) => (
            <div
              key={msg.id}
              className={`ai-message-row ${msg.sender === 'user' ? 'message-user' : 'message-assistant'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="assistant-msg-avatar">
                  <Bot className="w-4 h-4 text-blue-700" />
                </div>
              )}

              <div className="msg-bubble-wrapper">
                <div className="msg-bubble-body">
                  {/* Format newlines and markdown-like bold */}
                  <div className="msg-text-content">
                    {msg.text.split('\n').map((line, lIdx) => {
                      if (!line.trim()) return <br key={lIdx} />;
                      // Check for bullet lines
                      const isBullet = line.startsWith('• ');
                      const content = isBullet ? line.slice(2) : line;

                      // Quick regex to format **bold**
                      const parts = content.split(/(\*\*.*?\*\*)/g);

                      return (
                        <p key={lIdx} className={isBullet ? 'bullet-line' : 'para-line'}>
                          {isBullet && <span className="bullet-dot">•</span>}
                          {parts.map((p, pIdx) => {
                            if (p.startsWith('**') && p.endsWith('**')) {
                              return <strong key={pIdx}>{p.slice(2, -2)}</strong>;
                            }
                            return p;
                          })}
                        </p>
                      );
                    })}
                  </div>
                </div>

                {/* Traceable Data Breakdown Box */}
                {msg.dataExplanation && (
                  <div className="data-traceability-card">
                    <div className="trace-header">
                      <Database className="w-3.5 h-3.5 text-blue-700" />
                      <span>Based on Demo Records</span>
                    </div>

                    <div className="trace-figures-grid">
                      {msg.dataExplanation.figuresUsed.map((fig, fIdx) => (
                        <div key={fIdx} className="trace-fig-item">
                          <span className="trace-fig-label">{fig.label}:</span>
                          <span className="trace-fig-val font-mono">{fig.value}</span>
                        </div>
                      ))}
                    </div>

                    {msg.dataExplanation.recordsReferenced && (
                      <div className="trace-records-ref">
                        <span className="text-[11px] text-slate-500 mr-1.5">Records Referenced:</span>
                        {msg.dataExplanation.recordsReferenced.map((rec, rIdx) => (
                          <span key={rIdx} className="trace-ref-pill font-mono">
                            {rec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="msg-timestamp">{msg.timestamp}</div>
              </div>
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="ai-input-form">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about live denim inventory, buyer debts, fabric costs or sales..."
            className="ai-text-input"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="ai-send-btn"
            aria-label="Send message to Business Assistant"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Privacy & Scope Disclaimer */}
        <div className="ai-privacy-footer">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-500 inline mr-1" />
          <span>
            <strong>Privacy & Permissions Notice:</strong> In the intended production system, the LLM reads only data the logged-in user's role is authorised to access (least privilege). Output figures are traceable to underlying ERP database records.
          </span>
        </div>
      </div>
    </section>
  );
};
