import * as React from 'react';
import { View, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Appbar,
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Post = {
  id: string;
  icon: string;
  title: string;
  author: string;
  date: string;
  preview: string;
  likes: number;
};

const POSTS: Post[] = [
  { id: '1', icon: 'qrcode', title: 'Noticias de QRZ', author: 'VK4HAT', date: 'Aug 11 • 2018', preview: 'Hi there and welcome!', likes: 21 },
  { id: '2', icon: 'file-document-outline', title: 'Artículos de interés', author: 'VK4HAT', date: 'Aug 11 • 2018', preview: 'Hi there and welcome!', likes: 21 },
  { id: '3', icon: 'newspaper-variant-outline', title: 'Noticias de Radioafición', author: 'VK4HAT', date: 'Aug 11 • 2018', preview: 'Hi there and welcome!', likes: 21 },
  { id: '4', icon: 'podcast', title: 'Videos, Podcasts y Blogs', author: 'VK4HAT', date: 'Aug 11 • 2018', preview: 'Hi there and welcome!', likes: 21 },
  { id: '5', icon: 'alpha-d-circle-outline', title: 'DXpediciones', author: 'VK4HAT', date: 'Aug 11 • 2018', preview: 'Hi there and welcome!', likes: 21 },
  { id: '6', icon: 'radio-tower', title: 'Hamfest', author: 'VK4HAT', date: 'Aug 11 • 2018', preview: 'Hi there and welcome!', likes: 21 },
];

export default function CommunityScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Appbar */}
      <Appbar.Header mode="small">
        <Appbar.Content title="Comunidad" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Chips */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          <Chip style={{backgroundColor: 'transparent', borderColor: '#C4C6D0'}} icon="fire" onPress={() => {}}>Tendencia</Chip>
          <Chip style={{backgroundColor: 'transparent', borderColor: '#C4C6D0'}} icon="newspaper-variant" onPress={() => {}}>Noticias</Chip>
          <Chip style={{backgroundColor: 'transparent', borderColor: '#C4C6D0'}} icon="chart-bar" onPress={() => {}}>Top hoy</Chip>
        </View>

        {/* Lista de posts */}
        {POSTS.map((post, idx) => (
          <View key={post.id}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
              {/* Icono de categoría */}
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 8,
                backgroundColor: '#E6EEF8',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}>
                <MaterialCommunityIcons name={post.icon} size={28} color={theme.colors.primary} />
              </View>

              {/* Info */}
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">{post.title}</Text>
                <Text variant="bodySmall" style={{ opacity: 0.7 }}>
                  {post.author} • {post.date}
                </Text>
                <Text variant="bodySmall" style={{ opacity: 0.7 }}>
                  {post.preview}
                </Text>
              </View>

              {/* Likes */}
              <View style={{ alignItems: 'center', marginLeft: 8 }}>
                <IconButton icon="heart-outline" size={20} onPress={() => {}} />
                <Text variant="bodySmall">{post.likes}</Text>
              </View>
            </View>

            {idx < POSTS.length - 1 && <Divider />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export const AppBarContent = ({onClick}:any) => {
  const contador = 3;

  return (
    <View style={styles.container}>
      {/* Lado izquierdo: dos botones juntos con border radius en esquinas externas y gap entre ellos */}
      <View style={styles.leftContainer}>
        <TouchableOpacity style={[styles.button, styles.leftButton]} onPress={onClick}>
          <Image source={require('./assets/icon.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Cursos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={onClick}>
          <IconButton
  icon="chevron-down"
  size={15}
  onPress={() => {}}
  style={{ margin: 0 }}
/>
        </TouchableOpacity>
      </View>

      {/* Lado derecho: icono bolt.png y contador */}
      <View style={styles.rightContainer}>
        <Image source={require('./assets/bolt.png')} style={styles.boltIcon} />
        <Text style={styles.counterText}>{contador}</Text>
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
    height: 80,
    
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    paddingTop: 15,
    marginBottom: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2, // espacio entre botones
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
  counterText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  leftButton: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    borderRightWidth: 1,
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
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
