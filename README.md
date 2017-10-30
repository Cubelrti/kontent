# kontent

> A lightweight CMS based on Vue.js

## Features

* Live Markdown Editor
* Built-in User Authentication
* File-based Article CRUD
* Simple but fast article listing

##  Demo

Visit a live demo [here](http://kontent.za-pt.org).

## Quick Start

You need NodeJS 6+, npm or yarn.

### 1 Clone repo
```bash
git clone https://github.com/Cubelrti/kontent.git
```

### 2 Install dependencies
```bash
npm install
# OR
yarn
```

### 3 Start server
```bash
# Using Webpack-hot-middleware for dev
npm run dev
# OR using prebuilt files in /dist
npm run start:static
```

### 4 Configurations

You should set up users to manage the articles in `users.db.json`
```javascript
{
  "users": [
    {
      "username": "",  
      "password": "",
      "id": "1",
    }
  ]
}
```
Then Kontent is ready to go.

## Misc

You can build a static version of client-side files via the following command:
```bash
npm run build
```

which will uglify and bundle all things up.

You can set-up your ip address in `/config/index.js` if you want incoming traffic from internet (only prebuilt server supported).
```javascript
dev: {
    ip: '' // your ip goes here
}
```

## Credits and Thanks

* [Vue.js](https://vuejs.org/) for front-end framework
* [Buefy](http://buefy.github.io/) for css framework

## Copyright and License

Copyright (c) 2017 Cubelrti. Code released under the [MIT]((https://github.com/Cubelrti/kontent/blob/master/LICENSE)) license.
