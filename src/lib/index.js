// aqui exportaras las funciones que necesites:::::::::::::::::::::::::::::::::::::::::::::::::

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  addDoc, collection, onSnapshot, serverTimestamp, orderBy, deleteDoc, doc, updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

// FUNCION PARA CREAR USUARIO QUE SE EXPORTA REGISTER.JS::::::::::::::::::::::::::::::::::::::::
export const crearUsuarioYContraseña = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// FUNCION PARA ENTRAR CON LOGIN LOGEARSE QUE SE EXPORTA A LOGIN.JS:::::::::::::::::::::::::::::
export const loginUsuarioYContraseña = (email, password) => signInWithEmailAndPassword(auth, email, password);

// FUNCION PARA ENTRAR CON GOOGLE QUE SE EXPORTA A LOGIN.JS:::::::::::::::::::::::::::::::::::::
export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider); //
  // signInWithPopup() método para iniciar sesion con ventana emergente
};

// PERFIL USUARIO GOOGLE
export const obtenerUsuarioLogeado = () => auth.currentUser.displayName;

// PERFIL USUARIO ACTUAL CON LOGIN MAIL

// FUNCION PARA CREAR POST QUE SE EXPORTA A FEED.JS:::::::::::::::::::::::::::::::::::::::::::::
export const crearPost = (texto, user) => addDoc(collection(db, 'publicaciones'), {
  date: serverTimestamp(), // todas la fechas ordenadas
  contenido: texto,
  usuario: user,
  // nombre: displayName,
});

// FUNCION PARA VER TODOS LOS POST QUE SE EXPORTA A FEED.JS:::::::::::::::::::::::::::::::::::::
export const obtenerTodosLosPost = (callback) => onSnapshot(collection(db, 'publicaciones'), orderBy('date', 'desc'), callback);

// FUNCION PARA IDENTIFICAR AL USUARIO
export const currentUserInfo = () => auth.currentUser;

// FUNCION PARA BORRAR PUBLICACIÓN QUE SE EXPORTA A FEED.JS:::::::::::::::::::::::::::::::::::::
export const borrarPost = (postId) => deleteDoc(doc(db, 'publicaciones', postId));

// EDITAR POST
export const editarPost = (postId, updatePosts) => updateDoc(doc(db, 'publicaciones', postId), updatePosts);





// DAR LIKES POST
// CONTAR LIKES POST
