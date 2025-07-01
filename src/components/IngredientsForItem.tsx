import { Paper, Text } from '@mantine/core';
import type { GameEntry } from '../interfaces/games.interface';
import type { GameItem } from '../interfaces/items.interface';
import type { IngredientList } from '../interfaces/ingredients.interface';
import { WithUseApi } from './dataviews/WithUseApi';
import LoadingSpinner from './dataviews/LoadingSpinner';

export interface IngredientsForItemProps {
  game: GameEntry;
  item: GameItem;
  quantity: number | undefined;
}

export default function IngredientsForItem({
  game,
  item,
  quantity,
}: IngredientsForItemProps) {
  const {
    data: ingredientList,
    loading,
    error,
  } = WithUseApi<IngredientList>(
    {
      url: `/api/games/${game.id}/items/${item.id}/ingredients?quantity=${quantity}`,
      method: 'GET',
    },
    [game, item, quantity],
  );

  /* ------------------------------------------------- states */
  if(loading) return <LoadingSpinner />;
  if(error) return <Text c="red.6">Error: {error.message}</Text>;
  if(!ingredientList) return <Text>Server error</Text>;

  /* ------------------------------------------------- render */
  return (
    <Paper
      p="sm"
      withBorder
      shadow="xs"
    >
      {Object.entries(ingredientList.ingredients).map(
        ([ingredient, amount]) => (
          <Text key={ingredient}>
            {amount}x {ingredient}
          </Text>
        ),
      )}
    </Paper>
  );
}
