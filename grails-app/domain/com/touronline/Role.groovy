package com.touronline

class Role {

	String authority

	static mapping = {
		cache true
	}

	static constraints = {
		authority blank: false, unique: true
	}
	
	String toString() {
		return "role information: ${authority}"
	}
}
