export type Rescue = {
  id: string;
  donor: string;
  donorType: "Restaurant" | "Hotel" | "Cafe" | "Bakery" | "Caterer";
  items: string;
  servings: number;
  area: string;
  distanceKm: number;
  pickupWindow: string;
  expiresIn: string;
  diet: "Veg" | "Non-veg" | "Mixed";
  status: "Open" | "Claimed" | "In transit";
};

export const rescues: Rescue[] = [
  {
    id: "SS-1042",
    donor: "Saffron House",
    donorType: "Restaurant",
    items: "Dal makhani, jeera rice, naan",
    servings: 120,
    area: "Banjara Hills",
    distanceKm: 2.4,
    pickupWindow: "Today, 9:30–10:30 PM",
    expiresIn: "4 h",
    diet: "Veg",
    status: "Open",
  },
  {
    id: "SS-1041",
    donor: "The Grand Meridian",
    donorType: "Hotel",
    items: "Buffet surplus: pasta, salads, breads",
    servings: 260,
    area: "Gachibowli",
    distanceKm: 6.1,
    pickupWindow: "Today, 11:00–11:45 PM",
    expiresIn: "5 h",
    diet: "Mixed",
    status: "Open",
  },
  {
    id: "SS-1039",
    donor: "Crumb & Co.",
    donorType: "Bakery",
    items: "Sourdough loaves, croissants, muffins",
    servings: 85,
    area: "Jubilee Hills",
    distanceKm: 3.7,
    pickupWindow: "Today, 8:00–9:00 PM",
    expiresIn: "2 h",
    diet: "Veg",
    status: "Claimed",
  },
  {
    id: "SS-1036",
    donor: "Blue Tokai Kondapur",
    donorType: "Cafe",
    items: "Sandwiches, brownies, cold brew",
    servings: 40,
    area: "Kondapur",
    distanceKm: 5.2,
    pickupWindow: "Today, 9:00–9:30 PM",
    expiresIn: "3 h",
    diet: "Mixed",
    status: "In transit",
  },
  {
    id: "SS-1035",
    donor: "Anand Caterers",
    donorType: "Caterer",
    items: "Wedding surplus: biryani, curd rice",
    servings: 400,
    area: "Madhapur",
    distanceKm: 4.4,
    pickupWindow: "Today, 10:15–11:00 PM",
    expiresIn: "3 h",
    diet: "Non-veg",
    status: "Open",
  },
  {
    id: "SS-1031",
    donor: "Green Bowl Kitchen",
    donorType: "Restaurant",
    items: "Grain bowls, soups, roasted veg",
    servings: 65,
    area: "Begumpet",
    distanceKm: 7.8,
    pickupWindow: "Tomorrow, 3:00–4:00 PM",
    expiresIn: "18 h",
    diet: "Veg",
    status: "Open",
  },
];

export const impactStats = [
  { label: "Meals rescued", value: "1.28M", detail: "since launch" },
  { label: "Partner kitchens", value: "640", detail: "restaurants, hotels & cafes" },
  { label: "NGOs & volunteers", value: "3,100", detail: "active on the network" },
  { label: "CO₂e avoided", value: "980 t", detail: "food kept out of landfill" },
];
