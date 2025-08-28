import * as React from 'react';
import { View, ScrollView, Image } from 'react-native';
import {
  Appbar,
  Button,
  Card,
  Checkbox,
  Chip,
  Menu,
  ProgressBar,
  Text,
  useTheme,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import WavyProgressBar from './WavyProgressBar';

type Props = { navigation?: any; username?: string };

const AGE_OPTIONS = [
  'Menos de 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65+',
];
const EXPERIENCE_OPTIONS = ['Principiante', 'Intermedio', 'Avanzado'];

const GOALS = [
  'Quiero mejorar mis habilidades y aprender algo nuevo',
  'Me interesa compartir mi conocimiento y ayudar a otros',
  'Solo estoy explorando y viendo de qué se trata la radioafición.',
];

const TOPICS = [
  'DXing', 'Comunicación en emergencias', 'Contesting', 'Construir mi antena',
  'Electrónica básica', 'Modos digitales', 'Programar radios', 'Aprender de ondas',
  'Conocer y conectar con radioaficionados', 'Unirme a eventos', 'Examen de licencia',
  'Códigos y procedimientos operativos',
];

const COURSES = [
  {
    id: 'c1',
    title: 'Primeros pasos en la radio',
    meta: 'Beginner • 3 horas',
    desc: 'Diseñado para el principiante absoluto.',
    img: 'https://picsum.photos/seed/ham1/640/360',
  },
  {
    id: 'c2',
    title: 'Despegando en HF',
    meta: 'Beginner • 2 horas',
    desc: 'Introducción a bandas y equipos.',
    img: 'https://picsum.photos/seed/ham2/640/360',
  },
];

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value?: string | null;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Menu
      visible={open}
      onDismiss={() => setOpen(false)}
      anchor={
        <Button
          mode="outlined"
          onPress={() => setOpen(true)}

          contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
          style={{ borderRadius: 12 }}
          icon={({ size, color }) => (
            <View style={{ marginLeft: 1 }}>
              <Text style={{ fontSize: size, color }}>{'⌄'}</Text>
            </View>
          )}
        >
          {value || label}
        </Button>
      }
    >
      {options.map((opt) => (
        <Menu.Item
          key={opt}
          onPress={() => {
            onChange(opt);
            setOpen(false);
          }}
          title={opt}
        />
      ))}
    </Menu>
  );
}

