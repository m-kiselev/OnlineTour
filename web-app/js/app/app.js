/**
 * 
 */
Ext.application({
    name: 'app',
    appFolder: '/OnlineTour/static/js/app',
    controllers: ['MainController'],
//    views: ["LoginForm"],
//    autoCreateViewport: false,
    launch: function() {
//        Ext.create("app.view.LoginForm");
        Ext.create('Ext.container.Viewport', {
            items: {
                xtype: 'loginform'
            }
        });
    }
});
