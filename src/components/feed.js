/** @format */
import {
  crearPost,
  obtenerTodosLosPost,
  borrarPost,
  currentUserInfo,
  editarPost,
  likesPost,
  removeLike,
  usuarioLogeado,
  logOut,
} from '../lib/index.js';

// CONTENEDOR DE PUBLICACIONES:::::::::::::::::::::::::::::::::::::::::::::
export const feed = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('fondo-feed');
  homeDiv.classList.add('colorLetras');
  homeDiv.innerHTML += `
  <div class="form-container feed-container">
  <div class="barra-morada-feed">
    <h2 class="labgram-text-feed">LABGRAM </h2>
    <button class="btn-cerrar-sesion" id=btnCerrarSesion>
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout-2" width="60" height="60"
        viewBox="0 0 24 24" stroke-width="1.5" stroke="#c574c1" fill="none" stroke-linecap="round"
        stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
        <path d="M15 12h-12l3 -3" />
        <path d="M6 15l-3 -3" />
      </svg>
    </button>
  </div>
  <div class="perfil-usuario">
    <h1 class="saludo">¡Hola!</h1>
    <h2 class="usuario-saludo">${usuarioLogeado()}</h2>
    <h2 class="bienvenida-feed">Bienvenida a tu espacio para compartir ejercicios del GYM</h2>
    <br><br>
  </div>
  <div class="new-post__container ">
    <textarea class="new-post__container__textarea texto-publicacion" placeholder="Escribe algo aquí"></textarea>
    <button class="new-post__container__button btn-compartir">Compartir</button>
  </div>
  <section class="posts__container">
  </section>
</div>
  `;

  // BOTON CERRAR SESION
  const buttonOut = homeDiv.querySelector('#btnCerrarSesion');
  buttonOut.addEventListener('click', () => {
    logOut().then(() => onNavigate('/'));
  });

  // BOTON PUBLICAR POST::::::::::::::::::::::::::::::::::::::::::::::::::::
  const buttonPost = homeDiv.querySelector('.new-post__container__button');
  const postDivs = document.createElement('div');

  // PUBLICAR POST::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  buttonPost.addEventListener('click', async (e) => {
    e.preventDefault();
    const contenidoDelTextarea = homeDiv.querySelector(
      '.new-post__container__textarea',
      '.firma',
    );
    if (contenidoDelTextarea.value === '') {
      // alert('completa todos los campos');
      return;
    }
    try {
      await crearPost(contenidoDelTextarea.value, currentUserInfo().email);
      contenidoDelTextarea.value = '';
      // console.log(currentUserInfo());
      // console.log(usuarioLogeado());//LO MUESTRA EN CONSOLA MAS NO EN EL POST
      // alert('Publicación subida');
    } catch (error) {
      // console.log(error.code);
    }
    // console.log(contenidoDelTextarea.value);
  });

  // FUNCION BORRAR POST:::::::::::::::::::::::::::::::::::::::::::::::::::::
  function borrar() {
    const botonesBorrar = postDivs.querySelectorAll('.btn-borrar-post');
    botonesBorrar.forEach((btnBorrar) => {
      btnBorrar.addEventListener('click', () => {
        const idPost = btnBorrar.id;
        const idPostUser = btnBorrar.dataset.user;
        if (currentUserInfo().email === idPostUser) {
          const confirmModal = document.createElement('div');
          confirmModal.classList.add('modal-Borrar');
          confirmModal.innerHTML = `
          <div class="modalConfirmarBorrar">
            <p>¿Estás seguro de eliminar el post?</p>
            <button class="btn-confirmar">Sí</button>
            <button class="btn-cancelar">No</button>
          </div>
        `;
          document.body.appendChild(confirmModal);
          const btnConfirmar = confirmModal.querySelector('.btn-confirmar');
          const btnCancelar = confirmModal.querySelector('.btn-cancelar');

          btnConfirmar.addEventListener('click', () => {
            borrarPost(idPost);
            confirmModal.remove();
          });

          btnCancelar.addEventListener('click', () => {
            confirmModal.remove();
          });
        } else {
          // alert('No puedes eliminar, este post no es tuyo');
        }
        // console.log(idPost);
        // console.log(currentUserInfo().email);
      });
      const useridPost = btnBorrar.dataset.user;
      if (currentUserInfo().email !== useridPost) {
        btnBorrar.style.display = 'none';
      }
    });
  }
  // FUNCION EDITAR POST::::::::::::::::::::::::::::::::::::::::::::::::::::
  function editar() {
    const botonesEditar = postDivs.querySelectorAll('.btn-editar-post');
    botonesEditar.forEach((btnEditar) => {
      btnEditar.addEventListener('click', () => {
        const postId = btnEditar.id;
        const userPostId = btnEditar.dataset.user;
        if (currentUserInfo().email === userPostId) {
          const modalContainer = document.createElement('div');
          modalContainer.classList.add('modal-container');
          const modalContent = `
            <div class="modal">
              <h1>Edita tu post</h1>
              <div contenteditable="true" id="edit" class="edit"></div>
              <button class="close">Cerrar</button>
              <button class="saveChanges">Actualizar</button>
            </div>
          `;
          modalContainer.innerHTML = modalContent;
          document.body.appendChild(modalContainer);
          const closeBtn = modalContainer.querySelector('.close');
          const saveBtn = modalContainer.querySelector('.saveChanges');
          closeBtn.addEventListener('click', () => {
            modalContainer.remove();
          });
          saveBtn.addEventListener('click', () => {
            const editPostTextarea = modalContainer.querySelector('#edit');
            const editPostContent = editPostTextarea.innerText;
            if (editPostContent !== '') {
              const updatePosts = { contenido: editPostContent };
              editarPost(postId, updatePosts);
              modalContainer.remove();
            }
          });
        } else {
          // alert('No puedes editar, este post no es tuyo');
        }
      });
      const useridPost = btnEditar.dataset.user;
      if (currentUserInfo().email !== useridPost) {
        btnEditar.style.display = 'none';
      }
    });
  }

  // FUNCION DAR LIKE A LOS POSTS :::::::::::::::::::::::::::::::::::::::
  function darLike(querySnapshot) {
    const botonesLikes = postDivs.querySelectorAll('.btn-like-post');
    botonesLikes.forEach((btnLikes) => {
      btnLikes.addEventListener('click', async () => {
        const idPost = btnLikes.id;
        const idUser = currentUserInfo().email;
        try {
          const postSnapshot = querySnapshot.docs.find(
            (doc) => doc.id === idPost,
          );
          const post = postSnapshot.data();
          if (post.likes && post.likes.includes(idUser)) {
            // El usuario puede remover el like
            await removeLike(idPost, idUser);
            // console.log('Se removio el like');
          } else {
            // Agregar el like
            await likesPost(idPost, idUser);
            // console.log('Like agregado');
          }
        } catch (error) {
          // console.log(error);
        }
      });
    });
  }

  // VER TODOS LOS POSTSSSS (ACUMULADOS):::::::::::::::::::::::::::::::::::::
  obtenerTodosLosPost((querySnapshot) => {
    postDivs.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const idUser = doc.data().usuario;
      const idPost = doc.id;
      const fecha = doc.data().date.toDate().toLocaleString();
      // console.log(idPost);
      // console.log(currentUserInfo().email);
      // console.log(usuarioLogeado());
      postDivs.innerHTML += `
      <div class="posts__post">
      <div class="barra-usuario-fecha">
        <p class="p-usuario">${doc.data().usuario}</p>
        <p class="p-fecha">${fecha}</p>
      </div>
      <p class="parrafo-post">${doc.data().contenido}</p>
      <h3 class="usuario-post"></h3>
      <div class="botones-edit-borrar-like">
        <button id=${idPost} data-user=${idUser} class="btn-borrar-post"><svg xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-trash" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="#c574c1" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg></button>
        <button id=${idPost} data-user=${idUser} class="btn-editar-post "><svg xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-edit" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="#c574c1" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
            <path d="M16 5l3 3" />
          </svg></button>
        <button id=${idPost} class="btn-like-post"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart-handshake" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c574c1" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        <path d="M12 6l-3.293 3.293a1 1 0 0 0 0 1.414l.543 .543c.69 .69 1.81 .69 2.5 0l1 -1a3.182 3.182 0 0 1 4.5 0l2.25 2.25" />
        <path d="M12.5 15.5l2 2" />
        <path d="M15 13l2 2" />
      </svg></button>
        <span class="likes-count" data-post=${idPost}>${doc.data().likes.length}</span>
        <div>
        </div>
      `;
    });
    editar();
    borrar(); // ESTO MUESTRA EL BOTON BORRAR CON LA FUNCION BORRAR OK::::::
    darLike(querySnapshot);
  });

  homeDiv.querySelector('.posts__container').appendChild(postDivs);
  return homeDiv;
};
