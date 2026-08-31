import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bike,
  Clock3,
  MapPin,
  ShieldCheck,
  Sprout,
  Utensils,
} from "lucide-react";
import heroImage from "@/assets/hero-rescue.jpg";
import { Button } from "@/components/ui/button";
import { impactStats, rescues } from "@/data/rescues";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SecondServe — Rescue surplus food, feed your city" },
      {
        name: "description",
        content:
          "SecondServe connects restaurants, hotels and cafes with NGOs and volunteers so surplus food is collected and delivered within hours instead of wasted.",
      },
      { property: "og:title", content: "SecondServe — Rescue surplus food, feed your city" },
      {
        property: "og:description",
        content:
          "Post surplus food in 60 seconds. Nearby NGOs and volunteers claim, collect and deliver it the same evening.",
      },
    ],
  }),
  component: Home,
});

const steps = [
  {
    icon: Utensils,
    title: "Kitchens post surplus",
    body: "A chef logs what's left at close: dish, servings, safe-until time. Takes under a minute.",
  },
  {
    icon: Bike,
    title: "Volunteers claim pickups",
    body: "Nearby NGOs and riders see the listing instantly and claim the collection window.",
  },
  {
    icon: ShieldCheck,
    title: "Meals reach people",
    body: "Cold-chain checklist, temperature log and photo proof on delivery. Every meal traceable.",
  },
];

function Home() {
  const featured = rescues.filter((r) => r.status === "Open").slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-forest text-forest-foreground">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pb-28 lg:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest-foreground/20 bg-forest-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]">
              <Sprout className="size-3.5" />
              Food rescue network
            </span>
            <h1 className="mt-6 text-balance-tight text-5xl font-extrabold leading-[1.03] sm:text-6xl lg:text-7xl">
              Tonight&apos;s surplus is tomorrow&apos;s meal.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-forest-foreground/80">
              SecondServe moves edible food from restaurant kitchens to the people who need it —
              matched, claimed and delivered within hours, not thrown away at closing time.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/donate">
                  Post surplus food <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-forest-foreground/30 bg-transparent text-forest-foreground hover:border-forest-foreground hover:text-forest-foreground"
              >
                <Link to="/rescues">Browse live rescues</Link>
              </Button>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
              {impactStats.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-bold text-accent">{s.value}</dt>
                  <dd className="mt-1 text-xs text-forest-foreground/70">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Restaurant staff handing a crate of surplus food to a volunteer loading a van at dusk"
              width={1600}
              height={1104}
              className="w-full rounded-3xl object-cover shadow-lift"
            />
            <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-lift sm:left-8 sm:right-auto sm:w-72">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Just claimed
              </p>
              <p className="mt-1 font-display text-lg font-bold">260 buffet servings</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5" /> The Grand Meridian → Aasha Foundation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            How it works
          </p>
          <h2 className="mt-3 text-4xl font-bold">Three steps between a full tray and a full plate.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="surface-card p-7">
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <step.icon className="size-5" />
                </span>
                <span className="font-display text-3xl font-bold text-border">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live board preview */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Open right now
              </p>
              <h2 className="mt-3 text-4xl font-bold">Surplus waiting for a rescuer</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/rescues">
                See all listings <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featured.map((r) => (
              <article key={r.id} className="surface-card flex flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    {r.donorType}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-ember">
                    <Clock3 className="size-3.5" /> {r.expiresIn} left
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold">{r.donor}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.items}</p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-primary">{r.servings}</span>
                  <span className="text-sm text-muted-foreground">servings</span>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" /> {r.area} · {r.distanceKm} km
                </p>
                <Button asChild className="mt-6 w-full">
                  <Link to="/rescues">Claim pickup</Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="overflow-hidden rounded-3xl bg-gradient-forest px-8 py-14 text-forest-foreground shadow-lift sm:px-14">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold">Every kitchen in your city, one rescue away.</h2>
            <p className="mt-4 text-forest-foreground/80">
              Join as a donor kitchen, an NGO distribution partner, or a volunteer rider. Onboarding
              takes a day, and your first rescue can happen the same night.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/donate">Register your kitchen</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-forest-foreground/30 bg-transparent text-forest-foreground hover:border-forest-foreground hover:text-forest-foreground"
              >
                <Link to="/impact">See our impact</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
