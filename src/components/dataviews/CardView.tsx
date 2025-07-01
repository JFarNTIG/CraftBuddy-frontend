import { useMemo, useState } from 'react';
import {
  TextInput,
  Grid,
  Card,
  Center,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconDeviceGamepad2 } from '@tabler/icons-react';
import type { DisplayEntity } from '../../interfaces/entity.interface';

export interface CardViewProps<T extends DisplayEntity> {
  items: T[];
  onSelect?: (item: T) => void;
  label?: string;
  initialQuery?: string;
}

/**
 * Searchable card gallery for any DisplayEntity collection.
 */
export default function CardView<T extends DisplayEntity>({
  items,
  onSelect,
  label = 'Search…',
  initialQuery = '',
}: CardViewProps<T>) {
  /* -------------------------------------------------- states */
  const [query, setQuery] = useState(initialQuery);
  const theme = useMantineTheme();

  /* -------------------------------------------------- filter */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q === ''
      ? items
      : items.filter(({ name }) => name.toLowerCase().includes(q));
  }, [items, query]);

  /* -------------------------------------------------- misc */
  const handlePick = (item: T) => onSelect?.(item);

  /* -------------------------------------------------- render */
  return (
    <>
      <Stack gap="xs" h="100%" style={{ minHeight: 0 }}>
        <Center py="lg">
          <TextInput
            label={label}
            size="md"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </Center>

        <Grid gutter="lg" h="100%" justify={"center"}>
          {filtered.map((item) => (
            <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4, lg: 2 }} h="100%">
              <Card
                shadow="sm"
                radius="md"
                withBorder
                p="lg"
                onClick={() => handlePick(item)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = theme.shadows.md;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = theme.shadows.sm;
                }}
              >
                <Center mb="sm">
                  <IconDeviceGamepad2
                    size={48}
                    color={theme.colors[theme.primaryColor][6]}
                  />
                </Center>

                <Text ta="center" fw={600} size="lg">
                  {item.name}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
        {filtered.length === 0 && (
            <Center py="xl" w="100%">
              <Text size="lg" fw={500}>
                No matches
              </Text>
            </Center>
          )}
      </Stack>
    </>
  );
}
