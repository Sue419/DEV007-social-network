import { QuerySnapshot } from 'firebase/firestore';
import { crearPost, obtenerTodosLosPost } from '../lib';

export const feed = (onNavigate) => {
<<<<<<< HEAD
// HTML
  const homeDiv = document.createElement('div');
  homeDiv.textContent = 'Bienvenid@s a {LABGRAM]';
  homeDiv.className = 'home-div';
  const buttonHome = document.createElement('button');

  buttonHome.classList = 'home-div__button';
  buttonHome.textContent = 'Regresar al Home';

  buttonHome.addEventListener('click', () => onNavigate('/'));

  homeDiv.innerHTML += `
=======

const homeDiv = document.createElement("div");
homeDiv.classList.add("containerFeed");
homeDiv.innerHTML += `
<div class="form-container feed-container">
<form class="textCenter">
<h1>Bienvenid@s a {LABGRAM}</h1>
<h2>Publicaciones</h2>
>>>>>>> 84eb943d787ea3719e0a0aeffca4c2d70a5de85e
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

<<<<<<< HEAD
  homeDiv.querySelector('.new-post__container__button').addEventListener(
    'click',
    () => {
      const contenidoDelTextarea = homeDiv.querySelector('.new-post__container__textarea');
      crearPost(contenidoDelTextarea.value).then(() => {
        contenidoDelTextarea.value = '';
        homeDiv.querySelector('.publicaciones').innerHTML = '';
        obtenerTodosLosPost().then((QuerySnapshot) => {
          QuerySnapshot.forEach((doc) => {
            homeDiv.querySelector('.publicaciones').innerHTML += `
              <div class="posts__post">
                <p>${doc.data().contenido}</p>
              </div>
              `;
          });
        });
      });
      // console.log(contenidoDelTextarea.value);
    },
  );
  // <h3>${doc.data().usuario}</h3>va en fila43
  // <div class="usuario__user"><h3>Jo</h3></div> va en fila 25

  homeDiv.appendChild(buttonHome);
  return homeDiv;
};
=======
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
    }
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
}
>>>>>>> 84eb943d787ea3719e0a0aeffca4c2d70a5de85e
