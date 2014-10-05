---
layout: post
title:  "Aprendiendo Sass - Parte 1"
description: Introducción a Sass, instalación y como usarlo.
date:   2014-09-17
---

Hoy decidí partir escribiendo una introducción explicando que son los preprocesadores, cuales son sus beneficios, las dudas que tenía al comenzar a dejar de lado el css y finalmente explicar en simples pasos la instalación y como partir usando Sass.

A pesar de haber existido hace bastante tiempo, los preprocesadores recien han ido ganando popularidad en estos últimos años. Todo el mundo habla maravillas de ellos. Sin embargo, yo era uno más de los que por mucho tiempo los miraba con escepticismo. Por qué cambiar algo que está funcionando bien y agregar más complejidad a mi proceso de trabajo? Después de un año usando Sass puedo decir que fue una buena inversión de mi tiempo. 

## Qué es un preprocesador?

Primero que nada partamos definiendo lo que es un preprocesador. En palabras simples un preprocesador de css toma un lenguaje y lo convierte en el mismo css que hemos estado usando por mucho tiempo. Este lenguaje es como una extención de css y te otorga mayores funcionalidades. El uso de variables, funciones, operadores e imports sin llamadas extras al servidor son algunas de estas funcionalidades que no están disponibles escribiendo css debido a sus limitaciones.

Actualmente los preprocesadores más populares son Sass, Less y Stylus. Personalmente decidí usar Sass, por ningún motivo en especial, los blogs que frecuentaba hablaban más de Sass y decidí partir con aquella sintaxis.

## Mis dudas

Había leído bastante acerca de los preprocesadores y al principio los miraba de reojo. No estaba dentro de mis prioridades meterme de lleno en algo cuando lo que estaba haciendo funcionaba bastante bien, no estaba seguro si valía la pena invertir mi tiempo en ello. Al fin y al cabo, no es más que una herramienta y por lo tanto no lo veía como una necesidad. Sigo pensando que no lo es. Dejar de lado css completamente y comenzar un proyecto usando un preprocesador no es la verdad absoluta, ni nos pondremos a mirar en menos a alguien por seguir escribiendo css. 

### No cerremos los ojos a los beneficios

Después de un tiempo decidí darle una oportunidad. Seamos honestos, css no es tan sencillo y puede resultar en ocasiones agobiante y repetitivo. Por qué no aprovechar algo que me hará la vida más fácil? poder escribir código que es más fácil de mantener y me ahorrará tiempo son a mi parecer motivos suficientes para ponerlo en la agenda y comenzar a aprender cuando se de la oportunidad.

## Instalando Sass

Hay dos formas para usar Sass, utilizando una aplicación o con el terminal. Personalmente comencé con una aplicación porque al igual que muchos no tenía idea de como usar el terminal y francamente se veía un tanto intimidador. Asusta un poco ver un cuadrado con texto sin una interfaz gráfica, así que por recomendación de Chris Coyier en [Shoptalkshow](http://www.shoptalkshow.com/) compré [Codekit](https://incident57.com/codekit/). Codekit es una aplicación para Mac que entre otras cosas te permite compilar Sass, optimizar imágenes y minimizar javascript. Por su puesto existen otras alternativas, algunas open source.

### Aplicaciones

1. [Koala](http://www.koala-app.com/)
2. [Prepros](http://alphapixels.com/prepros/)
3. [Livereload](http://livereload.com/)
4. [Mixture](http://mixture.io/)

### Perdiendo el miedo al terminal

Con el tiempo aprendí a usar el terminal. Como ya vimos, no es necesario ya que existen aplicaciones que hacen todo facilmente, pero no está demás tenerlo dentro de tus conocimientos ya que te puede servir más adelante para utilizar otras herramientas que lo requieren. No soy experto en ello ni mucho menos y no es necesario serlo. Unos simples comandos son suficientes para hacer lo básico como moverte de una carpeta a otra y compilar. A continuación veremos los pasos para instalar Sass:

1. Instalar Ruby. Si estás usando un Mac no tienes que preocuparte, ya viene instalado. Si usas Windows, puedes usar el [instalador de ruby](http://www.rubyinstaller.org/).
2. Abre el terminal y ejecuta el siguiente comando: 
{% prism bash %} 
$ gem install sass 
{% endprism %}

## Ejemplo práctico

Ya con Sass instalado, pasaremos a crear un proyecto simple usando Sass, solo como ejemplo. 

Creamos la carpeta donde irán nuestros archivos y la estructura final debería ser así:

{% prism bash %}
proyecto-sass/
|-- index.html
|-- style.scss
{% endprism %}

Nuestro index.html es muy básico y en el enlazamos lo que será el css:

{% prism markup %}
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Probando Sass</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Hello, world!</h1>
</body>
</html>
{% endprism %}

Hasta el momento todo es tal cual como si trabajáramos con css. A continuación comenzamos a usar Sass. Abrimos el terminal, nos dirigimos a la carpeta de nuestro proyecto y ejecutamos el siguiente comando:

{% prism bash %}
$ sass --watch style.scss:style.css
{% endprism %}

Ahora automáticamente se crea el archivo `style.css` y estamos vigilando nuestro archivo `style.scss` para que ante cualquier cambio en él, se compila y actualiza.





 






