FROM node:18.9
WORKDIR /server
COPY package.json /server
RUN npm install
RUN npm install -g nodemon
COPY . /server
EXPOSE 8080
CMD ["nodemon","server_test"]