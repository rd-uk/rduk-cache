# RDUK - Cache

[![Build Status](https://travis-ci.org/rd-uk/rduk-cache.svg?branch=master)](https://travis-ci.org/rd-uk/rduk-provider)
[![Coverage Status](https://coveralls.io/repos/github/rd-uk/rduk-cache/badge.svg?branch=master)](https://coveralls.io/github/rd-uk/rduk-provider?branch=master)

Manage cache in your Node.js app

## Installation

```
# install rduk-cache module
npm install rduk-cache --save --save-exact

# install rduk-cache store (here redis)
npm install rduk-cache-store-redis --save --save-exact
```

### Cache Store implementations

- [redis](https://github.com/rd-uk/rduk-cache-store-redis)

### How to use

```js
var cache = require('rduk-cache');
```

#### set

```js
cache.set('key', {
    prop1: 'value 1',
    prop2: 'value 2'
})
```

#### get

```js
cache.get('key')
    .then(function(obj) {
        console.log(obj.prop1); // output: 'value 1'
    });
```
