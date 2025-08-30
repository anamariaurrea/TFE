import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';
import { RankItem } from '../../../types';


export default function RankRow({ item }: { item: RankItem }) {
  const theme = useTheme();
  const initial = item.name.trim().charAt(0).toUpperCase();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
      }}
    >
      {/* posición */}
      <Avatar.Text
        size={26}
        label={`${item.pos}`}
  style={{
    backgroundColor: theme.dark ? '#294677' : '#CEE5FF',  // 👈 azul distinto
  }}
  labelStyle={{
    color: theme.dark ? '#CEE5FF' : '#294677',             // 👈 texto invertido
  }}
      />

      {/* inicial */}
        <Avatar.Text
        size={40}
        label={initial}
        style={{
            backgroundColor: theme.dark ? '#294677' : '#CEE5FF',  // 👈 azul distinto
        }}
        labelStyle={{
            color: theme.dark ? '#CEE5FF' : '#294677',             // 👈 texto invertido
        }}
        />

      {/* nombre + nivel */}
      <View style={{ flex: 1 }}>
        <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
          {item.name}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          {item.level}
        </Text>
      </View>

      {/* puntos */}
      <Text variant="bodyMedium" style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
        {item.points}
      </Text>
    </View>
  );
}
