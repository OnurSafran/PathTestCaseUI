FROM node:14 AS ui-build
#WORKDIR /src/app
#COPY src/app/ .src/app/

ENV PORT=4201
ENV PATH /var/www/node_modules/.bin:$PATH

WORKDIR /src
COPY . .
RUN npm install @angular/cli && npm install @angular/material && npm install && npm run build

# start app
#CMD ng serve --host 0.0.0.0

RUN node_modules/.bin/ng build --prod
#FROM node:10 AS server-build
#WORKDIR /root/
#COPY --from=ui-build /src/app/app/dist ./app/dist
#COPY package*.json ./
#RUN npm install
#COPY server.js .
#
#EXPOSE 3080
#
#CMD ["node", "server.js"]
EXPOSE $PORT

ENTRYPOINT ["npm", "start"]
