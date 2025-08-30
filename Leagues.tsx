import * as React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';

import LeagueCard from './src/components/Leagues/LeagueCard';
import RankList from './src/components/Leagues/RankList';
import { RankItem } from './types';


const MOCK_RANK: RankItem[] = [
  { pos: 1, name: 'Andrés M.', level: 'Aspirante Curioso', points: '1,500px' },
  { pos: 2, name: 'Sofía G.', level: 'Aspirante Curiosa', points: '1,500px' },
  { pos: 3, name: 'Laura C.', level: 'Aspirante Curiosa', points: '1,500px' },
  { pos: 4, name: 'Carlos R.', level: 'Aspirante Curioso', points: '1,500px' },
  { pos: 5, name: 'María F.', level: 'Aspirante Curiosa', points: '1,500px' },
];

export default function LeaguesScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header mode="small" style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content title="Ligas" color={theme.colors.onSurface} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
          <Image
            source={require('./assets/bolt.png')}
            style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 4 }}
          />
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>0</Text>
        </View>
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 32, backgroundColor: theme.colors.background }}>
        <LeagueCard />
        <RankList data={MOCK_RANK} />
      </ScrollView>
    </View>
  );
}
