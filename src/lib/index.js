// aqui exportaras las funciones que necesites

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const crearUsuarioYContraseña = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password); // agregue return para la promesa de console log de login fila 25

<<<<<<< HEAD
export const loginUsuarioYContraseña = (email, password) =>
signInWithEmailAndPassword(auth, email, password); // agregue return para la promesa de console log de login fila 25

export const crearPost = (texto) =>
  addDoc(collection(db, 'publicaciones'), {
=======
export const crearPost = async (texto) => {
  await addDoc(collection(db, 'publicaciones'), {
>>>>>>> 84eb943d787ea3719e0a0aeffca4c2d70a5de85e
    contenido: texto,
    // usuario: user,
  });

export const obtenerTodosLosPost = (texto) =>
  getDocs(collection(db, 'publicaciones'), {
    contenido: texto,
    // usuario: user,
  });

<<<<<<< HEAD
export const obtenerNombreUsuario = () =>
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
=======
export const obtenerNombreUsuario = () => {
  return onAuthStateChanged(auth, (user) => {
    if (obtenerNombreUsuario) {
    //  User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User 
      const uid = user.uid;
      //...
>>>>>>> 84eb943d787ea3719e0a0aeffca4c2d70a5de85e
    } else {
      // user is signed out
    }
  });

<<<<<<< HEAD
=======

}

>>>>>>> 84eb943d787ea3719e0a0aeffca4c2d70a5de85e
// borrar post

// obtener post

// dar like

// iniciar sesion con google

// dejar un comentario

// editar nombre

// editar foto

// acciones con firebase
