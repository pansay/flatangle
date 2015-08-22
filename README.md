[![Build Status](https://travis-ci.org/pansay/flatangle.svg?branch=master)](https://travis-ci.org/pansay/flatangle)


# flatangle

FlatAngle: flatfile angular blog tool

## Features

* flat file blog
* markdown text files (blog posts)
* csv files (translation)
* pure client-side angular
* unlicensed. no licensed code included.
* cached XHRs for posts
* precached angular templates
* html, css/less and js minification and validation
* 100% unit tests coverage (karma/jasmine)
* e2e tests (protractor)
* either work directly from your text editor or use github as a CMS (great for markdown and CSV files)

## Installation

* npm install

## Configuration

* change the apiUrl in config.json to your own repo
* setup github pages (push the gh-branch)

## Start

* npm start

## Access

* browse on your github pages page

## Adding content

* use github directly to edit and preview markdown
* edit markdown files and push to gh-pages branch

## GitHub API

* current version gets list of posts and posts from github API, that is, from the content/posts folder of you app on github
* to use this correctly, don't forget to work with the gh-pages branch

## Previous version / alternatives

* another possibility (commented out in the code) is to use grunt to generate a json of your files directly. This can be useful if you want a purely local (offline) server
* using another APIs would be easy to implement, but Dropbox etc. APIs seem to suck so far

## To do

* meta title with page title
* cached data to contain full text titles, lazy enhance the posts list