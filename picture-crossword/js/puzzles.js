/**
 * PixCross - Built-in Puzzle Packs & Level Definitions
 */

const PUZZLE_PACKS = [
  {
    id: "wildlife-safari",
    title: "Wildlife Safari",
    icon: "🐾",
    difficulty: "Easy",
    description: "Explore the animal kingdom from snowy forests to sunlit savannas.",
    rows: 9,
    cols: 8,
    words: [
      {
        id: "w1",
        number: 1,
        direction: "across",
        row: 2,
        col: 1,
        answer: "WOLF",
        image: "assets/images/wolf.jpg",
        caption: "A silver-furred pack hunter in the snow",
        hint: "Known to howl at the moon and live in packs",
        fact: "Wolves can communicate over distances of up to 10 miles using their distinctive howls!"
      },
      {
        id: "w2",
        number: 2,
        direction: "down",
        row: 2,
        col: 3,
        answer: "LION",
        image: "assets/images/lion.jpg",
        caption: "The majestic golden-maned king of the savanna",
        hint: "The apex predator often called the 'King of the Jungle'",
        fact: "A lion's roar can be heard from 5 miles (8 km) away!"
      },
      {
        id: "w3",
        number: 3,
        direction: "across",
        row: 4,
        col: 3,
        answer: "OTTER",
        image: "assets/images/otter.jpg",
        caption: "A playful river swimmer holding a stone",
        hint: "Playful aquatic mammal that loves sliding into water",
        fact: "Sea otters often hold hands while sleeping so they don't float away from each other."
      },
      {
        id: "w4",
        number: 4,
        direction: "down",
        row: 4,
        col: 5,
        answer: "TIGER",
        image: "assets/images/tiger.jpg",
        caption: "An intense big cat with orange and black stripes",
        hint: "Largest cat species in the world, skilled swimmer",
        fact: "No two tigers have the exact same stripes — each pattern is unique like human fingerprints."
      },
      {
        id: "w5",
        number: 5,
        direction: "down",
        row: 1,
        col: 7,
        answer: "ZEBRA",
        image: "assets/images/zebra.jpg",
        caption: "A savanna grazer with striking monochrome stripes",
        hint: "African wild horse with black-and-white coats",
        fact: "Zebras run in a zig-zag pattern when being chased by predators to confuse them!"
      },
      {
        id: "w6",
        number: 6,
        direction: "across",
        row: 7,
        col: 1,
        answer: "EAGLE",
        image: "assets/images/eagle.jpg",
        caption: "A fierce raptor with snow-white crown soaring high",
        hint: "Symbol of strength with razor-sharp eyesight",
        fact: "Eagles have eyesight about 4 to 8 times stronger than the average human!"
      },
      {
        id: "w7",
        number: 7,
        direction: "down",
        row: 4,
        col: 1,
        answer: "CAMEL",
        image: "assets/images/camel.jpg",
        caption: "A desert wanderer adapted to sandy dunes",
        hint: "Ships of the desert that can endure days without water",
        fact: "Camels have three eyelids and two rows of eyelashes to protect their eyes from sandstorms."
      }
    ]
  },
  {
    id: "delicious-bites",
    title: "Delicious Bites",
    icon: "🥐",
    difficulty: "Medium",
    description: "Tasty treats, bakery goods, and fresh produce from around the kitchen.",
    rows: 7,
    cols: 6,
    words: [
      {
        id: "f1",
        number: 1,
        direction: "across",
        row: 0,
        col: 1,
        answer: "BREAD",
        image: "assets/images/bread.jpg",
        caption: "A freshly baked crusty sourdough loaf",
        hint: "A staple food made from flour, water, and yeast",
        fact: "Bread is one of the oldest human-made foods, dating back over 14,000 years!"
      },
      {
        id: "f2",
        number: 2,
        direction: "down",
        row: 0,
        col: 5,
        answer: "DONUT",
        image: "assets/images/donut.jpg",
        caption: "A glazed ring with pink frosting and sprinkles",
        hint: "A fried dough confectionery with a hole in the center",
        fact: "Over 10 billion donuts are consumed every year in the United States alone!"
      },
      {
        id: "f3",
        number: 3,
        direction: "across",
        row: 2,
        col: 1,
        answer: "LEMON",
        image: "assets/images/lemon.jpg",
        caption: "A tart yellow citrus fruit sliced in half",
        hint: "Sour yellow citrus rich in Vitamin C",
        fact: "During the Renaissance, ladies used lemon juice to redden their lips naturally."
      },
      {
        id: "f4",
        number: 4,
        direction: "down",
        row: 2,
        col: 3,
        answer: "MANGO",
        image: "assets/images/mango.jpg",
        caption: "A juicy golden tropical fruit sliced into cubes",
        hint: "The sweet 'King of Fruits' popular in smoothies",
        fact: "Mangoes are the national fruit of India, Pakistan, and the Philippines."
      },
      {
        id: "f5",
        number: 5,
        direction: "down",
        row: 3,
        col: 0,
        answer: "TACO",
        image: "assets/images/taco.jpg",
        caption: "A crispy folded tortilla filled with meat and veggies",
        hint: "Traditional Mexican street food served with salsa and lime",
        fact: "The word taco originally referred to small explosive charges used in silver mines!"
      },
      {
        id: "f6",
        number: 6,
        direction: "across",
        row: 6,
        col: 0,
        answer: "ONION",
        image: "assets/images/onion.jpg",
        caption: "A layered red culinary bulb sliced on a board",
        hint: "A pungent vegetable that might make you cry when chopping",
        fact: "Ancient Egyptians worshipped onions, believing their spherical shape and concentric rings represented eternal life."
      }
    ]
  },
  {
    id: "wonders-inventions",
    title: "Wonders & Inventions",
    icon: "🚀",
    difficulty: "Challenging",
    description: "Iconic instruments, space exploration, and human engineering.",
    rows: 7,
    cols: 8,
    words: [
      {
        id: "t1",
        number: 1,
        direction: "across",
        row: 0,
        col: 2,
        answer: "GUITAR",
        image: "assets/images/guitar.jpg",
        caption: "A 6-string acoustic wooden instrument",
        hint: "Strummed or plucked musical instrument with frets",
        fact: "The oldest known guitar-like string instrument dates back over 3,500 years to ancient Egypt."
      },
      {
        id: "t2",
        number: 2,
        direction: "down",
        row: 0,
        col: 2,
        answer: "GLOBE",
        image: "assets/images/globe.jpg",
        caption: "A spherical model of Planet Earth on a brass stand",
        hint: "Three-dimensional spherical representation of world geography",
        fact: "The oldest surviving terrestrial globe was constructed in 1492 by Martin Behaim in Nuremberg."
      },
      {
        id: "t3",
        number: 3,
        direction: "down",
        row: 0,
        col: 7,
        answer: "ROCKET",
        image: "assets/images/rocket.jpg",
        caption: "A spacecraft ascending into space with fiery thrust",
        hint: "Vehicle powered by jet thrust used to reach outer space",
        fact: "A rocket must travel at roughly 11.2 kilometers per second (25,000 mph) to escape Earth's gravity!"
      },
      {
        id: "t4",
        number: 4,
        direction: "across",
        row: 2,
        col: 1,
        answer: "ROBOT",
        image: "assets/images/robot.jpg",
        caption: "An intelligent autonomous humanoid with friendly LED eyes",
        hint: "Programmable machine capable of carrying out complex tasks",
        fact: "The word 'robot' was introduced in 1920 by Czech playwright Karel Čapek, derived from 'robota' meaning labor."
      },
      {
        id: "t5",
        number: 5,
        direction: "down",
        row: 2,
        col: 5,
        answer: "TRAIN",
        image: "assets/images/train.jpg",
        caption: "A high-speed bullet locomotive gliding on tracks",
        hint: "Series of connected vehicles that run on a railroad line",
        fact: "Modern magnetic levitation (maglev) trains can exceed speeds of 600 km/h (373 mph) without touching the rails!"
      },
      {
        id: "t6",
        number: 6,
        direction: "across",
        row: 6,
        col: 2,
        answer: "PIANO",
        image: "assets/images/piano.jpg",
        caption: "An elegant acoustic keyboard instrument with 88 black and white keys",
        hint: "Large concert instrument with pedals, hammers, and strings",
        fact: "A full-sized concert grand piano has over 230 strings subjected to about 18 tons of tension!"
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.PUZZLE_PACKS = PUZZLE_PACKS;
}
