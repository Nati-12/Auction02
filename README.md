# Internet auction application



This repository contains source code for a web application which emulates an internet-auction. This is an
angular.js single-page application with node.js (express + mongoDB) backend, all code is written in javascript.<br />


To run application please follow the steps listed below.<br />



* Clone this repository to any convenient location at your computer. Check whether you have
node (https://nodejs.org/) installed.



* Install MongoDB on your computer. Installers for different platforms are available
at https://www.mongodb.com/download-center. cd to project folder/mongodb, run mongo database daemon
 ```
mongod --dbpath=.
```
command. MongoDB should start at port 27017. 



* Switch to 'auction-rest-server' folder. Run

```

npm install

npm start

```

this should launch an express server at port 3200. Now all resources needed by application are up and running.



* Switch to application root folder, run

```
npm install
```

to install packages, and then

```
gulp watch
```

to serve application locally in your default browser.