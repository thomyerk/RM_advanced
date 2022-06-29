# Stage 1 - the build process
FROM node:12 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
EXPOSE 3000
CMD ["yarn", "start"]
