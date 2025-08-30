import * as React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import {
  Appbar,
  TextInput,
  Button,
  Text,
  HelperText,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

type Props = { navigation: any };

export default function RegisterEmailScreen({ navigation }: Props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [secure, setSecure] = React.useState(true);
  const navigate = useNavigation(); // 👈 obtén la instancia

  const emailError = email.length > 0 && !/^\S+@\S+\.\S+$/.test(email);
  const canSubmit = name.trim() && email && !emailError && password.length >= 6;

  const onSubmit = () => {
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Registrarse con Email" />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          <TextInput
            mode="outlined"
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
            style={styles.input}
            left={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons name="account-outline" size={20} />
                )}
              />
            }
          />

          <TextInput
            mode="outlined"
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            left={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons name="email-outline" size={20} />
                )}
              />
            }
          />
          {emailError ? (
            <HelperText type="error" visible={emailError}>
              Email no válido
            </HelperText>
          ) : null}

          <TextInput
            mode="outlined"
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            style={styles.input}
            left={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons name="lock-outline" size={20} />
                )}
              />
            }
            right={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons
                    name={secure ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                  />
                )}
                onPress={() => setSecure((s) => !s)}
              />
            }
          />

          <Button
            mode="contained"
            onPress={() => navigation.navigate('Onboarding')}
            disabled={!canSubmit}
            style={styles.cta}
            contentStyle={{ height: 48 }}
          >
            Crear cuenta
          </Button>

          <Text style={styles.terms}>
            Al crear una cuenta, aceptas los{' '}
            <Text
              
              style={styles.link}
              onPress={() => Linking.openURL('https://tu-dominio/terminos')}
            >
              Términos de Servicio
            </Text>{' '}
            y la{' '}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://tu-dominio/privacidad')}
            >
              Política de Privacidad
            </Text>
            .
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 12 },
  input: { marginBottom: 8 },
  cta: {
    marginTop: 8,
    borderRadius: 28,
    backgroundColor: '#5672A3',
  },
  terms: {
    marginTop: 8,
    textAlign: 'center',
    color: '#5E6A79',
  },
  link: {
    fontWeight: '700',
    textDecorationLine: 'none',
    color: '#5672A3',
  },
});
