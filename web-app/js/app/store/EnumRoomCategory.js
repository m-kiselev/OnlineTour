Ext.define('app.store.EnumRoomCategory', {
    extend: 'Ext.data.Store',
    storeId: 'enumroomcategory',
    fields: ['id', 'name'],
    data: [
       {id: 'ROOM_WITOUT_AMENITIES',name: 'Номер без удобств'},
       {id: 'ROOM_FLOОR_AMENITIES', name: 'Номер с удобствами на этаже'},
       {id: 'ROOM_BLOCK_AMENITIES', name: 'Номер с удобствами на блок'},
       {id: 'ROOM_AMENITIES',       name: 'Номер с удобствами'},
       {id: 'JUNIOR_LUXE',          name: 'П/люкс'},
       {id: 'LUXE',                 name: 'Люкс'}
   ]
});