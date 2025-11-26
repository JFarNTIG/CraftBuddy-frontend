import { type DisplayEntity } from "./entity.interface";

export interface GameCraftingGrid extends DisplayEntity {
  products: Record<string, number>;
  crafting_coordinates: Record<string, string>;
}