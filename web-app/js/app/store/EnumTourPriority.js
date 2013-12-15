Ext.define('app.store.EnumTourPriority', {
    extend: 'Ext.data.Store',
    storeId: 'enumtourpriority',
    fields: ['id', 'name'],
    data: [
       {id: 'HIGH',   name: 'Высокий'},
       {id: 'NORMAL', name: 'Средний'},
       {id: 'LOW',    name: 'Низкий'},
   ]
});