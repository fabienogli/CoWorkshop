FROM node:11.1.0
RUN mkdir /webapp
COPY package.json yarn.lock /webapp/
WORKDIR /webapp
RUN yarn install
COPY . /webapp
