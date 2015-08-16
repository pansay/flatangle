'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('converterService', function () {

    var injected = {},
        mocked = {};

    beforeEach(module('flatAngle'));
    beforeEach(inject(function (_converterService_) {
        injected.converterService = _converterService_;
    }));

    it('should be defined', function () {
        expect(injected.converterService).toBeDefined();
    });

    it('should expose markdownToHtml method', function () {
        expect(injected.converterService.markdownToHtml).toBeDefined();
    });

    describe('markdownToHtml method', function () {

        it('should convert markdown to html', function () {
            expect(injected.converterService.markdownToHtml(
                'sample *text* test'
                )).toBe(
                '<p>sample <em>text</em> test</p>'
            );
        });

    });

});