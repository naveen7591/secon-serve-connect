import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { impactStats } from "@/data/rescues";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Our impact — SecondServe food rescue" },
      {
        name: "description",
        content:
          "1.28 million meals rescued, 640 partner kitchens and 980 tonnes of CO₂e avoided. See how SecondServe measures food rescue impact.",
      },
      { property: "og:title", content: "Our impact — SecondServe food rescue" },
      {
        property: "og:description",
        content: "Meals rescued, partners onboarded and emissions avoided across the network.",
      },
    ],
  }),
  component: ImpactPage,
});

const cities = [
  { city: "Hyderabad", meals: "512,400", partners: 218, ngos: 940 },
  { city: "Bengaluru", meals: "389,100", partners: 176, ngos: 810 },
  { city: "Pune", meals: "221,700", partners: 121, ngos: 640 },
  { city: "Chennai", meals: "157,300", partners: 125, ngos: 710 },
];

function ImpactPage() {
  return (
    <div>
      <section className="bg-gradient-forest text-forest-foreground">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Impact</p>
          <h1 className="mt-3 max-w-3xl text-balance-tight text-5xl font-bold lg:text-6xl">
            Measured in meals, not marketing.
          </h1>
          <p className="mt-5 max-w-2xl text-forest-foreground/80">
            Every rescue on SecondServe is logged with weight, servings, pickup time and delivery
            proof. These are the network totals since launch.
          </p>
          <dl className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((s) => (
              <div key={s.label} className="border-t border-forest-foreground/20 pt-5">
                <dt className="font-display text-4xl font-bold text-accent">{s.value}</dt>
                <dd className="mt-2 text-sm font-semibold">{s.label}</dd>
                <dd className="text-xs text-forest-foreground/70">{s.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-4xl font-bold">City by city</h2>
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-secondary-foreground">
              <tr>
                <th className="px-6 py-4 font-semibold">City</th>
                <th className="px-6 py-4 font-semibold">Meals rescued</th>
                <th className="px-6 py-4 font-semibold">Donor kitchens</th>
                <th className="px-6 py-4 font-semibold">NGOs & volunteers</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((c) => (
                <tr key={c.city} className="border-t border-border">
                  <td className="px-6 py-4 font-semibold">{c.city}</td>
                  <td className="px-6 py-4 text-primary font-semibold">{c.meals}</td>
                  <td className="px-6 py-4 text-muted-foreground">{c.partners}</td>
                  <td className="px-6 py-4 text-muted-foreground">{c.ngos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <blockquote className="surface-card p-7">
            <p className="text-lg leading-relaxed">
              &ldquo;We used to bin three trays of biryani every Saturday. Now a rider is at the back
              door before the kitchen is even cleaned.&rdquo;
            </p>
            <footer className="mt-5 text-sm text-muted-foreground">
              Imran Q. — Head Chef, Saffron House
            </footer>
          </blockquote>
          <blockquote className="surface-card p-7">
            <p className="text-lg leading-relaxed">
              &ldquo;The board tells us exactly how many servings are coming and when. We plan our
              evening distribution around it.&rdquo;
            </p>
            <footer className="mt-5 text-sm text-muted-foreground">
              Rekha S. — Programme Lead, Aasha Foundation
            </footer>
          </blockquote>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Button asChild variant="hero" size="lg">
            <Link to="/donate">Become a donor kitchen</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/rescues">Volunteer for a pickup</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
