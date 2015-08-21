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

    beforeEach(module('flatAngle'));
    beforeEach(inject(function($injector) {
        injected.texts = $injector.get('texts');
        injected.appUrls = $injector.get('appUrls');
        injected.homeUrl = $injector.get('homeUrl');
        injected.apiUrl = $injector.get('apiUrl');
        injected.showdown = $injector.get('showdown');
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