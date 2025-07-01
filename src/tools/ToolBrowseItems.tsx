import { useState } from 'react';
import {
  Grid,
  GridCol,
  Paper,
  Box,
  Text,
  Center,
  useMantineTheme,
} from '@mantine/core';
import ItemListPanel from '../components/ItemListPanel';
import RecipesForItem from '../components/RecipesForItem';
import type { ToolProps } from '../interfaces/tools.interface';
import type { GameItem } from '../interfaces/items.interface';

export default function ToolBrowseItem({ game }: ToolProps) {
  const [selectedItem, setSelectedItem] = useState<GameItem | null>(null);
  const theme = useMantineTheme();

  const headerBorder = `1px solid ${theme.colors.gray[3]}`;

  return (
    <Box h="calc(100vh - 60px)" p="md">
      <Grid h="100%" gutter="md" align="stretch" justify="center">
        {/* Items Panel - left */}
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <Paper shadow="sm" h={600} style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
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
            
            {/* Content */}
            <Box p="md" style={{ flex: 1, overflow: 'auto' }}>
              <ItemListPanel
                game={game}
                onSelect={setSelectedItem}
              />
            </Box>
          </Paper>
        </GridCol>

        {/* Recipes Panel - right */}
        <GridCol span={{ base: 12, md: 8, lg: 9 }}>
          <Paper shadow="sm" h={600} style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
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
                  ? `Recipes for ${selectedItem.name}`
                  : 'Recipe Details'}
              </Text>
            </Box>

            {/* Content */}
            <Box p="md" style={{ flex: 1, overflow: 'auto' }}>
              {selectedItem ? (
                <RecipesForItem game={game} item={selectedItem} />
              ) : (
                <Center h="100%">
                  <Box ta="center" c="dimmed">
                    <Text size="xl" fw={500} mb="xs">
                      No Item Selected
                    </Text>
                    <Text>
                      Select an item from the list to view its recipes and details
                    </Text>
                  </Box>
                </Center>
              )}
            </Box>
          </Paper>
        </GridCol>
      </Grid>
    </Box>
  );
}