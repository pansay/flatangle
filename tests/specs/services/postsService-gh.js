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

    beforeEach(module('flatAngle'));
    beforeEach(module(function ($provide) {
        $provide.constant('apiUrl', mocked.apiUrl);
    }));
    beforeEach(inject(function ($injector) {
        injected.postsService = $injector.get('postsService');
        injected.$httpBackend = $injector.get('$httpBackend');
        injected.$timeout = $injector.get('$timeout');
    }));

    it('should be defined', function () {
        expect(injected.postsService).toBeDefined();
    });

    it('should expose getPosts method', function () {
        expect(injected.postsService.getPosts).toBeDefined();
    });

    describe('getPosts', function () {

        beforeEach(function () {
            resolved.postsList = null;
            resolved.errorReason = null;
            expected.errorReason = 'no posts';
        });

        it('should return rejected promise with bad response', function () {
            injected.$httpBackend.when('GET', mocked.apiUrl).respond(mocked.badPostsList);

            mocked.promise = injected.postsService.getPosts();
            mocked.promise.then(function (response) {
                resolved.postsList = response;
            }, function (reason) {
                resolved.errorReason = reason;
            });

            expect(resolved.postsList).toBeNull();
            expect(resolved.errorReason).toBeNull();

            injected.$httpBackend.flush();

            expect(resolved.postsList).toBeNull();
            expect(resolved.errorReason).toBe(expected.errorReason);
        });

        it('should return promise resolving to posts list with good response', function () {
            injected.$httpBackend.when('GET', mocked.apiUrl).respond(mocked.goodPostsList);

            mocked.promise = injected.postsService.getPosts();
            mocked.promise.then(function (response) {
                resolved.postsList = response;
            }, function (reason) {
                resolved.errorReason = reason;
            });

            expect(resolved.postsList).toBeNull();
            expect(resolved.errorReason).toBeNull();

            injected.$httpBackend.flush();

            expect(resolved.postsList).toEqual(expected.goodPostsList);
            expect(resolved.errorReason).toBeNull();
        });

    });

    it('should expose getPost method', function () {
        expect(injected.postsService.getPost).toBeDefined();
    });

    describe('getPost', function () {

        beforeEach(function () {
            injected.$httpBackend.when('GET', mocked.apiUrl).respond(mocked.goodPostsList);
            injected.$httpBackend.when('GET', mocked.downloadUrl).respond(mocked.goodPost);
            resolved.post = null;
            resolved.errorReason = null;
            expected.errorReason = 'alias not found';
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

            injected.$httpBackend.flush();

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
            injected.$httpBackend.flush();

            expect(resolved.post.$$unwrapTrustedValue()).toBe(expected.goodPost);
            expect(resolved.errorReason).toBeNull();

        });

        it('should return promise resolving to post from cache if called with good alias a second time', function () {

            mocked.promise = injected.postsService.getPost(mocked.goodAlias);

            expect(injected.$httpBackend.flush).not.toThrow();
            expect(injected.$httpBackend.flush).toThrow();

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
            expect(injected.$httpBackend.flush).toThrowError('No pending request to flush !');

            // flush the deferreds
            injected.$timeout.flush();

            expect(resolved.post.$$unwrapTrustedValue()).toBe(expected.goodPost);
            expect(resolved.errorReason).toBeNull();

        });
    });

});