import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export const WaveProgressBar = ({ 
  progress = 0.7,
  height = 12,
  waveColor = '#425E91',
  backgroundColor = '#E3F2FD',
  showAudioIcon = true,
  animated = false 
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const waveAnimation = useRef(new Animated.Value(0)).current;
  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    let waveListenerId: string | undefined;
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: progress,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      const waveLoop = Animated.loop(
        Animated.timing(waveAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        })
      );
      waveLoop.start();

      waveListenerId = waveAnimation.addListener(({ value }) => {
        setWaveOffset(value * Math.PI * 2);
      }) as string;
    }
    return () => {
      if (waveListenerId) waveAnimation.removeListener(waveListenerId);
    };
  }, [progress, animated]);

  const createWavePath = (offset = 0, progressWidth: number) => {
    const amplitude = 4;
    const wavelength = 40;
    const centerY = height / 2;
    
    let path = '';
    
    if (progressWidth > 0) {
      path += `M 0 ${centerY}`;
      
      for (let x = 0; x <= progressWidth; x += 2) {
        const y = centerY + Math.sin((x / wavelength * 2 * Math.PI) + offset) * amplitude;
        path += ` L ${x} ${y}`;
      }
    }
    
    return path;
  };

  const createStraightPath = (progressWidth: number) => {
    const centerY = height / 2;
    if (progressWidth < width) {
      return `M ${progressWidth} ${centerY} L ${width} ${centerY}`;
    }
    return '';
  };

  return (
    <View style={[styles.container, { height: height + 16 }]}>  
      <Svg height={height + 16} width={width} style={styles.svg}>
        <Path
          d={createWavePath(waveOffset, width * progress)}
          stroke={waveColor}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={createStraightPath(width * progress)}
          stroke={backgroundColor}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </Svg>

      {/* Imagen Vector.png al final del progressbar */}
      <Image
        source={require('./assets/Vector.png')}
        style={{
          position: 'absolute',
          right: 5,
          top: (height + 16) / 2 - 24,
          width: 36,
          height: 36,
          zIndex: 2,
        }}
        resizeMode="contain"
      />

      {/* Ícono de audio */}
      {showAudioIcon && (
        <View style={[styles.audioIconContainer, { right: width * (1 - progress) - 10 }]}> 
          <View style={styles.audioIcon}>
            <View style={[styles.audioBar, { height: 3, backgroundColor: waveColor }]} />
            <View style={[styles.audioBar, { height: 6, backgroundColor: waveColor }]} />
            <View style={[styles.audioBar, { height: 4, backgroundColor: waveColor }]} />
          </View>
        </View>
      )}
    </View>
  );
};

// Componente de ejemplo
const ProgressBarExample = () => {
  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.title}>¿Qué te interesa más?</Text>
      <Text style={styles.subtitle}>Debes seleccionar al menos 3 temas.</Text>
      
      <WaveProgressBar 
        progress={0.6}
        height={8}
        waveColor="#4A8FE7"
        backgroundColor="#D6E9FF"
        animated={true}
      />
      
      <View style={{ marginTop: 30 }}>
        <Text style={styles.subtitle}>Diferente progreso:</Text>
        <WaveProgressBar 
          progress={0.8}
          height={8}
          waveColor="#1976D2"
          backgroundColor="#E3F2FD"
          animated={true}
          showAudioIcon={false}
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={styles.subtitle}>Progreso bajo:</Text>
        <WaveProgressBar 
          progress={0.3}
          height={8}
          waveColor="#4A8FE7"
          backgroundColor="#D6E9FF"
          animated={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  audioIconContainer: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -6 }],
  },
  audioIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 1,
  },
  audioBar: {
    width: 2,
    borderRadius: 1,
  },
  exampleContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1976D2',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ProgressBarExample;