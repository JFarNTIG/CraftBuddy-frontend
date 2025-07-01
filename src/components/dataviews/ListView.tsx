import { useMemo, useState } from 'react';
import {
  TextInput,
  NavLink,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import type { DisplayEntity } from '../../interfaces/entity.interface';

export interface ListViewProps<T extends DisplayEntity> {
  items: T[];
  onSelect?: (item: T) => void;
  label?: string;
  initialQuery?: string;
  initialSelectedId?: T['id'];
}

export default function ListView<T extends DisplayEntity>({
  items,
  onSelect,
  label = 'Search…',
  initialQuery = '',
  initialSelectedId,
}: ListViewProps<T>) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedId, setSelectedId] = useState<T['id'] | undefined>(initialSelectedId);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q === ''
      ? items
      : items.filter(({ name }) => name.toLowerCase().includes(q));
  }, [items, query]);

  const handlePick = (item: T) => {
    setSelectedId(item.id);
    onSelect?.(item);
  };

  return (
    <Stack h="100%" gap="xs">
      <TextInput
        label={label}
        size="xs"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      
      <ScrollArea h="100%" offsetScrollbars>
        {filtered.map((item) => (
          <NavLink
            key={item.id}
            label={item.name}
            active={item.id === selectedId}
            onClick={() => handlePick(item)}
            variant={item.id === selectedId ? 'filled' : 'light'}
            mb={2}
          />
        ))}
        
        {filtered.length === 0 && (
          <Text c="dimmed" fs="italic" px="sm">
            No matches
          </Text>
        )}
      </ScrollArea>
    </Stack>
  );
}