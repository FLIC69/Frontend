// cropsInfo.js

export const cropsInfo = {
  rice: {
    name: "Rice",
    region: "Asia, Africa, South America",
    optimalPh: "5.5 - 7.0",
    optimalTemp: "20 - 30°C",
    fact: "Feeds half the world's population",
    cards: [
      {
        label: "Region",
        value: "Asia, Africa, South America",
        position: [1, 1.2, 0.6],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "5.5 - 7.0",
        position: [-0.7, 1.8, 0],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "20 - 30°C",
        position: [0.6, 0.3, -0.9],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Feeds half the world's population",
        position: [-1.2, 0.7, 0.5],
        target: [0, 0.5, 0],
      },
    ],
  },

  maize: {
    name: "Maize",
    region: "Americas",
    optimalPh: "5.8 - 7.0",
    optimalTemp: "18 - 27°C",
    fact: "Also called corn 🌽",
    cards: [
      {
        label: "Region",
        value: "Americas",
        position: [1, 1.2, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "5.8 - 7.0",
        position: [-0.8, 1.7, 0.2],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "18 - 27°C",
        position: [0.7, 0.4, -0.8],
        target: [0, 0.5, 0],
      },
      {
        label: "Fun Fact",
        value: "Also called corn 🌽",
        position: [-1.1, 0.8, 0.6],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  chickpea: {
    name: "Chickpea",
    region: "South Asia, Middle East",
    optimalPh: "6.0 - 7.5",
    optimalTemp: "21 - 29°C",
    fact: "One of the world’s oldest cultivated legumes",
    cards: [
      {
        label: "Region",
        value: "South Asia, Middle East",
        position: [1, 1.1, 0.4],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "6.0 - 7.5",
        position: [-0.6, 1.9, 0.1],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "21 - 29°C",
        position: [0.5, 0.2, -0.8],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "One of the world’s oldest cultivated legumes",
        position: [-1.3, 0.7, 0.4],
        target: [0, 0.5, 0],
      },
    ],
  },

  kidneybeans: {
    name: "Kidney Beans",
    region: "Central America, Africa",
    optimalPh: "6.0 - 7.0",
    optimalTemp: "16 - 27°C",
    fact: "Must be cooked thoroughly to remove natural toxins",
    cards: [
      {
        label: "Region",
        value: "Central America, Africa",
        position: [1, 1.3, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "6.0 - 7.0",
        position: [-0.7, 1.6, 0.2],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "16 - 27°C",
        position: [0.6, 0.3, -0.9],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Must be cooked thoroughly to remove natural toxins",
        position: [-1.2, 0.8, 0.6],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  pigeonpeas: {
    name: "Pigeon Peas",
    region: "India, Africa",
    optimalPh: "5.5 - 7.0",
    optimalTemp: "25 - 35°C",
    fact: "Helps fix nitrogen in the soil",
    cards: [
      {
        label: "Region",
        value: "India, Africa",
        position: [1, 1.2, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "5.5 - 7.0",
        position: [-0.6, 1.8, 0.1],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "25 - 35°C",
        position: [0.6, 0.4, -0.8],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Helps fix nitrogen in the soil",
        position: [-1.1, 0.7, 0.5],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  mothbeans: {
    name: "Moth Beans",
    region: "India, Semi-arid Africa",
    optimalPh: "6.0 - 7.0",
    optimalTemp: "24 - 35°C",
    fact: "One of the most drought-resistant legumes",
    cards: [
      {
        label: "Region",
        value: "India, Semi-arid Africa",
        position: [1, 1.1, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "6.0 - 7.0",
        position: [-0.7, 1.7, 0.2],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "24 - 35°C",
        position: [0.5, 0.3, -0.9],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "One of the most drought-resistant legumes",
        position: [-1.2, 0.8, 0.4],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  mungbean: {
    name: "Mung Bean",
    region: "South Asia, Southeast Asia",
    optimalPh: "6.0 - 7.5",
    optimalTemp: "24 - 30°C",
    fact: " sprouts are widely used as bean sprouts in Asian cuisine",
    cards: [
      {
        label: "Region",
        value: "South Asia, Southeast Asia",
        position: [1, 1.2, 0.4],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "6.0 - 7.5",
        position: [-0.6, 1.8, 0.1],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "24 - 30°C",
        position: [0.6, 0.3, -0.8],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "sprouts are widely used as bean sprouts in Asian cuisine",
        position: [-1.3, 0.7, 0.5],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  blackgram: {
    name: "Black Gram",
    region: "India, Southeast Asia",
    optimalPh: "6.0 - 7.0",
    optimalTemp: "24 - 30°C",
    fact: "Used to make dal and idli batter",
    cards: [
      {
        label: "Region",
        value: "India, Southeast Asia",
        position: [1, 1.1, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "6.0 - 7.0",
        position: [-0.7, 1.7, 0.2],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "24 - 30°C",
        position: [0.6, 0.3, -0.9],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Used to make dal and idli batter",
        position: [-1.2, 0.8, 0.4],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  lentil: {
    name: "Lentil",
    region: "Middle East, Canada",
    optimalPh: "6.0 - 7.5",
    optimalTemp: "18 - 23°C",
    fact: "One of the oldest domesticated crops",
    cards: [
      {
        label: "Region",
        value: "Middle East, Canada",
        position: [1, 1.2, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "6.0 - 7.5",
        position: [-0.6, 1.8, 0.1],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "18 - 23°C",
        position: [0.5, 0.3, -0.9],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "One of the oldest domesticated crops",
        position: [-1.3, 0.7, 0.6],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  pomegranate: {
    name: "Pomegranate",
    region: "Mediterranean, India, Middle East",
    optimalPh: "5.5 - 7.2",
    optimalTemp: "25 - 32°C",
    fact: "Seeds (arils) are packed with antioxidants",
    cards: [
      {
        label: "Region",
        value: "Mediterranean, India, Middle East",
        position: [1, 1.3, 0.4],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "5.5 - 7.2",
        position: [-0.7, 1.6, 0.2],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "25 - 32°C",
        position: [0.6, 0.3, -0.8],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Seeds (arils) are packed with antioxidants",
        position: [-1.2, 0.8, 0.5],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  banana: {
    name: "Banana",
    region: "Latin America, Southeast Asia",
    optimalPh: "5.5 - 6.5",
    optimalTemp: "26 - 30°C",
    fact: "Most popular fruit consumed worldwide",
    cards: [
      {
        label: "Region",
        value: "Latin America, Southeast Asia",
        position: [1, 1.2, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "5.5 - 6.5",
        position: [-0.6, 1.8, 0.1],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "26 - 30°C",
        position: [0.6, 0.3, -0.9],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Most popular fruit consumed worldwide",
        position: [-1.3, 0.7, 0.4],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  mango: {
    name: "Mango",
    region: "South Asia, South America",
    optimalPh: "5.5 - 7.5",
    optimalTemp: "24 - 30°C",
    fact: "Known as the 'king of fruits'",
    cards: [
      {
        label: "Region",
        value: "South Asia, South America",
        position: [1, 1.3, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "5.5 - 7.5",
        position: [-0.7, 1.7, 0.2],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "24 - 30°C",
        position: [0.6, 0.4, -0.8],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Known as the 'king of fruits'",
        position: [-1.2, 0.8, 0.5],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  grapes: {
    name: "Grapes",
    region: "Europe, North America, China",
    optimalPh: "5.0 - 6.5",
    optimalTemp: "15 - 30°C",
    fact: "Used to make wine, raisins, and juice",
    cards: [
      {
        label: "Region",
        value: "Europe, North America, China",
        position: [1, 1.2, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "5.0 - 6.5",
        position: [-0.6, 1.9, 0.1],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "15 - 30°C",
        position: [0.7, 0.3, -0.8],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Used to make wine, raisins, and juice",
        position: [-1.3, 0.7, 0.4],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  watermelon: {
    name: "Watermelon",
    region: "Africa, Asia, Americas",
    optimalPh: "6.0 - 7.0",
    optimalTemp: "20 - 30°C",
    fact: "Over 90% water content",
    cards: [
      {
        label: "Region",
        value: "Africa, Asia, Americas",
        position: [1, 1.3, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "6.0 - 7.0",
        position: [-0.7, 1.7, 0.2],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "20 - 30°C",
        position: [0.6, 0.3, -0.9],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Over 90% water content",
        position: [-1.2, 0.8, 0.6],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  muskmelon: {
    name: "Muskmelon",
    region: "India, Iran, Americas",
    optimalPh: "6.0 - 7.0",
    optimalTemp: "20 - 30°C",
    fact: "Rich in vitamins A and C",
    cards: [
      {
        label: "Region",
        value: "India, Iran, Americas",
        position: [1, 1.2, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "6.0 - 7.0",
        position: [-0.6, 1.8, 0.1],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "20 - 30°C",
        position: [0.7, 0.4, -0.8],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Rich in vitamins A and C",
        position: [-1.3, 0.7, 0.5],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  apple: {
    name: "Apple",
    region: "Europe, North America, China",
    optimalPh: "5.5 - 7.0",
    optimalTemp: "18 - 24°C",
    fact: "Over 7,500 varieties exist worldwide",
    cards: [
      {
        label: "Region",
        value: "Europe, North America, China",
        position: [1, 1.1, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "5.5 - 7.0",
        position: [-0.7, 1.7, 0.2],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "18 - 24°C",
        position: [0.6, 0.3, -0.9],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Over 7,500 varieties exist worldwide",
        position: [-1.2, 0.8, 0.4],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  orange: {
    name: "Orange",
    region: "Brazil, USA, Mediterranean",
    optimalPh: "5.5 - 6.5",
    optimalTemp: "25 - 32°C",
    fact: "High in vitamin C",
    cards: [
      {
        label: "Region",
        value: "Brazil, USA, Mediterranean",
        position: [1, 1.2, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "5.5 - 6.5",
        position: [-0.6, 1.8, 0.1],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "25 - 32°C",
        position: [0.7, 0.4, -0.8],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "High in vitamin C",
        position: [-1.3, 0.7, 0.5],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  papaya: {
    name: "Papaya",
    region: "Central America, Tropical regions",
    optimalPh: "6.0 - 7.0",
    optimalTemp: "21 - 33°C",
    fact: "Contains the enzyme papain used for tenderizing meat",
    cards: [
      {
        label: "Region",
        value: "Central America, Tropical regions",
        position: [1, 1.3, 0.4],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "6.0 - 7.0",
        position: [-0.7, 1.6, 0.2],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "21 - 33°C",
        position: [0.6, 0.3, -0.8],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Contains the enzyme papain used for tenderizing meat",
        position: [-1.2, 0.8, 0.5],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  coconut: {
    name: "Coconut",
    region: "Tropical regions, Asia, Pacific Islands",
    optimalPh: "5.0 - 8.0",
    optimalTemp: "27 - 32°C",
    fact: "Every part of the coconut can be used—from water to husk",
    cards: [
      {
        label: "Region",
        value: "Tropical regions, Asia, Pacific Islands",
        position: [1, 1.2, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "5.0 - 8.0",
        position: [-0.6, 1.7, 0.1],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "27 - 32°C",
        position: [0.7, 0.4, -0.9],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Every part of the coconut can be used—from water to husk",
        position: [-1.3, 0.7, 0.4],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  cotton: {
    name: "Cotton",
    region: "USA, India, China",
    optimalPh: "5.5 - 7.5",
    optimalTemp: "21 - 30°C",
    fact: "Cultivated for its fiber for over 5,000 years",
    cards: [
      {
        label: "Region",
        value: "USA, India, China",
        position: [1, 1.2, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "5.5 - 7.5",
        position: [-0.7, 1.8, 0.2],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "21 - 30°C",
        position: [0.5, 0.3, -0.9],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Cultivated for its fiber for over 5,000 years",
        position: [-1.2, 0.8, 0.6],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  jute: {
    name: "Jute",
    region: "Bangladesh, India",
    optimalPh: "6.0 - 6.5",
    optimalTemp: "25 - 35°C",
    fact: "Known as the 'golden fiber' for its shiny appearance",
    cards: [
      {
        label: "Region",
        value: "Bangladesh, India",
        position: [1, 1.1, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "6.0 - 6.5",
        position: [-0.6, 1.7, 0.1],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "25 - 35°C",
        position: [0.7, 0.4, -0.8],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Known as the 'golden fiber' for its shiny appearance",
        position: [-1.3, 0.7, 0.5],
        target: [0, 0.5, 0.5],
      },
    ],
  },

  coffee: {
    name: "Coffee",
    region: "Brazil, Vietnam, Colombia, Ethiopia",
    optimalPh: "6.0 - 6.5",
    optimalTemp: "18 - 24°C",
    fact: "Second most traded commodity after crude oil",
    cards: [
      {
        label: "Region",
        value: "Brazil, Vietnam, Colombia, Ethiopia",
        position: [1, 1.2, 0.5],
        target: [0, 1, 0],
      },
      {
        label: "Optimal pH",
        value: "6.0 - 6.5",
        position: [-0.7, 1.8, 0.2],
        target: [0, 1.5, 0],
      },
      {
        label: "Optimal Temp",
        value: "18 - 24°C",
        position: [0.6, 0.3, -0.9],
        target: [0, 0, 0],
      },
      {
        label: "Fun Fact",
        value: "Second most traded commodity after crude oil",
        position: [-1.2, 0.8, 0.4],
        target: [0, 0.5, 0.5],
      },
    ],
  },
};