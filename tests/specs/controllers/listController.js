'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('listController', function () {

    var injected = {},
        mocked = {};

    beforeEach(module('flatAngle'));
    beforeEach(inject(function ($injector) {
        injected.$controller = $injector.get('$controller');
        mocked.postsList = {
            'abc': 'def'
        };
        mocked.dependencies = {
            'postsList': mocked.postsList
        };
        injected.listController = injected.$controller('listController', mocked.dependencies);
    }));

    it('should be defined', function () {
        expect(injected.listController).toBeDefined();
    });

    it('should pass `postsList` to the vm', function () {
        expect(injected.listController.list).toBe(mocked.postsList);
    });

});