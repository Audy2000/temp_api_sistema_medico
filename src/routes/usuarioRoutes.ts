// src/routes/userRoutes.ts
import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, login, registerUser, updateUser } from '../controllers/usuarioController';
import { getPersonaByCedula } from '../controllers/personaController';

const router = Router();

router.get('/usuario', getUsers);
router.post('/usuario', createUser);
router.get('/usuario/:id', getUserById);
router.put('/usuario/:id', updateUser);
router.delete('/usuario/:id', deleteUser);

router.post('/auth/login', login);
router.post('/register', registerUser);

router.get('/consulta-persona/:cedula', getPersonaByCedula);


export default router;
