package com.touronline

import grails.converters.JSON

class TimeIntervalController {
	def TimeIntervalService
	
	def getList(params) {
		render (TimeIntervalService.getList(params) as JSON)
	}

	def getInfo(params) {
		render (TimeIntervalService.getInfo(params) as JSON)
	}

	def addTimeInterval() {
		render (TimeIntervalService.addTimeInterval(params) as JSON)
	}

	def editTimeInterval() {
		render (TimeIntervalService.editTimeInterval(params) as JSON)
	}

	def delete() {
		render(TimeIntervalService.delete(params) as JSON)
	}
}
