/**
 * 
 */
var rootDir = '/OnlineTour/static/js/app';
Ext.Loader.loadScript(rootDir + '/extra/Utils.js');

Ext.application({
    name: 'app',
    appFolder: rootDir,
    controllers: ['MainController'],
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            items: {
                xtype: 'loginform'
            }
        });
    }
});