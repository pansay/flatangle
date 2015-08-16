'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('postsService (github)', function () {

    var injected = {},
        mocked = {},
        expected = {};

    mocked.badPostsList = {'abc': 'def'};
    expected.badPostsList = false;
    mocked.goodPostsList = [
        {
            'name': '2020-01-12_hello-mock.md',
            'download_url': 'https://mock'
        }
    ];
    expected.goodPostsList = [
        {
            'date': '2020-01-12',
            'alias': 'hello-mock',
            'filepath': 'https://mock'
        }
    ];

    beforeEach(module('flatAngle'));
    beforeEach(inject(function (_postsService_, _$httpBackend_) {
        injected.postsService = _postsService_;
        mocked.http = _$httpBackend_;
    }));

    it('should be defined', function () {
        expect(injected.postsService).toBeDefined();
    });

    it('should expose getPosts method', function () {
        expect(injected.postsService.getPosts).toBeDefined();
    });

    describe('getPosts', function () {

        it('should return promise resolving to false given bad response', function () {
            mocked.http.when('GET', /.*/).respond(mocked.badPostsList);
            mocked.resolvedPostsList = null;
            mocked.promise = injected.postsService.getPosts();
            mocked.promise.then(function (response) {
                mocked.resolvedPostsList = response;
            });

            expect(mocked.resolvedPostsList).toBeNull();
            mocked.http.flush();
            expect(mocked.resolvedPostsList).toEqual(expected.badPostsList);
        });

        it('should return promise resolving to posts list', function () {
            mocked.http.when('GET', /.*/).respond(mocked.goodPostsList);
            mocked.resolvedPostsList = null;
            mocked.promise = injected.postsService.getPosts();
            mocked.promise.then(function (response) {
                mocked.resolvedPostsList = response;
            });

            expect(mocked.resolvedPostsList).toBeNull();
            mocked.http.flush();
            expect(mocked.resolvedPostsList).toEqual(expected.goodPostsList);
        });

    });

    it('should expose getPost method', function () {
        expect(injected.postsService.getPost).toBeDefined();
    });

});