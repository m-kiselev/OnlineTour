<!-- 
<html xmlns:jsp="http://java.sun.com/JSP/Page" xmlns:fn="http://java.sun.com/jsp/jstl/functions"
      xmlns:c="http://java.sun.com/jsp/jstl/core"
      xmlns:spring="http://www.springframework.org/tags" xmlns:form="http://www.springframework.org/tags/form">

    <jsp:output omit-xml-declaration="yes" doctype-root-element="HTML" doctype-system="about:legacy-compat" />
    
    <jsp:directive.page contentType="text/html;charset=UTF-8" />
    <jsp:directive.page pageEncoding="UTF-8" />
    
    <head>
    
        <title>Tour online</title>
    
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        
        <link rel="icon"       type="image/vnd.microsoft.icon" href="images/favicon.ico" />

        <link rel="stylesheet" type="text/css" href="ext-all.css"/>
        
        <script type="text/javascript" src="js/extjs/ext-all.js"></script>
    
    </head>

    <body>
        <div id='loading'></div>
    </body>

</html>
 -->
<!-- 
 <%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
<meta name="layout" content="main"/>
<title>Insert title here</title>
</head>
<body>
  <div class="body">
        Main page
  </div>
</body>
</html>
 -->

<!doctype html>
<html>
	<head>
		<link rel="stylesheet" href="${resource(dir:'js/extjs', file:'ext-all.css')}" />
		<link rel="stylesheet" href="${resource(dir:'js/app',   file:'touronline-extras.css')}" />
		<script type="text/javascript" src="${resource(dir:'js/extjs', file:'ext-all-debug.js')}"></script>
		<script type="text/javascript" src="${resource(dir:'js/app', file : 'app.js')}"></script>
	</head>
</html>
