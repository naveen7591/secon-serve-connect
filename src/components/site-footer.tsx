import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-forest text-forest-foreground">
            <Sprout className="size-4" />
          </span>
          <p className="text-sm text-muted-foreground">
            SecondServe — good food, second chance.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
          <Link to="/rescues" className="hover:text-foreground">
            Live rescues
          </Link>
          <Link to="/donate" className="hover:text-foreground">
            Donate surplus
          </Link>
          <Link to="/impact" className="hover:text-foreground">
            Impact
          </Link>
        </div>
      </div>
    </footer>
  );
}
