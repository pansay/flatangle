'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('detailsController', function () {

    var mocked = {};

    beforeEach(module('flatAngle'));
    beforeEach(inject(function ($injector) {
        this.$controller = $injector.get('$controller');
        mocked.postDetails = {
            'abc': 'def'
        };
        mocked.dependencies = {
            'postDetails': mocked.postDetails
        };
        this.detailsController = this.$controller('detailsController', mocked.dependencies);
    }));

    it('should be defined', function () {
        expect(this.detailsController).toBeDefined();
    });

    it('should pass `postDetails` to the vm', function () {
        expect(this.detailsController.details).toBe(mocked.postDetails);
    });

});