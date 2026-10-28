Se requiere instalar recursos de expo para la obtencion de camara, ubicacion y magnometer. Ademas de instalar el proyecto con Expo SDK58.

El manejo de los permisos asi como la revision de su estado fue algo que tuve que implementar con hooks nuevos, los cuales tuve que investigar que es lo que regresan y como funcion.

En cuanto a las diferencias de los 3 conceptos, el GPS indica donde esta el dispositivo por medio de cordenadas obtenidas por satelites. La orientacion magnetica apunta hacia donde esta el norte, este no ocupa senal pero se ve afectado por iamgenes o campos magneticos cercanos.