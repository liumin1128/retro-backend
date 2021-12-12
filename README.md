<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

### vercel 部署
https://segmentfault.com/a/1190000040873756?utm_source=tag-newest


# 实时监听日志
tail -f 

# 一键更新nginx
podman stop mynginx
podman rm mynginx  
podman run \
--name mynginx \
--privileged=true \
-v /root:/root \
-v /etc/nginx:/etc/nginx \
-p 80:80 \
-p 443:443 \
-d nginx
podman logs mynginx  

# ngixn 转发的路径问题
https://www.cnblogs.com/wjoyxt/p/11949943.html

# docker nginx访问宿主机
ifconfig，查看容器ip，那个地址可以访问宿主机

# nginx config

[https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN](https://www.digitalocean.com/community/tools/nginx?domains.0.server.domain=react.mobi&domains.0.server.path=%2Froot%2Fretro&domains.0.server.documentRoot=%2Fdist&domains.0.https.certType=custom&domains.0.https.sslCertificate=%2Fetc%2Fnginx%2Fssl%2Fcert.pem&domains.0.https.sslCertificateKey=%2Fetc%2Fnginx%2Fssl%2Fkey.pem&domains.0.php.php=false&domains.0.reverseProxy.reverseProxy=true&domains.0.reverseProxy.path=%2Fapi&domains.0.reverseProxy.proxyPass=http%3A%2F%2F127.0.0.1%3A3101&domains.0.routing.index=index.html&domains.0.routing.fallbackPhp=false&domains.0.routing.fallbackPhpPath=&domains.0.logging.accessLog=true&domains.0.logging.errorLog=true&global.https.letsEncryptCertRoot=%2Fetc%2Fnginx%2Fssl%2F&global.nginx.user=nginx&global.nginx.pid=%2Fvar%2Frun%2Fnginx.pid&global.docker.dockerfile=true&global.app.lang=zhCN)

mkdir /etc/nginx

mkdir /etc/nginx/ssl

acme.sh --install-cert -d react.mobi \
--key-file       /etc/nginx/ssl/key.pem  \
--fullchain-file /etc/nginx/ssl/cert.pem

openssl dhparam -out /etc/nginx/dhparam.pem 2048

# 一键ssh免密登录
ssh-copy-id -i ~/.ssh/id_rsa.pub root@8.131.92.84
