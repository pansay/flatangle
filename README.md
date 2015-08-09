# flatangle

FlatAngle: flatfile angular blog tool

## Features

* flat file blog
* markdown text files
* pure client-side angular
* unlicensed. no licensed code included.
* cached XHRs for posts
* precached angular templates
* html, css/less and js minification and validation
* karma unit tests (TODO)
* protractor e2e tests (TODO)

## Installation

* npm install

## Configuration

* change the apiUrl in config.json to your own repo
* setup github pages (push the gh-branch)

## Start

* npm start

## Access

* browse on your github pages page

## adding content

* use github directly to edit and preview markdown
* edit markdown files and push to gh-pages branch

## GitHub API

* current version gets list of posts and posts from github API, that is, from the content/posts folder of you app on github
* to use this correctly, don't forget to work with the gh-pages branch

## Previous version / alternatives

* another possibility (commented out in the code) is to use grunt to generate a json of your files directly. This can be useful if you want a purely local (offline) server
* using another APIs would be easy to implement, but Dropbox etc. APIs seem to suck so far
