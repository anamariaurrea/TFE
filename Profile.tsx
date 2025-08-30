import * as React from 'react';
import { Image, ScrollView, View, StyleSheet } from 'react-native';
import {
  Appbar,
  Button,
  Card,
  Text,
  Divider,
  useTheme,
} from 'react-native-paper';
import { ThemeContext } from './App'; // <-- importa el contexto

function StatCard({ icon, value, label }: { icon: any; value: string | number; label: string }) {
  const theme = useTheme();
  return (
    <Card
      mode="outlined"
      style={[
        styles.statCard,
        { borderColor: theme.colors.outline, backgroundColor: theme.colors.surface },
      ]}
    >
      <Card.Content style={styles.statContent}>
        <Image source={icon} style={{ width: 24, height: 24, marginBottom: 8 }} />
        <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>{value}</Text>
        <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>{label}</Text>
      </Card.Content>
    </Card>
  );
}

function CertCard({
  title,
  subtitle,
  color,
  icon,
}: {
  title: string;
  subtitle: string;
  color: string;
  icon: any;
}) {
  const theme = useTheme();
  return (
    <Card
      mode="outlined"
      style={[
        styles.certCard,
        { borderColor: theme.colors.outline, backgroundColor: theme.colors.surface },
      ]}
    >
      <View style={styles.certContainer}>
        <View style={styles.certLeft}>
          <Image source={require('./assets/circle.png')} style={{ width: 24, height: 24, marginBottom: 4 }} />
          <View>
            <Text style={[styles.certTitle, { color: theme.colors.onSurface }]}>{title}</Text>
            <Text style={[styles.certSubtitle, { color: theme.colors.onSurfaceVariant }]}>{subtitle}</Text>
          </View>
        </View>
        <View style={[styles.certThumb, { backgroundColor: color }]}>
          <Image source={icon} style={{ width: 28, height: 28 }} resizeMode="contain" />
        </View>
      </View>
    </Card>
  );
}

export default function ProfileScreen() {
  const theme = useTheme();
  const { isDark, toggle } = React.useContext(ThemeContext);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Appbar */}
      <Appbar.Header style={[styles.appbar, { backgroundColor: theme.colors.surface }]}>
        <Appbar.Content title="Perfil" titleStyle={{ fontWeight: '600', color: theme.colors.onSurface }} />
        <Appbar.Action icon="refresh" color={theme.colors.onSurfaceVariant} onPress={() => {}} />
        {/* Botón para alternar modo */}
        <Appbar.Action
          icon={isDark ? 'white-balance-sunny' : 'weather-night'}
          color={theme.colors.onSurfaceVariant}
          onPress={toggle}
        />
        <Appbar.Action icon="cog" color={theme.colors.onSurfaceVariant} onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Perfil Header */}
        <View style={styles.profileHeader}>
          <Image source={require('./assets/Image-2.png')} style={styles.avatar} />
          <Text style={[styles.profileName, { color: theme.colors.onSurface }]}>Carlos R.</Text>

          <Button
            mode="outlined"
            compact
            style={[styles.editButton, { borderColor: theme.colors.outline }]}
            labelStyle={{ fontSize: 14, color: theme.colors.onSurface }}
            icon={({ size, color }) => (
              <Image source={require('./assets/icon-2.png')} style={{ width: 14, height: 14 }} />
            )}
          >
            Editar
          </Button>
        </View>

        {/* Certificados */}
        <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Certificados</Text>
        <View style={{ gap: 12 }}>
          <CertCard title="Explorador de Ondas" subtitle="Subhead" color="#E5C7DD" icon={require('./assets/dx.png')} />
          <CertCard title="Constructor de Señales" subtitle="Subhead" color="#C3D6EB" icon={require('./assets/tower.png')} />
        </View>

        {/* Divider */}
        <Divider style={{ marginVertical: 20, backgroundColor: theme.colors.outline }} />

        {/* Logros */}
        <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Logros</Text>
        <View style={{ gap: 12 }}>
          <View style={styles.row}>
            <StatCard icon={require('./assets/bolt-2.png')} value="1" label="Racha de Sintonía" />
            <StatCard icon={require('./assets/bolt-3.png')} value="5" label="Mejor Racha" />
          </View>
          <View style={styles.row}>
            <StatCard icon={require('./assets/trophy.png')} value="Cuarzo" label="Liga" />
            <StatCard icon={require('./assets/kid_star-2.png')} value="750" label="Puntos" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: { elevation: 0 },
  profileHeader: { alignItems: 'center', marginTop: 8, marginBottom: 16 },
  avatar: { width: 84, height: 84, borderRadius: 42 },
  profileName: { marginTop: 12, fontSize: 20, fontWeight: '600' },
  editButton: { marginTop: 8, borderRadius: 6 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  certCard: { borderRadius: 8 },
  certContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch', minHeight: 64 },
  certLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingLeft: 12, flex: 1 },
  certTitle: { fontSize: 14, fontWeight: '500' },
  certSubtitle: { fontSize: 12 },
  certThumb: { width: 72, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 8, borderBottomRightRadius: 8 },
  statCard: { flex: 1, borderRadius: 16 },
  statContent: { alignItems: 'center', paddingVertical: 16 },
  statValue: { fontSize: 18, fontWeight: '600' },
  statLabel: { fontSize: 12, textAlign: 'center', marginTop: 4 },
  row: { flexDirection: 'row', gap: 12 },
});
