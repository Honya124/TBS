FROM node:latest
WORKDIR /app
COPY ./dist/belita-updated-dashboard/ /app
RUN npm install -g http-server
EXPOSE 80
CMD ["http-server", "-p", "8080"]

# use this command to build the image:                  docker build -t 'image name:version' .
#use this command to run the container on port 9000:    docker run -it -p 3000:9000 name:version