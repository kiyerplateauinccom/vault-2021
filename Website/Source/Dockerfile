# base image
FROM node:12.2.0 AS build

# install chrome for protractor tests
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
#RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
#RUN apt-get update && apt-get install -yq google-chrome-stable

# STAGE 1

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.3.14
RUN npm install --save-dev node-sass@4.14.0
RUN npm i --save-dev @babel/compat-data@7.8.0

# add app
COPY . /app

# start app
#CMD ng serve --host 0.0.0.0
RUN ng build --prod

# STAGE 2
FROM nginx

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]

COPY --from=build /app/dist/NauticalVisualization /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
