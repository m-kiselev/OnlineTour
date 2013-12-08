package com.touronline

class UserInfo {

	String lowCompanyName
	String realCompanyName
	String companyAdress
	String phone
	String personName
	String email

	static belongsTo = [user: User]
    static constraints = {
		lowCompanyName nullable: false
		realCompanyName nullable: false
		companyAdress nullable: false
		phone nullable: false
		personName nullable: false
		email nullable: false, email: true
    }
}
