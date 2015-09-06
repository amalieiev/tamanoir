/**
 * Created by Artem.Malieiev on 7/9/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        PostgreSQLConnectionModel = require('common/model/PostgreSQLConnectionModel'),
        TablesView = require('domain/view/TablesView'),
        DataCanvasView = require('domain/view/DataCanvasView'),
        TablesCollection = require('domain/collection/TablesCollection'),
        DialogView = require('common/view/DialogView'),
        ConnectionsCollection = require('common/collection/ConnectionsCollection'),
        DomainsCollection = require('common/collection/DomainsCollection'),
        TableView = require('domain/view/TableView'),
        DomainDesignerViewTemplate = require('text!domain/template/DomainDesignerViewTemplate.html');

    return Backbone.View.extend({

        className: 'domain-designer-view',
        template: DomainDesignerViewTemplate,
        events: {
            'click .productTitle': 'onProductTitleClick',
            'click .saveDomain': 'onSaveDomainClick',
            'click .analysis': 'onAnalysisClick'
        },

        initialize: function () {
            this._subviews = [];

            this.listenTo(this.model.connections, 'change:metadata', this.onConnectionMetadataLoaded);

            this.model.connections.invoke('fetchMetadata');

            this.render();
        },

        render: function () {
            this.$el.html(this.template);

            return this;
        },

        onConnectionMetadataLoaded: function (connectionModel) {
            console.log(connectionModel.toJSON());
        },

        onProductTitleClick: function () {
            Tamanoir.navigate('/', {trigger: true});
        },

        onSaveDomainClick: function (event) {
            if (this.model.isNew()) {
                var dialogView = new DialogView({
                    title: 'Save domain',
                    content: $('<input type="text" placeholder="name" name="name"/>'),
                    buttons: [{label: 'save', action: 'save'}]
                }).render();
                this.listenToOnce(dialogView, 'action:save', function () {
                    var name = dialogView.$('input').val();
                    if (name) {
                        this.model.save({
                            name: name,
                            connectionId: this.connectionModel.get('id'),
                            data: this.dataCanvasItemsCollection.toJSON()
                        }, {
                            success: function (model) {
                                Tamanoir.navigate('connection/' + model.get('connectionId') + '/' + model.get('id'));
                            }.bind(this)
                        });
                    }
                    dialogView.remove();
                }.bind(this));
            } else {
                this.model.save({
                    data: this.dataCanvasItemsCollection.toJSON()
                }).done(function () {
                    Tamanoir.showMessage('Saved');
                });
            }
        },

        onAnalysisClick: function () {
            if (this.model.get('id')) {
                Tamanoir.navigate('analysis/' + this.model.get('connectionId') + '/' + this.model.get('id'), {trigger: true});
            } else {
                Tamanoir.showMessage('You should save domain before analyse it.');
            }
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        }
    });
});