### [Prisma](http://prismagraphql.com) - [React Native](https://facebook.github.io/react-native/) Boilerplate

<div>
<img align="left" width="200" height="120" src="https://camo.githubusercontent.com/c7f49c483a3c5a145ff55c7331520a65e12abff2/68747470733a2f2f692e696d6775722e636f6d2f774434725674342e706e67">

<img align="left" width="110" height="110" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png">

<img align="left" width="190" height="150" src="https://cdn.pixabay.com/photo/2015/04/23/17/41/node-js-736399_960_720.png">

<img align="left" width="293" height="150" src="https://cdn-images-1.medium.com/max/1467/1*pO4kjXdsOi_ZsS50Py6UNQ.png">

</div>

#### Authorization enabled boilerplate connecting prisma and react-native.

### Pre-requisites

* [Node(LTS)](https://nodejs.org/en/), [Watchman](https://facebook.github.io/react-native/docs/getting-started.html#node-watchman)
* [Docker](https://www.docker.com/)
* Android Studio v3.0.1. Good install instructions [here](https://facebook.github.io/react-native/docs/getting-started.html#1-install-android-studio)
* Debugging:

  * A variety of debugging approaches are described [here](https://facebook.github.io/react-native/docs/debugging.html)  
* Have [Prisma](http://prismagraphql.com) installed globally 

(I have used only an android device to run and debug this. In that case please have [react-native](https://www.npmjs.com/package/react-native) installed globally)

### Setting up

#### Running the prisma server
move into the server folder and run the container

`docker-compose up -d`

To deploy the database 

`cd prisma`

`prisma deploy`

Generate the prisma client

`prisma generate`

Move back to the server directory and start the prisma server

`npm install ` or `yarn` to install node modules

`yarn start`

#### Running the android client

Move to client directory
connect your physical device or emulator

`react-native start`

`react-native run-android`
