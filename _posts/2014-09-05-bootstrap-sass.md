---
layout: post
title:  "Bootstrap 3 con Sass"
description: Como usar Bootstrap 3 con Sass.
date:   2014-09-05
---

Junto con Foundation, Bootstrap es uno de los front-end frameworks más populares, a pesar de que usarlos puede ser mal visto por algunos. Yo era una de esas personas. Sin embargo, me di cuenta que tenían su lugar en algunos proyectos, sobre todo utilizando un preprocesador.

## Preprocesadores

El problema que siempre he tenido con estos frameworks es la gran cantidad de código que traen y que generalmente no es utilizado, además de todas las clases con las hay que llenar el html.

Utilizando un preprocesador podemos resolver estos problemas. [Bootstrap](http://www.getbootstrap.com/) utiliza Less de manera predeterminada en su sitio, pero mantiene un version de [Sass en Github](https://github.com/twbs/bootstrap-sass/). No tengo nada en contra de Less, simplemente estoy más familiarizado con Sass.

Utilizando imports podemos decidir que código incluir en la hoja de estilos, y con @extend e @include podemos crear grillas sin la necesidad de incluir tantas clases.

## Instalación

Hay varias formas para comenzar a usarlo: a través del terminal con Ruby on Rails, con Compass, Bower o descargando el archivo zip.

Personalmente prefiero usar Bower. Abro el terminal, me dirigo al lugar donde crearé mi proyecto, creo una carpeta y ejecuto el siguiente comando:

{% prism bash %} 
$ bower install bootstrap-sass-official
{% endprism %}

### Compilando Sass

Normalmente uso Grunt para compilar mi Sass además de ejecutar otras tareas, pero dejaré eso para otro post. Existen también programas con un interfaz gráfico en caso de que no te sientas cómodo usando el terminal. Para los usuarios de Mac está [Codekit](https://incident57.com/codekit/), [Prepros](http://alphapixels.com/prepros/) está disponible tanto para usuarios de Windows y Mac, al igual que [Koala](http://koala-app.com/). Sin embargo, esto es fácil de hacer desde el terminal:

{% prism bash %} 
$ sass --watch tu-archivo-sass.scss:tu-archivo-css.css
{% endprism %}

(*Estoy asumiendo que ya tienen instalado Ruby y el gem de Sass*).

Importamos Bootstrap en nuestro archivo .scss y estamos listo para comenzar:

{% prism scss %} 
@import "bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap";
{% endprism %}

## Empecemos a utilizar Sass

Habíamos quedado en que usando un preprocesador podemos entre otras cosas elegir que código incluimos, modificar los valores de manera sencilla y obviamente aprovechar todos los beneficios del preprocesador que hayamos seleccionado.

### Usando grillas con Bootstrap 3 y Sass

Desde su versión 3, Bootstrap nos permite utilizar clases para crear columnas de distintos tamaños dependiendo del ancho de la pantalla. Estas son: **.col-sm-x**, **.col-md-x** y **.col-lg-x**. Si usáramos su versión solo con css podríamos hacer algo así:

{% prism markup %}
<div class="row">
    <div class="habilidades col-md-6 col-lg-8">
        contenido
    </div>

    <div class="lista-habilidades col-md-6 col-lg-4">
        contenido
    </div>
</div>
{% endprism %}

Funciona perfectamente bien, pero con Sass podemos eliminar el uso de esas clases y dejar nuestro html un poco más limpio:

{% prism scss %}
.habilidades {
    @include make-md-column(6);
    @include make-lg-column(8);
}
{% endprism %}

O mejor aun, podemos utilizar @extend para agrupar los selectores con las mismas propiedades:

{% prism scss %}
.habilidades {
    @extend .col-md-6;
    @extend .col-lg-8;
}
{% endprism %}

Nos daría el mismo resultado que usando la versión sin preprocesador, pero en este caso el html sería el siguiente:

{% prism markup %}
<div class="row">
    <div class="habilidades">
        // contenido
    </div>

    <div class="lista-habilidades">
        // contenido
    </div>
</div>
{% endprism %}

### Modificando valores

Bootstrap viene con el código separado en distintos módulos. La estructura inicial del archivo _bootstrap.scss debería ser más o menos así:

{% prism scss %}
// Core variables and mixins
@import "bootstrap/variables";
@import "bootstrap/mixins";

// Reset and dependencies
@import "bootstrap/normalize";
@import "bootstrap/print";
@import "bootstrap/glyphicons";

// Core CSS
@import "bootstrap/scaffolding";
@import "bootstrap/type";
@import "bootstrap/code";
@import "bootstrap/grid";
@import "bootstrap/tables";
@import "bootstrap/forms";
@import "bootstrap/buttons";

// Components
@import "bootstrap/component-animations";
@import "bootstrap/dropdowns";
@import "bootstrap/button-groups";
@import "bootstrap/input-groups";
@import "bootstrap/navs";
@import "bootstrap/navbar";
@import "bootstrap/breadcrumbs";
@import "bootstrap/pagination";
@import "bootstrap/pager";
@import "bootstrap/labels";
@import "bootstrap/badges";
@import "bootstrap/jumbotron";
@import "bootstrap/thumbnails";
@import "bootstrap/alerts";
@import "bootstrap/progress-bars";
@import "bootstrap/media";
@import "bootstrap/list-group";
@import "bootstrap/panels";
@import "bootstrap/responsive-embed";
@import "bootstrap/wells";
@import "bootstrap/close";

// Components w/ JavaScript
@import "bootstrap/modals";
@import "bootstrap/tooltip";
@import "bootstrap/popovers";
@import "bootstrap/carousel";

// Utility classes
@import "bootstrap/utilities";
@import "bootstrap/responsive-utilities";
{% endprism %}

De esta forma si no queremos incluir algo, simplemente lo desactivamos, y si más adelante deseamos usarlo, lo volvemos a activar:

{% prism scss %}
// Reset and dependencies
@import "bootstrap/normalize";
@import "bootstrap/print";
// @import "bootstrap/glyphicons"; desactivamos los glyphicons
{% endprism %}

### Como cambiar los breakpoints

Dentro de _variables.scss se pueden modificar los valores predeterminados. Colores, tipografía, botones, etc. Si quiesieramos cambiar los breakpoints por ejemplo, buscamos los media queries en el archivo y los cambiamos aca:

{% prism scss %}
// Small screen / tablet
//** Deprecated `$screen-sm` as of v3.0.1
$screen-sm:                  768px !default;
$screen-sm-min:              $screen-sm !default;
//** Deprecated `$screen-tablet` as of v3.0.1
$screen-tablet:              $screen-sm-min !default;

// Medium screen / desktop
//** Deprecated `$screen-md` as of v3.0.1
$screen-md:                  992px !default;
$screen-md-min:              $screen-md !default;
//** Deprecated `$screen-desktop` as of v3.0.1
$screen-desktop:             $screen-md-min !default;

// Large screen / wide desktop
//** Deprecated `$screen-lg` as of v3.0.1
$screen-lg:                  1200px !default;
$screen-lg-min:              $screen-lg !default;
//** Deprecated `$screen-lg-desktop` as of v3.0.1
$screen-lg-desktop:          $screen-lg-min !default;
{% endprism %}

### Como usar media queries en Bootstrap

Cuando comencé trabajando con Responsive design y aun escribía css puro, ponía los media queries al fondo del documento y dentro de cada media query escribía todos los selectores correspondientes. El problema de esto es que cada vez que tenía que cambiar algo había que bajar, buscar el media query correspondiente y luego el selector dentro de un mar de selectores. 

Si estás empezando a usar Sass, pero aun estás acostumbrado al método descrito anteriormente y prefieres ir dando pequeños pasos hasta sentirte más cómodo puedes poner todos los media queries en un partial, o crear un partial para cada uno con un nombre que los identifique facilmente:

**Opción 1 - Todos los media queries dentro de un partial**
{% prism bash %}
_media-queries.scss
{% endprism %}

Y luego los media queries adentro.

{% prism scss %}
@media (min-width: $screen-sm-min) { 
    // Todos los selectores para este breakpoint
}
@media (min-width: $screen-md-min) {
    // Todos los selectores para este breakpoint
}
@media (min-width: $screen-lg-min) {
    // Todos los selectores para este breakpoint
}
{% endprism %}

**Opción 2 - Dividir los breakpoint en distintos partials**

{% prism bash %}
_breakpoint-small.scss
_breakpoint-medium.scss
_breakpoint-large.scss
{% endprism %}

Y luego el media query correspondiente en cada partial.

{% prism scss %}
// partial _breakpoint-small.scss
@media (min-width: $screen-sm-min) { 
    // Todos los selectores para este breakpoint
}
{% endprism %}

Aca lo único que hacemos es agrupar los media queries en archivos para facilitar un poco la búsqueda, tomar las variables definidas en _variables.scss y las usamos para crear los media queries.

#### Usando mixins
Personalmente me gusta crear un mixin y en vez de tener un montón de selectores dentro de un media query, prefiero poner media queries dentro del selector que lo necesite. Esto evita que tenga que ir a otro lado y buscar donde los puse dentro de un mar de selectores. Primero creamos el mixin:

{% prism scss %}
@mixin breakpoint($mq) {
    @if $mq == small {
        @media (min-width: 768px) {
            @content;
        }
    } @else if $mq == medium {
        @media (min-width: 992px) {
            @content;
        }
    }  @else if $mq == large {
        @media (min-width: 1200px) {
            @content;
        }
    }  
}
{% endprism %}

Ahora cada vez que queramos poner un breakpoint lo podemos usar directamente dentro del selector usando un `@include sin la necesidad de escribir todo el código necesario para un media query:

{% prism scss %}
.habilidades {
    // en pantallas menores a 768px el color será rojo
    color: red; 
    // en pantallas desde 768px el color será azul
    @include breakpoint(small) {
        color: blue;
    }
    // en pantallas desde 992px el color será verde
    @include breakpoint(medium) {
        color: green;
    }
    // en pantallas desde 1200px el color será amarillo
    @include breakpoint(large) {
        color: yellow;
    }
}
{% endprism %}
