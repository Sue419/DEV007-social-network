// SE IMPORTAN LAS FUNCIONES A TESTEAR:::::::::::::::::::::::::::::::::::::::::::::::::::
import {
  addDoc,
  deleteDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import {
  borrarPost,
  crearPost,
  crearUsuarioYContraseña,
  editarPost,
  likesPost,
  loginGoogle,
  loginUsuarioYContraseña,
  obtenerTodosLosPost,
  removeLike,
} from '../src/lib/index';

// IDENTIFICAMOS A QUE ARCHIVO LE HAREMOS MOCK PARA TEST:::::::::::::::::::::::::::::::::
jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../src/firebase.js', () => ({
  auth: {
    currentUser: {
      email: 'tetera@mail.com',
    },
  },
}));

// CON ESTO LIMPIAMOS PARA QUE UN TEST NO CONTAMINE AL OTRO::::::::::::::::::::::::::::::
beforeEach(() => {
  createUserWithEmailAndPassword.mockClear();
  signInWithEmailAndPassword.mockClear();
  signInWithPopup.mockClear();
  addDoc.mockClear();
  deleteDoc.mockClear();
  onSnapshot();
  updateDoc();
});

describe('crearUsuarioYContraseña', () => {
  test('es una función', () => {
    expect(typeof crearUsuarioYContraseña).toBe('function');
  });

  test('deberia llamar a la función createUserWithEmailAndPassword cuando es ejecutada', async () => {
    await crearUsuarioYContraseña('tetera@mail.com', 'tetera123');
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  test('deberia devolver la información del usuario creado', async () => {
    createUserWithEmailAndPassword.mockReturnValueOnce({ email: 'string' });
    const response = await crearUsuarioYContraseña('tetera@mail.com', 'tetera123');
    expect(response.email).toBe('string');
  });
});

describe('loginUsuarioYContraseña', () => {
  test('es una función', () => {
    expect(typeof loginUsuarioYContraseña).toBe('function');
  });
  test('debe dar error cuando no funciona', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce(new Error('error'));
    const response = await loginUsuarioYContraseña('tetera@mail.com', 'tetera123');
    expect(response).toBeInstanceOf(Error);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
  test('deberia llamar a la función signInWithEmailAndPassword cuando es ejecutada', async () => {
    await loginUsuarioYContraseña('tetera@mail.com', 'tetera123');
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });
  test('deberia devolver la información del usuario logeado', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce({ email: 'tetera@mail.com' });
    const response = await loginUsuarioYContraseña('tetera@mail.com', 'tetera123');
    expect(response.email).toBe('tetera@mail.com');
  });
});

describe('loginGoogle', () => {
  test('es una función', () => {
    expect(typeof loginGoogle).toBe('function');
  });
  test('deberia llamar a la función signInWithPopup cuando es ejecutada', async () => {
    await loginGoogle();
    expect(signInWithPopup).toHaveBeenCalled();
  });
  test('deberia devolver la información del usuario logeado', async () => {
    signInWithPopup.mockReturnValueOnce({ email: 'stringGoogle' });
    const response = await loginGoogle();
    expect(response.email).toBe('stringGoogle');
  });
});

describe('crearPost', () => {
  test('es una funcion', () => {
    expect(typeof crearPost).toBe('function');
  });
  test('deberia llamar a la funcion addDoc cuando es ejecutada', async () => {
    await crearPost('Ejercicios GYM');
    expect(addDoc).toHaveBeenCalled();
  });
  test('deberia dar error cuando no se agrega el post', async () => {
    addDoc.mockReturnValueOnce(new Error('error'));
    const response = await crearPost();
    expect(response.addDoc).toHaveBeenCalledTimes();
  });
});

describe('obtenerTodosLosPost', () => {
  test('es una funcion', () => {
    expect(typeof obtenerTodosLosPost).toBe('function');
  });
  test('deberia llamar a la funcion onSnapshot cuando es ejecutada', async () => {
    await obtenerTodosLosPost('callback');
    expect(onSnapshot).toHaveBeenCalled();
  });
  test('deberia dar error cuando no se agregan los posts', async () => {
    onSnapshot.mockReturnValueOnce(new Error('error'));
    const response = await obtenerTodosLosPost('callback');
    expect(response.onSnapshot).toHaveBeenCalledTimes(1);
  });
});

describe('borrarPost', () => {
  test('es una funcion', () => {
    expect(typeof borrarPost).toBe('function');
  });
  test('deberia llamar a la funcion deleteDoc cuando es ejecutada', async () => {
    await borrarPost('borrar');
    expect(deleteDoc).toHaveBeenCalled();
  });
  test('deberia dar error cuando se eliminen los posts', async () => {
    deleteDoc.mockReturnValueOnce(new Error('error'));
    const response = await borrarPost('borrar');
    expect(response.deleteDoc).toHaveBeenCalledTimes(1);
  });
  test('deberia borrar el post', async () => {
    deleteDoc.mockReturnValueOnce({ contenido: '' });
    const response = await borrarPost('borrar', '');
    expect(response.contenido).toBe('');
  });
});

describe('editarPost', () => {
  test('es una funcion', () => {
    expect(typeof editarPost).toBe('function');
  });
  test('deberia llamar a la funcion updateDoc cuando es ejecutada', async () => {
    await editarPost('editar');
    expect(updateDoc).toHaveBeenCalled();
  });
  test('deberia editar el post', async () => {
    updateDoc.mockReturnValueOnce({ contenido: 'editPost' });
    const response = await editarPost('editar', 'editPost');
    expect(response.contenido).toBe('editPost');
  });
});

describe('likesPost', () => {
  test('es una funcion', () => {
    expect(typeof likesPost).toBe('function');
  });
  test('deberia dar like al post', async () => {
    updateDoc.mockReturnValueOnce({ likes: 'arrayUnion' });
    const response = await likesPost('likes', 'arrayUnion');
    expect(response.likes).toBe('arrayUnion');
  });
  test('deberia llamar a la funcion updateDoc cuando es ejecutada', async () => {
    await likesPost('likes', 'arrayUnion');
    expect(updateDoc).toHaveBeenCalled();
  });
});

describe('removeLike', () => {
  test('es una funcion', () => {
    expect(typeof removeLike).toBe('function');
  });
  test('deberia quitar el like del post', async () => {
    updateDoc.mockReturnValueOnce({ likes: '' });
    const response = await removeLike('arrayRemove');
    expect(response.likes).toBe('');
  });
  test('deberia llamar a la funcion updateDoc cuando es ejecutada', async () => {
    await removeLike('likes', 'arrayRemove');
    expect(updateDoc).toHaveBeenCalled();
  });
});
