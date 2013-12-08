package com.touronline

import grails.converters.JSON
import org.springframework.dao.DataIntegrityViolationException

class UserController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [userInstanceList: User.list(params), userInstanceTotal: User.count()]
    }

	def getUserInfo() {
		User user = User.findByUsername(params.username)
		String userRole = UserRole.findByUser(user).getRole().getAuthority()
		def resp = [userName: params.username, userRole: userRole]
		render resp as JSON
	}

    def create() {
        [userInstance: new User(params)]
    }

    def save() {
        def userInstance = new User(params)
        if (!userInstance.save(flush: true)) {
            render(view: "create", model: [userInstance: userInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'user.label', default: 'User'), userInstance.id])
        redirect(action: "show", id: userInstance.id)
    }

    def show(Long id) {
        def userInstance = User.get(id)
        if (!userInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'user.label', default: 'User'), id])
            redirect(action: "list")
            return
        }

        [userInstance: userInstance]
    }

    def edit(Long id) {
        def userInstance = User.get(id)
        if (!userInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'user.label', default: 'User'), id])
            redirect(action: "list")
            return
        }

        [userInstance: userInstance]
    }

    def update(Long id, Long version) {
        def userInstance = User.get(id)
        if (!userInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'user.label', default: 'User'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (userInstance.version > version) {
                userInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'user.label', default: 'User')] as Object[],
                          "Another user has updated this User while you were editing")
                render(view: "edit", model: [userInstance: userInstance])
                return
            }
        }

        userInstance.properties = params

        if (!userInstance.save(flush: true)) {
            render(view: "edit", model: [userInstance: userInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'user.label', default: 'User'), userInstance.id])
        redirect(action: "show", id: userInstance.id)
    }

    def delete(Long id) {
        def userInstance = User.get(id)
        if (!userInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'user.label', default: 'User'), id])
            redirect(action: "list")
            return
        }

        try {
            userInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'user.label', default: 'User'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'user.label', default: 'User'), id])
            redirect(action: "show", id: id)
        }
    }
	
	def getUsers() {
		boolean isActive = params.active.toBoolean()
		def result = User.findAllByEnabled(isActive).collect {
			[	id:              it.id,
				username:        it.username,
				lowCompanyName:  it.userInfo.lowCompanyName,
				realCompanyName: it.userInfo.realCompanyName,
				companyAdress:   it.userInfo.companyAdress,
				phone:           it.userInfo.phone,
				personName:      it.userInfo.personName,
				email:           it.userInfo.email,
				role:            UserRole.findByUser(it).getRole().getAuthority()
			]
		}
		render result as JSON
	}
	
	def deleteActiveUser() {
		Long userId = params.userId.toLong()
		def userInstance = User.get(userId)
		def userRole = UserRole.findByUser(userInstance)
		userRole.delete(flush: true)
		userInstance.delete(flush: true)
		
		sendMail {
			to userInstance.getUserInfo().email
			from "greentour.online@gmail.com"
			subject "Система online бронирования туров Грин-Тур"
			body "Пользователь ${userInstance.username} был удален из системы"
		}

		def answer = ['success': true]
		render answer as JSON
	}
	
	def acceptUser() {
		Long userId = params.userId.toLong()
		def userInstance = User.get(userId)
		userInstance.setEnabled(true)
		userInstance.save(flush: true)
		
		sendMail {
			to userInstance.getUserInfo().email
			from "greentour.online@gmail.com"
			subject "Система online бронирования туров Грин-Тур"
			body "Заявка пользователя ${userInstance.username} была одобрена"
		}
		
		def answer = ['success': true]
		render answer as JSON
	}

	def deleteDisabledUser() {
		Long userId = params.userId.toLong()
		def userInstance = User.get(userId)
		def userRole = UserRole.findByUser(userInstance)
		userRole.delete(flush: true)
		userInstance.delete(flush: true)

		sendMail {
			to userInstance.getUserInfo().email
			from "greentour.online@gmail.com"
			subject "Система online бронирования туров Грин-Тур"
			body "Пользователю ${userInstance.username} было оказано в регистрации. Просьба внимательнее заполнять поля при регистрации."
		}

		def answer = ['success': true]
		render answer as JSON
	}
}
