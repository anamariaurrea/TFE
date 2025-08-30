import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LevelHeader({
  label,
  title,
  topMargin = 0,
}: {
  label: string;
  title: string;
  topMargin?: number;
}) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.levelHeader,
        { borderColor: theme.colors.outline, marginTop: topMargin },
      ]}
    >
      <Text
        variant="labelSmall"
        style={{ color: theme.colors.onSurfaceVariant, marginTop: 2, marginBottom: 6, letterSpacing: 1 }}
      >
        {label}
      </Text>

      <View style={styles.row}>
        <Text variant="titleLarge" style={{ fontWeight: '700', color: theme.colors.onSurface }}>
          {title}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={22} color={theme.colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  levelHeader: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    display: 'flex',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
