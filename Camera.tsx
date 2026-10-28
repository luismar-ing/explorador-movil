import {CameraView, useCameraPermissions} from 'expo-camera';
import {useRef, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';

export default function Camara(){
const cameraRef = useRef<CameraView>(null);
const [permission, requestPermission] = useCameraPermissions();
const [fotoUri, setFotoUri] = useState<string | null>(null);
const [lista, setLista] = useState(false);

async function tomarFoto(){
    if (!lista) return;
    const foto = await cameraRef.current?.takePictureAsync();
    if (foto?.uri) setFotoUri(foto.uri);

}

if (!permission) return <Text>Verificando permiso de camara</Text>;

if (!permission.granted) {
    return (
        <View>
            <Text>Se necesita permiso para usar la camara</Text>
            <Pressable onPress={requestPermission}>
                <Text>Solicitar permiso</Text>
            </Pressable>
        </View>
    );
}

return (
    <View>
        <CameraView ref={cameraRef} style={{ height: 300 }} facing="back" onCameraReady={() => setLista(true)} />
        <Pressable onPress={tomarFoto}>
            <Text>Tomar foto</Text>
        </Pressable>
        {fotoUri && <Image source={{ uri: fotoUri }} style={{ width: 200, height: 200 }} />}
    </View>
);
}