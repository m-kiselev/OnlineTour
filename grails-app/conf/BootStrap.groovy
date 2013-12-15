import com.touronline.Hotel
import com.touronline.Role
import com.touronline.TimeInterval
import com.touronline.Tour
import com.touronline.TourPriority;
import com.touronline.User
import com.touronline.UserInfo
import com.touronline.UserRole

import java.text.SimpleDateFormat

class BootStrap {

	def springSecurityService
	
    def init = { servletContext ->
		
		// Create users
		def adminRole = new Role(authority: 'ROLE_ADMIN').save(flush: true)
		def userRole = new Role(authority: 'ROLE_USER').save(flush: true)
	
		def userInfo = new UserInfo(lowCompanyName: "test",
			realCompanyName: "lowCompanyName",
			companyAdress:   "companyAdress",
			phone:           "123",
			personName:      "personName",
			email:           "test@mail.ru")
		def adminInfo = new UserInfo(lowCompanyName: "admin",
			realCompanyName: "lowCompanyName",
			companyAdress:   "companyAdress",
			phone:           "123",
			personName:      "personName",
			email:           "test@mail.ru")
		def adminUser = new User(username: 'admin', enabled: true, password: 'admin', userInfo: adminInfo)
		adminUser.save(flush: true)
		UserRole.create adminUser, adminRole, true
		
		def testUser = new User(username: 'user', enabled: true, password: 'user', userInfo: userInfo)
		testUser.save(flush: true)
		UserRole.create testUser, userRole, true
	

		// Create tours
		def tour1 = new Tour(name: 'тур 1', priority: TourPriority.NORMAL, description: 'desc1')
		tour1.save(flush: true)
		def tour2 = new Tour(name: 'тур 2', priority: TourPriority.HIGH,   description: 'desc2')
		tour2.save(flush: true)
		def tour3 = new Tour(name: 'тур 3', priority: TourPriority.LOW,    description: 'desc3')
		tour3.save(flush: true)
		def tour4 =new Tour(name: 'тур 4', priority: TourPriority.NORMAL, description: 'desc3')
		tour4.save(flush: true)
		
		// create hotels
		def hotel1 = new Hotel(name: 'отель 1', description: 'desc1', tour: tour1)
		hotel1.save(flush: true)
		def hotel2 = new Hotel(name: 'отель 2', description: 'desc2', tour: tour1)
		hotel2.save(flush: true)
		def hotel3 = new Hotel(name: 'отель 3', description: 'desc3', tour: tour1)
		hotel3.save(flush: true)
		
		// create timeIntervals
		String dateStr1 = "2011-06-03"
		String dateStr2 = "2011-06-07"
		String dateStr3 = "2011-07-03"
		String dateStr4 = "2011-07-07"
		String dateStr5 = "2011-08-03"
		String dateStr6 = "2011-08-08"
		SimpleDateFormat sdf =  new SimpleDateFormat("yyyy-MM-dd")
		
		def timeInterval1 = new TimeInterval(startDate: sdf.parse(dateStr1), endDate: sdf.parse(dateStr2), hotel: hotel1)
		timeInterval1.save(flush: true)
		def timeInterval2 = new TimeInterval(startDate: sdf.parse(dateStr3), endDate: sdf.parse(dateStr4), hotel: hotel1)
		timeInterval2.save(flush: true)
		def timeInterval3 = new TimeInterval(startDate: sdf.parse(dateStr5), endDate: sdf.parse(dateStr6), hotel: hotel1)
		timeInterval3.save(flush: true)
		
		assert User.count() == 2
		assert Role.count() == 2
		assert UserRole.count() == 2
		assert Tour.count() == 4
		assert Hotel.count() == 3
		assert TimeInterval.count() == 3
    }

    def destroy = {
    }
}