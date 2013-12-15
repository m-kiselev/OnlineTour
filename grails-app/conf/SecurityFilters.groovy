

class SecurityFilters {
	def springSecurityService

    def filters = {
//        all(controller:'*', action:'*') { 
        	all(controller:'login', invert: true) { 
			println("filter")
            before = {
				println("befor")
//				if(!springSecurityService.isLoggedIn()) {
////					redirect(controller:"login", action: "auth", params:[changeRequestId:params.changeRequestId, approval: true])
//					redirect(controller:"login", action: "auth",  params: [authStatus: false])
////					redirect(controller:"login", action: "auth", params: [authStatus: false])
//					return true
//				}
//				 else {
//					redirect(controller:"approval", action: "approvalScreen", params:params)
//					return false
//				}
            }
            after = { Map model ->

            }
            afterView = { Exception e ->

            }
        }
    }
}
