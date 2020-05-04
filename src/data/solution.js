export const initial = {
  words: "grape garden apple",
  solution: {
    "grape garden apple ": [],
    "grape garden ": [
      { item: "plant", weight1: 100, weight2: 100 },
      { item: "vegetation", weight1: 100, weight2: 100 }
    ],
    "grape apple ": [{ item: "apple", weight1: 100, weight2: 100 }],
    "garden apple ": [
      { item: "grown", weight1: 100, weight2: 100 },
      { item: "plant", weight1: 100, weight2: 100 }
    ]
  }
};
