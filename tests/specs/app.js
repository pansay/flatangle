'use strict';

/* global describe, inject, module, expect, it, beforeEach, angular, getModuleProviders */

describe('flatAngle app', function() {

    var actual = {},
        injected = {},
        expected = {};

    actual.module = angular.module('flatAngle');
    actual.constants = getModuleProviders(actual.module).constant;

    expected.dependencies = ['ngRoute', 'templates-main'];
    expected.constants = ['texts', 'appUrls', 'homeUrl', 'apiUrl', 'showdown'];

    it('should be defined', function() {
        expect(actual.module).toBeDefined();
    });

    it('should have all its dependencies set', function() {
        expect(actual.module.requires).toEqual(expected.dependencies);
    });

    /* we have to be careful because some variables are globals, thus we distinguish

    texts: global
    _texts_ : reference to the 'texts' string in .constant('texts') (it could be texts here, but let's keep it clear)
    injected.texts: injection result

    etc.

    */

    beforeEach(module('flatAngle'));
    beforeEach(inject(function(_texts_, _appUrls_, _homeUrl_, _apiUrl_, _showdown_) {
        injected.texts = _texts_;
        injected.appUrls = _appUrls_;
        injected.homeUrl = _homeUrl_;
        injected.apiUrl = _apiUrl_;
        injected.showdown =  _showdown_;
    }));

    it('should have all of its constants set', function() {

        expect(actual.constants).toEqual(expected.constants);

        // this ensures we didn't forget anything in the inject above
        for (var i = actual.constants.length - 1; i >= 0 ; i--) {
            expect(injected[actual.constants[i]]).toBeDefined();
        }

        /* global texts, config, showdown */
        expect(injected.texts).toBe(texts[config.config.lang]);
        expect(injected.appUrls).toBe(config.config.appUrls);
        expect(injected.homeUrl).toBe(config.config.appUrls[config.config.home]);
        expect(injected.apiUrl).toBe(config.config.apiUrl);
        expect(injected.showdown).toBe(showdown);

    });

});