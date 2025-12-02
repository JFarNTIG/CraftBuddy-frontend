import { Stack, Text, List, Grid } from '@mantine/core';
import type { GameCraftingGrid } from '../interfaces/crafting_grids.interface';

export interface CraftingGridDetailProps {
  crafting_grid: GameCraftingGrid;
}

export default function CraftingGridDetail({ crafting_grid }: CraftingGridDetailProps) {
  /* ---------------- helpers to render each section ---------------- */
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
  const renderSection2 = (title: string, items: Record<string, string>) => {
    const entries = Object.entries(items);
    if (entries.length === 0) return null;

    return (
      <>
        <Text fw={600} mt="sm">
          {title}
        </Text>
        <Grid mt="sm">
          {entries.map(([coordinate, item]) => (
              <Grid.Col  bd="1px solid black" key={coordinate}  h={40} span={4}>{item}</Grid.Col>
          ))}
        </Grid>
      </>
    );
  };

  /* ------------------------------ render -------------------------- */
  return (
    <Stack gap={2}>
      {renderSection('Products', crafting_grid.products)}
      {renderSection2('Crafting coordinates', crafting_grid.crafting_coordinates)}
    </Stack>
  );
}
