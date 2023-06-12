// aqui exportaras las funciones que necesites

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const crearUsuarioYContraseña = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password);
};
