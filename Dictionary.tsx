import * as React from 'react';
import { View, ScrollView, Image, FlatList } from 'react-native';
import { Appbar, Card, Text, useTheme, Divider, IconButton } from 'react-native-paper';

type Item = { id: string; title: string; image?: string; rating?: number };

const RECENTS: Item[] = [
  { id: 'r1', title: 'Unidades de Medida y Parámetros Técnicos', image: 'https://picsum.photos/600/300', rating: 2 },
];

const FEATURED: Item[] = [
  { id: 'f1', title: 'Fundamentos de la Radio', image: 'https://picsum.photos/200/200?1', rating: 1 },
  { id: 'f2', title: 'Componentes de una estación', image: 'https://picsum.photos/200/200?2', rating: 2 },
  { id: 'f3', title: 'Jerga de los radioaficionados', image: 'https://picsum.photos/200/200?3', rating: 1 },
  { id: 'f4', title: 'Conceptos Legales y de Licenciamiento', image: 'https://picsum.photos/200/200?4', rating: 2 },
];

function Stars({ value = 0 }: { value?: number }) {
  const stars = [0, 1, 2];
  return (
    <View style={{ flexDirection: 'row', gap: 4 }}>
      {stars.map(i => (
        <Image
          key={i}
          source={require('./assets/kid_star.png')}
          style={{ width: 20, height: 18, marginRight: 4, opacity: i < value ? 1 : 0.3 }}
        />
      ))}
    </View>
  );
}

export default function DictionaryScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Appbar */}
      <Appbar.Header mode="small">
        <Appbar.Content title="Diccionario" />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
          <Image source={require('./assets/bolt.png')} style={{
            width: 24,
            height: 24,
            resizeMode: 'contain',
          }} />
          <Text variant="bodyMedium" style={{ marginRight: 8 }}>0</Text>
        </View>
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <Text variant="titleMedium" style={{ marginBottom: 8 }}>Recientes</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={RECENTS}
          keyExtractor={i => i.id}
          contentContainerStyle={{ paddingRight: 0 }}
          ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
          renderItem={({ item }) => (
            <Card style={{ width: 380, borderRadius: 16, overflow: 'hidden', padding: 9 }}>
              {item.image ? (
                <View style={{ overflow: 'hidden', marginBottom: 9 }}>
                  <Image source={{ uri: item.image }} style={{ width: '95%', height: 140, borderRadius: 16, }} />
                </View>
              ) : (
                <View style={{ height: 140, backgroundColor: '#E6EEF8', borderTopLeftRadius: 16, borderTopRightRadius: 16, marginBottom: 9 }} />
              )}
              <Card.Content style={{ gap: 6 }}>
                <Text variant="titleMedium">{item.title}</Text>
                <Stars value={item.rating} />
              </Card.Content>
            </Card>
          )}
        />

        <Divider style={{ marginVertical: 16 }} />

        {/* Destacados */}
        <Text variant="titleMedium" style={{ marginBottom: 8 }}>Destacados</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
          {FEATURED.map(it => (
            <Card key={it.id} mode="contained" style={{ width: '48%', borderRadius: 16, overflow: 'hidden', padding: 9, backgroundColor: '#F9F9FF' }}>
              {it.image ? (
                <View style={{ overflow: 'hidden', marginBottom: 9 }}>
                  <Image source={{ uri: it.image }} style={{ width: '90%', height: 96, borderRadius: 16, }} />
                </View>
              ) : (
                <View style={{ height: 96, backgroundColor: '#E6EEF8', borderTopLeftRadius: 16, borderTopRightRadius: 16, marginBottom: 9 }} />
              )}
              <Card.Content style={{ gap: 6, backgroundColor: '#F9F9FF' }}>
                <Text variant="bodyMedium">{it.title}</Text>
                <Stars value={it.rating} />
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
