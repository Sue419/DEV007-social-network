PORTADA LAGBRAM IMAGEN

# LABGRAM

## Índice

* [1. Definición del proyecto](#1-definición-del-proyecto)
* [2. Historias de usuarios](#2-historias-de-usuarios)
* [3. Prototipos de proyecto](#3-prototipos-de-proyecto)
* [4. Desarrollo del proyecto](#4-desarrollo-del-proyecto)
* [5. Test unitarios](#5-test-unitarios)
* [6. Planificación](#6-planificación)
* [7. Material utilizado](#7-material-utilizado)

***

## 1. Definición del proyecto

Nuestro proyecto LABGRAM nacio de la necesidad de concentrar ejercicios de programación de nuestro bootcamp, observando cada semana que se realiza esta actividad, creimos necesario un espacio donde compartir las posibles soluciones a estos ejercicios y asi aprender en comunidad.
Esta pagina esta desarrollada como una SPA [Single-page Application (SPA)](https://es.wikipedia.org/wiki/Single-page_application)
[_responsive_](https://curriculum.laboratoria.la/es/topics/css/02-responsive) (con más de una vista / página)
en la que se puede **leer y escribir datos**.
Esta app utilizara los servicios de Firebase para autenticarse, crear registros, escribir post, editar y borrar, etc.

## 2. Historias de usuario

**Historia de usuario 1:**

*que dice esta historia*
*criterios de aceptación*
*plantilla historias de usuario*
Historias de usuario

Una vez que entiendas las necesidades de tus usuarixs, escribe las Historias de
Usuario que representen todo lo que necesitan hacer/ver en la Red Social. Cada
una de tus Historias de Usuario debe tener:

* **Criterios de Aceptación:** todo lo que debe ocurrir para satisfacer las
  necesidades del usuario.

* **Definición de terminado:** todos los aspectos técnicos que deben cumplirse
  para que, como equipo, sepan que esa historia está terminada y lista
  para publicarse. **Todas** tus Historias de Usuario (salvo excepciones), deben
  incluir estos aspectos en su Definición de Terminado (más todo lo que
  necesiten agregar):

  - Debe ser una SPA.
  - Debe ser _responsive_.
  - Deben haber recibido _code review_ de al menos una compañera de otro equipo.
  - Hicieron los _test_ unitarios
  - Testearon manualmente buscando errores e imperfecciones simples.
  - Hicieron _pruebas_ de usabilidad e incorporaron el _feedback_ de los
    usuarios como mejoras.
  - Desplegaron su aplicación y etiquetaron la versión (git tag).
  Quiénes son los principales usuarios de producto.
* Qué problema resuelve el producto / para qué le servirá a estos usuarios.

## 3. Prototipos de proyecto

Teniendo entendidas las hisotorias de usuarios y desarrollando nuestra creatividad, comenzamos a diseñar nuestros prototipos de diseño en Figma.

**Prototipo baja fidelidad**

**Prototipo alta fidelidad**

Link Prototipos alta y baja fidelidad

[link figma](https://www.figma.com/file/dbAofymZlDqIP3kV73uvzZ/Social-Network---Labgram-(tu-gym%2C-nuestro-gym)?type=design&node-id=0-1&mode=design&t=3jaGlObclraCqkPu-0)


## 4. Desarrollo del proyecto

* Este proyecto se debe trabajar en equipos de tres.

* El rango de tiempo estimado para completar el proyecto es de 4 a 5 Sprints.

* La lógica del proyecto debe estar implementada completamente en JavaScript
  (ES6+), HTML y CSS :smiley:. Para este proyecto **no está permitido** utilizar
  _frameworks_ o librerías de CSS y JS.

* La división y organización del trabajo debe permitir, sin excepciones, que
  **cada integrante** del equipo practique el aprendizaje de todo lo involucrado
  en **cada historia**. _No se dividan el trabajo como en una fábrica._
  - ¿Hasta acá has avanzado en tus proyectos con cierta fluidez y sin mayores
    problemas? Sé generosa con tus compañeras, permíteles aprender y practicar
    sin restricciones, aunque tome un poco más de tiempo. Aproveha de
    _coachearlas_, de hacer _pair programming_, una de las mejores maneras de
    aprender es explicando verbalmente.

  - ¿Se te está haciendo difícil y te cuesta un poco más avanzar? No te quedes
    con las partes "fáciles" del proyecto, conversa, negocia, exige tu oportunidad
    para practicar y aprender lo que se te hace más difícil.

* Solamente pueden trabajar en una única historia por vez, no pueden avanzar a
  la siguiente sin haber completado la anterior. La historia se completa cuando
  se cumplen **todos** sus Criterios de Aceptación + **toda** su Definición
  de Terminado.

Para comenzar tendrás que hacer un _fork_ y _clonar_ este repositorio.

## 5. Test unitarios

### 5.1 Boilerplate

Este proyecto no incluye un _boilerplate_ completo, solo algunos archivos de
configuración basico, así es que tendrás que definir la estructura de carpetas
y escribir tus propias Pruebas Unitarias (_tests_). Para hacerlo, puedes guiarte
de los proyectos anteriores y/o organizar los archivos siguiendo una estructura
de [Modelo-Vista-Controlador](https://developer.mozilla.org/es/docs/Glossary/MVC).

En este proyecto vamos a usar una herramienta llamada
[Vite](https://es.vitejs.dev/) para empaquetar nuestros módulos y arrancar
el servidor de desarrollo, el cual provee nuestros archivos utilizando
la estrategia `Hot Module Replacement`
[(HMR)](https://es.vitejs.dev/guide/features.html#hot-module-replacement),
esto significa que cuando hagas cambios en los archivos que estén siendo
servidos, el navegador automáticamente se actualizará sin tener que refrescar
y volver a cargar todo el sitio. Debes tener especial cuidado de no tener
ninguna _dependencia circular_ en tu código ya que
[eso puede ocasionar problemas con HMR](https://es.vitejs.dev/guide/troubleshooting.html#ocurre-un-refresco-completo-en-lugar-de-hmr).
(`eslint-plugin-import` tiene una regla
[import/no-cycle](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md)
que va a avisar si las tiene.)

## 6. Planificación

El proyecto será _entregado_ subiendo tu código a GitHub (`commit`/`push`) y la
interfaz será desplegada usando GitHub pages u otro servicio de hosting
(Firebase, Netlify, Vercel, etc) que puedas haber encontrado en el camino.
Revisa la [documentación de Vite](https://vitejs.dev/guide/static-deploy.html)
para guiarte con eso.

Link Trello 

[link trello](https://trello.com/b/YE89Cj6d/social-network)

## 7. Material utilizado

### Mobile first

El concepto de [_mobile first_](https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/)
hace referencia a un proceso de diseño y desarrollo donde partimos de cómo se ve
y cómo funciona la aplicación en un dispositivo móvil primero, y más adelante se
ve como adaptar la aplicación a pantallas progresivamente grandes y
características específicas del entorno desktop. Esto es en contraposición al
modelo tradicional, donde primero se diseñaban los websites (o webapps) para
desktop y después se trataba de _arrugar_ el diseño para que entre en pantallas
más chicas. La clave acá es asegurarse de que desde el principio diseñan usando
la vista _responsive_ de las herramientas de desarrollador (developer tools) del
navegador. De esa forma, partimos de cómo se ve y comporta la aplicación en una
pantalla y entorno móvil.

### Múltiples vistas

En proyectos anteriores nuestras aplicaciones habían estado compuestas de una
sola _vista_ principal (una sóla _página_). En este proyecto se introduce la
necesidad de tener que dividir nuestra interfaz en varias _vistas_ o _páginas_
y ofrecer una manera de navegar entre estas vistas. Este problema se puede
afrontar de muchas maneras: con archivos HTML independientes (cada uno con su
URL) y links tradicionales, manteniendo estado en memoria y rederizando
condicionalmente (sin refrescar la página), [manipulando el historial del
navegador](https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador)
con [`window.history`](https://developer.mozilla.org/es/docs/Web/API/Window/history).
En este proyecto te invitamos a explorar opciones y decidir una opción
de implementación.

### Escritura de datos

En los proyectos anteriores hemos consumido (leído) datos, pero todavía no
habíamos escrito datos (salvar cambios, crear datos, borrar, ...). En este
proyecto tendrás que crear (salvar) nuevos datos, así como leer, actualizar y
modificar datos existentes. Estos datos se podrán guardar de forma remota
usando [Firebase](https://firebase.google.com/).

Para usar Firebase hay que crear un proyecto en la consola de Firebase e
instalar la dependencia `firebase` utilizando `npm`.
Lee [las instrucciones paso a paso aqui](https://firebase.google.com/docs/web/setup).

Otras:

* [Modulos: Export](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export)
* [Modulos: Import](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import)
* [Diseño web, responsive design y la importancia del mobile first - Media Click](https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/)
* [Mobile First: el enfoque actual del diseño web móvil - 1and1](https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/)
* [Mobile First - desarrolloweb.com](https://desarrolloweb.com/articulos/mobile-first-responsive.html)
* [Mobile First Is NOT Mobile Only - Nielsen Norman Group](https://www.nngroup.com/articles/mobile-first-not-mobile-only/)
