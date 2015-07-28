/**
 * Created by Artem.Malieiev on 6/19/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    return Backbone.Model.extend({
        idAttribute : 'name',
        defaults: {
            name: '',
            label: ''
        }
    });
});