<%@ page import="java.util.List" %><%--
  Created by IntelliJ IDEA.
  User: basab
  Date: 01.02.2024
  Time: 2:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Users list</title>
</head>
<body>
<div>
    <h1>LIST</h1>
</div>
<div>
<ul>
    <div>
        <h2>Users</h2>
    </div>
    <%
        List<String> names = (List<String>) request.getAttribute("userNames");

        if (names != null && !names.isEmpty()) {
            for (String s : names) {
                out.println("<li>" + s + "</li>");
            }
        }
    %>
</ul>
    </div>
<div>
    <button onclick="location.href='/'">Back to main</button>
</div>
</body>
</html>
