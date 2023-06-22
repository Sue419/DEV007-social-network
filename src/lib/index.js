// aqui exportaras las funciones que necesites:::::::::::::::::::::::::::::::::::::::::::::::::

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  addDoc, collection, onSnapshot, serverTimestamp, orderBy,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

//FUNCION PARA CREAR USUARIO QUE SE EXPORTA REGISTER.JS::::::::::::::::::::::::::::::::::::::::
export const crearUsuarioYContraseña = (email, password) => createUserWithEmailAndPassword(auth, email, password); // agregue return para la promesa de console log de login fila 25

//FUNCION PARA ENTRAR CON LOGIN LOGEARSE QUE SE EXPORTA A LOGIN.JS:::::::::::::::::::::::::::::
export const loginUsuarioYContraseña = (email, password) => signInWithEmailAndPassword(auth, email, password); // agregue return para la promesa de console log de login fila 25

//FUNCION PARA ENTRAR CON GOOGLE QUE SE EXPORTA A LOGIN.JS:::::::::::::::::::::::::::::::::::::
export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider); // faltaba un return
  // signInWithPopup() método para iniciar sesion con ventana emergente
};

//FUNCION PARA CREAR POST QUE SE EXPORTA A FEED.JS:::::::::::::::::::::::::::::::::::::::::::::
export const crearPost = (texto, user) => addDoc(collection(db, 'publicaciones'), {
  date: serverTimestamp(), // todas la fechas ordenadas
  contenido: texto,
  usuario: user,
});

//FUNCION PARA VER TODOS LOS POST QUE SE EXPORTA A FEED.JS:::::::::::::::::::::::::::::::::::::
export const obtenerTodosLosPost = (callback) => onSnapshot(collection(db, 'publicaciones', orderBy(('date','desc')), callback));

//FUNCION PARA IDENTIFICAR AL USUARIO
export const currentUserInfo = () => auth.currentUser;

//FUNCION PARA BORRAR PUBLICACIÓN QUE SE EXPORTA A FEED.JS:::::::::::::::::::::::::::::::::::::
export const borrarPost = (postId) => deleteDoc(doc(db, 'publicaciones', postId));

// EDITAR POST
// export const editarPost = (postId) => updateDoc(doc(db, 'publicaciones', postId));

// LIKES POST

// export const darLikes =


// // Función para crear una referencia al documento del usuario actual
// export const getUserRef = (userId) => firestoreDoc(db, 'users', userId);

// // Exporta el usuario actual
// export const getCurrentUser = () => auth.currentUser;

// // Obtiene todos los posts de la base de datos en orden descendente por fecha.
// /* export const getPosts = async () => {
//   const querySnapshot = await getDocs(query(collection(db, 'posts'), orderBy('postDate', 'desc')));
//   return querySnapshot;
// }; */



// // CONTAR LIKES POST
