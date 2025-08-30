import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Sidebar, ConversationItem } from "@/components/gyan/Sidebar";
import { ChatMessage, ChatMessageItem } from "@/components/gyan/ChatMessage";
import { ChatComposer } from "@/components/gyan/ChatComposer";
import { Sparkles } from "lucide-react";

function initialAssistantMessage(): ChatMessageItem {
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content:
      "Namaste! I am Gyan AI — your personal knowledge guide. Ask me anything and I will explain it clearly, step by step.",
  };
}

function craftResponse(input: string): string {
  const trimmed = input.trim();
  const words = trimmed.split(/\s+/);
  const unique = Array.from(new Set(words.map((w) => w.toLowerCase()))).slice(
    0,
    5,
  );
  return [
    "Here's a thoughtful answer:",
    "",
    `• Key topics I notice: ${unique.join(", ") || "general inquiry"}.`,
    "• I would approach this by breaking it down into simple steps.",
    "• If you share more context (goals, constraints), I can tailor the solution further.",
  ].join("\n");
}

export default function Index() {
  const [messages, setMessages] = useState<ChatMessageItem[]>([
    initialAssistantMessage(),
  ]);
  const [conversations, setConversations] = useState<ConversationItem[]>([
    { id: "default", title: "Welcome" },
  ]);
  const [activeConv, setActiveConv] = useState<string>("default");
  const [generating, setGenerating] = useState(false);
  const genRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (genRef.current) window.clearInterval(genRef.current);
    },
    [],
  );

  const sidebarEl = useMemo(
    () => (
      <Sidebar
        items={conversations}
        activeId={activeConv}
        onNew={() => {
          const id = crypto.randomUUID();
          const title = "New chat";
          setConversations((c) => [{ id, title }, ...c]);
          setActiveConv(id);
          setMessages([initialAssistantMessage()]);
        }}
        onSelect={(id) => {
          setActiveConv(id);
          setMessages([initialAssistantMessage()]);
        }}
      />
    ),
    [conversations, activeConv],
  );

  const handleSend = (text: string) => {
    const userMsg: ChatMessageItem = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    const assistantMsg: ChatMessageItem = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
    };
    setMessages((m) => [...m, userMsg, assistantMsg]);

    // Simulate streaming generation
    const full = craftResponse(text);
    let i = 0;
    setGenerating(true);
    genRef.current = window.setInterval(() => {
      i++;
      const chunk = full.slice(0, i * 2);
      setMessages((m) =>
        m.map((mm) =>
          mm.id === assistantMsg.id ? { ...mm, content: chunk } : mm,
        ),
      );
      if (chunk.length >= full.length) {
        if (genRef.current) window.clearInterval(genRef.current);
        setGenerating(false);
      }
    }, 16);
  };

  const stop = () => {
    if (genRef.current) window.clearInterval(genRef.current);
    setGenerating(false);
  };

  return (
    <div className="grid-bg relative">
      <main className="mx-auto grid min-h-[calc(100dvh-56px)] max-w-screen-2xl grid-cols-1 md:grid-cols-[300px_1fr]">
        <aside className="hidden md:block">{sidebarEl}</aside>
        <section className="flex h-full flex-col gap-4 p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border p-2 gyan-gradient" />
            <div>
              <h1 className="text-xl font-bold leading-tight tracking-tight sm:text-2xl">
                Gyan AI
              </h1>
              <p className="text-sm text-muted-foreground">
                Clarity-first AI assistant for learning and building
              </p>
            </div>
          </div>
          <Separator />
          <ScrollArea className="h-[calc(100dvh-56px-210px)] pr-4">
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              {messages.map((m) => (
                <ChatMessage
                  key={m.id}
                  id={m.id}
                  role={m.role}
                  content={m.content}
                />
              ))}
            </div>
          </ScrollArea>
          <div className="mx-auto w-full max-w-3xl">
            <ChatComposer
              onSend={handleSend}
              generating={generating}
              onStop={stop}
            />
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              Gyan AI provides helpful, structured answers. Connect a model to
              enable real responses.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
