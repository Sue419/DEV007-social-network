import { async } from 'regenerator-runtime';
import { crearUsuarioYContraseña, loginUsuarioYContraseña } from '../src/lib/index';
import { createUserWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth');

describe('crearUsuarioYContraseña'), () => {
  
  it('es una función', () => {
    expect(typeof crearUsuarioYContraseña).toBe('function');
  });

  it('deberia llamar a la función createUserWithEmailAndPassword cuando es ejecutada', async () => {
    await crearUsuarioYContraseña('tetera@mail.com', 'tetera123');
    expect (createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it('Deberia devolver un objeto')






};





describe('loginUsuarioYContraseña', () => {
  it('es una función', () => {
    expect(typeof loginUsuarioYContraseña).toBe('function');
  });
});
