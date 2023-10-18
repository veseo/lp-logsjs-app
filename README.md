# Team Messaging Assist coding challenge

This is a NodeJS project with npm as build tool. The goal of this challenge is to determine how you build a service
based on JS technologies. This means, you are open to use any technology you want.

The service within this repository does not work like it should. Please fix it and update the code according to the
following tasks. For this purpose, you can use any IDE that you want. If you are signed in to GitHub, there is an option
to use Codespaces. Click on the green `Code` button and choose your codespace. Make sure to document how you achieve
your goal. If this was production code, how would you test it? Please reach out to us, if you have any questions in
regard to this challenge.

## Prepare
Take a look at the project and install all the dependencies. Please fix it, if this does not work. 

## Run 

Run the project by using `npm run dev`. If the application doesn't come up correctly, please fix it. The application 
has a dependency to MongoDB. Make sure that you have MongoDB instance running. There are two endpoints available, which 
you can query for log entries and metadata: 

 - `http://localhost:8080/logs`
 - `http://localhost:8080/logs/count`

## Extend - Create 

An endpoint for adding logs is missing. Please make it available under `http://localhost:8080/logs/` through HTTP POST. 
The incoming logs should be stored in the database. You could use Postman to build and fire an HTTP POST Request. 

## Extend - Get By ID

Add another endpoint which is available under `http://localhost:8080/logs/{id}`. The endpoint should return the log  
with the given id from the database. 

## Extends - Update

Build another endpoint which allows the manipulation of an existing log. 

## Extend - Scheduler

There is a class `ScheduledTask` with the method `runBackgroundJob()`. Configure the application that way, that the 
method is executed every 5 seconds in the background. 

## Build and run  the Docker image

Build a Docker image with the application in it and call it `liveperson/me:0.0.1`. Try to run the Docker container that 
way that the application is available under `http://localhost:8080` on the Host system.

## Extend - Advanced

Do you think MongoDB is a good database for this kind of data? Maybe you can replace MongoDB with Kafka? Let's give it a 
try. How would you redesign the system for Kafka? What are the advantages and disadvantages? Do you think that the code 
can be refactored somehow, if so what you will propose?

