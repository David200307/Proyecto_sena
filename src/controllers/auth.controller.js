import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccesToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// Función de registro de usuario
export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Verificar si el email ya está en uso
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(['The email is already in use']);

    // Encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // Guardar el usuario en la base de datos
    const userSaved = await newUser.save();

    // Crear el token de acceso
    const token = await createAccesToken({ id: userSaved._id });

    // Establecer la cookie con el token
    res.cookie('token', token, {
      httpOnly: true, // Impide el acceso a la cookie desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Solo en producción las cookies deben ser seguras (requiere HTTPS)
      sameSite: 'None', // Permite que las cookies se envíen entre diferentes dominios
      maxAge: 24 * 60 * 60 * 1000, // Duración de la cookie (1 día)
    });

    // Enviar la respuesta con los datos del usuario
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Función de login de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por su email
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    // Comparar la contraseña ingresada con la almacenada
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect Password" });

    // Crear el token de acceso
    const token = await createAccesToken({ id: userFound._id });

    // Establecer la cookie con el token
    res.cookie('token', token, {
      httpOnly: true, // Impide el acceso a la cookie desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Solo en producción las cookies deben ser seguras (requiere HTTPS)
      sameSite: 'None', // Permite que las cookies se envíen entre diferentes dominios
      maxAge: 24 * 60 * 60 * 1000, // Duración de la cookie (1 día)
    });

    // Enviar la respuesta con los datos del usuario
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función de logout de usuario
export const logout = (req, res) => {
  // Limpiar la cookie 'token'
  res.cookie('token', "", { expires: new Date(0) });
  return res.sendStatus(200);
};

// Función para obtener el perfil del usuario
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

// Función para verificar el token
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
