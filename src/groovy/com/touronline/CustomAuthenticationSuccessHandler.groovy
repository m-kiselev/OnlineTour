package com.touronline
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import org.springframework.security.web.savedrequest.SavedRequest
import org.springframework.security.core.context.SecurityContextHolder


public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication auth) {
        HttpServletResponseWrapper responseWrapper = new HttpServletResponseWrapper(response)

        Writer out = responseWrapper.getWriter()

        out.write("{success:true}")
        out.close()
    }
}