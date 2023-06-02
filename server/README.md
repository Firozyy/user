

## project structure

$ cd client          // go to client folder
$ npm i    // npm install packages
$ npm run dev        // run it locally

 ## Prepare your secret

 You need to add on .env file 

 .SECRET_KEY 
 .PORT
 .MONGO_URI
 .SECRET_KEY 
 . JWT_EXPIRY 

 # Node.js User APIs

 # Node.js User APIs

This repository is includes APIs for users signup, login [mention all the APIs]. 

In order to setup this repository in local you have to add the environmental variables. And you've to install all the packages which used in this project.

Below are the API endpoints and their respective functionalities in this repository. 

## API Endpoints

| Endpoint                | Method | Description               |
|-------------------------|--------|---------------------------|
| `/api/v1/register`      | post   | Create a new user         |
| `/api/v1/login`         | post   | login                     |
| `/api/v1/profile`       | GET    |profile                    |
| `api/v1/updateprfile`   | PUT    | Update a user             |
| `/api/v1/profile`       | DELETE | Delete a user             |