'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('listController', function () {

    var mocked = {};

    beforeEach(module('flatAngle'));
    beforeEach(inject(function ($injector) {
        this.$controller = $injector.get('$controller');
        mocked.postsList = {
            'abc': 'def'
        };
        mocked.dependencies = {
            'postsList': mocked.postsList
        };
        this.listController = this.$controller('listController', mocked.dependencies);
    }));

    it('should be defined', function () {
        expect(this.listController).toBeDefined();
    });

    it('should pass `postsList` to the vm', function () {
        expect(this.listController.list).toBe(mocked.postsList);
    });

});