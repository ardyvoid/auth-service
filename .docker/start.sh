#!/bin/bash
set -e

source ~/.profile;

echo "AUTH SERVICE: ENVIRONMENT IS $NODE_ENV $DEVELOPMENT_MODE";

if [ $DEVELOPMENT_MODE != "local" ]; then
  echo "AUTH SERVICE: DEPLOYING PRISMA!";
  npm run --prefix /app prisma:generate;

  echo "AUTH SERVICE: STARTING PRODUCTION SERVER!";
  npm run --prefix /app build;
  npm run --prefix /app start;
else
  if [ ! -d /var/app/node_modules ]; then
    echo "AUTH SERVICE: MOVING NODE MODULES!";
    mv /app/node_modules /var/app/node_modules;
    mv /app/package-lock.json /var/app/package-lock.json;
  fi

  echo "AUTH SERVICE: DEPLOYING PRISMA!";
  npm run --prefix /var/app prisma:migrate:up;
  npm run --prefix /var/app prisma:generate;

  echo "AUTH SERVICE: STARTING DEVELOPMENT SERVER!";
  npm run --prefix /var/app dev;
fi

exec "$@"
