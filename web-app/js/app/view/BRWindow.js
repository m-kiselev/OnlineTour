Ext.define('app.view.BRWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.brwindow',
	title: 'Новая заявка',
	modal: true,
	bodyPadding: 5,
	width: 300,
	layout: 'fit',
	action: 'add',
	items: [{
		xtype: 'form',
		cls: 'touronline-bg',
		border: 0,
		defaults: {labelWidth: 120},
		items: [
		    {xtype: 'hidden', name: 'id'},
//		    {xtype: 'textfield', fieldLabel: 'Название', name: 'name', allowBlank: false},
//		    {xtype: 'combo',     fieldLabel: 'Приоритет отображения', name: 'priority', store: 'EnumTourPriority',
//		    	displayField: 'name', valueField: 'id', editable: false},
//		    {xtype: 'textareafield', grow: true, name: 'description', fieldLabel: 'Описание', anchor: '100%'},
		    // TODO: add fields
		    {xtype: 'button', text: 'Сохранить', handler: handleAddEditBR}
		]
	}]
});

function handleAddEditBR(btn) {
	var addParams = btn.up('form').getValues();
	var win = btn.up('window');

	var url = 'bookingRequest/addBookingRequest';
	if (win.action == 'edit') {
		url = 'bookingRequest/editBookingRequest';
	}

//	Ext.Ajax.request({
//		url : url,
//		params : addParams,
//		success : function(response, opts) {
//			var resp = Ext.decode(response.responseText);
//			if (resp.success == true) {
//				var tourbrowser = Ext.ComponentQuery.query('#tourbrowser')[0];
//				tourbrowser.getStore().reload();
//				win.close();
//			} else {
//				Ext.Msg.alert(resp.message);
//			}
//		}
//	});
}