package com.touronline

import grails.converters.JSON

class HotelController {
	def HotelService
	
	def getList(params) {
		render (HotelService.getList(params) as JSON);
	}

	def getInfo(params) {
		render (HotelService.getInfo(params) as JSON);
	}

	def addHotel() {
		render (HotelService.addHotel(params) as JSON);
	}

	def editHotel() {
		render (HotelService.editHotel(params) as JSON);
	}

	def delete() {
		render(HotelService.delete(params) as JSON);
	}
}
