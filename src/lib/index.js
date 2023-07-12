// aqui exportaras las funciones que necesites:::::::::::::::::::::::::::::::::::::::::::::::::
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
} from 'firebase/firestore';
import {
  auth,
  db,
} from '../firebase';

// FUNCION PARA CREAR USUARIO QUE SE EXPORTA REGISTER.JS::::::::::::::::::::::::::::::::::::::::
export const crearUsuarioYContraseña = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

// FUNCION PARA ENTRAR CON LOGIN LOGEARSE QUE SE EXPORTA A LOGIN.JS:::::::::::::::::::::::::::::
export const loginUsuarioYContraseña = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// FUNCION PARA ENTRAR CON GOOGLE QUE SE EXPORTA A LOGIN.JS:::::::::::::::::::::::::::::::::::::
export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider); //
  // signInWithPopup() método para iniciar sesion con ventana emergente
};

// PERFIL USUARIO
export const usuarioLogeado = () => auth.currentUser.email;

// FOTO USUARIO
export const fotoUsuario = () => auth.currentUser.photoURL;

// PERFIL USUARIO ACTUAL CON LOGIN MAIL
export const usuarioLogeadoRegister = (displayName) => updateProfile(auth.currentUser, {
  name: displayName,
});

// FUNCION PARA CREAR POST QUE SE EXPORTA A FEED.JS:::::::::::::::::::::::::::::::::::::::::::::
export const crearPost = (texto, user) => addDoc(collection(db, 'publicaciones'), {
  date: serverTimestamp(), // todas la fechas ordenadas
  contenido: texto,
  usuario: user,
  likes: [],
});

// FUNCION PARA VER TODOS LOS POST QUE SE EXPORTA A FEED.JS:::::::::::::::::::::::::::::::::::::
const posteos = collection(db, 'publicaciones');
export const postsOrdenados = query(posteos, orderBy('date', 'desc'));
export const obtenerTodosLosPost = (callback) => onSnapshot(postsOrdenados, callback);
// export const obtenerTodosLosPost = (callback) => onSnapshot(collection(db, 'publicaciones'), orderBy('date', 'desc'), callback);

// FUNCION PARA IDENTIFICAR AL USUARIO
export const currentUserInfo = () => auth.currentUser;

// FUNCION PARA CERRAR SESION
export const logOut = () => signOut(auth);

// FUNCION PARA BORRAR PUBLICACIÓN QUE SE EXPORTA A FEED.JS:::::::::::::::::::::::::::::::::::::
export const borrarPost = (postId) => deleteDoc(doc(db, 'publicaciones', postId));

// EDITAR POST
export const editarPost = (postId, updatePosts) => updateDoc(doc(db, 'publicaciones', postId), updatePosts);

// LIKES POST
export const likesPost = async (postId, userId) => {
  await updateDoc(doc(db, 'publicaciones', postId), {
    likes: arrayUnion(userId),
  });
};

export const removeLike = async (postId, userId) => {
  await updateDoc(doc(db, 'publicaciones', postId), {
    likes: arrayRemove(userId),
  });
};
