# first build the vue app
FROM node:latest as build
WORKDIR /app
# copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./
# install dependencies
RUN npm config set registry http://mirrors.cloud.tencent.com/npm/
RUN npm install -g pnpm
RUN pnpm install
# copy the rest of the app
COPY . .
# build the app
RUN pnpm run build

FROM nginx:latest
# copy the built app to the nginx container
COPY --from=build /app/dist /usr/share/nginx/html
