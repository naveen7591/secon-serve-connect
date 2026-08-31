import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Snowflake, Timer, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Post surplus food in 60 seconds — SecondServe" },
      {
        name: "description",
        content:
          "Restaurants, hotels, cafes and caterers: list tonight's surplus and a nearby NGO or volunteer will collect it within your pickup window.",
      },
      { property: "og:title", content: "Post surplus food in 60 seconds — SecondServe" },
      {
        property: "og:description",
        content: "List surplus food and get it collected by a verified NGO the same evening.",
      },
    ],
  }),
  component: DonatePage,
});

const assurances = [
  { icon: Timer, title: "Collected in under 2 hours", body: "Average claim time is 11 minutes." },
  { icon: Snowflake, title: "Safe handling", body: "Insulated boxes and temperature logs on every run." },
  { icon: Users, title: "Verified partners", body: "Every NGO is FSSAI-registered and audited." },
];

function DonatePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          For kitchens
        </p>
        <h1 className="mt-3 text-5xl font-bold">Post tonight&apos;s surplus</h1>
        <p className="mt-4 text-muted-foreground">
          Tell us what&apos;s left and when it can be picked up. Nearby NGOs and volunteer riders see
          your listing the moment you publish it.
        </p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div className="surface-card p-7 sm:p-9">
          {submitted ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto size-12 text-primary" />
              <h2 className="mt-5 text-2xl font-bold">Listing published</h2>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                Verified partners within 10 km have been notified. You&apos;ll get a confirmation the
                moment someone claims the pickup.
              </p>
              <Button className="mt-7" onClick={() => setSubmitted(false)}>
                Post another listing
              </Button>
            </div>
          ) : (
            <form
              className="grid gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
                toast.success("Surplus listed", {
                  description: "Nearby NGOs and volunteers have been notified.",
                });
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="business">Business name</Label>
                  <Input id="business" required placeholder="Saffron House" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Business type</Label>
                  <Select defaultValue="Restaurant">
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Restaurant", "Hotel", "Cafe", "Bakery", "Caterer"].map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="items">What&apos;s available?</Label>
                <Textarea
                  id="items"
                  required
                  rows={3}
                  placeholder="Dal makhani, jeera rice, 40 naan — packed in trays"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input id="servings" type="number" min={1} required placeholder="120" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="diet">Diet</Label>
                  <Select defaultValue="Veg">
                    <SelectTrigger id="diet">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Veg", "Non-veg", "Mixed"].map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="safe">Safe until</Label>
                  <Input id="safe" type="time" required defaultValue="23:30" />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="area">Pickup address</Label>
                  <Input id="area" required placeholder="Road No. 12, Banjara Hills" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Contact number</Label>
                  <Input id="phone" type="tel" required placeholder="+91 98XXX XXXXX" />
                </div>
              </div>

              <Button type="submit" variant="hero" size="lg" className="mt-2 w-full sm:w-auto">
                Publish listing
              </Button>
              <p className="text-xs text-muted-foreground">
                By publishing you confirm the food was stored safely and is fit for consumption.
              </p>
            </form>
          )}
        </div>

        <aside className="grid gap-4">
          {assurances.map((a) => (
            <div key={a.title} className="surface-card flex gap-4 p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <a.icon className="size-5" />
              </span>
              <div>
                <h2 className="font-bold">{a.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
              </div>
            </div>
          ))}
          <div className="rounded-2xl bg-gradient-forest p-6 text-forest-foreground shadow-lift">
            <p className="font-display text-2xl font-bold">Avg. 11 min</p>
            <p className="mt-1 text-sm text-forest-foreground/80">
              from publishing a listing to a volunteer claiming it.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
