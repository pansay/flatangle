'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('router', function () {

    var mocked = {},
        expected = {};

    mocked.postsService = {};

    beforeEach(module('flatAngle'));

    beforeEach(module(function ($provide) {
        $provide.constant('postsService', mocked.postsService);
    }));

    beforeEach(inject(function ($injector) {
        var injected = this;
        this.$route = $injector.get('$route');
        this.$location = $injector.get('$location');
        this.$rootScope = $injector.get('$rootScope');
        this.$q = $injector.get('$q');
        this.appUrls = $injector.get('appUrls');

        mocked.badAlias = 'abc';
        mocked.goodAlias = 'def';
        mocked.badUrl = this.appUrls.posts + '/' + mocked.badAlias;
        mocked.goodUrl = this.appUrls.posts + '/' + mocked.goodAlias;
        mocked.postsList = {'mocked': 'posts'};
        mocked.reason = 'mocked reason';
        mocked.badPath = '/whatever-else';
        mocked.postDetails = {};
        mocked.postsService.getPosts = function () {
            var deferred = injected.$q.defer();
            deferred.resolve(mocked.postsList);
            return deferred.promise;
        };
        mocked.postsService.getPost = function (alias) {
            var deferred = injected.$q.defer();
            if (alias === mocked.goodAlias) {
                deferred.resolve(mocked.postDetails);
            }
            else {
                deferred.reject(mocked.reason);
            }
            return deferred.promise;
        };

    }));

    describe('posts list route', function () {

        it('should call the right controller', function () {
            expected.controller = this.$route.routes[this.appUrls.posts].controller;
            this.$location.path(this.appUrls.posts);
            this.$rootScope.$digest();
            expect(this.$route.current.controller).toBe(expected.controller);
        });

        it('should pass the resolved posts list', function () {
            this.$location.path(this.appUrls.posts);
            this.$rootScope.$digest();
            expect(this.$route.current.locals.postsList).toBe(mocked.postsList);
        });

        it('should pass `false` if no posts', function () {
            var injected = this;
            mocked.postsService.getPosts = function () {
                var deferred = injected.$q.defer();
                deferred.reject(deferred.reject(mocked.reason));
                return deferred.promise;
            };
            this.$location.path(this.appUrls.posts);
            this.$rootScope.$digest();
            expect(this.$route.current.locals.postsList).toBe(false);
        });


    });

    describe('posts details route', function () {

        it('should redirect to list with bad alias', function () {
            this.$location.path(mocked.badUrl);
            this.$rootScope.$digest();
            expect(this.$route.current.controller).toBe('listController as posts');
        });

        it('should call the right controller when given good alias', function () {
            expected.postRoute = this.appUrls.posts + '/:postAlias';
            expected.controller = this.$route.routes[expected.postRoute].controller;
            this.$location.path(mocked.goodUrl);
            this.$rootScope.$digest();
            expect(this.$route.current.controller).toBe(expected.controller);
        });

    });

    describe('any other route', function () {

        it('should redirect to redirectUrl from any other route', function () {
            expected.homePath = this.$route.routes[null].redirectTo;
            this.$location.path(mocked.badPath);
            this.$rootScope.$digest();
            expect(this.$location.path()).toBe(expected.homePath);
        });

    });

});