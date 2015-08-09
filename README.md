# MusicDB
An example application that queries the Music Brainz API (http://musicbrainz.org) to find albums and
the songs associated with the albums.

Due to the way Music Brainz operates, there may be duplicate songs (known as recordings) for each "album" (known as a recording-group). This is a known limitation and an exercise for a future revision.

Also, since this is an open source database, not all album artwork is available.

# Technology Used

- Yeoman Angular scafolding (Angular 1.4.3)
- Angular Materials style sheets (based on the Google Material Design Specs)
- SASS CSS pre-processing
- Autoprefixer (automatically adds CSS prefixes when appropriate)
- Angular-router
- Grunt build system
- Karma test harness with Jasmine and PhantomJS

# Installation

## Install Dependencies
    npm install
    bower install
    // Note: Choose angular 1.4.3

## Run Tests
    grunt test

## Run Development Server
    grunt serve
