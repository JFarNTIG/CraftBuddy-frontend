import { useState } from 'react';
import {
  AppShell,
  Burger,
  Group,
  Center,
  ScrollArea,
  Text,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowLeft } from '@tabler/icons-react';
import GameCardPanel from '../components/GameCardPanel';
import type { GameEntry } from '../interfaces/games.interface';
import type { Tool } from '../interfaces/tools.interface';
import ToolsList from '../components/ToolsList';
import ToolContent from './ToolContent';

export default function GameToolsApp() {
  /* State */
  const [selectedGame, setSelectedGame] = useState<GameEntry | undefined>();
  const [selectedTool, setSelectedTool] = useState<Tool | undefined>();
  
  /* Mobile navbar toggle */
  const [opened, { toggle: toggleNavbar, close: closeNavbar }] = useDisclosure(false);

  /* Callbacks */
  const handleGameSelect = (game: GameEntry) => {
    setSelectedGame(game);
    setSelectedTool(undefined);
  };

  const handleToolSelect = (tool: Tool) => {
    setSelectedTool(tool);
    closeNavbar(); // Auto-close on mobile after choosing a tool
  };

  const handleBackToGames = () => {
    setSelectedGame(undefined);
    setSelectedTool(undefined);
  };

  /* Header content */
  const HeaderControls = () => {
    if (!selectedGame) return null;
    
    return (
      <>
        {/* Mobile: toggle navbar with Burger */}
        <Burger
          opened={opened}
          onClick={toggleNavbar}
          hiddenFrom="md"
          size="sm"
        />
        
        {/* Desktop: back arrow instead of Burger */}
        <ActionIcon
          variant="subtle"
          onClick={handleBackToGames}
          visibleFrom="md"
        >
          <IconArrowLeft stroke={1.6} />
        </ActionIcon>
      </>
    );
  };

  /* Navbar content */
  const NavbarContent = () => {
    if (!selectedGame) return null;
    
    return (
      <>
        <Text fw={600} mb="md">
          {selectedGame.name} Tools
        </Text>
        <ScrollArea flex={1} h="calc(100vh - 120px)">
          <ToolsList
            selectedTool={selectedTool}
            setSelectedTool={handleToolSelect}
          />
        </ScrollArea>
      </>
    );
  };

  /* Main content */
  const MainContent = () => {
    if (!selectedGame) {
      return (
        <>
          <Text size="xl" fw={700} ta="center" mb="xl">
            Choose Game
          </Text>
          <GameCardPanel onSelect={handleGameSelect} />
        </>
      );
    }

    if (!selectedTool) {
      return (
        <Center flex={1}>
          <Text c="dimmed">Select a tool to get started!</Text>
        </Center>
      );
    }

    return <ToolContent game={selectedGame} tool={selectedTool} />;
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'md',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <HeaderControls />
          <Text fw={600}>CraftBuddy</Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" style={{ display: 'flex', flexDirection: 'column' }}>
        <NavbarContent />
      </AppShell.Navbar>

      <AppShell.Main 
        h="calc(100vh - 60px)" 
      >
        <MainContent />
      </AppShell.Main>
    </AppShell>
  );
}