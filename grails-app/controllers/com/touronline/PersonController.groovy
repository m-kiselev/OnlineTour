package com.touronline

import grails.converters.JSON

class PersonController {
	def PersonService
	
	def getList(params) {
		render (PersonService.getList(params) as JSON);
	}

//	def getInfo(params) {
//		render (PersonService.getInfo(params) as JSON);
//	}

	def addPerson(params) {
		render (PersonService.addPerson(params) as JSON);
	}

	def editPerson(params) {
		println "contrl editPerson: " + params
		render (PersonService.editPerson(params) as JSON);
	}

	def delete(params) {
		render(PersonService.delete(params) as JSON);
	}
}
