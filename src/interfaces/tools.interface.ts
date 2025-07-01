import type { ReactNode } from "react";
import type { DisplayEntity } from "./entity.interface";
import type { GameEntry } from "./games.interface";

export interface ToolProps {
  game: GameEntry
}

export interface Tool extends DisplayEntity {
  description: string;
  long_desc: string;
  renderToolContent: (props: ToolProps) => ReactNode;
}