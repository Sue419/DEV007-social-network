import { QuerySnapshot } from 'firebase/firestore';
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
  <div class="posts__post">
    <p>${obtenerTodosLosPost.value}</p>
  </div>
</section>
</form>
`;

  const buttonLogin = document.createElement('button');
  buttonLogin.classList = 'home-div__button';
  buttonLogin.textContent = 'Regresar al Login';
  buttonLogin.addEventListener('click', () => onNavigate('/login'));

  homeDiv.querySelector('.new-post__container__button').addEventListener(
    'click',
    () => {
      const contenidoDelTextarea = homeDiv.querySelector('.new-post__container__textarea');
      console.log(contenidoDelTextarea.value);
      //         crearPost(contenidoDelTextarea.value).then(() => {
      //           contenidoDelTextarea.value = "";
      //           alert('Publicación subida');
      //         })
      //         .catch((error) => {
      //           alert(error);
      //         });
    },
  );
  //   homeDiv.querySelector('.publicaciones').innerHTML = '';
  //   obtenerTodosLosPost().then((QuerySnapshot) => {
  //     QuerySnapshot.forEach((doc) => {
  //       homeDiv.querySelector('.publicaciones').innerHTML += `
  //       <div class="posts__post">
  //         <p>${doc.data().contenido}</p>
  //       </div>
  //       `;
  //     });
  //   });
  // });
  // console.log(contenidoDelTextarea.value);

  homeDiv.appendChild(buttonLogin);
  return homeDiv;
};
