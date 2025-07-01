import DataCardPanel from './dataviews/DataCardPanel';
import type { GameEntry } from '../interfaces/games.interface';

export interface GameCardPanelProps {
  onSelect?: (item: GameEntry) => void;
}

export default function GameCardPanel({onSelect}: GameCardPanelProps) {
  return DataCardPanel<GameEntry>({
    url: '/api/games',
    method: 'GET',
    onSelect
  });
}