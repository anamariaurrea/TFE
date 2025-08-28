import React, { useMemo, useState } from 'react'
import { View, LayoutChangeEvent } from 'react-native'

type Props = {
  progress: number          // 0..1
  height?: number
  color?: string            // color del progreso
  trackColor?: string       // color del fondo
  wavyWidth?: number        // largo del tramo ondulado (px)
  waves?: number            // cuántas crestas
  dotSize?: number          // puntico al final
}

export default function WavyProgressBar({
  progress,
  height = 10,
  color = '#425E91',
  trackColor = '#E6EEF8',
  wavyWidth = 80,
  waves = 6,
  dotSize = 6,
}: Props) {
  const [width, setWidth] = useState(0)
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)

  const radius = height / 2
  const filled = Math.max(0, Math.min(progress, 1)) * width
  const wavy = Math.min(wavyWidth, filled)               // solo ondulamos este tramo

  // geometría de las ondas (hechas con “bocados” semicirculares del color del track)
  const geo = useMemo(() => {
    const dia = height * 1.1          // un poco más alto que la barra → curva marcada
    const r = dia / 2
    const step = dia * 0.8            // separación entre crestas
    const count = Math.max(1, Math.min(waves, Math.ceil(wavy / step) + 1))
    return { dia, r, step, count }
  }, [height, wavy, waves])

  return (
    <View
      onLayout={onLayout}
      style={{
        width: '100%',
        height,
        borderRadius: radius,
        backgroundColor: trackColor,
        overflow: 'hidden',
      }}
    >
      <View style={{ position: 'absolute', left: 0, top: 0, height, width: filled, backgroundColor: color }} />
      {wavy > 0 && (
        <View style={{ position: 'absolute', left: 0, top: 0, height, width: wavy, overflow: 'hidden' }}>
          {Array.from({ length: geo.count }).map((_, i) => {
            const isTop = i % 2 === 0
            return (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  width: geo.dia,
                  height: geo.dia,
                  borderRadius: geo.dia / 2,
                  backgroundColor: trackColor,
                  left: i * geo.step - geo.r * 0.6, // pequeño solape para suavizar
                  top: isTop ? -geo.r : height - geo.r,
                }}
              />
            )
          })}
          {/* Tira para asegurar continuidad del color en el interior del tramo ondulado */}
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: height * 0.15,
              height: height * 0.7,
              width: wavy,
              backgroundColor: color,
            }}
          />
        </View>
      )}

      {/* Puntico al final */}
      {filled > 0 && (
        <View
          style={{
            position: 'absolute',
            left: Math.min(filled, width) - dotSize / 2,
            top: height / 2 - dotSize / 2,
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: color,
          }}
        />
      )}
    </View>
  )
}