export default function OnboardingWizard({ username = 'Carlos' }: Props) {
  const theme = useTheme();
  const [step, setStep] = React.useState(0);
  const navigates = useNavigation(); // 👈 obtén la instancia

  // Step 1
  const [age, setAge] = React.useState<string | null>(null);
  const [experience, setExperience] = React.useState<string | null>(null);

  // Step 2
  const [goals, setGoals] = React.useState<Record<string, boolean>>(
    Object.fromEntries(GOALS.map((g) => [g, false]))
  );

  // Step 3
  const [topics, setTopics] = React.useState<string[]>([]);

  // Step 4
  const [selectedCourse, setSelectedCourse] = React.useState<string | null>(null);

  const progress = (step + 1) / 4;

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

    const finish = () => {
    navigates.reset({
      index: 0,
      routes: [{ name: 'MainTabs' as never, params: { screen: 'Community' } as never }],
    });
  };

  const canContinue =
    step === 0 ? !!age && !!experience
    : step === 1 ? true
    : step === 2 ? topics.length >= 3
    : step === 3 ? !!selectedCourse || true
    : true;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header mode="small">
        {step > 0 ? <Appbar.BackAction onPress={prev} /> : null}
        <Appbar.Content title={['Bienvenida', 'Objetivo', 'Intereses', 'Curso'][step]} />
      </Appbar.Header>

      <View style={{ paddingHorizontal: 16, marginTop: 8, marginBottom: 4 }}>
        <WavyProgressBar
          progress={(step + 1) / 4}
        />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 24 }}>
        {/* STEP 1 ------------------------------------------------------------- */}
        {step === 0 && (
          <View>
            <Text variant="headlineMedium" style={{ textAlign: 'center', marginTop: 12, fontWeight: 'bold', color: '#425E91' }}>
              Te damos la bienvenida, {'\n'}
              {username}
            </Text>
            <Text
              variant="bodyMedium"
              style={{ textAlign: 'center', opacity: 0.7, marginTop: 8, marginBottom: 16 }}
            >
              Para empezar, compártenos algunos detalles sobre ti.
            </Text>

            <View style={{ gap: 12 }}>
              <SelectField
                label="¿Cuál es tu edad?"
                value={age}
                options={AGE_OPTIONS}
                onChange={setAge}
              />
              <SelectField
                
                label="¿Cuál es tu nivel de experiencia?"
                value={experience}
                options={EXPERIENCE_OPTIONS}
                onChange={setExperience}
              />
            </View>
          </View>
        )}

        {step === 1 && (
          <View>
            <Text variant="headlineMedium" style={{ textAlign: 'center', marginTop: 12, fontWeight: 'bold', color: '#425E91' }}>
              ¿Qué buscas en Hamly?
            </Text>
            <Text
              variant="bodyMedium"
              style={{ textAlign: 'center', opacity: 0.7, marginTop: 8, marginBottom: 12 }}
            >
              Esto nos ayudará a crear una mejor experiencia para ti.
            </Text>

            <Card mode="contained" style={{ borderRadius: 0, overflow: 'hidden', backgroundColor: '#F0F4FF' }}>
              {GOALS.map((g, i) => (
                <View key={g}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 12,
                      paddingVertical: 14,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ flex: 1, marginRight: 12 }}>{g}</Text>
                    <Checkbox
                      status={goals[g] ? 'checked' : 'unchecked'}
                      onPress={() => setGoals((prev) => ({ ...prev, [g]: !prev[g] }))}
                    />
                  </View>
                  {i < GOALS.length - 1 && <View style={{ height: 10, backgroundColor: 'white' }} />}
                </View>
              ))}
            </Card>
          </View>
        )}

        {/* STEP 3 ------------------------------------------------------------- */}
        {step === 2 && (
          <View>
            <Text variant="headlineMedium" style={{ textAlign: 'center', marginTop: 12, fontWeight: 'bold', color: '#425E91' }}>
              ¿Qué te interesa más?
            </Text>
            <Text
              variant="bodyMedium"
              style={{ textAlign: 'center', opacity: 0.7, marginTop: 8, marginBottom: 12 }}
            >
              Debes seleccionar al menos 3 temas.
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {TOPICS.map((t) => {
                const selected = topics.includes(t);
                return (
                  <Chip
                    selectedColor={selected ? '#0E4A73' : '#44474E'}
                    style={{ backgroundColor: selected ? '#E6EEF8' : 'white' }}
                    key={t}
                    mode={selected ? 'flat' : 'outlined'}
                    selected={selected}
                    onPress={() =>
                      setTopics((prev) =>
                        prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
                      )
                    }
                  >
                    {t}
                  </Chip>
                );
              })}
            </View>
          </View>
        )}

        {/* STEP 4 ------------------------------------------------------------- */}
        {step === 3 && (
          <View>
            <Text variant="headlineMedium" style={{ textAlign: 'center', marginTop: 12, fontWeight: 'bold', color: '#425E91' }}>
              Selecciona un curso para comenzar
            </Text>
            <Text
              variant="bodyMedium"
              style={{ textAlign: 'center', opacity: 0.7, marginTop: 8, marginBottom: 12 }}
            >
              Puedes cambiar esta opción más adelante.
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                {COURSES.map((c) => {
                  const active = selectedCourse === c.id;
                  return (
                    <Card key={c.id} mode="outlined" style={{ width: 280, borderRadius: 16, backgroundColor: '#F0F4FF' }}>
                      <Image
                        source={{ uri: c.img }}
                        style={{ width: '100%', height: 140, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                      />
                      <Card.Content style={{ gap: 6, paddingVertical: 12 }}>
                        <Text variant="titleMedium">{c.title}</Text>
                        <Text variant="bodySmall" style={{ opacity: 0.7 }}>{c.meta}</Text>
                        <Text variant="bodySmall" style={{ opacity: 0.8 }}>{c.desc}</Text>
                        <Button
                          mode='contained'
                         
                          style={{ marginTop: 8, borderRadius: 24, backgroundColor:'#425E91' }}
                          onPress={() => setSelectedCourse(c.id)}
                        >
                          {active ? 'Seleccionado' : 'Comenzar curso'}
                        </Button>
                      </Card.Content>
                    </Card>
                  );
                })}
              </View>
            </ScrollView>

            <Text style={{ textAlign: 'center', marginTop: 12 }}>
              ¿No estás listo para comenzar? <Text style={{ color: '#425E91', fontWeight: 'bold' }}>Explora primero.</Text>
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={{ padding: 16, paddingBottom: 24 }}>
        <Button
          mode="contained"
          onPress={step < 3 ? next : finish}
          disabled={!canContinue}
          style={{ borderRadius: 28, paddingVertical: 6, backgroundColor: '#425E91' }}
        >
          {step < 3 ? 'Continuar' : 'Guardar y continuar'}
        </Button>
        {step < 3 && (
          <Button mode="text" textColor='#425E91' onPress={next} style={{ marginTop: 8 }}>
            Omitir por ahora
          </Button>
        )}
      </View>
    </View>
  );
}
