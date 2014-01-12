import com.touronline.BookingRequest
import com.touronline.Feeding;
import com.touronline.Hotel
import com.touronline.Role
import com.touronline.RoomCategory;
import com.touronline.TimeInterval
import com.touronline.Tour
import com.touronline.TourPriority;
import com.touronline.User
import com.touronline.UserInfo
import com.touronline.UserRole
import com.touronline.Person

import java.text.SimpleDateFormat
import java.util.Date;

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

		def timeInterval1 = new TimeInterval(startDate: sdf.parse(dateStr1), endDate: sdf.parse(dateStr2),
			 name: TimeInterval.buildName(sdf.parse(dateStr1), sdf.parse(dateStr2)), hotel: hotel1)
		timeInterval1.save(flush: true)
		def timeInterval2 = new TimeInterval(startDate: sdf.parse(dateStr3), endDate: sdf.parse(dateStr4),
			name: TimeInterval.buildName(sdf.parse(dateStr3), sdf.parse(dateStr4)), hotel: hotel1)
		timeInterval2.save(flush: true)
		def timeInterval3 = new TimeInterval(startDate: sdf.parse(dateStr5), endDate: sdf.parse(dateStr6),
			name: TimeInterval.buildName(sdf.parse(dateStr5), sdf.parse(dateStr6)), hotel: hotel1)
		timeInterval3.save(flush: true)

		def BR1 = new BookingRequest(timeInterval: timeInterval1, name: 'BR1', numberTourist: 1, bedsInRoom: 2,
			roomCategory: RoomCategory.LUXE, feeding: Feeding.BREAKFAST, coast: 3333, commission: 333,
			finalCoast: 1221, requestCreator: testUser)
		// for debbug
		//BR1.validate()
		//println "BR1 errors: "  + BR1.errors
		BR1.save(flush: true)
		def BR2 = new BookingRequest(timeInterval: timeInterval1, name: 'BR2', numberTourist: 2, bedsInRoom: 2,
			roomCategory: RoomCategory.JUNIOR_LUXE, feeding: Feeding.BREAKFAST_DINNER, coast: 3, commission: 3,
			finalCoast: 111, requestCreator: testUser)
		BR2.save(flush: true)
		def BR3 = new BookingRequest(timeInterval: timeInterval1, name: 'BR3', numberTourist: 2, bedsInRoom: 2,
			roomCategory: RoomCategory.JUNIOR_LUXE, feeding: Feeding.BREAKFAST_DINNER, coast: 3, commission: 3,
			finalCoast: 111, requestCreator: adminUser)
		BR3.save(flush: true)
		
		def pers1 = new Person(fio: "fio1", birthDate: new Date(), passportData: 'passportData1', phone: 'phone1',
			email: 'email1@mail.ru', bookingRequest: BR1)
		pers1.save(flush: true)
		def pers2 = new Person(fio: "fio2", birthDate: new Date(), passportData: 'passportData2', phone: 'phone2',
				email: 'email@mail.ru', bookingRequest: BR1)
		pers2.save(flush: true)
		
		assert User.count() == 2
		assert Role.count() == 2
		assert UserRole.count() == 2
		assert Tour.count() == 4
		assert Hotel.count() == 3
		assert TimeInterval.count() == 3
		assert BookingRequest.count() == 3
		assert Person.count() == 2
    }

    def destroy = {
    }
}