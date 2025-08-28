import * as React from 'react';
import { ScrollView, View, Image } from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Text,
  useTheme,
  Divider,
} from 'react-native-paper';

type ProfileScreenProps = {
  navigation: any;
  onToggleTheme?: () => void; // opcional: si tienes toggle global
};

function StatCard({
  icon,
  value,
  label,
}: { icon: string; value: string | number; label: string }) {
  return (
    <Card mode="outlined" style={{ flex: 1, borderRadius: 16 }}>
      <Card.Content style={{ alignItems: 'center', paddingVertical: 16 }}>
        <Appbar.Action icon={icon as any} onPress={() => {}} />
        <Text variant="headlineSmall" style={{ marginTop: 4 }}>
          {value}
        </Text>
        <Text variant="bodyMedium" style={{ textAlign: 'center', marginTop: 4 }}>
          {label}
        </Text>
      </Card.Content>
    </Card>
  );
}

function CertCard({
  title,
  subtitle,
  thumbnailUri,
}: { title: string; subtitle: string; thumbnailUri?: string }) {
  return (
    <Card mode="outlined" style={{ borderRadius: 16, overflow: 'hidden' }}>
      <Card.Content style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        {/* icono/loader a la izquierda */}
        <Appbar.Action icon="progress-clock" onPress={() => {}} />
        <View style={{ flex: 1 }}>
          <Text variant="titleMedium">{title}</Text>
          <Text variant="bodySmall" style={{ opacity: 0.7 }}>{subtitle}</Text>
        </View>
        {/* mini thumb a la derecha */}
        <View style={{ width: 72, height: 48, borderRadius: 12, overflow: 'hidden' }}>
          {thumbnailUri ? (
            <Image source={{ uri: thumbnailUri }} style={{ width: '100%', height: '100%' }} />
          ) : (
            <View style={{ flex: 1, backgroundColor: '#E6E0E9' }} />
          )}
        </View>
      </Card.Content>
    </Card>
  );
}

export default function ProfileScreen({ onToggleTheme }: ProfileScreenProps) {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* AppBar */}
      <Appbar.Header mode="small">
        <Appbar.Content title="Perfil" />
        <Appbar.Action icon="weather-night" onPress={onToggleTheme} />
        <Appbar.Action icon="cog" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>

        {/* Header Perfil */}
        <View style={{ alignItems: 'center', marginTop: 8, marginBottom: 12 }}>
          <Avatar.Icon size={84} icon="account" />
          <Text variant="headlineSmall" style={{ marginTop: 12 }}>Carlos R.</Text>
          <Button mode="outlined" compact style={{ marginTop: 8 }}>
            Editar
          </Button>
        </View>

        {/* Logros */}
        <Text variant="titleMedium" style={{ marginBottom: 8 }}>Logros</Text>
        <View style={{ rowGap: 12 }}>
          <View style={{ flexDirection: 'row', columnGap: 12 }}>
            <StatCard icon="flash" value="1" label="Racha de Sintonía" />
            <StatCard icon="flash-outline" value="5" label="Mejor Racha" />
          </View>
          <View style={{ flexDirection: 'row', columnGap: 12 }}>
            <StatCard icon="trophy-variant" value="Cuarzo" label="Liga" />
            <StatCard icon="star" value="750" label="Puntos" />
          </View>
        </View>

        {/* Separador */}
        <Divider style={{ marginVertical: 16 }} />

        {/* Certificados */}
        <Text variant="titleMedium" style={{ marginBottom: 8 }}>Certificados</Text>
        <View style={{ rowGap: 12 }}>
          <CertCard title="Explorador de Ondas" subtitle="Subhead" />
          <CertCard title="Sintonizador Sólido" subtitle="Nivel Intermedio" />
          <CertCard title="Cartógrafo Sonoro" subtitle="Avanzado" />
        </View>
      </ScrollView>
    </View>
  );
}
