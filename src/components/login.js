export const login = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.textContent = 'Bienvenida al Login';
  const buttonHome = document.createElement('button');

  buttonHome.textContent = 'Regresar al Home';

  buttonHome.addEventListener('click', () => onNavigate('/'));

  homeDiv.appendChild(buttonHome);

  return homeDiv;
};
