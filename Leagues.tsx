import * as React from 'react';
import { View, ScrollView, Image } from 'react-native';
import {
  Appbar,
  Avatar,
  Card,
  Divider,
  Text,
  useTheme,
} from 'react-native-paper';

type RankItem = {
  pos: number;
  name: string;
  level: string;
  points: string;
};

const MOCK_RANK: RankItem[] = [
  { pos: 1, name: 'Andrés M.', level: 'Aspirante Curioso',  points: '1,500px' },
  { pos: 2, name: 'Sofía G.',  level: 'Aspirante Curiosa',  points: '1,500px' },
  { pos: 3, name: 'Laura C.',  level: 'Aspirante Curiosa',  points: '1,500px' },
  { pos: 4, name: 'Carlos R.', level: 'Aspirante Curioso',  points: '1,500px' },
  { pos: 5, name: 'María F.',  level: 'Aspirante Curiosa', points: '1,500px' },
];

export default function LeaguesScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header mode="small">
        <Appbar.Content title="Ligas" />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
             <Image source={require('./assets/bolt.png')} style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
            }} />
          <Text variant="bodyMedium" style={{ marginRight: 8 }}>0</Text>
        </View>
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32, backgroundColor:'white' }}>
        {/* Card Liga Cuarzo */}
        <Card mode="elevated" style={{ borderRadius: 16, marginBottom: 16, borderWidth:0, backgroundColor:'white' }}>
          <Card.Content style={{ alignItems: 'center', paddingVertical: 20, backgroundColor:'white' }}>
            <Avatar.Image size={75} source={require('./assets/Image.png')} style={{ borderRadius: 36 }} />
            <Text variant="headlineSmall" style={{ marginTop: 12 }}>
              Liga Cuarzo
            </Text>
            <Text variant="bodyMedium" style={{ marginTop: 4, opacity: 0.8, textAlign: 'center' }}>
              Por completar el Nivel 1 de cursos.
            </Text>
          </Card.Content>
        </Card>

        {/* Lista Rank */}
        <Card mode="contained" style={{ borderRadius: 16, overflow: 'hidden', backgroundColor:'transparent' }}>
          {MOCK_RANK.map((item, idx) => {
            const initial = item.name.trim().charAt(0).toUpperCase();
            const isLast = idx === MOCK_RANK.length - 1;

            return (
              <View key={item.pos}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 12,
                    paddingVertical: 14,
                    gap: 12,
                  }}
                >
                  {/* posición */}
                  <Avatar.Text
                    size={28}
                    label={`${item.pos}`}
                    style={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.outline }}
                    labelStyle={{ color: theme.colors.onSurface }}
                  />

                  {/* inicial */}
                  <Avatar.Text
                    size={36}
                    label={initial}
                    style={{ backgroundColor: '#E6EEF8' }}
                    labelStyle={{ color: '#3B5BA9' }}
                  />

                  {/* nombre + nivel */}
                  <View style={{ flex: 1 }}>
                    <Text variant="titleMedium">{item.name}</Text>
                    <Text variant="bodySmall" style={{ opacity: 0.7 }}>{item.level}</Text>
                  </View>

                  {/* puntos derecha */}
                  <Text variant="bodyMedium" style={{ opacity: 0.9 }}>{item.points}</Text>
                </View>

                {!isLast && <Divider />}
              </View>
            );
          })}
        </Card>
      </ScrollView>
    </View>
  );
}
