package com.touronline
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import org.springframework.security.web.savedrequest.SavedRequest
import org.springframework.security.core.context.SecurityContextHolder


public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
//
//        def userName = SecurityContextHolder.context?.authentication?.principal?.username
//
//        def sess = request.getSession()
//		println("sess:" + sess)
//		
//		def user = User.findByUsername(userName)
//		println(user.getUsername())
//		println(user.getEnabled())
//		String userRole
//		User.withTransaction {
//			userRole = UserRole.findByUser(user).getRole().getAuthority()
//		}
//		
//		
////		String userRole = user?.getAuthorities()?.get(0)?.getAuthority() 
//		println(userRole)
//		
//		sess.userRole = userRole
//		request.setAttribute('userRole', userRole)
////            def userInfo = UserInfo.findByUserName(userName)
////            def userRole = userInfo?.userRole
////            if (userRole == "admin" || userRole == "approver") {
////                def parameters= sess?.parameters
////                response.sendRedirect("${request.contextPath}/approval/approvalScreen?changeRequestId=" + parameters.changeRequestId)
////            } else {
////                response.sendRedirect("${request.contextPath}/login/denied")
////            }
////		SavedRequest savedReq = (SavedRequest) sess.getAttribute(WebAttributes.SAVED_REQUEST);
//		println response.getOutputStream()
////		response.sendRedirect(savedReq.getRedirectUrl());
    }
}