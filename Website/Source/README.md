# NGDock

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0. It was designed to demonstrate how to package an Angular application into a Docker image.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Docker

## Build Docker Image

Run the following command to build out the Angular Docker image.

```terminal
docker build -t ng-dock .
```

OR use docker compose...

```terminal
docker-compose build
```

## Run Docker Image

If you would prefer to use the docker CLI to run your new Docker image, simply run the below command. However, it is recommended to use the Docker compose command (see the below instructions).

```terminal
docker run -p 8080:80 --rm ng-dock
```

OR use docker compose...

```terminal
docker-compose up
```
OR run the system silently in the background...

```terminal
docker-compose up -d
```

# Docker Clean-Up

When done, let's be sure to clean up. First you will need to get a list of running Docker containers. You can do this by running the following command.

```terminal
docker container ls
```

Then to stop a given Docker container, simply "kill" the container with the first three number/characters of the given container. You can use the "IMAGE" name to isolate the docker container if you should have more then one running.

```terminal
docker container kill {FirstThreeOfContainerId}
```

OR use docker

```terminal
docker-compose down
```
