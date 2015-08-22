'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('router', function () {

    var injected = {},
        mocked = {},
        expected = {};

    mocked.postsService = {};

    beforeEach(module('flatAngle'));

    beforeEach(module(function ($provide) {
        $provide.constant('postsService', mocked.postsService);
    }));

    beforeEach(inject(function ($injector) {
        injected.$route = $injector.get('$route');
        injected.$location = $injector.get('$location');
        injected.$rootScope = $injector.get('$rootScope');
        injected.$q = $injector.get('$q');
        injected.appUrls = $injector.get('appUrls');

        mocked.badAlias = 'abc';
        mocked.goodAlias = 'def';
        mocked.badUrl = injected.appUrls.posts + '/' + mocked.badAlias;
        mocked.goodUrl = injected.appUrls.posts + '/' + mocked.goodAlias;
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
            expected.controller = injected.$route.routes[injected.appUrls.posts].controller;
            injected.$location.path(injected.appUrls.posts);
            injected.$rootScope.$digest();
            expect(injected.$route.current.controller).toBe(expected.controller);
        });

        it('should pass the resolved posts list', function () {
            injected.$location.path(injected.appUrls.posts);
            injected.$rootScope.$digest();
            expect(injected.$route.current.locals.postsList).toBe(mocked.postsList);
        });

        it('should pass `false` if no posts', function () {
            mocked.postsService.getPosts = function () {
                var deferred = injected.$q.defer();
                deferred.reject(deferred.reject(mocked.reason));
                return deferred.promise;
            };
            injected.$location.path(injected.appUrls.posts);
            injected.$rootScope.$digest();
            expect(injected.$route.current.locals.postsList).toBe(false);
        });


    });

    describe('posts details route', function () {

        it('should redirect to list with bad alias', function () {
            injected.$location.path(mocked.badUrl);
            injected.$rootScope.$digest();
            expect(injected.$route.current.controller).toBe('listController as posts');
        });

        it('should call the right controller when given good alias', function () {
            expected.postRoute = injected.appUrls.posts + '/:postAlias';
            expected.controller = injected.$route.routes[expected.postRoute].controller;
            injected.$location.path(mocked.goodUrl);
            injected.$rootScope.$digest();
            expect(injected.$route.current.controller).toBe(expected.controller);
        });

    });

    describe('any other route', function () {

        it('should redirect to redirectUrl from any other route', function () {
            expected.homePath = injected.$route.routes[null].redirectTo;
            injected.$location.path(mocked.badPath);
            injected.$rootScope.$digest();
            expect(injected.$location.path()).toBe(expected.homePath);
        });

    });

});