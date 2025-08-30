import * as React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { AppBarContent } from '../../../AppBarContent';


export default function CoursesHeader({ onOpenSheet }: { onOpenSheet: () => void }) {
  const theme = useTheme();
  return (
    <Appbar.Header mode="small" style={{ backgroundColor: theme.colors.surface }}>
      <Appbar.Content
        title={<AppBarContent onClick={onOpenSheet} />}
        color={theme.colors.onSurface}
      />
    </Appbar.Header>
  );
}
