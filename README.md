Project structure:

├── warehouse-server
│   ├── controllers - Defines app routes logic.
│   │   ├── currentUser.controllers.js
│   │   └── product.controllers.js
│   │   ├── sender.controllers.js
│   │   └── shop.controllers.js
│   │   ├── user.controllers.js.js
│   │   └── sessoin.controllers.js
│   ├── middlewares -Checking logged in status middlware.
│   │   ├── isUserMiddlewares.js
│   ├── database - Connect database and server.
│   │   ├── connection.js
│   ├── routes - All routes for different entities in different files.
│   │   ├── currentUser.routers.js
│   │   ├── product.routers.js
│   │   └── sender.routers.js
│   │   ├── sessions.routers.js
│   │   ├── shop.routers.js
│   │   └── user.routers.js
│   ├── db
│   │   ├── migrations - Contains the application migration data.
│   │   │   ├── 20191024185314-create-user.js
│   │   │   ├── 20191024190446-create-product.js
│   │   │   ├── 20191024190536-create-shop.js
│   │   │   └── 20191024190705-create-sender.js
│   │   ├── models - Contains database models.
│   │   │   ├── index.js
│   │   │   ├── product.js
│   │   │   └── sender.js
│   │   │   ├── shop.js
│   │   │   └── user.js
|   ├── errorsCollection - For diffeent cases errors collection.
│   │   └── error.js
|   ├── config - Contains application configuration settings such as database configuration.
│   │   └── config.json
|   ├── package.json
|   ├── README.md
|   ├── app.js
|   ├── sequelizeMeta.json


How to intall and run this APP.

1.Install mysql database.
2.Install nodejs.


Project run:

1.Clone warehouse-server repository.
2.Enter the project folder and execute the command "git checkout warehouse-server-branch" with terminal.
3.Enter configs folder dbConfig.js, config folder config.json files and fill in the appropriate data: host,port,user,password,database.
4.Create warehouse database in mysql.
5.Execute the command "npm ci" with terminal.
6.Execute the command "node_modules/.bin/sequelize db:migrate" with terminal.
7.Then execute the command "npm start".