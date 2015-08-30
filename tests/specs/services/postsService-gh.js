'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('postsService (github)', function () {

    var mocked = {},
        expected = {},
        resolved = {};

    mocked.apiUrl = 'mockedApiUrl';
    mocked.badPostsList = {'abc': 'def'};
    mocked.emptyPostsList = [];
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

    expected.goodPostsList = {};
    expected.goodPostsList[mocked.goodAlias] = {
        'date': mocked.goodDate,
        'alias': mocked.goodAlias,
        'filepath': mocked.downloadUrl
    };
    expected.goodPost = '<p>hello <em>world</em></p>';

    beforeEach(module('flatAngle'));
    beforeEach(module(function ($provide) {
        $provide.constant('apiUrl', mocked.apiUrl);
    }));
    beforeEach(inject(function ($injector) {
        this.postsService = $injector.get('postsService');
        this.$httpBackend = $injector.get('$httpBackend');
        this.$timeout = $injector.get('$timeout');
    }));

    it('should be defined', function () {
        expect(this.postsService).toBeDefined();
    });

    it('should expose getPosts method', function () {
        expect(this.postsService.getPosts).toBeDefined();
    });

    describe('getPosts', function () {

        beforeEach(function () {
            resolved.postsList = null;
            resolved.errorReason = null;
            expected.errorReason = 'no posts';
        });

        it('should return false with empty response', function () {
            this.$httpBackend.when('GET', mocked.apiUrl).respond(mocked.emptyPostsList);

            mocked.promise = this.postsService.getPosts();
            mocked.promise.then(function (response) {
                resolved.postsList = response;
            }, function (reason) {
                resolved.errorReason = reason;
            });

            expect(resolved.postsList).toBeNull();
            expect(resolved.errorReason).toBeNull();

            this.$httpBackend.flush();

            expect(resolved.postsList).toBe(false);
            expect(resolved.errorReason).toBeNull();
        });

        it('should return promise resolving to posts list with good response', function () {
            this.$httpBackend.when('GET', mocked.apiUrl).respond(mocked.goodPostsList);

            mocked.promise = this.postsService.getPosts();
            mocked.promise.then(function (response) {
                resolved.postsList = response;
            }, function (reason) {
                resolved.errorReason = reason;
            });

            expect(resolved.postsList).toBeNull();
            expect(resolved.errorReason).toBeNull();

            this.$httpBackend.flush();

            expect(resolved.postsList).toEqual(expected.goodPostsList);
            expect(resolved.errorReason).toBeNull();
        });

    });

    it('should expose getPost method', function () {
        expect(this.postsService.getPost).toBeDefined();
    });

    describe('getPost', function () {

        beforeEach(function () {
            this.$httpBackend.when('GET', mocked.apiUrl).respond(mocked.goodPostsList);
            this.$httpBackend.when('GET', mocked.downloadUrl).respond(mocked.goodPost);
            resolved.post = null;
            resolved.errorReason = null;
            expected.errorReason = 'alias not found';
        });

        it('should return rejected promise if called with bad alias', function () {

            mocked.promise = this.postsService.getPost(mocked.badAlias);
            mocked.promise.then(function (response) {
                resolved.post = response;
            }, function (reason) {
                resolved.errorReason = reason;
            });

            expect(resolved.post).toBeNull();
            expect(resolved.errorReason).toBeNull();

            this.$httpBackend.flush();

            expect(resolved.post).toBeNull();
            expect(resolved.errorReason).toBe(expected.errorReason);

        });

        it('should return promise resolving to post if called with good alias', function () {

            mocked.promise = this.postsService.getPost(mocked.goodAlias);
            mocked.promise.then(function (response) {
                resolved.post = response;
            }, function (reason) {
                resolved.errorReason = reason;
            });

            expect(resolved.post).toBeNull();
            expect(resolved.errorReason).toBeNull();
            this.$httpBackend.flush();

            expect(resolved.post.content.$$unwrapTrustedValue()).toBe(expected.goodPost);
            expect(resolved.errorReason).toBeNull();

        });

        it('should return promise resolving to post from cache if called with good alias a second time', function () {

            mocked.promise = this.postsService.getPost(mocked.goodAlias);

            expect(this.$httpBackend.flush).not.toThrow();
            expect(this.$httpBackend.flush).toThrow();

            expect(resolved.post).toBeNull();
            expect(resolved.errorReason).toBeNull();

            // this promise should return the data cached
            // from the previous request
            // not make a new one
            mocked.promise = this.postsService.getPost(mocked.goodAlias);
            mocked.promise.then(function (response) {
                resolved.post = response;
            }, function (reason) {
                resolved.errorReason = reason;
            });

            expect(resolved.post).toBeNull();
            expect(resolved.errorReason).toBeNull();

            // assert that no requests were made
            expect(this.$httpBackend.flush).toThrowError('No pending request to flush !');

            // flush the deferreds
            this.$timeout.flush();

            expect(resolved.post.content.$$unwrapTrustedValue()).toBe(expected.goodPost);
            expect(resolved.errorReason).toBeNull();

        });
    });

});