import { Text } from '@mantine/core';
import ListView from './ListView';
import { WithUseApi } from './WithUseApi';
import type { DisplayEntity } from '../../interfaces/entity.interface';
import LoadingSpinner from './LoadingSpinner';

export interface DataListPanelProps<T extends DisplayEntity> {
  url: string,
  method: string,
  onSelect?: (item: T) => void;
}

/**
 * @component DataListPanel
 * @brief Presents a list view of display entities obtained from an API endpoint.
 * @template T the subtype of DisplayEntity that items in the list have
 * @param props.url the API endpoint to fetch data from
 * @param props.method the HTTP method to use when fetching data
 * @param props.onSelect a function to be invoked when the user selects an item
 */
export default function DataListPanel<T extends DisplayEntity>({
  url,
  method,
  onSelect
}: DataListPanelProps<T>) {
  const {
    data : entries,
    loading,
    error
  } = WithUseApi<T[]>({url, method}, [url, method]);

  if(loading) return <LoadingSpinner />;
  if(error) return <Text p="md" c="red.6">Error: {error.message}</Text>;
  if(!entries) return <Text p="md">Server error</Text>

  return (
    <>
      <ListView items={entries} onSelect={(item) => onSelect?.(item)}></ListView>
    </>
  );
}