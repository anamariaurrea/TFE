import * as React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Course } from '../../../types';


export default function CourseRow({ item }: { item: Course }) {
  const theme = useTheme();
  return (
    <Surface
      elevation={0}
      style={[
        styles.row,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline },
      ]}
    >
      <View style={styles.rowLeft}>
        <View
          style={[
            styles.checkWrap,
            { backgroundColor: theme.colors.secondaryContainer ?? theme.colors.surfaceVariant },
          ]}
        >
          <MaterialCommunityIcons
            name="check"
            size={22}
            color={theme.colors.onSecondaryContainer ?? theme.colors.primary}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text variant="titleMedium" style={{ color: theme.colors.onSurface }} numberOfLines={2}>
            {item.title}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            {item.meta}
          </Text>
        </View>
      </View>

      {/* Thumb derecha */}
      <Image
        source={{ uri: item.img }}
        style={styles.thumb}
        resizeMode="cover"
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  row: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  checkWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumb: {
    aspectRatio: 1,
    marginLeft: 10,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    alignSelf: 'stretch',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 70,
    height: 70,
  },
});
