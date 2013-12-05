package com.touronline

class UserInfo {

	String lowCompanyName
	String realCompanyName
	String companyAdress
	String phone
	String personName
	String email

//	static belongsTo = [user: User]
    static constraints = {
		email: true
    }
}
