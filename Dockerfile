FROM node:16-alpine AS development

ENV APP_HOME=/usr/src/app/
WORKDIR $APP_HOME

COPY package.json yarn.lock tsconfig.build.json $APP_HOME
RUN yarn install


RUN yarn build

EXPOSE 3000
CMD ["yarn", "start:prod"]
