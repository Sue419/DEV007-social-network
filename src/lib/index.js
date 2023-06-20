// aqui exportaras las funciones que necesites

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

//REGISTER::::::::::::::::::::::::::::::::::::
export const crearUsuarioYContraseña = (email, password) => createUserWithEmailAndPassword(auth, email, password); // agregue return para la promesa de console log de login fila 25

// LOGIN::::::::::::::::::::::::::::::::::::::
export const loginUsuarioYContraseña = (email, password) => signInWithEmailAndPassword(auth, email, password); // agregue return para la promesa de console log de login fila 25

//LOGIN CON GOOGLE::::::::::::::::::::::::::::
export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider) // faltaba un return
  // signInWithPopup() método para iniciar sesion con ventana emergente
};

//OBTENER USUARIO ACTIVO:::::::::::::::::::::

//CREAR POST:::::::::::::::::::::::::::::::::
export const crearPost = (texto) => addDoc(collection(db, 'publicaciones'), {
  contenido: texto,
  // usuario: user,
});

//VER TODOS LOS POST:::::::::::::::::::::::::
export const obtenerTodosLosPost = (callback) => onSnapshot(collection(db, 'publicaciones'), callback);

// borrar post

// dar like

// dejar un comentario

// editar nombre

// editar foto


