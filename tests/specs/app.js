'use strict';

/* global describe, inject, module, expect, it, beforeEach, angular */

describe('flatAngle app', function() {

	it('should be defined', function() {
		expect(angular.module('flatAngle')).toBeDefined();
	});

	beforeEach(module('flatAngle'));

    var injected = {};

    /* we have to be careful because some variables are globals, thus we distinguish 

    texts: global
    _texts_ : reference to the 'texts' string in .constant('texts') (it could be texts here, but let's keep it clear)
    injected.texts: injection result

    etc.

    */

    beforeEach(inject(function(_texts_, _appUrls_, _homeUrl_, _apiUrl_, _showdown_) {
        injected.texts = _texts_;
        injected.appUrls = _appUrls_;
        injected.homeUrl = _homeUrl_;
        injected.apiUrl = _apiUrl_;
        injected.showdown =  _showdown_;
    }));

    it('should have constants correctly passed', function() {

        expect(injected.texts).toBeDefined();
        expect(injected.appUrls).toBeDefined();
        expect(injected.homeUrl).toBeDefined();
        expect(injected.apiUrl).toBeDefined();
        expect(injected.showdown).toBeDefined();

        /* global texts, config, showdown */
        expect(injected.texts).toBe(texts[config.config.lang]);
        expect(injected.appUrls).toBe(config.config.appUrls);
        expect(injected.homeUrl).toBe(config.config.appUrls[config.config.home]);
        expect(injected.apiUrl).toBe(config.config.apiUrl);
        expect(injected.showdown).toBe(showdown);

    });

});