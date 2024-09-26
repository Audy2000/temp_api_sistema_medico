import { Request, Response } from "express";
import multer from "multer";
import path from "path";

// Configurar el almacenamiento con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Renombrar archivo
  }
});

const upload = multer({ storage: storage }).single('photo');

// Controlador para manejar la subida de imágenes
export const uploadPhoto = (req :Request, res:Response) => {
  upload(req, res, (err) => {
      if (err) {
          return res.status(400).send('Error al subir el archivo.');
      }
      
      if (!req.file) {
          return res.status(400).send('No file uploaded.');
      }

      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      res.json({ url: fileUrl });
  });
};

