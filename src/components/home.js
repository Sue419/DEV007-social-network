export const home = (onNavigate) => {
  // HTML:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('container');
  const viewHome = `
    <h1 class="labgram-texto">LABGRAM</h1>
    <p class="p-texto">TU ESPACIO PARA COMPARTIR EJERCICOS DEL GYM</p>
    <img class="logo-labgram"src="img/log_720.png" alt="logo">
  `;
  homeDiv.innerHTML += viewHome;

  // BOTON INICIO::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = 'Inicia sesión';
  homeDiv.appendChild(buttonLogin);
  buttonLogin.addEventListener('click', () => onNavigate('/login'));
  buttonLogin.classList.add('btn-iniciarSesion');

  // BOTON REGISTRARSE:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'Registrate';
  homeDiv.appendChild(buttonRegister);
  buttonRegister.addEventListener('click', () => onNavigate('/register'));
  buttonRegister.classList.add('btn-register');
  return homeDiv;
};
