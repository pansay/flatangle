'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('mainController', function () {

    var injected = {},
        mocked = {};

    beforeEach(module('flatAngle'));
    beforeEach(inject(function ($injector) {
        injected.$controller = $injector.get('$controller');
        injected.$rootScope = $injector.get('$rootScope');
        injected.$scope = injected.$rootScope.$new();
        mocked.texts = {
            'title': 'toto'
        };
        mocked.dependencies = {
            $scope: injected.$scope,
            texts: mocked.texts
        };
        injected.mainController = injected.$controller('mainController', mocked.dependencies);
    }));

    it('should be defined', function () {
        expect(injected.mainController).toBeDefined();
    });

    it('should pass `texts` to the scope', function () {
        expect(injected.$scope.texts).toBe(mocked.texts);
    });

    it('should pass `title` to the scope', function () {
        expect(injected.$scope.texts.title).toBe(mocked.texts.title);
    });

});