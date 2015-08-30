'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('converterService', function () {

    var mocked = {},
        expected = {};

    mocked.multiLinesString = 'abc\ndef\nghi\n';
    expected.firstLine = 'abc';
    mocked.html = 'abc<strong>def</strong>';
    expected.plainText = 'abcdef';

    beforeEach(module('flatAngle'));
    beforeEach(inject(function ($injector) {
        this.converterService = $injector.get('converterService');
    }));

    it('should be defined', function () {
        expect(this.converterService).toBeDefined();
    });

    it('should expose markdownToHtml method', function () {
        expect(this.converterService.markdownToHtml).toBeDefined();
    });

    it('should expose htmlToPlainText method', function () {
        expect(this.converterService.htmlToPlainText).toBeDefined();
    });

    it('should expose firstLine method', function () {
        expect(this.converterService.firstLine).toBeDefined();
    });

    it('should expose trustAsHtml method', function () {
        expect(this.converterService.trustAsHtml).toBeDefined();
    });

    describe('htmlToPlainText method', function () {

        it('should convert html to plain text', function () {
            expect(this.converterService.htmlToPlainText(mocked.html)).toBe(expected.plainText);
        });

        it('should return empty string if given empty string', function () {
            expect(this.converterService.htmlToPlainText('')).toBe('');
        });

    });

    describe('firstLine method', function () {

        it('should return first line of string', function () {
            expect(this.converterService.firstLine(mocked.multiLinesString)).toBe(expected.firstLine);
        });

    });

    describe('trustAsHtml method', function () {

        it('should return wrapped html', function () {
            expect(this.converterService.trustAsHtml(mocked.html).$$unwrapTrustedValue()).toBe(mocked.html);
        });

    });

    describe('markdownToHtml method', function () {

        it('should convert markdown to html', function () {
            expect(this.converterService.markdownToHtml(
                'sample *text* test'
                )).toBe(
                '<p>sample <em>text</em> test</p>'
            );
        });

    });

});