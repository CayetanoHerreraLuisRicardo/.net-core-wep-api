# angular-users-crud

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 10.1.4.

## Run app

`git clone https://github.com/CayetanoHerreraLuisRicardo/angular-users-crud.git`

`cd angular-users-crud.git`

`npm install`

`ng serve`

Ejecuta `ng serve` para correr la aplicación. Navega a  `http://localhost:4200/`. La app cargará actomaticamente los cambios hechos en el navegador web.

## Dependencia npm propia

Ademas de las dependencias de terceros, me tomé la libertad de crear mi propio paquete o 
dependencia alojada en `npm` que es el cliente api para hacer las llamadas a la API REST. 
La dependencias usada se llama  [ng-slabon-api-client](https://www.npmjs.com/package/ng-slabon-api-client)

## Proyecto .NET CORE Web API

La API esta hecha con .NET Core Wep API. (API REST) aqui te dejo mi [Repositorio de la API](https://github.com/CayetanoHerreraLuisRicardo/.net-core-wep-api) para que puedas clonarlo y ver como funciona en tu entorno local.

Aquí el  [DEMO](https://cayetanoherreraluisricardo.github.io/Angular/users-crud/) la cual esta apuntando a http://localhost:59353 (asugúrate de correr tu API .NET Core en el puerto 52353 para poder ver el demo) en cuanto a las CORS no te preocupes el proyecto NET CORE esta habilitado para aceptar cualquier origen.
