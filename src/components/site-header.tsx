import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Sprout, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/rescues", label: "Live rescues" },
  { to: "/donate", label: "Donate surplus" },
  { to: "/impact", label: "Impact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-forest text-forest-foreground">
            <Sprout className="size-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">SecondServe</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="hero">
            <Link to="/donate">Post surplus food</Link>
          </Button>
        </div>

        <button
          className="rounded-full p-2 text-foreground md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="hero" className="mt-2">
              <Link to="/donate" onClick={() => setOpen(false)}>
                Post surplus food
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
