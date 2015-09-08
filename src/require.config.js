/**
 * Created by Artem.Malieiev on 6/10/2015.
 */
require.config({
    paths: {
        backbone: 'bower_components/backbone/backbone',
        'backbone.localStorage': 'bower_components/backbone.localStorage/backbone.localStorage',
        jquery: 'bower_components/jquery/dist/jquery',
        'jquery-ui': 'bower_components/jquery-ui/jquery-ui',
        underscore: 'bower_components/underscore/underscore',
        text: 'bower_components/requirejs-text/text',
        json: 'bower_components/requirejs-plugins/src/json',
        foundation: 'bower_components/foundation/js/foundation',
        jsplumb: 'bower_components/jsplumb/dist/js/dom.jsPlumb-1.7.7',
        vis: 'bower_components/vis/dist/vis',
        c3: 'bower_components/c3/c3',
        d3: 'bower_components/d3/d3'
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        foundation: {
            deps: ['jquery']
        },
        c3: {
            deps: ['d3']
        },
        jsplumb: {
            exports: 'jsPlumb',
            deps: ['jquery']
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        sinon: {
            exports: 'sinon'
        }
    }
});

require(['main']);