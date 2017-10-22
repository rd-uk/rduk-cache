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

(function(require, process, describe, expect, it) {

    'use strict';

    var fs = require('fs');
    var errors = require('rduk-errors');
    var factory = require('../../lib/serializer/factory');
    var DefaultSerializer = require('../../lib/serializer/default')

    describe('factory', function() {

        describe('create', function() {

            describe('without config', function() {
                it('should return a DefaultSerializer instance', function() {
                    var serializer = factory.create();

                    expect(serializer instanceof DefaultSerializer).toBe(true);
                });
            });

            describe('without config.serializer', function() {
                it('should return a DefaultSerializer instance', function() {
                    var serializer = factory.create({});

                    expect(serializer instanceof DefaultSerializer).toBe(true);
                });
            });

            describe('with inexistent config.serializer', function() {
                it('should throw a ConfigurationError', function() {
                    expect(function() {
                        var serializer = factory.create({serializer: 'badpath'});
                    }).toThrowError(Error);
                });
            });

            describe('with bad config.serializer', function() {
                it('should throw a ConfigurationError', function() {
                    expect(function() {
                        var serializer = factory.create({serializer: '../../examples/badSerializer'});
                    }).toThrowError(errors.ConfigurationError);
                });
            });

            describe('IncompleteSerializer', function() {
                var serializer = factory.create({serializer: '../../examples/incompleteSerializer'});

                describe('and call not implemented method "serialize"', function() {
                    it('should throw a NotImplementedError', function() {
                        expect(function() {
                            serializer.serialize('test');
                        }).toThrowError(errors.NotImplementedError);
                    });
                })

                describe('and call not implemented method "deserialize"', function() {
                    it('should throw a NotImplementedError', function() {
                        expect(function() {
                            serializer.deserialize('test', {});
                        }).toThrowError(errors.NotImplementedError);
                    });
                })
            });

        });

    });

} (require, process, describe, expect, it));