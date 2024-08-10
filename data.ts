

export interface Item {
  name: string;
  image: string;
  requirements: string[];
  time: number;
  final: boolean;
  type: 'plant' | 'craft' | 'animal';
}

export interface GameData {
  inventory: Item[];
  lastUpdate: number;
  planting?: {
    item: Item;
    watered: boolean;
    elapsed: number;
    startedAt: number;
  }
  breeding?: {
    item: Item;
    fed: boolean;
    elapsed: number;
    startedAt: number;
  }
  crafting?: {
    item: Item;
    elapsed: number;
    startedAt: number;
  }
}

export function getInitialGameData(): GameData {
  return {
    inventory: [],
    lastUpdate: Date.now()
  }
}

export const allItems: Item[] = [
  {
    name: "milk",
    image: "",
    requirements: [],
    time: 5,
    final: true,
    type: 'animal'
  },
  {
    name: "bacon",
    image: "",
    requirements: [],
    time: 4,
    final: false,
    type: 'animal'
  },
  {
    name: "egg",
    image: "",
    requirements: [],
    time: 6,
    final: false,
    type: 'animal'
  },

  {
    name: "wheat",
    image: "",
    requirements: [],
    time: 4,
    final: false,
    type: 'plant'
  },
  {
    name: "potatoes",
    image: "",
    requirements: [],
    time: 4,
    final: false,
    type: 'plant'
  },
  {
    name: "cocoa_beans",
    image: "",
    requirements: [],
    time: 3,
    final: false,
    type: 'plant'
  },
  {
    name: "corn",
    image: "",
    requirements: [],
    time: 3,
    final: true,
    type: 'plant'
  },
  {
    name: "tomato",
    image: "",
    requirements: [],
    time: 3,
    final: true,
    type: 'plant'
  },
  {
    name: "onion",
    image: "",
    requirements: [],
    time: 1,
    final: false,
    type: 'plant'
  },
  {
    name: "onion_chips",
    image: "",
    requirements: ["onion", "chips"],
    time: 0.5,
    final: true,
    type: 'craft'
  },
  {
    name: "pepper",
    image: "",
    requirements: [],
    time: 1,
    final: true,
    type: 'plant'
  },
  {
    name: "pineapple",
    image: "",
    requirements: [],
    time: 6,
    final: true,
    type: 'plant'
  },
  {
    name: "carrot",
    image: "",
    requirements: [],
    time: 2,
    final: true,
    type: 'plant'
  },
  {
    name: "watermelon",
    image: "",
    requirements: [],
    time: 6,
    final: true,
    type: 'plant'
  },
  {
    name: "peanuts",
    image: "",
    requirements: [],
    time: 3,
    final: true,
    type: 'plant'
  },
  {
    name: "banana",
    image: "",
    requirements: [],
    time: 4,
    final: true,
    type: 'plant'
  },
  {
    name: "grapes",
    image: "",
    requirements: [],
    time: 3,
    final: true,
    type: 'plant'
  },
  {
    name: "peach",
    image: "",
    requirements: [],
    time: 3,
    final: true,
    type: 'plant'
  },
  {
    name: "licorice",
    image: "",
    requirements: [],
    time: 2,
    final: false,
    type: 'plant'
  },
  {
    name: "licorice_stick",
    image: "",
    requirements: ["licorice", "sugar"],
    time: 2,
    final: true,
    type: 'craft'
  },
  {
    name: "sugar_beet",
    image: "",
    requirements: [],
    time: 2,
    final: false,
    type: 'plant'
  },

  {
    name: "sausage",
    image: "",
    requirements: ["bacon"],
    time: 0.5,
    final: false,
    type: 'craft'
  },
  {
    name: "gelatin",
    image: "",
    requirements: ["bacon", "sugar"],
    time: 1,
    final: true,
    type: 'craft'
  },
  {
    name: "sugar",
    image: "",
    requirements: ["sugar_beet"],
    time: 1,
    final: false,
    type: 'craft'
  },
  {
    name: "vinea",
    image: "",
    requirements: ["grapes", "sugar"],
    time: 1,
    final: true,
    type: 'craft'
  },
  {
    name: "ice_tea",
    image: "",
    requirements: ["peach", "sugar"],
    time: 1,
    final: true,
    type: 'craft'
  },
  {
    name: "caramel",
    image: "",
    requirements: ["sugar"],
    time: 1,
    final: false,
    type: 'craft'
  },
  {
    name: "kofola",
    image: "",
    requirements: ["licorice", "caramel"],
    time: 1,
    final: true,
    type: 'craft'
  },
  {
    name: "jam",
    image: "",
    requirements: ["peach"],
    time: 3,
    final: true,
    type: 'craft'
  },
  {
    name: "whey",
    image: "",
    requirements: ["milk"],
    time: 1,
    final: true,
    type: 'craft'
  },
  {
    name: "cheese",
    image: "",
    requirements: ["milk"],
    time: 1,
    final: true,
    type: 'craft'
  },
  {
    name: "flour",
    image: "",
    requirements: ["wheat"],
    time: 0.5,
    final: false,
    type: 'craft'
  },
  {
    name: "bread",
    image: "",
    requirements: ["egg", "flour"],
    time: 0.5,
    final: true,
    type: 'craft'
  },
  {
    name: "cream",
    image: "",
    requirements: ["milk"],
    time: 0.5,
    final: false,
    type: 'craft'
  },
  {
    name: "cheese_popcorn",
    image: "",
    requirements: ["cheese", "popcorn"],
    time: 0.5,
    final: true,
    type: 'craft'
  },
  {
    name: "cocoa_powder",
    image: "",
    requirements: ["cocoa_beans"],
    time: 0.5,
    final: false,
    type: 'craft'
  },
  {
    name: "cocoa",
    image: "",
    requirements: ["milk", "cocoa_powder"],
    time: 2,
    final: true,
    type: 'craft'
  },
  {
    name: "butter",
    image: "",
    requirements: ["milk"],
    time: 0.5,
    final: false,
    type: 'craft'
  },
  {
    name: "biscuits",
    image: "",
    requirements: ["sugar", "egg", "bread"],
    time: 1,
    final: true,
    type: 'craft'
  },
  {
    name: "toffifee",
    image: "",
    requirements: ["caramel", "cocoa_powder"],
    time: 1,
    final: true,
    type: 'craft'
  },
  {
    name: "chips",
    image: "",
    requirements: ["potatoes"],
    time: 3,
    final: true,
    type: 'craft'
  },
  {
    name: "bacon_chips",
    image: "",
    requirements: ["chips", "bacon"],
    time: 0.5,
    final: true,
    type: 'craft'
  },
  {
    name: "popcorn",
    image: "",
    requirements: ["corn"],
    time: 3,
    final: true,
    type: 'craft'
  },
  {
    name: "butter_popcorn",
    image: "",
    requirements: ["popcorn", "butter"],
    time: 0.5,
    final: true,
    type: 'craft'
  },
  {
    name: "ketchup",
    image: "",
    requirements: ["tomato"],
    time: 0.5,
    final: false,
    type: 'craft'
  },
  {
    name: "sausage_with_ketchup",
    image: "",
    requirements: ["ketchup", "sausage"],
    time: 2,
    final: true,
    type: 'craft'
  },
  {
    name: "cream_cake",
    image: "",
    requirements: ["cream", "peach", "biscuits"],
    time: 1,
    final: true,
    type: 'craft'
  },
  {
    name: "horalka",
    image: "",
    requirements: ["peanuts", "flour", "caramel"],
    time: 0.5,
    final: true,
    type: 'craft'
  },
  {
    name: "peanut_butter",
    image: "",
    requirements: ["peanuts", "butter"],
    time: 2,
    final: true,
    type: 'craft'
  },
  {
    name: "banana_in_chocolate",
    image: "",
    requirements: ["banana", "cocoa_powder"],
    time: 1,
    final: true,
    type: 'craft'
  },
  {
    name: "pepper_chips",
    image: "",
    requirements: ["pepper", "chips"],
    time: 0.5,
    final: true,
    type: 'craft'
  },
  {
    name: "pizza",
    image: "",
    requirements: ["ketchup", "pepper", "cheese", "bacon", "bread"],
    time: 1,
    final: true,
    type: 'craft'
  },
]
