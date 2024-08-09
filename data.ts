

export interface Item {
  name: string;
  image: string;
  requirements: Item[];
  time: number;
  final: boolean;
  type: 'plant' | 'craft' | 'animal';
}

export interface GameData {
  items: Item[];
  lastUpdate: number;
  planting: {
    item: Item;
    lastWatered: number;
    elapsed: number;
  }
  crafting: {
    item: Item;
    elapsed: number;
  }
}

export const allItems: Item[] = [
]
