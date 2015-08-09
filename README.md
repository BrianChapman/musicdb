# MusicDB
An example application that queries the Music Brainz API (http://musicbrainz.org) to find albums and
the songs associated with the albums.

Due to the way Music Brainz operates, there may be duplicate songs (known as recordings) for each "album" (known as a recording-group). This is a known limitation and an exercise for a future revision.

Also, since this is an open source database, not all album artwork is available.

# Installation

## Install Dependencies
    npm install
    bower install
    // Note: Choose angular 1.4.3

## Run Tests
    grunt test

## Run Development Server
    grunt serve
