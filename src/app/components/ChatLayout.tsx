'use client';
import { useState, useRef, useEffect, useCallback } from "react";
import { Menu } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatHistory from "./ChatHistory";
import EvidencePanel from "./EvidencePanel";
import DiagnosisPanel from "./DiagnosisPanel";
import ConfidencePanel from "./ConfidencePanel";
import { Message } from "@/types/chat";
import { DiagnosisOutput } from "@/types/diagnosis";
import { ChatSession } from "@/types/session";
import { sendMessage } from "@/lib/api";

type Tab = "evidence" | "diagnosis" | "confidence";

const ChatLayout = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [diagnosis, setDiagnosis] = useState<DiagnosisOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("evidence");
  const [historyOpen, setHistoryOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const saveSession = useCallback((msgs: Message[], diag: DiagnosisOutput | null, sessionId: string | null) => {
    if (msgs.length === 0) return sessionId;

    const title = msgs[0].content.slice(0, 40) + (msgs[0].content.length > 40 ? "..." : "");

    if (sessionId) {
      setSessions((prev) =>
        prev.map((s) => (s.id === sessionId ? { ...s, messages: msgs, diagnosis: diag, title } : s))
      );
      return sessionId;
    }

    const newId = crypto.randomUUID();
    const newSession: ChatSession = {
      id: newId,
      title,
      messages: msgs,
      diagnosis: diag,
      createdAt: new Date(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
    return newId;
  }, []);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await sendMessage(content);
      const finalMessages = [...updatedMessages, response.message];
      setMessages(finalMessages);
      setDiagnosis(response.diagnosis);
      const sid = saveSession(finalMessages, response.diagnosis, activeSessionId);
      setActiveSessionId(sid);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSession = (id: string) => {
    const session = sessions.find((s) => s.id === id);
    if (!session) return;
    setActiveSessionId(id);
    setMessages(session.messages);
    setDiagnosis(session.diagnosis);
    setHistoryOpen(false);
  };

  const handleNewSession = () => {
    setActiveSessionId(null);
    setMessages([]);
    setDiagnosis(null);
    setHistoryOpen(false);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "evidence", label: "Evidence" },
    { key: "diagnosis", label: "Diagnosis" },
    { key: "confidence", label: "Confidence" },
  ];

  return (
    <div className="relative flex h-[calc(100vh-64px)]">
      <ChatHistory
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelect={handleSelectSession}
        onNew={handleNewSession}
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
      />

      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="flex flex-1 flex-col border-r border-border">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <button
              onClick={() => setHistoryOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
            >
              <Menu size={18} />
            </button>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Clinical Consultation</h2>
              <p className="text-xs text-muted-foreground">Describe symptoms to begin analysis</p>
            </div>
          </div>
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">Welcome to AetherCare</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Describe patient symptoms to receive an evidence-based analysis.
                  </p>
                </div>
              </div>
            )}
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-accent px-4 py-3 text-sm text-muted-foreground">
                  Analyzing...
                </div>
              </div>
            )}
          </div>
          <ChatInput onSend={handleSend} disabled={loading} />
        </div>

        <div className="flex w-full flex-col border-t border-border lg:w-[420px] lg:border-t-0">
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto">
            {activeTab === "evidence" && (
              <EvidencePanel evidence={diagnosis?.evidence ?? []} />
            )}
            {activeTab === "diagnosis" && (
              <DiagnosisPanel
                differentials={diagnosis?.differentials ?? []}
                summary={diagnosis?.summary ?? ""}
              />
            )}
            {activeTab === "confidence" && (
              <ConfidencePanel confidence={diagnosis?.confidence ?? null} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
