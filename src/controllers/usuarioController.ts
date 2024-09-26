// src/controllers/userController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Usuario } from '../entity/Usuario';

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(Usuario);
        const users = await userRepository.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
};

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
    try {

        const userRepository = AppDataSource.getRepository(Usuario);
        const user = userRepository.create(req.body);
        await userRepository.save(user);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(Usuario);
        const user = await userRepository.findOneBy({ id: Number(req.params.id) });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user' });
    }
};

// Actualizar un usuario por ID
export const updateUser = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(Usuario);
        const user = await userRepository.findOneBy({ id: Number(req.params.id) });
        if (!user) return res.status(404).json({ message: 'User not found' });

        userRepository.merge(user, req.body);
        await userRepository.save(user);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

// Eliminar un usuario por ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(Usuario);
        const user = await userRepository.findOneBy({ id: Number(req.params.id) });
        if (!user) return res.status(404).json({ message: 'User not found' });

        await userRepository.remove(user);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(Usuario);
        const user = await userRepository.findOneBy({ email: req.params.usuario });

        if (user) {
            prueba_login.username = user.nombres;
            prueba_login.rememberSession = user.rememberSession;
            return res.json(prueba_login);
            
        }
        return res.status(404).json({ message: 'User not found' });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });

    }
}

export const checkPermisos = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(Usuario);
        const user = await userRepository.findOneBy({ nombres: req.params.nombres });

        if (user) {
            prueba_login.username = user.nombres;
            prueba_login.rememberSession = user.rememberSession;
            return res.json(prueba_login);
            
        }
        return res.status(404).json({ message: 'User not found' });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });

    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {

        const userRepository = AppDataSource.getRepository(Usuario);
        const user = userRepository.create(req.body);
        await userRepository.save(user);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

const prueba_login = {
    token:'dfadfasgadsvzdrvsrve',
    token_type:'bearer',
    time_start: new Date(),
    expires_in:159, // segundos
    username:'audy pruebas',
    periodo:'001',
    rememberSession:false,
    roles : [] 
  }
/*

token:'dfadfasgadsvzdrvsrve',
    token_type:'bearer',
    time_start: new Date(),
    expires_in:159, // segundos
    username:'audy pruebas',
    periodo:'001',
    roles : [] 
*/