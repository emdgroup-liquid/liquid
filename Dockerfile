FROM node:15-alpine
WORKDIR /app
COPY . .
RUN yarn
CMD ["yarn", "start"]


