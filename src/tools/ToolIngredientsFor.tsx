import { useState } from 'react';
import {
  Grid,
  Paper,
  Box,
  Text,
  Center,
  NumberInput,
  useMantineTheme,
} from '@mantine/core';
import ItemListPanel from '../components/ItemListPanel';
import IngredientsForItem from '../components/IngredientsForItem';
import type { ToolProps } from '../interfaces/tools.interface';
import type { GameItem } from '../interfaces/items.interface';

export default function ToolIngredientsFor({ game }: ToolProps) {
  const [selectedItem, setSelectedItem] = useState<GameItem | null>(null);
  const [desiredQuantity, setDesiredQuantity] = useState<number>(1);
  const theme = useMantineTheme();

  const headerBorder = `1px solid ${theme.colors.gray[3]}`;

  return (
    <Box h="calc(100vh - 60px)" p="md">
      <Grid h="100%" gutter="md" align="stretch" justify="center">
        {/* Items Panel - left */}
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <Paper shadow="sm" h={600} style={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              p="md"
              style={{
                borderBottom: headerBorder,
                background: theme.colors[theme.primaryColor][6],
                color: theme.white,
              }}
            >
              <Text fw={600}>Items</Text>
            </Box>
            
            <Box p="md" style={{ flex: 1, overflow: 'auto' }}>
              <ItemListPanel
                game={game}
                onSelect={setSelectedItem}
              />
            </Box>
          </Paper>
        </Grid.Col>

        {/* Settings Panel - center */}
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <Paper shadow="sm" h={600} style={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              p="md"
              style={{
                borderBottom: headerBorder,
                background: theme.colors[theme.primaryColor][6],
                color: theme.white,
              }}
            >
              <Text fw={600}>Settings</Text>
            </Box>
            
            <Box p="md" style={{ flex: 1, overflow: 'auto' }}>
              <Text size="sm" mb="xs">
                Number to craft:
              </Text>
              <NumberInput
                value={desiredQuantity}
                onChange={(value) => setDesiredQuantity(Number(value) || 1)}
                min={1}
                max={9999}
              />
            </Box>
          </Paper>
        </Grid.Col>

        {/* Ingredients Panel - right */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper shadow="sm" h={600} style={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              p="md"
              style={{
                borderBottom: headerBorder,
                background: selectedItem ? theme.colors.teal[6] : theme.colors.gray[1],
                color: selectedItem ? theme.white : theme.black,
              }}
            >
              <Text fw={600}>
                {selectedItem
                  ? `Ingredients To Craft ${selectedItem.name}`
                  : 'Ingredients To Craft Item'}
              </Text>
            </Box>

            <Box p="md" style={{ flex: 1, overflow: 'auto' }}>
              {selectedItem ? (
                <IngredientsForItem
                  game={game}
                  item={selectedItem}
                  quantity={desiredQuantity}
                />
              ) : (
                <Center>
                  <Box ta="center" c="dimmed">
                    <Text size="xl" fw={500} mb="xs">
                      No Item Selected
                    </Text>
                    <Text>
                      Select an item from the list to calculate required ingredients
                    </Text>
                  </Box>
                </Center>
              )}
            </Box>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}