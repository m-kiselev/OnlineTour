package com.touronline

class AdminController {

	def getList(params) {	
		println "admin: " + params	
		def rootTest = params.get("id");
		if (rootTest.startsWith("root_")) {
			def itemId = rootTest.split("_").getAt(1)
			params.id = itemId
			redirect(controller: "hotel", action: "getList", params: params)
		} else {
		  def type = params.get("type");
			if (type == "hotel"){
				redirect(controller: "timeInterval",   action: "getList", params: params)
			} else if(type == "TI"){
				redirect(controller: "bookingRequest", action: "getList", params: params)
			}
		}
	}
	
	def deleteItem(params) {	
		println "delate: " + params	
		def itemType = params.get("type");
		if (itemType == "hotel"){
			redirect(controller: "hotel",          action: "delete", params: params)
		} else if (itemType == "TI"){
			redirect(controller: "timeInterval",   action: "delete", params: params)
		} else if (itemType == "BR") {
			redirect(controller: "bookingRequest", action: "delete", params: params)
		}
	}
}
