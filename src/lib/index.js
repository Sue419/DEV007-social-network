// aqui exportaras las funciones que necesites

import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const crearUsuarioYContraseña = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};//agregue return para la promesa de console log de login fila 25

export const crearPost = async (texto) => {
  await addDoc(collection(db, 'publicaciones'), {
    contenido: texto,
    // usuario: user,
  });
};

export const obtenerTodosLosPost = (texto) => {
  return getDocs(collection(db, 'publicaciones'), {
    contenido: texto,
    // usuario: user,
  });
};

export const obtenerNombreUsuario = () => {
  return onAuthStateChanged(auth, (user) => {
    if (obtenerNombreUsuario) {
    //  User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User 
      const uid = user.uid;
      //...
    } else {
      //user is signed out
    }
  });


}

// borrar post

// obtener post

// dar like

// iniciar sesion con google

// dejar un comentario

// editar nombre 

// editar foto

// acciones con firebase

