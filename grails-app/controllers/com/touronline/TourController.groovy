package com.touronline

import grails.converters.JSON

class TourController {
	def TourService
	
	def getList(params) {
		render (TourService.getList(params) as JSON);
	}

	def getInfo(params) {
		render (TourService.getInfo(params) as JSON);
	}

	def addTour() {
		render (TourService.addTour(params) as JSON);
	}

	def editTour() {
		render (TourService.editTour(params) as JSON);
	}

	def deleteTour() {
		render(TourService.deleteTour(params) as JSON);
	}
}
