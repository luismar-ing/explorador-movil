import {Magnetometer} from 'expo-sensors';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

export default function Brujula(){
const [disponible, setDisponible] = useState<boolean | null>(null);
const [datos, setDatos] = useState({x: 0, y: 0, z: 0});
const [angulo, setAngulo] = useState(0);

useEffect(() => {
    let sub: {remove: () => void} | null = null;

    async function iniciar(){
        const disponible = await Magnetometer.isAvailableAsync();
        setDisponible(disponible);
        if (!disponible) return;
        Magnetometer.setUpdateInterval(250);
        sub = Magnetometer.addListener(({x, y, z}) => {
            const angulo = (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360;
            setDatos({x, y, z});
            setAngulo(angulo);
        })
    }

    iniciar();

    return () => {
        sub?.remove();
    };
}, []);

if (disponible === null) return <Text>Cargando sensor...</Text>;
if (!disponible) return <Text>Sensor no disponible</Text>;

return (
    <View>
        <Text>X: {datos.x.toFixed(2)} </Text>
        <Text>Y: {datos.y.toFixed(2)} </Text>
        <Text>Z: {datos.z.toFixed(2)} </Text>
        <Text>Dirección aproximada: {angulo.toFixed(0)}</Text>
    </View>
);
}