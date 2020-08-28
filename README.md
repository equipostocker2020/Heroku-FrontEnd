# Stocker Frontend con Angular

Modelo de vistas que actua como Frontend para la aplicacion de Stocker. Construida con Angular que se comunica directamente con un API-REST montada en NodeJS.

## Comezando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mira **Deployment** para conocer como desplegar el proyecto.

## Pre-requisitos 📋

_Para levantar la aplicacion localmente es necesario contar con npm, nodejs y angular/cli , para  comprobar que lo tengas instalado_

```
npm -v
nodejs -v
ng --version
```
**En caso de no tener instalado alguno de los pre-requisitos, links a la documentacion oficial**

https://docs.npmjs.com/cli/install

https://nodejs.org/es/download/

https://cli.angular.io/

**En caso de no tener instalado alguno de los pre-requisitos, links a la documentacion oficial**

_Una vez descargado el proyecto se procede a la instalacion de las librerias necesarias de la siguiente manera._

_En primer lugar la instalacion_

```
npm install
```

_luego levantar el proyecto_
```
ng serve -o
```
```
Your global Angular CLI version (10.0.6) is greater than your local
version (9.1.5). The local Angular CLI version is used.
Date: 2020-08-20T18:32:50.800Z - Hash: b77e65a9904ec5b144b1 - Time: 10951ms
* Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ *
: Compiled successfully.
```
_Finalmente el servicio quedara levantado en el puerto 4200 y automaticamente se desplegara una pestaña con la aplicación de Stocker en su navegador predeterminado._

_En caso de tener el puerto 4200 ocupado o simplemente querer cambiar el puerto donde se expone el servicio, simplemente modificar lo siguiente en server.js._

```
app.use(express.static(__dirname + '/dist/stocker-frontend-angular'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname +
        '/dist/stocker-frontend-angular/index.html'));
});
app.listen(process.env.PORT || 4200);
```

## Despliegue 📦

Todos los cambios locales son refrescados al guardar el proyecto Angular integrado con todas sus librerias.

## Wiki 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [Wiki](https://github.com/tu/proyecto/wiki)

## Versionado 📌

Usamos [Github](http://github.com) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/equipostocker2020/GR07-EquipoStocker-FrontEnd/tags).

## Autores ✒️

* **Gonzalo Figueras** - *Documentacion - Desarrollo* - [gonzaloFigueras](https://github.com/gonzaloFigueras)
* **Marcelo Gutierrez** - *Documentacion - Desarrollo* - [marcelofabiangutierrez88](https://github.com/marcelofabiangutierrez88)
* **Agustin Galarza** - *Documentacion - Desarrollo* - [AgustinArielGalarza](https://github.com/AgustinArielGalarza)



## Expresiones de Gratitud 🎁

* Este proyecto es la propuesta anual del taller de implementacion de la carrera Tecnico Superior en Analisis de Sistemas 📢
* Agradecemos al docente Mariano Trigila por la exigencia, el compromiso y siempre exigirnos mas 🤓.
