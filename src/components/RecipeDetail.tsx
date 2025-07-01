import { Stack, Text, Divider, List } from '@mantine/core';
import type { GameRecipe } from '../interfaces/recipes.interface';

export interface RecipeDetailProps {
  recipe: GameRecipe;
}

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  /* ---------------- helper to render each section ---------------- */
  const renderSection = (title: string, items: Record<string, number>) => {
    const entries = Object.entries(items);
    if (entries.length === 0) return null;

    return (
      <>
        <Text fw={600} mt="sm">
          {title}
        </Text>

        <List size="sm" withPadding>
          {entries.map(([name, qty]) => (
            <List.Item key={name}>
              {qty}x {name}
            </List.Item>
          ))}
        </List>
      </>
    );
  };

  /* ------------------------------ render -------------------------- */
  return (
    <Stack gap={4}>
      <Text size="lg" c="dimmed">
        {recipe.category}
      </Text>

      <Divider />

      {renderSection('Ingredients', recipe.ingredients)}
      {renderSection('Products', recipe.products)}
      {renderSection('Requirements', recipe.requirements)}
    </Stack>
  );
}
