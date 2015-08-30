/* 
 * luongdinh.com
 */
var app = app || {};
(function($,document){
    
    var transitionView = Backbone.View.extend({

        initialize: function(router){
            _.bindAll(this,'transitScreen');
            this.router = router;
            this.router.on('route',this.transitScreen);
            this.targets = $('.toggleable');
        },
        transitScreen: function(){
            var targets = this._getTartget();
            this._showTarget(targets.showTarget);
            this._hideTarget(targets.hideTarget);
        }, 
        _showTarget: function(targets) {
            _.each(targets,function(target){
                $(target).show();
            });
        },
        _hideTarget: function(targets){
            _.each(targets,function(target){
                $(target).hide();
            });
        },
        _getTartget: function(){
            var routerMethod = this._getMethodRoute();
            
            return   _.reduce(this.targets,function(memo,target){
                    var methodRouters = $(target).data('role');
                    if(!_.isUndefined(methodRouters) && !_.isNull(methodRouters)) {
                        methodRouters = methodRouters.split(',');
                        var isValid = _.find(methodRouters,function(value){
                                            return value === routerMethod;
                                        });
                        if(_.isUndefined(isValid)) {
                            memo.hideTarget.push(target);
                        } else {
                            memo.showTarget.push(target);
                        }
                    }
                    return memo;
                },{showTarget:[],hideTarget:[]});

        },
        _getMethodRoute: function() {
            var routerMethod = this.router.
                    routes[Backbone.history.getFragment()];
            return _.isUndefined(routerMethod) || 
                    _.isEmpty(routerMethod)?'*':routerMethod;
        }
    });
    app.transitionView = transitionView;
})(jQuery,document);