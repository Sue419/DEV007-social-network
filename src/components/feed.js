import { crearPost, obtenerTodosLosPost } from '../lib';

export const feed = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('containerFeed');

//POST SECTION:::::::::::::::::::::::::::::::::::::.
  homeDiv.innerHTML += `
    <div class="form-container feed-container">
        <h1>Hola</h1>
        <h2>Publica tus dudas, ayuda, resultados y más del GYM y ejercítate!</h2>
        <div class="new-post__container">
          <input class="new-post__container__textarea" 
          placeholder="Escribe aqui"></input>
          <button class="new-post__container__button">Publicar</button>
        </div>
        <div class="posts__container">
        <h2>Publicaciones</h2>
        <div class="posts__post"></div>
        </div>
    </div>
  `;

//PUBLICACION DE POST:::::::::::::::::::::::::::::::::::
  const buttonPost = homeDiv.querySelector('.new-post__container__button');
  buttonPost.addEventListener('click', async (e) => {
    e.preventDefault();
    const contenidoDelTextarea = homeDiv.querySelector('.new-post__container__textarea');
    console.log(contenidoDelTextarea.value);
    try {
      await crearPost(contenidoDelTextarea.value);
      contenidoDelTextarea.value = '';
      alert('Publicación subida');
    } catch (error) {
      console.log(error.code);
    }
  });


//TODOS LOS POSTSSSS:::::::::::::::::::::::::::::::::::::
  const postDivs = document.createElement('div');
  obtenerTodosLosPost((querySnapshot) => {
    postDivs.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const idPost = doc.id;
      console.log(idPost);
      postDivs.innerHTML += `
        <div class="posts__post">
          <p>${doc.data().contenido}</p>
        </div>
      `;
    });
  });

  homeDiv.querySelector('.posts__post').appendChild(postDivs);


//BOTON REGRESAR AL LOGIN:::::::::::::::::::::::::::::::::
  const buttonLogin = document.createElement('button');
  buttonLogin.classList = 'home-div__button';
  buttonLogin.textContent = 'Regresar al Login';
  buttonLogin.addEventListener('click', () => onNavigate('/login'));

  homeDiv.appendChild(buttonLogin);
  return homeDiv;
};
