import { Grid, Paper, Text, Center } from '@mantine/core';
import type { GameEntry } from '../interfaces/games.interface';
import type { GameItem } from '../interfaces/items.interface';
import type { GameCraftingGrid } from '../interfaces/crafting_grids.interface';
import { WithUseApi } from './dataviews/WithUseApi';
import CraftingGridDetail from './CraftingGridDetail';
import LoadingSpinner from './dataviews/LoadingSpinner';

export interface CraftingGridsForItemProps {
  game: GameEntry;
  item: GameItem;
}

export default function CraftingGridsForItem({ game, item }: CraftingGridsForItemProps) {
  const {
    data: crafting_grids,
    loading,
    error,
  } = WithUseApi<GameCraftingGrid[]>(
    { url: `/api/games/${game.id}/items/${item.id}/craftingGrid`, method: 'GET' },
    [game, item],
  );

  if(loading) return <LoadingSpinner />;
  if(error) return <Text p="md" c="red.6">Error: {error.message}</Text>;
  if(!crafting_grids) return <Text p="md">Server error</Text>;

  if(crafting_grids.length === 0) {
    return (
      <Center h="100%">
        <Text c="dimmed">No crafting grids found!</Text>
      </Center>
    );
  }

  return (
    <Grid gutter="md">
      {crafting_grids.map((crafting_grid) => (
        <Grid.Col key={crafting_grid.id} span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
          <Paper p="md" withBorder shadow="xs">
            <CraftingGridDetail crafting_grid={crafting_grid}/>
          </Paper>
        </Grid.Col>
      ))}
    </Grid>
  );
}