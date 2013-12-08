package com.touronline
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

class LogonController {

    def index() {
		println("logon controller")
		println params
		def signupParams = params

		// send email to requester
		sendMail {
			to params['email']
			from "greentour.online@gmail.com"
			subject "Регистрация в систему online бронирования туров Грин-Тур"
			body "Ваша заявка взята на рассмотрение!"
		}

		// send email to admin
		sendMail {
			to "greentour.online@gmail.com"
			from "greentour.online@gmail.com"
			subject "Регистрация нового пользователя в систему online бронирования туров"
            body (view: "/mails/logonMail",
                  model: [parameters: params])
		}
		
		
		createNewUser(signupParams)

		println("send email")
		
		redirect(uri: "/")
	}
	
	def createNewUser(def signupParams) {
		println "signupParams: " + signupParams
		def role = Role.findByAuthority('ROLE_USER')
		println role

		def userInfo = new UserInfo(lowCompanyName: signupParams.lowCompanyName,
			realCompanyName: signupParams.lowCompanyName,
			companyAdress:   signupParams.companyAdress,
			phone:           signupParams.phone,
			personName:      signupParams.personName,
			email:           signupParams.email)
		def newUser = new User(username: signupParams.loginName, enabled: false, password: signupParams.pass, userInfo: userInfo)
		newUser.save(flush: true)
	
		UserRole.create newUser, role, true
	}
}
