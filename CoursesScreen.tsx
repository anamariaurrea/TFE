import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import CoursesHeader from './src/components/Courses/coursesHeader';
import LevelHeader from './src/components/Courses/levelHeader';
import CourseRow from './src/components/Courses/courseRow';
import FilterSheet from './src/components/Courses/filterSheet';
import { Course } from './types';

const levels = [
  { label: 'Para ti', value: 'para-ti' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];

const COURSES: Course[] = [
  { id: '1', title: '¿Qué es la radioafición?', meta: 'Principiante • 6 horas', img: 'https://picsum.photos/seed/ham101/80/80' },
  { id: '2', title: 'El Mundo en tus Ondas', meta: 'Principiante • 3 horas', img: 'https://picsum.photos/seed/ham102/80/80' },
  { id: '3', title: 'Seguridad en la Estación', meta: 'Principiante • 4 horas', img: 'https://picsum.photos/seed/ham103/80/80' },
  { id: '4', title: 'Ondas y Frecuencia', meta: 'Principiante • 6 horas', img: 'https://picsum.photos/seed/ham104/80/80' },
  { id: '5', title: 'Códigos Básicos', meta: 'Principiante • 5 horas', img: 'https://picsum.photos/seed/ham105/80/80' },
  { id: '6', title: 'Tu Licencia', meta: 'Principiante • 7 horas', img: 'https://picsum.photos/seed/ham106/80/80' },
];

export default function CoursesScreen() {
  const theme = useTheme();
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<string>('para-ti');

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <CoursesHeader onOpenSheet={() => setSheetOpen(true)} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* NIVEL 1 */}
        <Divider style={{ height: 1, backgroundColor: theme.colors.outline }} />
        <LevelHeader label="NIVEL 1" title="Comenzando con la Radio" />

        <View style={{ gap: 10 }}>
          {COURSES.map((c, i) => (
            <View key={c.id}>
              <CourseRow item={c} />
              {i < COURSES.length - 1 && (
                <Divider style={{ height: 1, backgroundColor: theme.colors.outline }} />
              )}
            </View>
          ))}
        </View>

        {/* NIVEL 2 */}
        <LevelHeader label="NIVEL 2" title="Profundizando en la Radio" topMargin={20} />
      </ScrollView>

      <FilterSheet
        visible={sheetOpen}
        onDismiss={() => setSheetOpen(false)}
        filter={filter}
        onChangeFilter={setFilter}
        levels={levels}
        courses={COURSES}
      />
    </View>
  );
}
