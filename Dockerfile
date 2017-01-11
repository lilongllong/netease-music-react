FROM node:boron

MAINTAINER Longlong Li <2453085960@qq.com>

# creat workdir
RUN git clone https://github.com/lilongllong/netease-music-react.git /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
RUN npm install

EXPOSE 8080
# ENTRYPOINT diff CMD CDM can be overrided
CMD [ "npm", "start" ]
