package com.touronline

class HotelService {

	def getList(params) {
		def tour   = Tour.get(params.get("id"))
		def result = Hotel.findAllByTour(tour)

		return result.collect {[
			nodeId :  it.id,
			name   :  it.name,
			iconCls: 'hotel-icon',
			type   : 'hotel'
		]}
	}

	def getInfo(params) {
		Hotel hotel = Hotel.get(params.get("id"))
		return [
			'success'  : true,
			nodeId     : hotel.id,
			origName   : hotel.name,
			name       : hotel.name,
			description: hotel.description
		]
	}

	def setParameters(Hotel hotel, params) {
		hotel.name = params.name
		hotel.description = params.description
		hotel.tour = Tour.findById(params.get("tourId"))
	}

	def addHotel(params) {
		Hotel hotel = new Hotel()
		setParameters(hotel, params)

		def msg
		try {
			if (!hotel.save()){
				msg = ['success': false, 'message': 'Отель не сохранен!'];
			} else {
				msg = ['success': true, nodeId: hotel.id];
			}
		} catch (Exception e) {
			msg = ['success': false, 'message': 'Error: ' + e.message]
		} finally {
			return msg;
		}
	}

	def editHotel(params) {
		Hotel hotel = Hotel.get(params.get("id"))
		setParameters(hotel, params)
		def msg
		try {
			if (!hotel.save()){
				msg = ['success': false, 'message': 'Отель не сохранен!'];
			} else {
				msg = ['success': true];
			}
		} catch (Exception e) {
			msg = ['success': false, 'message': 'Error: ' + e.message]
		} finally {
			return msg;
		}
	}

	def delete(params) {
		Hotel hotel = Hotel.get(params.get("id"));
		def msg
		try {
			if (hotel.delete()){
				msg = ['success': false, 'message': 'Отель не удален!'];
			} else {
				msg = ['success': true];
			}
		} catch (Exception e) {
			msg = ['success': false, 'message': 'Error: ' + e.message]
		} finally {
			return msg;
		}
	}
}
