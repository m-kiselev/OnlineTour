package com.touronline

import grails.converters.JSON

class BookingRequestController {
	def BookingRequestService
	
	def getList(params) {
		render (BookingRequestService.getList(params) as JSON)
	}

	def getInfo(params) {
		render (BookingRequestService.getInfo(params) as JSON)
	}

	def addBookingRequest() {
		render (BookingRequestService.addBookingRequest(params) as JSON)
	}

	def editBookingRequest() {
		render (BookingRequestService.editBookingRequest(params) as JSON)
	}

	def delete() {
		render(BookingRequestService.delete(params) as JSON)
	}
}
