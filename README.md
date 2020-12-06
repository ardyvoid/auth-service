# micro-auth-service

A micro auth service built with TypeScript, designed to handle authentication of users

## Development

The service has been written in TypeScript and, in development, is served with nodemon, which provides authomatic hot reloading. In production, Webpack compiles the assets and the service is served with NodeJS. Tests have been implemented with Jest and can be run with `docker exec -it auth-service npm run test`, or just `npm run test` from inside the container.

[NodeJS](https://nodejs.org/en/)
[TypeScript](https://www.typescriptlang.org/)
[Prisma](https://www.prisma.io/)
[Apollo & GrpahQL](https://www.apollographql.com/docs/apollo-server/schema/schema/)
[Jest](https://jestjs.io/)

### Requirements

[Docker](https://www.docker.com/)

### Installation

Getting setup with Docker is easy if you have docker installed:

1. In the root directory, copy the `.env.example` file to `.env`
1. Set your local development credentials in `.env`
   - The default credentials in `.env.example` should work out the box
1. In your terminal, navigate to your project directory
1. Start up the container using Docker compose:
   - `docker-compose up -d --build`
     - This builds the image and starts the container
     - Initial up is likely to take a short while as it has to sync the `node_modules` directory
     - A development build will be served on `localhost` at the port specified by `PORT`

> **IMPORTANT:**: Environment variables cannot be changed once a container is started. To update environment variables
> in a container, you must update the `.env` file and then run `docker-compose up -d` again.

### Troubleshooting Docker

If you don't see one or more of the app containers when you run `docker ps`, you should be able to see that the container
started and then exited using `docker ps -a`. If you see it in the list you can view the logs for the container using
`docker logs <container>`.

A common problem on Windows will show something like this in the container log: `env: bash\r: No such file or directory`. This means that your `.docker/start.sh` file has checked out with incorrect line endings. You must convert this file to use Unix style (LF) line endings, and then restart your containers.
