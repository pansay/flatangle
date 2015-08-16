'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('listController', function () {

    var injected = {},
        mocked = {};

    mocked.postsList = {
        'abc': 'def'
    };

    beforeEach(module('flatAngle'));
    beforeEach(inject(function (_$controller_) {
        injected.listController = _$controller_('listController', {'postsList': mocked.postsList});
    }));

    it('should be defined', function () {
        expect(injected.listController).toBeDefined();
    });

    it('should pass `postsList` to the vm', function () {
        expect(injected.listController.list).toBe(mocked.postsList);
    });

});