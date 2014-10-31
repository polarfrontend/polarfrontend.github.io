---
layout: post
title: "Aprendiendo Sass - Parte 2"
description: Como usar Sass. El uso de variables, mixins, nesting, partials e imports
date: 2014-10-31
---

Continuando con los artículos sobre preprocesadores y Sass ahora usaremos ejemplos prácticos para comenzar a usar Sass. Veremos lo básico; como usar variables, escribir mixins, usar nesting y partials.

## Lanzarse a la piscina

Recuerdo que al principio tenía miedo de usar Sass, para mi era algo nuevo y como tal me encontraba perdido y no sabía cual era la "*forma correcta*" de utilizarlo. Comencé leyendo blogs, mirando cuentas de Github de otros para ver como lo hacían, como estructuraban el código, leía la documentación en el [sitio oficial](http://sass-lang.com/documentation/file.SASS_REFERENCE.html). Todo esto es genial, es bueno para familiarizarte con el tema. Sin embargo, llega un punto en que simplemente tienes que empezar a usarlo -aunque sea paso a paso. Comienza a escribir algunas variables, anida algunos selectores para que le vayas tomando el gusto.

## Variables

Las variables te permiten guardar información para luego poder reutilizarlas. Personalmente las uso bastante para los colores. Tener que buscar un color determinado en la hoja de estilos cada vez que lo necesites es muy tedioso, guardándolos en una variable te hace la vida mucho más fácil. Para crear una variable en Sass partes usando el símbolo `$` seguido por el nombre de la variable. Este es un ejemplo:

<pre>
<code class="language-scss">$colorPrimario: #52B3D9;
$colorSecundario: #81CFE0;

h1 {
    color: $colorPrimario;
    background: $colorSecundario;
}</code>
</pre>

Lo que acabo de escribir se compila a lo siguiente:

<pre>
<code class="language-css">h1 {
    color: #52B3D9;
    background: #81CFE0;
}</code>
</pre>

Obviamente el uso de variables no se aplica exclusivamente a colores. Cuando te encuentres repitiendo un valor en reiteradas ocaciones, quizás sea buena idea guardarlo en una variable.

## Mixins

Los mixins se podría decir son en cierta forma la equivalencia a las funciones en otros lenguajes de programación. Nos permite pasar argumentos para definir los valores de propiedades. Miremos el siguiente ejemplo:

<pre>
<code class="language-scss">@mixin module($padding, $margin, $backgroundColor) {
    padding: $padding;
    margin: $margin;
    background: $backgroundColor;
}</code>
</pre>

Para escribir un mixin tienes que partir usando la directiva `mixin` seguido por el nombre que le asignarás (idealmente uno que sea apropiado al uso que tendrá), en este ejemplo usamos `module`. Luego usas una o más variables como argumentos para definir los valores. En este caso estamos definiendo el valor de padding, margin y background.

Ahora si queremos usarlo lo hacemos de la siquiente manera:

<pre>
<code class="language-scss">.box {
    @include module(10px, 20px, blue);
}</code>
</pre>

Esto se compilará a lo siguiente:

<pre>
<code class="language-scss">.box {
    padding: 10px;
    margin: 20px;
    background: blue;
}</code>
</pre>

## Nesting

Sass te permite anidar selectores, de esta forma puedes tener tu código más organizado, legible y evitamos repeticiones innecesarias. Usaremos el clásico ejemplo de la navegación para demostrarlo:

<pre>
<code class="language-scss">nav {
    ul {
        padding: 0;
        margin: 0;
        list-style: none
    }

    li {
        float: left;
    }

    a {
        display: block;
        text-decoration: none;
    }
}</code>
</pre>

Esto se compilaría a lo siguiente:

<pre>
<code class="language-scss">nav ul {
    padding: 0;
    margin: 0;
    list-style: none
}

nav li {
    float: left;
}

nav a {
    display: block;
    text-decoration: none;
}</code>
</pre>

### Usar con precaución

Es fácil dejarse llevar anidando selectores y rapidamente puede transformarse en un gran problema. Mientas más niveles anides, más específico será y te puede puede traer problemas de mantención de código. Ejemplo:

<pre>
<code class="language-scss">.content {
    .post {
        .entry-header {
            h1 {
                a {
                    &:hover { ... }
                }
            }
        }
    }
}</code>
</pre>

El resultado sería el siguiente:

<pre>
<code class="language-scss">.content .post .entry-header h1 a:hover {...}</code>
</pre>

He escuchado en algunas ocaciones que algunos no utilizan preprocesadores debido a que el CSS que generan no es mantenible. Sin embargo, el problema no es el preprocesador. Si el css que produce no es mantenible, es porque el código que estás escribiendo no lo es. Sass va a compliar a lo que tu quieras, tienes ese control. Si te procupa la anidación, no anides tan profundo o simplemente no anides.


## Partials e imports

El uso de partials e imports te permite estructurar y modularizar tu CSS, obteniendo así un código más fácil de mantener.

Un partial es un archivo que comienza con un guión bajo `_partial.scss`. Este archivo puede tener el nombre que desees, siempre y cuando se anteponga el guión bajo. La finalidad de crear uno es que puedes poner pequeños extractos de CSS en ellos para tener un código modularizado y fácil de mantener, estos luego serán incluidos en otros archivos mediante la directiva `@import`.

CSS ya tiene la opción de usar imports para dividir tu código en distintas secciones. El problema es que cada import en tu hoja de estilos es una llamada extra al servidor. Sass te permite usar imports de la misma forma, pero todos los imports se combinan en un archivo y luego al compilarse el resultado es una sola hoja de estilos.

####Como ejemplo mostraré como suelo estructurar mi Sass

Primero creo una carpeta `scss`, sub-carpetas y en cada una de ellas los partials que requiera, esto obviamente varía:

<pre>
<code class="language-bash">scss/
|
|-- helpers/
|   |-- _variables.scss
|   |-- _mixins.scss
|   |-- _helpers.scss
|
|-- base/
|   |-- _global.scss
|   |-- _typography.scss   
|
|-- layout/
|   |-- _header.scss
|   |-- _navigation.scss
|   |-- _sidebar.scss
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

Luego en la raiz de la carpeta `scss` creo un archivo main.scss, es aquí donde importaré todos mis partials y se combinarán en un solo archivo:

<pre>
<code class="language-scss">// Este es el archivo main.scss

@import "helpers/variables";
@import "helpers/mixins";
@import "helpers/helpers";

@import "base/global";
@import "base/typography"

@import "layout/header";
@import "layout/navigation";
@import "layout/sidebar";
@import "layout/footer";

@import "components/pagination";
@import "components/buttons";

@import "vendor/prism";</code>
</pre>

En el siguiente enlace pueden verlo en la [cuenta Github del blog](https://github.com/polarfrontend/polarfrontend.github.io/tree/master/scss)
