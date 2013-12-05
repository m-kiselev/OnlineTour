<script type="text/javascript">
        var defLoginUrl = '${postUrl}';
        var homeUrl = '${createLink(action:'index')}';
</script>

<!doctype html>
<html>
    <head>
	    <link rel="stylesheet" href="${resource(dir:'js/extjs', file:'ext-all.css')}"/>
        <script type="text/javascript" src="${resource(dir:'js/extjs', file:'ext-all-debug.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/app', file : 'app.js')}"></script>
    </head>
</html>

<!-- GSP страница. Если не нравится ExtJS 
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
    
        <link rel="icon"       type="image/vnd.microsoft.icon" href="img/favicon.ico" />
    
        <style type="text/css">
    
            table#aligner{
                width:100%;
                height:100%;
                vertical-align:middle;
            }
    
            .cms_form {
                margin-left:auto;
                margin-right:auto;
                padding: 10px;
                width:29%;
    
                text-align: right;
                font-family: sans-serif;
                font-size: medium;
                font-weight: normal;
    
                border:3px double black;
                background-repeat:no-repeat;
                background-image: url('${resource(dir: "images", file: "bg-page-wrapper.jpg")}');
            }
    
            .cms_form input {
                width: 85%;
            }
    
            .cms_form table {
                width: 100%;
                border-style: none;
            }
    
            .cms_form td {
                color: black ;
                padding-right: 5px;
                padding-left: 5px;
                border-style: none;
            }
        </style>
    
    </head>

<body>
<div id='login'>
    <div class='cms_form'>
        <div class='fheader'><g:message code="springSecurity.login.header"/></div>

        <g:if test='${flash.message}'>
            <div class='login_message'>${flash.message}</div>
        </g:if>

        <form action='${postUrl}' method='POST' id='loginForm' class='cssform' autocomplete='off'>
            <table>
            <tr>
                <td>
                     <label for='username'><g:message code="springSecurity.login.username.label"/>:</label>
                </td>
                <td>
                     <input type='text' class='text_' name='j_username' id='username'/>
                </td>
            </tr>

            <tr>
                <td>
                <label for='password'><g:message code="springSecurity.login.password.label"/>:</label>
                </td>
                <td>
                <input type='password' class='text_' name='j_password' id='password'/>
                </td>
            </tr>

            <tr>
                  <td>
                    <input type='submit' id="submit" value="Войти"/>
                </td>
                <td>
                    <input type="button" value="Зарегистрироваться" onclick="window.location='${createLink(controller:'Logon', action:'index')}';" />
                </td>

            </tr>
            </table>
        </form>
    </div>
</div>
</body>

</html>
 -->
