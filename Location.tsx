import * as Location from 'expo-location';
import {useState} from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';

export default function Ubicacion(){
const [cargando, setCargando] = useState(false);
const [mensaje, setMensaje] = useState('');
const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null);

async function obtenerUbicacion(){
    setCargando(true);
    setMensaje('');
    try {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setMensaje('Permiso de ubicacion denegado.');
        return;
    }
    const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
    });

    // Guarda pos.coords.latitude, longitude y accuracy
    setCoords(pos.coords);
    } catch {
        setMensaje('No se pudo obtener la ubicacion.');
    } finally {
        setCargando(false);
    }
}

return (
    <View>
        <Pressable onPress={obtenerUbicacion}>
            <Text>Obtener mi ubicacion</Text>
        </Pressable>
        {cargando && <ActivityIndicator />}
        {mensaje !== '' && <Text>{mensaje}</Text>}
        {coords && (
            <View>
                <Text>Latitud: {coords.latitude.toFixed(6)}</Text>
                <Text>Longitud: {coords.longitude.toFixed(6)}</Text>
                <Text>Precisión: {coords.accuracy?.toFixed(1)}</Text>
            </View>
        )}
    </View>
);
}