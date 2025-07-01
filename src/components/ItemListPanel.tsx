import DataListPanel from './dataviews/DataListPanel';
import type { GameItem } from '../interfaces/items.interface';
import type { GameEntry } from '../interfaces/games.interface';

export interface ItemListPanelProps {
  game: GameEntry,
  onSelect?: (item: GameItem) => void;
}

export default function ItemListPanel({game, onSelect}: ItemListPanelProps) {
  return DataListPanel<GameItem>({
    url: `/api/games/${game.id}/items`,
    method: 'GET',
    onSelect
  });
}