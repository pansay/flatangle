'use strict';

/* global describe, it, beforeEach, module, inject, expect */

describe('router', function () {

    var injected = {},
        mocked = {};

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
        injected.homeUrl = $injector.get('homeUrl');

        mocked.badAlias = 'abc';
        mocked.goodAlias = 'def';
        mocked.badUrl = injected.appUrls.posts + '/' + mocked.badAlias;
        mocked.goodUrl = injected.appUrls.posts + '/' + mocked.goodAlias;
        mocked.postsList = {'mocked': 'posts'};
        mocked.reason = 'mocked reason';
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

        it('should call the list controller', function () {
            injected.$location.path(injected.appUrls.posts);
            injected.$rootScope.$digest();
            expect(injected.$route.current.controller).toBe('listController as posts');
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
            expect(injected.$route.current).toBeUndefined();
            injected.$location.path(mocked.badUrl);
            expect(injected.$route.current).toBeUndefined();
            injected.$rootScope.$digest();
            expect(injected.$route.current.controller).toBe('listController as posts');
        });

        it('should call the details controller with good alias', function () {
            expect(injected.$route.current).toBeUndefined();
            injected.$location.path(mocked.goodUrl);
            expect(injected.$route.current).toBeUndefined();
            injected.$rootScope.$digest();
            expect(injected.$route.current.controller).toBe('detailsController as post');
        });

    });

    describe('any other route', function () {

        it('should redirect to home', function () {
            expect(injected.$route.routes[null].redirectTo).toEqual(injected.homeUrl);
        });

    });

});