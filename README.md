## The node.js Warehouse app

The node.js Warehouse app a server that stores warehouse information in MySQL database( what products exist, which stores and shippers the warehouse works warehouse) and respond to customer requests.

## Prerequisites

you need `git` to `clone` the repository. You can get git from [http://git-scm.com/].
you need `node`, you can `download` here [https://nodejs.org/en/download/]
you need `npm`, you can `install`  npm install npm@latest -g
you need `mysql`, install mysql database and create 'warehouse' database in mysql.

## Run the Application
Clone and install the dependencies.

git clone https://github.com/AnahitKaryan/warehouse-server.git

cd warehouse-server

git checkout warehouse-server-branch

In the `project` directory, you can `run`: 
The first `install` dependencies nmp ci , then 

Enter config folder config.json files and fill in the appropriate data: host,username,password,database,port,secret,key.

The program use command line arguments - NODE_ENV to determine in which mode the program works, for internal configuration. The values of these variables are set in the package.json file - in property 'start' or 'debug'. PROD means that the program runs in production mode, while in DEV development mode .

1) Run project for `development`

### `npm run debug`
Runs the app in the development mode.<br />

2) Run project for `production` 

### `npm start`
Runs the app in the production mode.<br />

## Project structure

├── warehouse-server
│   ├── controllers - Defines app routes logic.
│   │   ├── currentUser.controllers.js - user checking function.
│   │   └── product.controllers.js - function for get,post,put and delete from of Products.
│   │   ├── sender.controllers.js - function for get,post,put and delete from of Senders.
│   │   └── shop.controllers.js - function for get,post,put and delete from of Shops.
│   │   ├── user.controllers.js.js - function for get,post from of Users.
│   │   └── sessoin.controllers.js - function for deleting from of sessions.
│   ├── middlewares - All middlwares.
│   │   ├── isUserMiddlewares.js - checking logged in status middlware.
│   ├── database - database files.
│   │   ├── connection.js - connect database and server.
│   ├── routes - All routes for different entities in different files.
│   │   ├── currentUser.routers.js - router for current user.
│   │   ├── product.routers.js - router for product.
│   │   └── sender.routers.js - router for sender.
│   │   ├── sessions.routers.js - router for session.
│   │   ├── shop.routers.js - router for shop.
│   │   └── user.routers.js - router for user.
│   ├── db
│   │   ├── migrations - Contains the application migration data.
│   │   │   ├── 20191024185314-create-user.js - migration for user.
│   │   │   ├── 20191024190446-create-product.js - migration for product.
│   │   │   ├── 20191024190536-create-shop.js - migration for shop.
│   │   │   └── 20191024190705-create-sender.js - migration for sender.
│   │   ├── models - Contains database models.
│   │   │   ├── index.js - sequelize file
│   │   │   ├── product.js - model for product.
│   │   │   └── sender.js - model for sender.
│   │   │   ├── shop.js - model for shop.
│   │   │   └── user.js - model for user.
|   ├── errorsCollection - for diffeent cases errors collection.
│   │   └── error.js - errors collection file.
|   ├── config - application configuration settings and logging.
│   │   └── config.json - contains application configuration settings such as database configuration.
│   │   └── log.js - file which bunyan loger cteating.
|   ├── package.json -  the project name,version,scripts and dependencies.
|   ├── package-lock.json - the project name,version and dependencies.
|   ├── README.md - a guide to describing and using this project.
|   ├── app.js - project primary file that runs the server.
|   ├── sequelizeMeta.json - sequelize tables creating file.
|   ├── .gitignore - lists the files the git should ignor.




























├── frontend
|  ├── config - Contains config files .
|  |  ├── jest
|  |  |  ├── cssTransform.js -  transform config option to specify how css are transformed.
|  |  |  └── fieTransform.js -  Transform config option to specify how assets are transformed.
|  |  ├── env.js - The environment variables configuration
|  |  ├── modules.js - Modules configuration 
|  |  ├── paths.js - Paths configuration
|  |  ├── webpack.config.js - webpack configuration 
|  |  └── webpackDevServer.config.js - webpack dev server configuration
|  ├── public - Contains main index.js files and logo.
|  ├── scripts - Contains scripts for start , build or test .
|  |  ├──  build.js - create program for production mode
|  |  └──  start.js - start program
|  ├── src - Contains all components and logic files.
|  |  ├── components - All components for this project.
|  |  |  ├──  audioTable.jsx - show audio file, edit, delete.  
|  |  |  ├──  home.jsx - show home page.
|  |  |  ├──  imageTable.jsx - show image file, edit, delete. 
|  |  |  ├──  login.jsx - login user.
|  |  |  ├──  modal.jsx - show edit modal. 
|  |  |  ├──  navbar.jsx - show sign up and sign in button, when user logged show view all, upload and logout button
|  |  |  ├──  pagination.jsx - Change page number and get new data 
|  |  |  ├──  register.jsx - User registration
|  |  |  ├──  upload.jsx - upload new file
|  |  |  └──  view.jsx - show file
|  |  ├── config - Contains all project config.
|  |  |  └──  config.js - Api configuration for send and get data
|  |  ├──  DAO Sending requests .
|  |  |  ├──  audio.DAO.js - Add, get, update, delete audio file requests
|  |  |  ├──  image.DAO.js - Add, get, update, delete image file requests
|  |  |  └──  user.DAO.js - User registration, login and logout request
|  |  ├── store - Mobx store for all components.
|  |  |  ├──  audio.stor.js - Store for audio file
|  |  |  ├──  image.stor.js - Store for image file
|  |  |  ├──  upload.store.js - Store for uploading file
|  |  |  └──  user.store.js - Store or user
|  |  ├── app.js - Start .
|  |  └── index.js - App component render this.
├── .babelrc - babel configuration
├── .gitignore 
├── package-lock.json
├── package.json 
└── README.md
