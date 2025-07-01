import type { Tool } from "../interfaces/tools.interface";
import ToolBrowseItem from "./ToolBrowseItems";
import ToolIngredientsFor from "./ToolIngredientsFor";

export const tools: Tool[] = [
  {
    id: 'items',
    name: 'Items',
    description: 'Browse items and recipes',
    long_desc: 'Browse items and find recipes to craft a certain item.',
    renderToolContent: ToolBrowseItem
  },
  {
    id: 'ingredients',
    name: 'Ingredient Calculator',
    description: 'Calculate required ingredients',
    long_desc: 'Calculate the ingredients required to craft an item.',
    renderToolContent: ToolIngredientsFor
  },
];