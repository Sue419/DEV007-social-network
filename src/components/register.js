import { crearUsuarioYContraseña } from '../lib/index.js';

export const register = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('containerRegister');
  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'Registrate';
  homeDiv.innerHTML += `
  <div class="form-container register-container">
      <form class="textCenter">
      <h1>Bienvenid@s a {LABGRAM}</h1>
        <h2>Registro</h2>
        <input  class="input-name " id="name" type="text" placeholder="Nombre">
        <input class="input-email" id="email" type="email" placeholder="Email">
        <input class="input-password" id="password"  type="password" placeholder="password">
        <input class="input-password" type="password" placeholder="Confirm password">
        <div class="social-container">
        </div>
      </form>
    </div>
  `;
  /*------------------------------------------------------*/
  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Regresar al Home';
  buttonHome.addEventListener('click', () => onNavigate('/'));
  homeDiv.appendChild(buttonHome);
  /*------------------------------------------------------*/

  const inputEmail = homeDiv.querySelector('#email');
  const inputPassword = homeDiv.querySelector('#password');

  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    crearUsuarioYContraseña(inputEmail.value, inputPassword.value);
    console.log(inputEmail.value, inputPassword.value);
  });
  homeDiv.appendChild(buttonRegister);

  return homeDiv;
};
