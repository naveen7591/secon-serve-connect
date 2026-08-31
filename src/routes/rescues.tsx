import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock3, MapPin, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { rescues, type Rescue } from "@/data/rescues";

export const Route = createFileRoute("/rescues")({
  head: () => ({
    meta: [
      { title: "Live food rescues near you — SecondServe" },
      {
        name: "description",
        content:
          "Browse surplus food listings from restaurants, hotels and cafes, and claim a pickup window as an NGO or volunteer rider.",
      },
      { property: "og:title", content: "Live food rescues near you — SecondServe" },
      {
        property: "og:description",
        content: "Real-time surplus food listings ready to be claimed, collected and delivered.",
      },
    ],
  }),
  component: RescuesPage,
});

const filters = ["All", "Open", "Claimed", "In transit"] as const;

const statusStyles: Record<Rescue["status"], string> = {
  Open: "bg-primary/10 text-primary",
  Claimed: "bg-accent/20 text-accent-foreground",
  "In transit": "bg-secondary text-secondary-foreground",
};

function RescuesPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const [claimed, setClaimed] = useState<string[]>([]);

  const list = useMemo(
    () =>
      rescues.filter((r) => {
        const matchesStatus =
          filter === "All" || (claimed.includes(r.id) ? "Claimed" : r.status) === filter;
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          [r.donor, r.items, r.area].some((f) => f.toLowerCase().includes(q));
        return matchesStatus && matchesQuery;
      }),
    [filter, query, claimed],
  );

  const totalServings = list.reduce((sum, r) => sum + r.servings, 0);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Rescue board
        </p>
        <h1 className="mt-3 text-5xl font-bold">Live rescues</h1>
        <p className="mt-4 text-muted-foreground">
          {list.length} listings · {totalServings.toLocaleString()} servings currently on the board
          within 10 km of you.
        </p>
      </header>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search kitchen, dish or area"
            className="rounded-full pl-9"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {list.map((r) => {
          const status = claimed.includes(r.id) ? "Claimed" : r.status;
          return (
            <article key={r.id} className="surface-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">{r.donor}</h2>
                  <p className="text-sm text-muted-foreground">
                    {r.donorType} · #{r.id}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
                >
                  {status}
                </span>
              </div>

              <p className="mt-4 text-sm text-foreground/90">{r.items}</p>

              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-4">
                <div>
                  <dt className="text-xs text-muted-foreground">Servings</dt>
                  <dd className="font-display text-lg font-bold text-primary">{r.servings}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Diet</dt>
                  <dd className="text-sm font-semibold">{r.diet}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Distance</dt>
                  <dd className="text-sm font-semibold">{r.distanceKm} km</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Safe for</dt>
                  <dd className="flex items-center gap-1 text-sm font-semibold text-ember">
                    <Clock3 className="size-3.5" /> {r.expiresIn}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" /> {r.area} · {r.pickupWindow}
                </p>
                <Button
                  disabled={status !== "Open"}
                  onClick={() => {
                    setClaimed((c) => [...c, r.id]);
                    toast.success(`Pickup ${r.id} claimed`, {
                      description: `${r.donor} has been notified. Collect at ${r.pickupWindow}.`,
                    });
                  }}
                >
                  {status === "Open" ? "Claim pickup" : "Unavailable"}
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      {list.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">
          No rescues match that search. Try a different area or dish.
        </p>
      )}
    </div>
  );
}
