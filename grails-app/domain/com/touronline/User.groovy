package com.touronline

class User {

	transient springSecurityService

	String username
	String password
	boolean enabled
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired
	UserInfo userInfo

	static constraints = {
		username blank: false, unique: true
		password blank: false
		userInfo nullable: false
	}

	static mapping = {
		password column: '`password`'
	}

	Set<Role> getAuthorities() {
		UserRole.findAllByUser(this).collect { it.role } as Set
	}

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService.encodePassword(password)
	}
	
	String toString() {
		return "User information: ${username}, ${userInfo.lowCompanyName}, ${userInfo.realCompanyName}, ${userInfo.companyAdress}, ${userInfo.personName}"
	}
}
