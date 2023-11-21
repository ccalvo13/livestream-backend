###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

# Run the build command which creates the production bundle
RUN npm install
RUN npm i -g prisma
RUN prisma generate
RUN npm run build

EXPOSE 3000

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]