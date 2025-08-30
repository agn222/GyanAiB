import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, MessageSquare } from "lucide-react";

export interface ConversationItem {
  id: string;
  title: string;
}

interface SidebarProps {
  items: ConversationItem[];
  activeId: string | null;
  onNew: () => void;
  onSelect: (id: string) => void;
}

export function Sidebar({ items, activeId, onNew, onSelect }: SidebarProps) {
  return (
    <div className="flex h-full w-full flex-col border-r bg-sidebar px-3 py-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="text-sm font-semibold">Conversations</div>
        <Button size="sm" className="gap-2" onClick={onNew}>
          <Plus className="h-4 w-4" /> New
        </Button>
      </div>
      <ScrollArea className="h-full pr-2">
        <div className="flex flex-col gap-1">
          {items.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={
                "group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-sidebar-accent " +
                (activeId === c.id ? "bg-sidebar-accent" : "")
              }
            >
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="line-clamp-1">{c.title}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
