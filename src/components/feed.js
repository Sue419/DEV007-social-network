import { QuerySnapshot } from "firebase/firestore";
import { crearPost, obtenerTodosLosPost } from "../lib";

export const feed = (onNavigate) => {
// HTML
const homeDiv = document.createElement("div");
homeDiv.textContent = 'Bienvenid@s a {LABGRAM]';
homeDiv.className = 'home-div';
const buttonHome = document.createElement('button');

buttonHome.classList = 'home-div__button';
buttonHome.textContent = 'Regresar al Home';

buttonHome.addEventListener('click', () => onNavigate('/'));

homeDiv.innerHTML += `
<div class="new-post__container">
  <textarea class="new-post__container__textarea"></textarea>
  <button class="new-post__container__button">Publicar</button>
</div>
<section class="posts">
  <div class="posts__post">
    <p>No logro entender los ejercicios de GYM 5. Aiudaaaa!.</p>
  </div>
</section>
`;

homeDiv.querySelector('.new-post__container__button').addEventListener(
    'click', 
    () => {
        const contenidoDelTextarea = homeDiv.querySelector('.new-post__container__textarea');
        crearPost(contenidoDelTextarea.value).then(() => {
          contenidoDelTextarea.value = "";
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
 }
);
//<h3>${doc.data().usuario}</h3>va en fila43
//<div class="usuario__user"><h3>Jo</h3></div> va en fila 25

homeDiv.appendChild(buttonHome);
return homeDiv;


}