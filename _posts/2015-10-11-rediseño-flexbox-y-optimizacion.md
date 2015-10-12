---
layout: post
title:  "Rediseño, flexbox y optimización"
description: Cómo optimizar tu sitio para que carge en menos de un segundo.
date:   2015-10-11
---

Decidí rediseñar mi sitio. Ya tenía más de un año y había un par de cosas que quería probar -como flexbox por ejemplo. [Aquí](https://onepagelove.com/obaez) un enlace al diseño antiguo, cuando onepagelove aun era gratis.

En terminos visuales no es mucho lo que cambié, sigue siendo un sitio de una sola página, con 4 items de mi portafolio, una pequeña sección sobre mí y la sección de contacto. Lo principal era optimizar el código (el sitio anterior tenía unos mixins que los miro ahora y se me cae la cara de vergüenza), eliminar todos esos efectos de animación que estaban demás (Que levante la mano quien a visto un sitio con elementos apareciendo desde los costados, desde arriba o abajo mientras haces scroll), enfocarme en la rapidez de carga del sitio, o más bien la percepción de carga -ya hablaré de eso más en profundidad- y también me interesaba probar flexbox.

## Estructura

Con el tiempo la forma en que vas organizando el códido va cambiando, la estructura de archivos `SCSS` que uso ahora no es la misma que hace un año por ejemplo. Actualmente creo distintas carpetas con partials adentro. Un ejemplo de como estructuraría mi código sería: 

<pre>
<code class="language-bash">scss/
|
|-- utils/
|   |-- _config.scss
|   |-- _mixins.scss
|   |-- _extends.scss
|
|-- base/
|   |-- _global.scss
|   |-- _typography.scss   
|
|-- layout/
|   |-- _header.scss
|   |-- _navigation.scss
|   |-- _footer.scss
|  
|-- components/
|   |-- _pagination.scss
|   |-- _buttons.scss
|   
|-- vendor/
|   |-- _prism.scss
|
|-- main.scss</code>
</pre>  

Lo primero que hago es crear un archivo `_config.scss`. Aquí pongo todas las variables y suelo crear un mapa para los breakpoints. Así se ve mi archivo actualmente:

<pre>
<code class="language-scss">/* GONFIG
-------------------------------------------------*/
/* Fonts
-------------------------------*/

/* Font family */
$fontFamilyPrimary: 'proxima-nova', sans-serif;

/* Font weight */
$fontWeightLight: 300;
$fontWeightMedium: 500;

/* Colors
-------------------------------*/

/* Descriptive colors */
$white: #fff;
$black: #000;
$grey: #333;
$pelorous: #41bec5;
$shakespeare: #52b3d9;
$alabaster: #f9f9f9;
$curious: #3498DB;

/* Color usage */
$colorPrimary: $pelorous;
$colorPrimaryLight: lighten($pelorous, 5%);
$colorBase: $grey;
$colorPortfolioOne: $shakespeare;
$colorSection: $alabaster;
$colorLink: $curious;

/* Space
-------------------------------*/
$space: 40px;
$spaceDouble: 80px;

/* Breakpoints
-------------------------------*/
$bpoints: (
    'xsmall' : ( min-width: 450px ),
    'small'  : ( min-width: 550px ),
    'medium' : ( min-width: 850px ),
    'large'  : ( min-width: 1200px )
);</code>
</pre>

Lo importante es crear una estructura organizada que te permita trabajar de manera eficaz, que tenga sentido para poder agregar código donde corresponde haciéndolo más fácil de mantener.

## Optimización y speedindex

El usuario espera que un sitio cargue rápidamente, en pleno 2015 esto no es ninguna novedad y existen multiples herramientas que te ayudan a identificar que cosas puedes mejorar. Hace no tanto bastaba con hacer lo básico, lo cual era:

1. Tener una sola hoja de estilo con el código minimizado.
2. Minimizar y concatenar el javascript.
3. Poner el javascript al final, justo antes del `</body>`.
4. Utilizar compresión con gzip.
5. Optimizar imágenes.
6. Utilizar caching.

Con esto estabas listo, we can call it a day y nos vamos a casa. Sin embargo, las cosas han ido cambiando y los requerimientos ahora son mayores. Hablamos de un sitio que cargue en menos de 1 segundo como objetivo. Para ser más precisos ese segundo no se refiere a la carga total de la página. Es aquí donde entre el concepto del speedindex. El speedindex es una métrica que mide el tiempo en que el contenido arriba del fold está visiblemente completo. En palabras simples, el tiempo en que se demora el navegador en mostrar lo que vemos antes de hacer scroll, este es el tiempo que percibe el usuario. Todo lo que está abajo del fold "no nos interesa", para que el usuario perciba que el sitio carga instantaneamente nos enfocamos en el contenido visible arriba del fold y que eso esté visible en el menor tiempo posible. La pregunta es, qué tan rápido podemos hacer que ese contenido esté visible? Hoy en día el objetivo es conseguir un speedindex inferior a 1000ms.

### Pagespeed Insights

Una de las herramientas más populares es el [Google Pagespeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=es). Ponemos la url y nos indica todo lo que tenemos que mejorar. Una de las recomendaciones más críticas y que a muchos les cuesta entender el significado es "Eliminar el JavaScript que bloquea la visualización y el CSS del contenido de la mitad superior de la página". Esto es muy importante y vital a la hora de conseguir un speedindex inferior a 1000. Lo que nos están diciendo es que hay hoja(s) de estilos y scripts que están bloqueando la visualización del contenido arriba del fold, esto también suele incluir los famosos webfonts. 

### La solución

Para eliminar todo lo que bloquea la visualización del contenido, basicamente lo que necesitamos es un `<head>` limpio. A qué me refiero con esto? nada de scripts en el head, todo abajo como ya lo mencioné en la lista anterior. Pero que pasa con la hoja de estilos? si la cargamos de manera async, vamos a tener algún segundo en el cual el usuario verá el sitio como si no existiese el css y luego bruscamente todo se verá como debiese. La clave está en usar inline styling. Queremos poner todo el código que es crítico y esencial para que la parte arriba del fold se vea en un `<style></style>` y luego cargar la hoja de estilos de manera async. De esta manera evitamos ese flash donde tenemos un sitio sin css y la hoja de estilos ya no está bloqueando la carga del contenido. Para esto existen herramientas que automatizan el proceso. Personalmente utilizo grunt y el plugin [criticalcss](https://github.com/filamentgroup/grunt-criticalcss).

Este plugin analiza cual es el código que necesitamos y que pondremos como inline en el head. Ok, tenemos la herramienta para eso, ahora hay que cargar la hoja de estilos de manera async. Para eso utilizo [loadcss](https://github.com/filamentgroup/loadCSS). Así es como se ve en el head:

<pre>
<code class="language-javascript">&lt;script&gt;
  // include loadCSS here...
  function loadCSS( href, before, media ){ ... }
  // load a file
  loadCSS( "path/to/mystylesheet.css" );
&lt;/script&gt;
&lt;noscript&gt;&lt;link href="path/to/mystylesheet.css" rel="stylesheet">&lt;/noscript&gt;</code>
</pre>

### Resultado

![alt text](/img/pagespeed.jpg "Pagespeed Insights")

Otra de las herramientas esenciales es [webpagetest.org](http://www.webpagetest.org/). Esta te permite ver el speedindex:

![alt text](/img/speedindex.jpg "Speedindex")

Como se puede ver en la foto el speedindex es de 800. Esto significa que en 0.8 segundos el sitio está visualmente completo. Esa es la percepción del usuario al ingresar y eso es lo que nos interesa, no el tiempo en que todo el sitio tarde en cargar.

## Flexbox y Jekyll

Hace mucho tiempo que vengo trabajando en proyectos con Jekyll, ya sea alguno open source como [dentistSmile](https://github.com/obaez/dentistsmile), o uno comercial en [Themeforest](http://themeforest.net/item/vida-responsive-jekyll-blog/12420034?s_phrase=&s_rank=1). El diseño anterior estába hecho con Jekyll y eso no cambió esta vez, lo que me interesaba era utilizar el rediseño como una oportunidad de aprender un poco más sobre flexbox. El nuevo sitio no utiliza floats ni clearfix, todo está hecho con flexbox y la verdad es difícil no entusiasmarse cuando puedes por ejemplo crear columnas de igual altura tan facilmente. El problema es el soporte en los navegadores. Internet Explorer siempre está ahí para arruinar la fiesta (flexbox solo tiene soporte desde IE10), pero todo depende de tu audiencia, de quien visita tu sitio, y para eso están herramientas como Google analytics. La cantidad de usuarios que utilizan IE8-IE9 hoy en día es bajísima, y si bien aun no es algo que he podido usar en proyectos con clientes porque la gran mayoría aun exige soporte para esos navegadores. Viendo las estadísticas de mi sitio, los usuarios entrando a través de esos navegadores son inexistentes.

Aun no he hecho pruebas en distintos navegadores, cuando tenga más tiempo veré que tal está funcionando en Edge y otros browsers. El portafolio es tu espacio para probar cosas nuevas y mientras tengas algo de tiempo no está demás ir aprendiendo cosas nuevas, y si algo se rompe, pues se arregla y no pasa nada.

Por último, dejo un enlace al repositorio en Github con todo el [código del sitio](https://github.com/obaez/obaezv3).