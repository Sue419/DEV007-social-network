// SE IMPORTAN LAS FUNCIONES A TESTEAR:::::::::::::::::::::::::::::::::::::::::::::::::::
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { crearUsuarioYContraseña, loginUsuarioYContraseña } from '../src/lib/index';

// IDENTIFICAMOS A QUE ARCHIVO LE HAREMOS MOCK PARA TEST:::::::::::::::::::::::::::::::::
jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../firebase');

// CON ESTO LIMPIAMOS PARA QUE UN TEST NO CONTAMINE AL OTRO::::::::::::::::::::::::::::::
beforeEach(() => {
  createUserWithEmailAndPassword.mockClear();
  signInWithEmailAndPassword.mockClear();
  signInWithPopup.mockClear();
});

describe('crearUsuarioYContraseña', () => {
  test('es una función', () => {
    expect(typeof crearUsuarioYContraseña).toBe('function');
  });

  test('deberia llamar a la función createUserWithEmailAndPassword cuando es ejecutada', async () => {
    await crearUsuarioYContraseña('tetera@mail.com', 'tetera123');
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  test('Deberia devolver un objeto', async () => {
    createUserWithEmailAndPassword.mockReturnValueOnce({
      user: { email: 'tetera@mail.com' },
    });
    const response = await crearUsuarioYContraseña('tetera@mail.com', 'tetera123');
    expect(response.user.email).toBe('tetera@mail.com');
  });
});

describe('loginUsuarioYContraseña', () => {
  test('es una función', () => {
    expect(typeof loginUsuarioYContraseña).toBe('function');
  });
});
