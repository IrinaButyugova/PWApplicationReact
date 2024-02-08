FROM node:21-alpine as build
WORKDIR /react-app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /react-app/build /usr/share/nginx/html
COPY --from=build /react-app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]