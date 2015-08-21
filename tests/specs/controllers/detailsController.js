'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('detailsController', function () {

    var injected = {},
        mocked = {};

    beforeEach(module('flatAngle'));
    beforeEach(inject(function ($injector) {
        injected.$controller = $injector.get('$controller');
        mocked.postDetails = {
            'abc': 'def'
        };
        mocked.dependencies = {
            'postDetails': mocked.postDetails
        };
        injected.detailsController = injected.$controller('detailsController', mocked.dependencies);
    }));

    it('should be defined', function () {
        expect(injected.detailsController).toBeDefined();
    });

    it('should pass `postDetails` to the vm', function () {
        expect(injected.detailsController.details).toBe(mocked.postDetails);
    });

});