// https://apiservices.manabi.gob.ec/persona/registrocivil/datosdemograficos/1311099244

import { Request, Response } from "express";
import { InfoPersonaSistema } from "../responses/persona-resonse";
import { ftSepararNombres } from "../utils/ftValidaNombres";

// Obtener personas 
export const getPersonaByCedula = async (req: Request, res: Response) => {
    try {
        const cedula :string= req.params.cedula;
        const url_consulta = `https://apiservices.manabi.gob.ec/persona/registrocivil/datosdemograficos/${cedula}`
        
        const response = await fetch(url_consulta); // Cambia esta URL por la API que deseas consumir
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data : InfoPersonaSistema = await response.json();
        const nombres_apellidos = ftSepararNombres(data.nombre)
        res.json({
            nombreCompleto : data.nombre,
            fechaNacimiento: convertirFecha(data.fechaNacimiento),
            nombres: nombres_apellidos.nombre,
            apellidos: nombres_apellidos.apellidos,
        });
        
    } catch (error) {
        res.status(500).json(error);
    }
};


function convertirFecha(fecha:string) {
    // Separar la fecha en partes
    const partes = fecha.split('/');

    // Asignar día, mes y año
    const dia = partes[0];
    const mes = partes[1];
    const año = partes[2];

    // Formatear a 'yyyy-MM-dd'
    return `${año}-${mes}-${dia}`;
}