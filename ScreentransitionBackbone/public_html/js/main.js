/* 
 * luongdinh.com
 */
var app = app || {};
(function($,document){
    'use strict';
    var router = Backbone.Router.extend({
        routes: {
            'dialog': 'dialog', 
            'content1': 'content1',
            'content2': 'content2',
            "*actions": "defaultRoute" 
        }
    });
    var mainView = Backbone.View.extend({
        el: 'body', 
        events: {
            'click .showDialog': 'showDialog',
            'click .back': 'actionBack',
            'click .showContent2': 'showContent2'
        },
        initialize: function(options){
            _.bindAll(this,'showDialog','actionBack');
            this.router = options.router;
        },
        showDialog: function(){
            this.router.navigate('dialog',{trigger: true});
        },
        showContent2: function(){
            this.router.navigate('content2',{trigger: true});
        },
        actionBack: function(){
            window.history.back();
        }
    });
    app.router = router;
    app.mainView = mainView;
})(jQuery,document);

$(function(){
    var router = new app.router();
    new app.mainView({router:router});
    new app.transitionView(router);
    Backbone.history.start();
});