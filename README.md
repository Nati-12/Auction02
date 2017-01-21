# Internet auction application

This repository contains source code for a web application which 
emulates an internet-auction. This is an angular.js single-page 
application with node.js (express + mongoDB) backend, 
all code is written in javascript.<br />

To deploy application and run it locally please follow the 
steps listed below.<br />

* Clone this repository to any convenient location at your computer. 
Check whether you have node (standalone javascript 
engine, https://nodejs.org/) installed.

* Install MongoDB database on your computer. 
https://www.mongodb.com/download-center provides installers for different 
computer platforms. Then change directory to "your_project_folder/mongodb", 
run mongo database daemon by a command  
 ```
mongod --dbpath=.
```
MongoDB should start and listens for connections on default port 27017. 

* Switch to "your_project_folder/auction-rest-server" folder and run

```

npm install

npm start

```

This should launch node express server on port 3000. Make sure 
that this port number is available. If it is not, open 
"your_project_folder/app/scripts/services/auctionDataService.js" 
file and replace port number in the constant definition  
```
.constant('auctionDatabaseResourcePath', 'http://localhost:3000')
```
by that specified in server screen log.

Now all backend resources needed by application are up and running.

* Switch to application root folder, run

```
npm install
```
to install packages, and then

```
gulp watch
```
to build application and to serve it locally in your default browser. 

Auction items test database will be created during first mainpage load 
event, after that you may check application behavior performing calls to 
standard auction operations, i.e. to sell item, search for items, 
browse items gallery, chaffer for items, read news and contact 
auction administration. Have a nice play!