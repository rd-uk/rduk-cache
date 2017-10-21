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

var util = require('util');
var errors = require('rduk-errors');
var base = require('./base');

var JSON_PREFIX = 'data:application/json;base64, ';

var JsonSerializer = function JsonSerializer() {
    JsonSerializer.super_.call(this);
};

util.inherits(JsonSerializer, base);

JsonSerializer.prototype.serialize = function(obj) {
    return JSON_PREFIX + (new Buffer(JSON.stringify(obj))).toString('base64');
};

JsonSerializer.prototype.deserialize = function(str) {
    if (!str || str.indexOf(JSON_PREFIX) < 0) {
        errors.throwArgumentError('str', str);
    }

    return JSON.parse((new Buffer(str.split(', ')[1], 'base64')).toString('utf8'));
};

module.exports = JsonSerializer;
