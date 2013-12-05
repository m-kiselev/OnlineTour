/**
 * 
 */
Ext.define("app.user.Profile", {
  config: {
    userName: '',
    userRole: ''
  },

  isAdmin: function() {
      if (this.getUserRole() == 'ROLE_ADMIN') {
          return true;
      } 
      return false;
  },

  constructor: function(config) {
    this.initConfig(config);
    this.callParent(arguments);
  }
});