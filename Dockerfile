FROM node:12.13

# Define required production defaults so the container can run without having to have these defined again
ENV NODE_ENV=production
ENV PORT=8898

EXPOSE $PORT

COPY . /app
COPY ./.docker/start.sh /usr/local/bin/

RUN npm --prefix /app --production=false install --no-audit; \
    chmod +x /usr/local/bin/start.sh

ENTRYPOINT ["/usr/local/bin/start.sh"]
