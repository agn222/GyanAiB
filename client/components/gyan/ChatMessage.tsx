import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export type ChatRole = "user" | "assistant";
export interface ChatMessageItem {
  id: string;
  role: ChatRole;
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageItem) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  return (
    <div
      className={cn(
        "flex w-full gap-3",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary">
            GA
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "group relative max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-secondary text-foreground border border-border rounded-bl-md",
        )}
      >
        <div className="whitespace-pre-wrap">{content}</div>
        <button
          aria-label="Copy message"
          onClick={() => {
            navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          className={cn(
            "absolute -top-2 right-2 hidden rounded-full border bg-background/80 p-1 text-foreground shadow-sm backdrop-blur transition-opacity group-hover:block",
            isUser ? "" : "",
          )}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            You
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
