package app.servlets;

import app.entities.Point;
import app.model.Model;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Double x=Double.parseDouble(req.getParameter("x"));
        Double y=Double.parseDouble(req.getParameter("y"));
        int r=Integer.parseInt(req.getParameter("r"));
        Boolean t = false;
        PrintWriter out=resp.getWriter();
        if (x<=0) {
            if (y<=0) {
                if (x>=-r && y>=-r) {
                    t=true;
                }
            }
            else {
                if (Math.pow(r, 2)>=Math.pow(x, 2)+Math.pow(y, 2)) {
                    t=true;
                }
            }
        }
        else {
            if (x>=0 && y<=-x+Double.valueOf(r)/2 && y>=0){
                t=true;
            }
        }
        Point point=new Point(x, y, r, t);
        Model model=Model.getInstance();
        if (model.getList().size()==10) {
            model.getList().clear();
        }
        model.add(point);
        out.println("<html>");
        out.println("<table border=\"1\" cellspacing=\"0\" cellpadding=\"0\" width=\"90%\">");
        out.println("<tr>\n" +
                "<td>Last attempts</td>\n" +
                "<td>1</td>\n" +
                "<td>2</td>\n" +
                "<td>3</td>\n" +
                "<td>4</td>\n" +
                "<td>5</td>\n" +
                "<td>6</td>\n" +
                "<td>7</td>\n" +
                "<td>8</td>\n" +
                "<td>9</td>\n" +
                "<td>10</td>\n" +
                "</tr>");
        out.println("<tr id=\"attempts\">\n" +
                "<td width=\"10%\">\n" +
                "X\n" +
                "<br>\n" +
                "Y\n" +
                "<br>\n" +
                "R\n" +
                "<br>\n" +
                "True\n" +
                "</td>\n" +
                "</tr>");
        out.println("</table>");
        out.println("<html>");
    }


    /*@Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        doPost(req, resp);
    }*/
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.sendRedirect(this.getServletContext().getContextPath());
    }
}
