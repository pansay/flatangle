'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('mainController', function () {

    var mocked = {};
    mocked.texts = {
        'title': 'toto'
    };

    beforeEach(module('flatAngle'));
    beforeEach(inject(function ($injector) {
        this.$controller = $injector.get('$controller');
        this.$rootScope = $injector.get('$rootScope');
        this.$scope = this.$rootScope.$new();
        mocked.dependencies = {
            $scope: this.$scope,
            texts: mocked.texts
        };
        this.mainController = this.$controller('mainController', mocked.dependencies);
    }));

    it('should be defined', function () {
        expect(this.mainController).toBeDefined();
    });

    it('should pass `texts` to the scope', function () {
        expect(this.$scope.texts).toBe(mocked.texts);
    });

    it('should pass `title` to the scope', function () {
        expect(this.$scope.texts.title).toBe(mocked.texts.title);
    });

});