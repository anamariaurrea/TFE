import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Modal, Portal, SegmentedButtons, useTheme } from 'react-native-paper';
import { Course } from '../../../types';
import CourseRow from './courseRow';


export default function FilterSheet({
  visible,
  onDismiss,
  filter,
  onChangeFilter,
  levels,
  courses,
}: {
  visible: boolean;
  onDismiss: () => void;
  filter: string;
  onChangeFilter: (v: string) => void;
  levels: { label: string; value: string }[];
  courses: Course[];
}) {
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.sheet,
          { backgroundColor: theme.colors.surface, shadowOpacity: theme.dark ? 0 : 0.15 },
        ]}
      >
        <View
          style={[
            styles.sheetHandle,
            { backgroundColor: theme.colors.outlineVariant ?? theme.colors.outline },
          ]}
        />

        <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
          <View style={styles.chipsRow}>
            <SegmentedButtons
              style={{ width: '100%' }}
              value={filter}
              onValueChange={onChangeFilter}
              buttons={levels}
            />
          </View>

          <View style={{ gap: 10, paddingHorizontal: 12 }}>
            {courses.map((c, i) => (
              <View key={`sheet-${c.id}`}>
                <CourseRow item={c} />
                {i < courses.length - 1 && (
                  <Divider style={{ height: StyleSheet.hairlineWidth, backgroundColor: theme.colors.outline }} />
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  sheet: {
    marginHorizontal: 10,
    marginTop: 'auto',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 8,
    paddingBottom: 6,
    maxHeight: '80%',
    shadowRadius: 10,
    elevation: 12,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  chipsRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 10,
  },
});
