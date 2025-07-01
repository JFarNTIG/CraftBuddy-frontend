import { Stack, NavLink } from '@mantine/core';
import type { Tool } from '../interfaces/tools.interface';
import { tools } from '../tools/Tools';

export interface ToolsListProps {
  selectedTool?: Tool;
  setSelectedTool?: (tool: Tool) => void;
}

export default function ToolsList({
  selectedTool,
  setSelectedTool,
}: ToolsListProps) {
  return (
    <Stack gap="xs">
      {tools.map((tool) => (
        <NavLink
          key={tool.id}
          label={tool.name}
          description={tool.description}
          active={selectedTool?.id === tool.id}
          onClick={() => setSelectedTool?.(tool)}
          color="blue"
          variant={selectedTool?.id === tool.id ? 'filled' : 'light'}
        />
      ))}
    </Stack>
  );
}
