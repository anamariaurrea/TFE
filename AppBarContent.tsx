import * as React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const AppBarContent = ({ onClick }: { onClick?: () => void }) => {
  const theme = useTheme();
  const contador = 3;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.outline,
        },
      ]}
    >
      {/* Izquierda: pill con 2 botones */}
      <View style={styles.leftContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.leftButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.outline,
            },
          ]}
          onPress={onClick}
        >
          <Image
            source={require('./assets/icon.png')}
            style={[styles.icon /* , { tintColor: theme.colors.onSurface } */]}
          />
          <Text style={{ color: theme.colors.onSurface, fontSize: 16, fontWeight: '600' }}>
            Cursos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.rightButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.outline,
            },
          ]}
          onPress={onClick}
        >
          <IconButton
            icon="chevron-down"
            size={18}
            onPress={onClick}
            style={{ margin: 0 }}
            iconColor={theme.colors.onSurface}            // ← color icono
          />
        </TouchableOpacity>
      </View>

      {/* Derecha: bolt + contador */}
      <View style={styles.rightContainer}>
        <Image
          source={require('./assets/bolt.png')}
          style={[
            styles.boltIcon,
            // { tintColor: theme.colors.primary } // activa si tu PNG admite tinte
          ]}
        />
        <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: 'bold', color: theme.colors.onSurface }}>
          {contador}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 15,
    height: 80,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boltIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  leftButton: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  rightButton: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    maxHeight: 40,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 6,
  },
});
