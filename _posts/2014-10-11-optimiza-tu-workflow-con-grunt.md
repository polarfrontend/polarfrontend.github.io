---
layout: post
title:  "Optimiza tu workflow con Grunt"
description: Aprende como utilizar Grunt para agilizar tu proceso de trabajo y ahorrar tiempo.
date:   2014-10-11
---

Minimizar y concatenar tus archivos Javascript y CSS, compliar Sass, optimizar imágenes, escribir código sin preocuparte de los vendor prefixes. Esto y mucho más son ejemplos de cosas que puedes hacer con Grunt. Atrás quedaron los días en que se hacía todo manualmente, con Grunt defines una serie de tareas y estas se ejecutan de manera automática. 

## Menos tiempo

Al final del día se resume en esto. Cuando todo funciona de manera automatizada reduces sustancialmente tu tiempo de trabajo. Hasta hace poco (*menos de lo que me gusta reconocer*) al finalizar un proyecto pasaba por una fase de optimización muy tediosa. Primero copiaba mi código CSS y lo pegaba en un [sitio online](http://cssminifier.com/) donde lo minimizaba. Esto lo hacía con todos mis archivos CSS, luego creaba un archivo aparte donde pegaba todos los códigos minimizados para tener un solo archivo y evitar hacer varias llamadas al servidor. Lo mismo hacía con el Javascript. El problema es que luego quieres hacer cambios y por muy pequeños que sean tienes que pasar por el mismo proceso una y otra vez, es de locos.

## Grunt al rescate

Aquí es donde entra Grunt a salvar el día. Creas una configuración con tareas específicas para las necesidades de tu proyecto y Grunt se preocupa de hacer todo mientras tu escribes tu código, como para invitarlo a una cerveza. **Polar Front-End** está creado sobre [Jekyll](http://jekyllrb.com/), con Sass y utilizando autoprefixer porque soy flojo y no usaré [Bourbon](http://bourbon.io/) solo para encargarse de mis vendor prefixes (*Bourbon es más que eso y lo veré en otro post, pero básicamente para eso lo usaba antes*). Es por esto que mi archivo Grunt es bastante básico y a continuación veremos desde principio a fin como instalar todo y hacerlo funcionar.

## Como instalar Grunt

Grunt y sus plugins son instalados a través de [npm](https://www.npmjs.org/) (Node Packaged Modules), si no tienes instalado Node.js puedes hacerlo directo desde su [sitio](http://nodejs.org/) y con la instalación viene incluido npm.

Para asegurarte de que npm está actualizado ejecuta el siguiente comando en el terminal: 
<pre><code class="language-bash">npm update -g npm</code></pre>

Comenzaremos instalando el interfaz de comando (CLI) de manera global, al hacerlo global solo tendrás que ejecutar el comando una vez. Tampoco es necesario estar dentro de una carpeta específica. El comando es el siguiente: 

<pre>
<code class="language-bash">npm install -g grunt-cli</code>
</pre>

### Creando un proyecto nuevo

Para comenzar un proyecto con Grunt necesitamos los archivos `package.json` y `Gruntfile.js`.

Si estamos empezando desde cero, primero ejecutamos el siguiente comando:

<pre>
<code class="language-bash">npm init</code>
</pre>

Te pedirán una serie de datos, los cuales opcionalmente puedes llenar o simplemente presionar enter hasta el final. Esto creará tu archivo `package.json`.

El siguiente paso es instalar los plugins que necesitas para tu proyecto. En este caso usaremos el plugin de Sass, concat (para concatenar Javascript), Uglify (para minimizar el Javascript) y Watch (para vigilar nuestros archivos ante cualquier cambio).

#### Instalando plugins

Toda instalación de plugin tiene la misma estructura:

<pre>
<code class="language-bash">npm install nombre-del-plugin --save-dev</code>
</pre>

Utilizar `--save-dev` al final lo agregará como dependencia a tu `package.json`.

Para instalar los plugin que utilizaremos nos movemos a la carpeta de nuestro proyecto y ejecutamos los siguientes comandos:

<pre>
<code class="language-bash">npm install grunt-contrib-concat --save-dev</code>
</pre>

<pre>
<code class="language-bash">npm install grunt-contrib-uglify --save-dev</code>
</pre>

<pre>
<code class="language-bash">npm install grunt-contrib-sass --save-dev</code>
</pre>

<pre>
<code class="language-bash">npm install grunt-contrib-watch --save-dev</code>
</pre>

Una vez instalados todos nuestros plugins, pasamos a crear el archivo `Gruntfile.js`. Aquí vamos a configurar y definir nuestras tareas. Partamos creando un punto de partida y luego lo vamos configurando con los plugins que instalamos:

<pre>
<code class="language-javascript">module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Agregar configuración de plugins

    });
}</code>
</pre>

Ahora configuramos los plugins instalados:

<pre>
<code class="language-javascript">module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: "\n\n"
            },
            dist: {
                // Agregamos los archivos que queremos concatenar
                src: ['js/algun-plugin.js', 'js/main.js'],
                // Nuestros archivos concatenados se crearán automáticamente aca
                dest: 'js/all.js'
            } 
        },

        uglify: {
            main: {
                files: {
                    // Nuestros archivos concatenados son minimizados y automáticamente
                    // se crea un nuevo archivo que es el que usaremos en nuestro html
                    'js/all.min.js' : ['js/all.js']
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    // Nuestro Sass es compilado a nuestro archivo CSS
                    'css/main.css' : 'scss/main.scss'
                }
            }
        },

        watch: {
            site: {
                // Vigilamos cualquier cambio en nuestros archivos
                files: ['scss/**/*.scss', 'js/**/*.js', '*.html'],
                tasks: ['default']
            },
            options: {
                // Instalamos la extensión de Livereload en Chrome para ver cambios
                // automáticos en el navegador sin hacer refresh
                spawn : false,
                livereload: true
            }
        }

    });

    // Cargamos los plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Registrar tareas
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch']);
}</code>
</pre>

Con esto si escribimos el comando `grunt`, se ejecutarán todas las tareas y ante cualquier cambio mientras escribes tu código, este se actualizará automáticamente. El comando `grunt` ejecutará todas las tareas, pero si deseas por ejemplo solo compilar Sass puedes escribir `grunt sass` y solo se ejecutará esa tarea.

## Conclusión

Una herramienta como Grunt es practicamente esencial hoy en día para trabajar de manera efectiva y ahorrar tiempo. La cantidad de plugins que existen es muy grande y seguro puedes encontrar algo que sirva para tu proyecto [aca](http://gruntjs.com/plugins).