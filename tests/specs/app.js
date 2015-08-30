'use strict';

/* global describe, inject, module, expect, it, beforeEach, angular, getModuleProviders */

describe('flatAngle app', function() {

    var actual = {},
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
        this.texts = $injector.get('texts');
        this.appUrls = $injector.get('appUrls');
        this.homeUrl = $injector.get('homeUrl');
        this.apiUrl = $injector.get('apiUrl');
        this.showdown = $injector.get('showdown');
    }));

    it('should have all of its constants set', function() {

        expect(actual.constants).toEqual(expected.constants);

        // this ensures we didn't forget anything in the inject above
        for (var i = actual.constants.length - 1; i >= 0 ; --i) {
            expect(this[actual.constants[i]]).toBeDefined();
        }

        /* global texts, config, showdown */
        expect(this.texts).toBe(texts[config.config.lang]);
        expect(this.appUrls).toBe(config.config.appUrls);
        expect(this.homeUrl).toBe(config.config.appUrls[config.config.home]);
        expect(this.apiUrl).toBe(config.config.apiUrl);
        expect(this.showdown).toBe(showdown);

    });

});