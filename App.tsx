import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Camara from './Camera';
import Ubicacion from './Location';
import Brujula from './Brujula';

export default function App() {
  const [pantalla, setPantalla] = useState('camara');

  return (
    <View style={styles.container}>
      <Text>Explorador movil</Text>
      <View style={styles.menu}>
        <Pressable onPress={() => setPantalla('camara')}><Text>Camara</Text></Pressable>
        <Pressable onPress={() => setPantalla('ubicacion')}><Text>Ubicacion</Text></Pressable>
        <Pressable onPress={() => setPantalla('brujula')}><Text>Brujula</Text></Pressable>
      </View>
      {pantalla === 'camara' && <Camara />}
      {pantalla === 'ubicacion' && <Ubicacion />}
      {pantalla === 'brujula' && <Brujula />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 50,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});