Ext.define('app.store.EnumFeeding', {
    extend: 'Ext.data.Store',
    storeId: 'enumfeeding',
    fields: ['id', 'name'],
    data: [
       {id: 'NO_FOOD',         name: 'Без питания'},
       {id: 'BREAKFAST',       name: 'Завтрак'},
       {id: 'BREAKFAST_DINNER',name: 'Завтрак-ужин'},
       {id: 'BREAKFAST_LUNCH', name: 'Завтрак,обед'},
       {id: 'LUNCH_DINNER',    name: 'Обед ужин'},
       {id: 'THREE_X',         name: '3х разовое питание'},
       {id: 'FOUR_X',          name: '4х разовое питание'},
       {id: 'BUFFET_BREAKFAST',name: 'Шведсткий стол'},
   ]
});