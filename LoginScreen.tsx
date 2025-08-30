import * as React from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme, Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // 👈 importa el hook

export default function LoginScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation(); // 👈 obtén la instancia

  const onGoogle = () => {};
  const onApple = () => {};
  const onFacebook = () => {};
  const onSignIn = () => {};

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: '#F6F8FC' }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.kav}
      >
        <View style={styles.header}>
          <Image source={require('./assets/Logo.png')} style={styles.logo} resizeMode="contain" />
          <Text variant="titleMedium" style={styles.subtitle}>
            Tu primer contacto con la{'\n'}radioafición
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={onGoogle}
            style={[styles.ctaContained, styles.ctaSolid]}
            contentStyle={styles.ctaContent}
            icon={(props) => <MaterialCommunityIcons name="google" {...props} size={20} />}
          >
            Continuar con Google
          </Button>

          <Button
            mode="outlined"
            onPress={onApple}
            style={styles.cta}
            contentStyle={styles.ctaContent}
            textColor='#44474E'
            icon={(props) => <MaterialCommunityIcons name="apple" {...props} size={20} />}
          >
            Continuar con Apple
          </Button>

          <Button
            mode="outlined"
            onPress={onFacebook}
            style={styles.ctaOutlined}
            contentStyle={styles.ctaContent}
            textColor='#44474E'
            icon={(props) => <MaterialCommunityIcons name="facebook" {...props} size={20} />}
          >
            Continuar con Facebook
          </Button>

          <Button
            onPress={() => navigation.navigate('RegisterEmail' as never)}
            style={styles.ctaSecondary}
            textColor='#0E4A73'
            contentStyle={styles.ctaContent}          >
            Registrarse con Email
          </Button>

          <Divider style={{ marginVertical: 8, opacity: 0 }} />

          <Button textColor='#425E91' mode="text" onPress={onSignIn}>
            Iniciar sesión
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  kav: { flex: 1, paddingHorizontal: 24, justifyContent: 'space-between' },
  header: { alignItems: 'center', marginTop: 24 },
  logo: { marginTop: 60, width: 420, height: 120 },
  brand: { marginTop: 8, fontWeight: '800' },
  subtitle: { textAlign: 'center', marginTop: 8, color: '#5672A3' },
  actions: { marginBottom: 32 },
  ctaContained: { borderRadius: 28, marginVertical: 8, backgroundColor: '#425E91' },
  ctaOutlined: { borderRadius: 28, marginVertical: 8, color: '#44474E' },
  ctaSecondary: { borderRadius: 28, marginVertical: 8, backgroundColor: '#CEE5FF', color: 'red' },
  cta: { borderRadius: 28, marginVertical: 8 },
  ctaSolid: {},
  ctaContent: { height: 48 },
});
