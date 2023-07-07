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
  usuarioLogeado,
  usuarioLogeadoRegister,
  currentUserInfo,
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
  onSnapshot.mockClear();
  updateDoc.mockClear();
});

describe('crearUsuarioYContraseña', () => {
  test('es una función', () => {
    expect(typeof crearUsuarioYContraseña).toBe('function');
  });

  test('deberia llamar a la función createUserWithEmailAndPassword cuando es ejecutada', async () => {
    await crearUsuarioYContraseña('tetera@mail.com', 'tetera123', () => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    });
  });

  test('deberia devolver undefined', async () => {
    const response = await crearUsuarioYContraseña('tetera@mail.com', 'tetera123');
    expect(response).toBeUndefined();
  });
});

describe('loginUsuarioYContraseña', () => {
  test('es una función', () => {
    expect(typeof loginUsuarioYContraseña).toBe('function');
  });

  test('debe dar error cuando no funciona', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error('error'));
    await expect(loginUsuarioYContraseña('tetera@mail.com', 'tetera123')).rejects.toThrowError('error');
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  test('deberia llamar a la función signInWithEmailAndPassword cuando es ejecutada', async () => {
    await loginUsuarioYContraseña('tetera@mail.com', 'tetera123');
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
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
});

describe('crearPost', () => {
  test('es una función', () => {
    expect(typeof crearPost).toBe('function');
  });

  test('deberia llamar a la funcion addoc cuando es ejecutada', async () => {
    await crearPost('Ejercicios GYM');
    expect(addDoc).toHaveBeenCalled();
  });

  test('deberia dar error cuando no se agrega el post', async () => {
    addDoc.mockRejectedValueOnce(new Error('error'));
    await expect(crearPost()).rejects.toThrowError('error');
    expect(addDoc).toHaveBeenCalledTimes(1);
  });
});

describe('obtenerTodosLosPost', () => {
  test('es una función', () => {
    expect(typeof obtenerTodosLosPost).toBe('function');
  });

  test('deberia llamar a la funcion onSnapshot cuando es ejecutada', async () => {
    await obtenerTodosLosPost('callback');
    expect(onSnapshot).toHaveBeenCalled();
  });

  test('deberia dar error cuando no se agregan los posts', async () => {
    const callback = jest.fn();
    onSnapshot.mockRejectedValueOnce(new Error('error'));
    await expect(obtenerTodosLosPost(callback)).rejects.toThrowError('error');
    expect(onSnapshot).toHaveBeenCalled();
    expect(callback).not.toHaveBeenCalled();
  });
});

describe('borrarPost', () => {
  test('es una función', () => {
    expect(typeof borrarPost).toBe('function');
  });

  test('deberia llamar a la funcion deleteDoc cuando es ejecutada', async () => {
    await borrarPost('borrar');
    expect(deleteDoc).toHaveBeenCalled();
  });

  test('deberia dar error cuando se eliminen los posts', async () => {
    deleteDoc.mockRejectedValueOnce(new Error('error'));
    await expect(borrarPost('borrar')).rejects.toThrowError('error');
    expect(deleteDoc).toHaveBeenCalledTimes(1);
  });

  test('deberia borrar el post', async () => {
    deleteDoc.mockResolvedValueOnce(undefined);
    const response = await borrarPost('borrar', '');
    expect(response).toBeUndefined();
  });
});

describe('editarPost', () => {
  test('es una función', () => {
    expect(typeof editarPost).toBe('function');
  });

  test('deberia llamar a la funcion updateDoc cuando es ejecutada', async () => {
    await editarPost('editar');
    expect(updateDoc).toHaveBeenCalled();
  });

  test('deberia editar el post', async () => {
    updateDoc.mockResolvedValueOnce({ contenido: 'editPost' });
    const response = await editarPost('editar', 'editPost');
    expect(response.contenido).toBe('editPost');
  });
});

describe('likesPost', () => {
  test('es una función', () => {
    expect(typeof likesPost).toBe('function');
  });

  test('deberia dar like al post', async () => {
    updateDoc.mockResolvedValueOnce(undefined);
    const response = await likesPost('likes', 'arrayUnion');
    expect(response).toBeUndefined();
  });

  test('deberia llamar a la funcion updateDoc cuando es ejecutada', async () => {
    await likesPost('likes', 'arrayUnion');
    expect(updateDoc).toHaveBeenCalled();
  });
});

describe('removeLike', () => {
  test('es una función', () => {
    expect(typeof removeLike).toBe('function');
  });

  test('deberia quitar el like del post', async () => {
    updateDoc.mockResolvedValueOnce(undefined);
    const response = await removeLike('arrayRemove');
    expect(response).toBeUndefined();
  });

  test('deberia llamar a la funcion updateDoc cuando es ejecutada', async () => {
    await removeLike('likes', 'arrayRemove');
    expect(updateDoc).toHaveBeenCalled();
  });
});

describe('usuarioLogeado', () => {
  test('es una función', () => {
    expect(typeof usuarioLogeado).toBe('function');
  });

  test('debería devolver el correo electrónico del usuario actual', () => {
    const email = usuarioLogeado();
    expect(email).toBe('tetera@mail.com');
  });
});

describe('usuarioLogeadoRegister', () => {
  test('es una función', () => {
    expect(typeof usuarioLogeadoRegister).toBe('function');
  });
  test('debería devolver el correo electrónico del usuario', () => {
    const email = usuarioLogeadoRegister();
    expect(email).toBeUndefined(); // no
  });
});

describe('currentUserInfo', () => {
  test('es una función', () => {
    expect(typeof currentUserInfo).toBe('function');
  });

  test('deberia devolver la información del usuario actual', () => {
    const response = currentUserInfo();
    expect(response.email).toBe('tetera@mail.com');
  });
});
