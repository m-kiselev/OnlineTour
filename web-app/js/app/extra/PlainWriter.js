/** Writer, который отправляет параметры модели как обычные параметры post
 * Странно, что такого нет в ExtJs */
Ext.define('app.extra.PlainWriter',{
	extend: 'Ext.data.writer.Writer',
	alias: 'writer.plainwriter',
	writeRecords: function(request, data){
		request.method = 'POST';
		request.params = data[0];
		return request;
	}
});
