import marvelTshirtImage from "../assets/images/marvelT-shirt.jpg";
import starryNightHoodieImage from "../assets/images/sNightHoodie.jpg";
import batmanVNeckImage from "../assets/images/batmanV-neck.jpeg";
import spidermanCrewNeckImage from "../assets/images/spidermanCrewNeck.avif";
import supermanImage from "../assets/images/superman.jpg";
import ironmanImage from "../assets/images/ironman.jpg";

export const products = [
  {
    id: 1,
    name: "Marvel Avengers T-Shirt",
    price: 499,
    offPercent: 10,
    stock: 10,
    rating: 4.5,
    images: [
      marvelTshirtImage,
      marvelTshirtImage,
      marvelTshirtImage,
    ],
    description:
      "A vibrant Marvel Avengers T-Shirt featuring your favorite superheroes. Made from premium cotton for ultimate comfort.",
    theme: "Marvel",
    type: "Crew Neck",
    sizes: ["S", "M", "L", "XL"],
    reviews: [
      { user: "Tony S.", rating: 5, comment: "Awesome design, fits perfectly!" },
      { user: "Peter P.", rating: 4, comment: "Great shirt, but color fades slightly." },
    ],
    createdAt: "2025-05-01",
  },
  {
    id: 2,
    name: "Starry Night Hoodie",
    price: 999,
    offPercent: 20,
    stock: 5,
    rating: 4.8,
    images: [
      starryNightHoodieImage,
      starryNightHoodieImage,
      starryNightHoodieImage,
    ],
    description:
      "Cozy hoodie inspired by Van Gogh's Starry Night masterpiece. Perfect for chilly evenings.",
    theme: "Starry Night",
    type: "Hoodie",
    sizes: ["M", "L", "XL"],
    reviews: [
      { user: "Emma W.", rating: 5, comment: "Super comfy and stylish!" },
      { user: "Liam N.", rating: 4.5, comment: "Love the print, great quality." },
    ],
    createdAt: "2025-04-15",
  },
  {
    id: 3,
    name: "DC Batman V-Neck",
    price: 699,
    offPercent: 0,
    stock: 0,
    rating: 4.2,
    images: [
      batmanVNeckImage,
      batmanVNeckImage,
      batmanVNeckImage,
    ],
    description:
      "Sleek V-Neck T-Shirt with Batman logo for DC fans. Lightweight and breathable.",
    theme: "DC Comics",
    type: "V-Neck",
    sizes: ["S", "L", "XL"],
    reviews: [{ user: "Bruce W.", rating: 4, comment: "Cool design, but sizing runs small." }],
    createdAt: "2025-03-10",
  },
  {
    id: 4,
    name: "Spider-Man Crew Neck",
    price: 899,
    offPercent: 15,
    stock: 8,
    rating: 4.6,
    images: [
      spidermanCrewNeckImage,
      spidermanCrewNeckImage,
      spidermanCrewNeckImage,
    ],
    description:
      "Classic Spider-Man crew neck T-Shirt with bold design. Perfect for Marvel fans.",
    theme: "Marvel",
    type: "Crew Neck",
    sizes: ["S", "M", "XL"],
    reviews: [
      { user: "MJ W.", rating: 5, comment: "My favorite shirt, great fit!" },
      { user: "Ned L.", rating: 4, comment: "Nice, but stitching could be better." },
    ],
    createdAt: "2025-05-20",
  },
  {
    id: 5,
    name: "Superman Oversized",
    price: 1999,
    offPercent: 0,
    stock: 12,
    rating: 4.3,
    images: [
      supermanImage,
      supermanImage,
      supermanImage,
    ],
    description:
      "Oversized Superman T-Shirt for a relaxed, heroic look. Soft and durable fabric.",
    theme: "DC Comics",
    type: "Oversized",
    sizes: ["M", "L", "XL"],
    reviews: [{ user: "Clark K.", rating: 4.5, comment: "Really comfortable, love the fit." }],
    createdAt: "2025-02-25",
  },
  {
    id: 6,
    name: "Sleeveless Iron Man",
    price: 299,
    offPercent: 5,
    stock: 15,
    rating: 4,
    images: [
      ironmanImage,
      ironmanImage,
      ironmanImage,
    ],
    description:
      "Sleeveless Iron Man T-Shirt, perfect for workouts. Breathable and stylish.",
    theme: "Marvel",
    type: "Sleeveless",
    sizes: ["S", "M", "L"],
    reviews: [
      { user: "Pepper P.", rating: 4, comment: "Great for gym, nice design." },
      { user: "Rhodey J.", rating: 3.5, comment: "Good but a bit tight." },
    ],
    createdAt: "2025-01-30",
  },
];
