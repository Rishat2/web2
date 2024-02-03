<%--
  Created by IntelliJ IDEA.
  User: basab
  Date: 01.02.2024
  Time: 17:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8"  %>
<html>
<head>
    <title>Лабораторная работа 2</title>
    <link rel="stylesheet" href="../styles/form.css">
    <meta http-equiv="Content-type" contents="text/html;charset=UTF-8" />
</head>
<body>
<div class="fon">
    <table border="1" cellspacing="0" cellpadding="0" width="100%">
        <tr>
            <div class=header>
                Валиев Ришат Ильшатович P3233 Вариант 712893
            </div>
        </tr>
        <tr>
            <form action="#" method="post">
                <td class="firstcol">
                    <div>
                        <p>Выберите X:</p>
                        <input type="text" placeholder="Введите X от -3 до 5" tabindex="1" name="X" id="x" val="">
                    </div>
                    <div>
                        <p>Выберите Y:</p>
                        <input type="text" placeholder="Введите Y от -3 до 5" tabindex="2" name="Y" id="y" val="">
                    </div>
                    <div class="select">
                        <p>Выберите R</p>
                        <select name="R" id="r" tabindex="3">
                            <option value=""></option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div>
                        <button id="check" class="button" type="submit" tabindex="4">Check</button>
                    </div>
                    <div id="errorMess">
                    </div>
                </td>
            </form>
            <td width="25%">
                    <div class="canvas">
                    <!--<img src="img/g.jpg" alt="grafic">-->
                    <canvas id="c1" width="290px" height="290px"></canvas>
                    </div>

            </td>
            <td>
                <div class="table">
                    <table border="1" cellspacing="0" cellpadding="0" width="90%">
                        <tr>
                            <td>Last attempts</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                            <td>8</td>
                            <td>9</td>
                            <td>10</td>
                        </tr>
                        <tr id="attempts">
                            <td width="10%">
                                X
                                <br>
                                Y
                                <br>
                                R
                                <br>
                                True
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="buttonClear">
                    <button id="clear" class="button">Clear</button>
                </div>
            </td>
        </tr>
    </table>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="../js/script.js"></script>
</body>
</html>
