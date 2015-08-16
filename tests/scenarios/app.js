'use strict';

/* global describe, expect, browser, element, it, by */

describe('FlatAngle', function() {

    it('should redirect to #posts', function() {
        browser.get('/');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/posts');
        });
    });

    it('should list all posts', function() {
        var postsList = element.all(by.repeater('post in posts.list'));
        expect(postsList.count()).toBeGreaterThan(0);
    });

    it('should load first post when clicked on its link', function() {

        var postsList = element.all(by.repeater('post in posts.list'));
        var link = postsList.get(0).$('a');
        link.getAttribute('href').then(function(href) {
            link.click();
            browser.getCurrentUrl().then(function(url) {
                expect(url).toEqual(href);
            });
        });

    });

    it('should redirect to #posts on 404', function() {
        browser.get('#/posts/does-not-exist');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/posts');
        });
    });

});