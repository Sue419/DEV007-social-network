// aqui exportaras las funciones que necesites

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  addDoc, collection, onSnapshot, serverTimestamp, deleteDoc, doc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

export const crearUsuarioYContraseña = (email, password) => createUserWithEmailAndPassword(auth, email, password); // agregue return para la promesa de console log de login fila 25

export const loginUsuarioYContraseña = (email, password) => signInWithEmailAndPassword(auth, email, password); // agregue return para la promesa de console log de login fila 25

export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider); // faltaba un return
  // signInWithPopup() método para iniciar sesion con ventana emergente
};

export const crearPost = (texto) => addDoc(collection(db, 'publicaciones'), {
  date: serverTimestamp(), // todas la fechas ordenadas
  contenido: texto,
  // usuario: user,
});

export const obtenerTodosLosPost = (callback) => onSnapshot(collection(db, 'publicaciones'), callback);

export const obtenerNombreUsuario = () => onAuthStateChanged(auth, (user) => {
  if (obtenerNombreUsuario) {
    //  User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // user is signed out
  }
});
export const borrarPost = (postId) => deleteDoc(doc(db, 'publicaciones', postId));

// borrar post

// obtener post

// dar like

// iniciar sesion con google

// dejar un comentario

// editar nombre

// editar foto

// acciones con firebase
