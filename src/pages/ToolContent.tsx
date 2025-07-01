import type { Tool } from '../interfaces/tools.interface';
import type { GameEntry } from '../interfaces/games.interface';

interface ToolContentProps {
  game: GameEntry;
  tool: Tool;
}

export default function ToolContent({ game, tool }: ToolContentProps) {
  const ToolComponent = tool.renderToolContent;
  return <ToolComponent key={tool.id} game={game} />;
}
