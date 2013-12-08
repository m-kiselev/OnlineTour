import com.touronline.Role
import com.touronline.User
import com.touronline.UserInfo
import com.touronline.UserRole

class BootStrap {

	def springSecurityService
	
    def init = { servletContext ->
		def adminRole = new Role(authority: 'ROLE_ADMIN').save(flush: true)
		def userRole = new Role(authority: 'ROLE_USER').save(flush: true)
	
//		def userInfo = new UserInfo(lowCompanyName: "test", email: "test@mail.ru")
		def userInfo = new UserInfo(lowCompanyName: "test",
			realCompanyName: "lowCompanyName",
			companyAdress:   "companyAdress",
			phone:           "123",
			personName:      "personName",
			email:           "test@mail.ru")
		def testUser = new User(username: 'admin', enabled: true, password: 'admin', userInfo: userInfo)
		testUser.save(flush: true)
	
		UserRole.create testUser, adminRole, true
	
//		assert User.count() == 1
//		assert Role.count() == 2
//		assert UserRole.count() == 1
    }

    def destroy = {
    }
}