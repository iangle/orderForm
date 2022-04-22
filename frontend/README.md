# Introduction
This project is designed to help me learn more about serverless architecture. The frontend is made using React and the backend is stored in the AWS cloud. the app allows a user to add items to their cart and then checkout. The user can also sign in, and must do so before being able to checkout. The cart itself is stored in DynamoDB and is updated through Lambda functions that connect to an API gateway endpoint. The frontend of the program does not have any say in what happens in the backend except for adding to the database and removing from it. This way a user cannot change the products value in the frontend and have it translate to a change in the backend.
# Architecture
![Architecture Diagram](./images/architecture.png)
# Deployment
First, fork the repository so there is a new version to use. Then clone the repository into a folder.
## Backend
To create the AWS backend, enter the following command in the command line in the main directory:

    make backend

## Frontend
To create and start the React frontend of the website, enter the following command in the command line while in the main directory:

    make frontend-serve
To create the production build and run that instead, write:

    make frontend-build
## Cleanup
Once you are done with the program, you can cleanup the backend and delete the stack with the following command:

    make backend-delete