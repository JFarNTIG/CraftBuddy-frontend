import { Grid, Paper, Text, Center } from '@mantine/core';
import type { GameEntry } from '../interfaces/games.interface';
import type { GameItem } from '../interfaces/items.interface';
import type { GameRecipe } from '../interfaces/recipes.interface';
import { WithUseApi } from './dataviews/WithUseApi';
import RecipeDetail from './RecipeDetail';
import LoadingSpinner from './dataviews/LoadingSpinner';

export interface RecipesForItemProps {
  game: GameEntry;
  item: GameItem;
}

export default function RecipesForItem({ game, item }: RecipesForItemProps) {
  const {
    data: recipes,
    loading,
    error,
  } = WithUseApi<GameRecipe[]>(
    { url: `/api/games/${game.id}/items/${item.id}/recipes`, method: 'GET' },
    [game, item],
  );

  if(loading) return <LoadingSpinner />;
  if(error) return <Text p="md" c="red.6">Error: {error.message}</Text>;
  if(!recipes) return <Text p="md">Server error</Text>;

  if(recipes.length === 0) {
    return (
      <Center h="100%">
        <Text c="dimmed">No recipes found!</Text>
      </Center>
    );
  }

  return (
    <Grid gutter="md">
      {recipes.map((recipe) => (
        <Grid.Col key={recipe.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <Paper p="md" withBorder shadow="xs">
            <RecipeDetail recipe={recipe} />
          </Paper>
        </Grid.Col>
      ))}
    </Grid>
  );
}