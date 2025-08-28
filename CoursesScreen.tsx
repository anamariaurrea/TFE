import * as React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Appbar,
  Chip,
  Text,
  Card,
  Portal,
  Modal,
  Divider,
  Surface,
  SegmentedButtons,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppBarContent } from './Community';

const BG = '#F6F8FC';
const PRIMARY = '#2F5D82';
const PILL = '#DCE8FF';
const CARD = '#FFFFFF';
const SEPARATOR = '#E6E9F2';

type Course = {
  id: string;
  title: string;
  meta: string;
  img: string;
};
const levels = [
  { label: "Para ti", value: "para-ti" },
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

const COURSES: Course[] = [
  { id: '1', title: '¿Qué es la radioafición?', meta: 'Principiante • 6 horas', img: 'https://picsum.photos/seed/ham101/80/80' },
  { id: '2', title: 'El Mundo en tus Ondas', meta: 'Principiante • 3 horas', img: 'https://picsum.photos/seed/ham102/80/80' },
  { id: '3', title: 'Seguridad en la Estación', meta: 'Principiante • 4 horas', img: 'https://picsum.photos/seed/ham103/80/80' },
  { id: '4', title: 'Ondas y Frecuencia', meta: 'Principiante • 6 horas', img: 'https://picsum.photos/seed/ham104/80/80' },
  { id: '5', title: 'Códigos Básicos', meta: 'Principiante • 5 horas', img: 'https://picsum.photos/seed/ham105/80/80' },
  { id: '6', title: 'Tu Licencia', meta: 'Principiante • 7 horas', img: 'https://picsum.photos/seed/ham106/80/80' },
];

function CourseRow({ item }: { item: Course }) {
  return (
    <Surface style={styles.row} elevation={0}>
      <View style={styles.rowLeft}>
        <View style={styles.checkWrap}>
          <MaterialCommunityIcons name="check" size={30} color={PRIMARY} />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="titleMedium">{item.title}</Text>
          <Text variant="bodySmall" style={{ opacity: 0.7 }}>{item.meta}</Text>
        </View>
      </View>
      <Image
        source={{ uri: item.img }}
        style={{
          aspectRatio: 1,
          resizeMode: 'cover',
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
          
        }}
      />
    </Surface>
  );
}

export default function CoursesScreen() {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<string>('para-ti');

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* Header */}
      <Appbar.Header mode="small" style={{ backgroundColor: BG }}>
       {/*  <Chip
          mode="outlined"
          style={styles.headerChip}
          onPress={() => setSheetOpen(true)}
          icon={(props) => <MaterialCommunityIcons name="chevron-down" {...props} size={20} />}
        >
          Cursos
        </Chip>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialCommunityIcons name="lightning-bolt-outline" size={20} color={PRIMARY} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialCommunityIcons name="bell-outline" size={20} color={PRIMARY} />
        </TouchableOpacity> */}
    <Appbar.Content title={<AppBarContent onClick={() => setSheetOpen(true)}/>} />
      </Appbar.Header>

      {/* Body */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        {/* Sección NIVEL 1 */}
        <Text variant="labelSmall" style={styles.levelLabel}>NIVEL 1</Text>
        <View style={styles.levelHeader}>
          <Text variant="titleLarge" style={{ flex: 1, fontWeight: '700', color:'#294677' }}>
            Primeros pasos en la radio
          </Text>
          <MaterialCommunityIcons name="chevron-up" size={22} color={PRIMARY} />
        </View>

        <View style={{ gap: 10 }}>
          {COURSES.map((c, i) => (
            <View key={c.id}>
              <CourseRow item={c} />
              {i < COURSES.length - 1 && <Divider style={styles.dividerInset} />}
            </View>
          ))}
        </View>

        {/* Sección NIVEL 2 (solo encabezado, sin items para el mock) */}
        <Text variant="labelSmall" style={[styles.levelLabel, { marginTop: 24 }]}>NIVEL 2</Text>
        <View style={styles.levelHeader}>
          <Text variant="titleLarge" style={{ flex: 1, fontWeight: '700' }}>
            Despegando con la Radio
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={22} color={PRIMARY} />
        </View>
      </ScrollView>

      {/* Bottom Sheet - Filtro */}
      <Portal>
        <Modal
          visible={sheetOpen}
          onDismiss={() => setSheetOpen(false)}
          contentContainerStyle={styles.sheet}
        >
          <View style={styles.sheetHandle} />
          <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
            <View style={styles.chipsRow}>
          {/*     <Chip
                selected={filter === 'para-ti'}
                onPress={() => setFilter('para-ti')}
                style={[styles.filterChip, filter === 'para-ti' && { backgroundColor: PILL }]}
                textStyle={{ color: PRIMARY }}
              >
                Para ti
              </Chip>
              <Chip
                selected={filter === 'beginner'}
                onPress={() => setFilter('beginner')}
                style={[styles.filterChip, filter === 'beginner' && { backgroundColor: PILL }]}
                textStyle={{ color: PRIMARY }}
              >
                Principiante
              </Chip>
              <Chip
                selected={filter === 'intermediate'}
                onPress={() => setFilter('intermediate')}
                style={[styles.filterChip, filter === 'intermediate' && { backgroundColor: PILL }]}
                textStyle={{ color: PRIMARY }}
              >
                Intermedio
              </Chip>
              <Chip
                selected={filter === 'advanced'}
                onPress={() => setFilter('advanced')}
                style={[styles.filterChip, filter === 'advanced' && { backgroundColor: PILL }]}
                textStyle={{ color: PRIMARY }}
              >
                Avanzado
              </Chip> */}
                <SegmentedButtons
                  style={{
                    width: '100%',
                  }}
                  value={filter}
                  onValueChange={setFilter}
                  buttons={levels}
                />
            </View>

            <View style={{ gap: 10, paddingHorizontal: 12 }}>
              {COURSES.map((c, i) => (
                <View key={`sheet-${c.id}`}>
                  <CourseRow item={c} />
                  {i < COURSES.length - 1 && <Divider style={styles.dividerInset} />}
                </View>
              ))}
            </View>
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerChip: {
    borderRadius: 20,
    marginLeft: 12,
    backgroundColor: CARD,
  },
  iconBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  levelLabel: {
    color: '#98A1B2',
    marginTop: 8,
    marginBottom: 6,
    letterSpacing: 1,
  },
  levelHeader: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E6E9F2',
  },
  row: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth:0.5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  checkWrap: {
    width: 50,
    height: 50,
    borderRadius: 24,
    backgroundColor: PILL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginLeft: 0,
    backgroundColor: '#F0F2F7',
    position:'relative',
    right: 0,
    top: 0,
    bottom: 0,
  },
  dividerInset: {
    marginLeft: 52,
    borderColor: SEPARATOR,
  },
  sheet: {
    backgroundColor: CARD,
    marginHorizontal: 10,
    marginTop: 'auto',       // empuja hacia abajo
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 8,
    paddingBottom: 6,
    maxHeight: '80%',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 12,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD3E1',
    marginBottom: 8,
  },
  chipsRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 10,
  },
  filterChip: {
    borderRadius: 16,
    backgroundColor: '#F2F5FC',
  },
});
