/**
 * MIT License
 *
 * Copyright (c) 2017 Kim Ung <k.ung@rduk.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

var cacheStoreProvider = require('./cacheStore');
var serializerFactory = require('./serializer/factory');

function Cache() {
    var store, serializer;

    Object.defineProperty(this, 'store', {
        get: function() {
            if (!store) {
                store = cacheStoreProvider.getInstance();
            }

            return store;
        }
    });

    Object.defineProperty(this, 'serializer', {
        get: function() {
            if (!serializer) {
                serializer = serializerFactory.create(this.store.config);
            }

            return serializer;
        }
    });
}

Cache.prototype.get = function(key) {
    var self = this;

    return self.store.get(key)
        .then(function(value) {
            return self.serializer.deserialize(value);
        });
};

Cache.prototype.set = function(key, value) {
    var self = this;

    return self.serializer.serialize(value)
        .then(function(str) {
            return self.store.set(key, str);
        });
};

module.exports = new Cache();
