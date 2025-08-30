import * as React from 'react';
import { View, ScrollView, Image, FlatList } from 'react-native';
import { Appbar, Card, Text, useTheme, Divider } from 'react-native-paper';

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
  const theme = useTheme();
  const stars = [0, 1, 2];
  return (
    <View style={{ flexDirection: 'row' }}>
      {stars.map(i => (
        <Image
          key={i}
          source={require('./assets/kid_star.png')}
          style={{
            width: 20, height: 20, marginRight: 4,
            // en dark, baja un poco sin volverlas invisibles
            opacity: i < value ? 1 : (theme.dark ? 0.45 : 0.3),
          }}
        />
      ))}
    </View>
  );
}

function RecentCard({ item }: { item: Item }) {
  const theme = useTheme();
  return (
    <Card
      mode="outlined"
      style={{
        width: 380, borderRadius: 16, overflow: 'hidden', marginRight: 12,
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.outline,
      }}
    >
      {item.image ? (
        <View style={{ paddingHorizontal: 9, paddingTop: 9, marginBottom: 6 }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: '100%', height: 140, borderRadius: 16 }}
            resizeMode="cover"
          />
        </View>
      ) : (
        <View
          style={{
            height: 140, margin: 9, borderRadius: 16,
            backgroundColor: theme.colors.surfaceVariant,
          }}
        />
      )}

      <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
        <Text variant="titleMedium" style={{ marginBottom: 6, color: theme.colors.onSurface }}>
          {item.title}
        </Text>
        <Stars value={item.rating} />
      </View>
    </Card>
  );
}

function FeaturedCard({ item }: { item: Item }) {
  const theme = useTheme();
  return (
    <Card
      mode="outlined"
      style={{
        width: '48%', borderRadius: 16, overflow: 'hidden',
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.outline,
      }}
    >
      {item.image ? (
        <View style={{ paddingHorizontal: 9, paddingTop: 9, marginBottom: 6 }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: '100%', height: 96, borderRadius: 16 }}
            resizeMode="cover"
          />
        </View>
      ) : (
        <View
          style={{
            height: 96, margin: 9, borderRadius: 16,
            backgroundColor: theme.colors.surfaceVariant,
          }}
        />
      )}

      <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
        <Text variant="bodyMedium" style={{ marginBottom: 6, color: theme.colors.onSurface }}>
          {item.title}
        </Text>
        <Stars value={item.rating} />
      </View>
    </Card>
  );
}

export default function DictionaryScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header mode="small" style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content title="Diccionario" color={theme.colors.onSurface} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
          <Image source={require('./assets/bolt.png')} style={{ width: 22, height: 22, resizeMode: 'contain', marginRight: 4 }} />
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>0</Text>
        </View>
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        style={{ backgroundColor: theme.colors.background }}
      >
        <Text variant="titleMedium" style={{ marginBottom: 8, color: theme.colors.onSurface }}>
          Recientes
        </Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={RECENTS}
          keyExtractor={i => i.id}
          renderItem={({ item }) => <RecentCard item={item} />}
          // evita que el FlatList pinte blanco por default
          style={{ backgroundColor: 'transparent' }}
          contentContainerStyle={{ paddingBottom: 4 }}
        />

        <Divider style={{ marginVertical: 16, backgroundColor: theme.colors.outline }} />

        <Text variant="titleMedium" style={{ marginBottom: 8, color: theme.colors.onSurface }}>
          Destacados
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {FEATURED.map(it => (
            <FeaturedCard key={it.id} item={it} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
