import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "lucide-react";

interface HeaderProps {
  sidebar: React.ReactNode;
}

export function Header({ sidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              {sidebar}
            </SheetContent>
          </Sheet>
          <a href="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md gyan-gradient" />
            <span className="text-base font-extrabold tracking-tight">
              Gyan AI
            </span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
