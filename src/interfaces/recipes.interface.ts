import { type DisplayEntity } from "./entity.interface";

export interface GameRecipe extends DisplayEntity {
  category: string;
  ingredients: Record<string, number>;
  products: Record<string, number>;
  requirements: Record<string, number>;
}