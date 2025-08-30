import * as React from 'react';
import { View } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import RankRow from './RankRow';
import { RankItem } from '../../../types';


export default function RankList({ data }: { data: RankItem[] }) {
  const theme = useTheme();
  return (
    <View style={{ width: '100%', backgroundColor: theme.colors.surface  }}>
      {data.map((item, idx) => {
        const isLast = idx === data.length - 1;
        return (
          <View key={item.pos}>
            <RankRow item={item} />
            {!isLast && (
              <Divider style={{ backgroundColor: theme.colors.outlineVariant ?? theme.colors.outline }} />
            )}
          </View>
        );
      })}
    </View>
  );
}
