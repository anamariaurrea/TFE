import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card, Text, useTheme } from 'react-native-paper';

export default function LeagueCard() {
  const theme = useTheme();
  return (
    <Card mode="contained" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content style={{ alignItems: 'center', paddingVertical: 20 }}>
        <Avatar.Image
          size={80}
          source={require('../../../assets/cuarzoleague.png')}
          style={{ backgroundColor: theme.colors.surfaceVariant }}
        />
        <Text variant="titleLarge" style={{ marginTop: 12, color: theme.colors.onSurface }}>
          Liga Cuarzo
        </Text>
        <Text
          variant="bodyMedium"
          style={{ marginTop: 4, color: theme.colors.onSurfaceVariant, textAlign: 'center' }}
        >
          Por completar el Nivel 1 de cursos.
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    margin: 16,
    elevation: 0,
  },
});
