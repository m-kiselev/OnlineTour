<%@ page contentType="text/html"%>
<html>
<head>
<title>Письмо регистрации нового пользователя</title>
</head>
<body>
	<div class="body">
		<p>В систему поступила новая заявка на регистрацию</p>

		<table style="border: 1px solid black;">
			<tr>
				<th bgcolor="silver" align="left"
					style="border: 1px solid black; padding: 5px;">Юридическое
					название компании</th>
				<td style="border: 1px solid black; padding: 5px;">
					${params.lowCompanyName}
				</td>
			</tr>
			<tr>
				<th bgcolor="silver" align="left"
					style="border: 1px solid black; padding: 5px;">Фактическое
					название компании</th>
				<td style="border: 1px solid black; padding: 5px;">
					${params.realCompanyName}
				</td>
			</tr>
			<tr>
				<th bgcolor="silver" align="left"
					style="border: 1px solid black; padding: 5px;">Фактический
					адрес компании</th>
				<td style="border: 1px solid black; padding: 5px;">
					${params.companyAdress}
				</td>
			</tr>
			<tr>
				<th bgcolor="silver" align="left"
					style="border: 1px solid black; padding: 5px;">Контактный
					телефон</th>
				<td style="border: 1px solid black; padding: 5px;">
					${params.phone}
				</td>
			</tr>
			<tr>
				<th bgcolor="silver" align="left"
					style="border: 1px solid black; padding: 5px;">Контактное лицо</th>
				<td style="border: 1px solid black; padding: 5px;">
					${params.personName}
				</td>
			</tr>
			<tr>
				<th bgcolor="silver" align="left"
					style="border: 1px solid black; padding: 5px;">Логин</th>
				<td style="border: 1px solid black; padding: 5px;">
					${params.loginName}
				</td>
			</tr>
			<tr>
				<th bgcolor="silver" align="left"
					style="border: 1px solid black; padding: 5px;">Электронная
					почта</th>
				<td style="border: 1px solid black; padding: 5px;">
					${params.email}
				</td>
			</tr>
		</table>
	</div>
</body>
</html>