import { crearPost, obtenerTodosLosPost } from '../lib';

export const feed = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('containerFeed');
  homeDiv.innerHTML += `
    <div class="form-container feed-container">
      <form class="textCenter">
        <h1>Bienvenid@s a {LABGRAM}</h1>
        <h2>Publicaciones</h2>
        <div class="new-post__container">
          <textarea class="new-post__container__textarea" placeholder="Escribe aqui"></textarea>
          <button class="new-post__container__button">Publicar</button>
        </div>
        <section class="posts__container">
        </section>
      </form>
    </div>
  `;

  const buttonLogin = document.createElement('button');
  buttonLogin.classList = 'home-div__button';
  buttonLogin.textContent = 'Regresar al Login';
  buttonLogin.addEventListener('click', () => onNavigate('/login'));

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

  const postDivs = document.createElement('div');
  obtenerTodosLosPost((querySnapshot) => {
    postDivs.innerHTML = '';
    querySnapshot.forEach((doc) => {
      postDivs.innerHTML += `
        <div class="posts__post">
          <p>${doc.data().contenido}</p>
        </div>
      `;
    });
  });

  homeDiv.querySelector('.posts__container').appendChild(postDivs);
  homeDiv.appendChild(buttonLogin);
  return homeDiv;
};
