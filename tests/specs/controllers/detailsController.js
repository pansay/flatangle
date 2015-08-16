'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('detailsController', function () {

    var injected = {},
        mocked = {};

    mocked.postDetails = {
        'abc': 'def'
    };

    beforeEach(module('flatAngle'));
    beforeEach(inject(function (_$controller_) {
        injected.detailsController = _$controller_('detailsController', {'postDetails': mocked.postDetails});
    }));

    it('should be defined', function () {
        expect(injected.detailsController).toBeDefined();
    });

    it('should pass `postDetails` to the vm', function () {
        expect(injected.detailsController.details).toBe(mocked.postDetails);
    });

});