export function ftSepararNombres(nombreCompleto:string) {
    const partes = nombreCompleto.trim().split(/\s+/);

    // Verificar que hay al menos 3 partes (2 apellidos y 1 nombre)
    if (partes.length < 3) {
        throw new Error("El formato debe ser al menos: 'Apellido1 Apellido2 Nombre1 [Nombre2]'");
    }

    // Asumimos que los dos primeros son apellidos y el resto son nombres
    const apellidos = partes.slice(0, 2).join(' '); // Dos apellidos
    const nombre = partes.slice(2).join(' '); // Uno o más nombres

    return { apellidos, nombre };
}