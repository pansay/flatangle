'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('postsService (github)', function () {

    var injected = {},
        mocked = {},
        expected = {},
        resolved = {};

    mocked.apiUrl = 'mockedApiUrl';
    mocked.badPostsList = {'abc': 'def'};
    mocked.downloadUrl = 'mockedDownloadUrl';
    mocked.goodAlias = 'hello-mock';
    mocked.goodDate = '2020-01-12';
    mocked.goodPostsList = [
        {
            'name': mocked.goodDate + '_' + mocked.goodAlias + '.md',
            'download_url': mocked.downloadUrl
        }
    ];
    mocked.badAlias = 'toto';
    mocked.goodPost = 'hello *world*';

    expected.goodPostsList = [
        {
            'date': mocked.goodDate,
            'alias': mocked.goodAlias,
            'filepath': mocked.downloadUrl
        }
    ];
    expected.goodPost = '<p>hello <em>world</em></p>';
    expected.errorReason = 'alias not found';

    beforeEach(module('flatAngle'));
    beforeEach(module(function ($provide) {
        $provide.constant('apiUrl', mocked.apiUrl);
    }));
    beforeEach(inject(function (_postsService_, _$httpBackend_, _$timeout_) {
        injected.postsService = _postsService_;
        mocked.http = _$httpBackend_;
        injected.timeout = _$timeout_;
    }));

    it('should be defined', function () {
        expect(injected.postsService).toBeDefined();
    });

    it('should expose getPosts method', function () {
        expect(injected.postsService.getPosts).toBeDefined();
    });

    describe('getPosts', function () {

        it('should return promise resolving to false with bad response', function () {
            mocked.http.when('GET', mocked.apiUrl).respond(mocked.badPostsList);
            resolved.postsList = null;
            mocked.promise = injected.postsService.getPosts();
            mocked.promise.then(function (response) {
                resolved.postsList = response;
            });

            expect(resolved.postsList).toBeNull();
            mocked.http.flush();
            expect(resolved.postsList).toBe(false);
        });

        it('should return promise resolving to posts list with good response', function () {
            mocked.http.when('GET', mocked.apiUrl).respond(mocked.goodPostsList);
            resolved.postsList = null;
            mocked.promise = injected.postsService.getPosts();
            mocked.promise.then(function (response) {
                resolved.postsList = response;
            });

            expect(resolved.postsList).toBeNull();
            mocked.http.flush();
            expect(resolved.postsList).toEqual(expected.goodPostsList);
        });

    });

    it('should expose getPost method', function () {
        expect(injected.postsService.getPost).toBeDefined();
    });

    describe('getPost', function () {

        beforeEach(function () {
            mocked.http.when('GET', mocked.apiUrl).respond(mocked.goodPostsList);
            mocked.http.when('GET', mocked.downloadUrl).respond(mocked.goodPost);
            resolved.post = null;
            resolved.errorReason = null;
        });

        it('should return rejected promise if called with bad alias', function () {

            mocked.promise = injected.postsService.getPost(mocked.badAlias);
            mocked.promise.then(function (response) {
                resolved.post = response;
            }, function (reason) {
                resolved.errorReason = reason;
            });

            expect(resolved.post).toBeNull();
            expect(resolved.errorReason).toBeNull();

            mocked.http.flush();

            expect(resolved.post).toBeNull();
            expect(resolved.errorReason).toBe(expected.errorReason);

        });

        it('should return promise resolving to post if called with good alias', function () {

            mocked.promise = injected.postsService.getPost(mocked.goodAlias);
            mocked.promise.then(function (response) {
                resolved.post = response;
            }, function (reason) {
                resolved.errorReason = reason;
            });

            expect(resolved.post).toBeNull();
            expect(resolved.errorReason).toBeNull();
            mocked.http.flush();

            expect(resolved.post.$$unwrapTrustedValue()).toBe(expected.goodPost);
            expect(resolved.errorReason).toBeNull();

        });

        it('should return promise resolving to post from cache if called with good alias a second time', function () {

            mocked.promise = injected.postsService.getPost(mocked.goodAlias);

            expect(mocked.http.flush).not.toThrow();
            expect(mocked.http.flush).toThrow();

            expect(resolved.post).toBeNull();
            expect(resolved.errorReason).toBeNull();

            // this promise should return the data cached
            // from the previous request
            // not make a new one
            mocked.promise = injected.postsService.getPost(mocked.goodAlias);
            mocked.promise.then(function (response) {
                resolved.post = response;
            }, function (reason) {
                resolved.errorReason = reason;
            });

            expect(resolved.post).toBeNull();
            expect(resolved.errorReason).toBeNull();

            // assert that no requests were made
            expect(mocked.http.flush).toThrowError('No pending request to flush !');

            // flush the deferreds
            injected.timeout.flush();

            expect(resolved.post.$$unwrapTrustedValue()).toBe(expected.goodPost);
            expect(resolved.errorReason).toBeNull();

        });
    });

});