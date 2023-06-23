// aqui exportaras las funciones que necesites

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  addDoc, collection, onSnapshot, serverTimestamp, deleteDoc, doc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

// REGISTER::::::::::::::::::::::::::::::::::::
export const crearUsuarioYContraseña = (email, password) => createUserWithEmailAndPassword(auth, email, password); // agregue return para la promesa de console log de login fila 25

// LOGIN::::::::::::::::::::::::::::::::::::::
export const loginUsuarioYContraseña = (email, password) => signInWithEmailAndPassword(auth, email, password); // agregue return para la promesa de console log de login fila 25

// LOGIN CON GOOGLE::::::::::::::::::::::::::::
export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider); // faltaba un return
  // signInWithPopup() método para iniciar sesion con ventana emergente
};

// CREAR POST:::::::::::::::::::::::::::::::::
export const crearPost = (texto) => addDoc(collection(db, 'publicaciones'), {
  date: serverTimestamp(), // todas la fechas ordenadas
  contenido: texto,
  // usuario: user,
});

// VER TODOS LOS POST:::::::::::::::::::::::::
export const obtenerTodosLosPost = (callback) => onSnapshot(collection(db, 'publicaciones'), callback);

// OBTENER USUARIO ACTIVO:::::::::::::::::::::
// BORRAR POST

export const borrarPost = (postId) => deleteDoc(doc(db, 'publicaciones', postId));

// EDITAR POST

// LIKES POST
// CONTAR LIKES POST

// ____________________________________________________________________________________________//

// HACKER EDITION
// dejar un comentario

// editar nombre

// editar foto
