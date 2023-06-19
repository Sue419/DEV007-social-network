// aqui exportaras las funciones que necesites

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const crearUsuarioYContraseña = (email, password) => createUserWithEmailAndPassword(auth, email, password); // agregue return para la promesa de console log de login fila 25

export const loginUsuarioYContraseña = (email, password) => signInWithEmailAndPassword(auth, email, password); // agregue return para la promesa de console log de login fila 25

export const crearPost = (texto) => addDoc(collection(db, 'publicaciones'), {
  contenido: texto,
  // usuario: user,
});

export const obtenerTodosLosPost = (callback) => onSnapshot (collection(db, 'publicaciones'), callback);

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

// borrar post

// obtener post

// dar like

// iniciar sesion con google

// dejar un comentario

// editar nombre

// editar foto

// acciones con firebase
