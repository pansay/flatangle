'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('mainController', function () {

    var injected = {},
        mocked = {};

    mocked.texts = {
        'title': 'toto'
    };

    beforeEach(module('flatAngle'));
    beforeEach(inject(function (_$controller_) {
        injected.scope = {};
        injected.mainController = _$controller_('mainController', {'$scope': injected.scope, 'texts': mocked.texts});
    }));

    it('should be defined', function () {
        expect(injected.mainController).toBeDefined();
    });

    it('should pass `texts` to the scope', function () {
        expect(injected.scope.texts).toBe(mocked.texts);
    });

    it('should pass `title` to the scope', function () {
        expect(injected.scope.texts.title).toBe(mocked.texts.title);
    });

});