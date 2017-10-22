# RDUK - Cache

[![Build Status](https://travis-ci.org/rd-uk/rduk-cache.svg?branch=master)](https://travis-ci.org/rd-uk/rduk-provider)
[![Coverage Status](https://coveralls.io/repos/github/rd-uk/rduk-cache/badge.svg?branch=master)](https://coveralls.io/github/rd-uk/rduk-provider?branch=master)

Manage cache in your Node.js app

## Installation

```sh
# install rduk-cache module
npm install rduk-cache --save --save-exact

# install rduk-cache store (here redis)
npm install rduk-cache-store-redis --save --save-exact
```

### Cache Store implementations

- [redis](https://github.com/rd-uk/rduk-cache-store-redis)

### How to use

#### cache store configuration

1. Add a `config.yml` file to your app ([more information](https://github.com/rd-uk/rduk-configuration))
1. Add a `cacheStore` section (see below for redis configuration)

```yaml
---
cacheStore:
    name: redis
    providers:
        -
            name: redis
            type: rduk-cache-store-redis
            url: redis://...

```

#### module loading

```js
var cache = require('rduk-cache');
```

#### Promise set(key, value)

```js
cache.set('key', {
    prop1: 'value 1',
    prop2: 'value 2'
})
```

#### Promise get(key)

```js
cache.get('key')
    .then(function(obj) {
        console.log(obj.prop1); // output: 'value 1'
    });
```
