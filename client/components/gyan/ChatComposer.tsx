import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, StopCircle } from "lucide-react";

interface ChatComposerProps {
  onSend: (text: string) => void;
  generating: boolean;
  onStop: () => void;
}

export function ChatComposer({ onSend, generating, onStop }: ChatComposerProps) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (generating) return;
      if (value.trim().length === 0) return;
      onSend(value.trim());
      setValue("");
    }
  };

  return (
    <div className="rounded-xl border bg-background p-2 shadow-sm">
      <div className="flex items-end gap-2">
        <Button variant="ghost" size="icon" aria-label="Attach">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Textarea
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Gyan AI anything…"
          className="max-h-[200px] min-h-[48px] flex-1 resize-none border-0 bg-transparent px-0 py-2 focus-visible:ring-0"
        />
        {generating ? (
          <Button aria-label="Stop" onClick={onStop} variant="destructive" className="gap-2">
            <StopCircle className="h-4 w-4" /> Stop
          </Button>
        ) : (
          <Button aria-label="Send" onClick={() => value.trim() && onSend(value.trim())} className="gap-2">
            <Send className="h-4 w-4" /> Send
          </Button>
        )}
      </div>
      <div className="px-3 pb-1 pt-2 text-xs text-muted-foreground">
        Press Enter to send, Shift+Enter for newline.
      </div>
    </div>
  );
}
