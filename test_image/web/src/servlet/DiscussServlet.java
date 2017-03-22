package servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.jws.WebService;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
import util.DBHelper;

/**
 * Servlet implementation class UserServlet
 */
@WebServlet("/servlet/DiscussServlet")
public class DiscussServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String action="";     
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DiscussServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8"); 
		response.setHeader("Content-type", "text/html;charset=UTF-8"); 
		//判断action参数传来的值
		if(request.getParameter("action")!=null){
			this.action=request.getParameter("action");
			Connection conn = null;
			PreparedStatement stmt = null;
			int rs;
			if(action.equals("ccdis")){
				try {
					conn = DBHelper.getConnection();
					String sql ="insert into discuss(id,name,content) values(?,?,?)"; // SQL语句
					stmt = conn.prepareStatement(sql);
					stmt.setString(1, request.getParameter("id"));
					stmt.setString(2, request.getParameter("xingming"));
					stmt.setString(3, request.getParameter("pjcontent"));
					rs = stmt.executeUpdate(); 
					String a=request.getParameter("id");
					if (rs>0) {						
						String script = "<script>alert('评论成功');location.href='../details.jsp?id="+a+"'</script>";
						response.getWriter().println(script);
					} else {
						String script = "<script>alert('评论失败');location.href='../details.jsp?id="+a+"'</script>";
						response.getWriter().println(script);
					}

				} catch (Exception e) { 
					// TODO Auto-generated catch block
					e.printStackTrace();					
				}  
			}
			if(action.equals("cctextdis")){
				try {
					conn = DBHelper.getConnection();
					String sql = "insert into textdiscuss values(?,?,?)"; // SQL语句
					stmt = conn.prepareStatement(sql);
					stmt.setString(1, request.getParameter("id"));
					stmt.setString(2, request.getParameter("xingming"));
					stmt.setString(3, request.getParameter("pjcontent"));		
					rs = stmt.executeUpdate(); 
					String a=request.getParameter("id");
					if (rs>0) {						
						String script = "<script>alert('评论成功');location.href='../textdiscuss.jsp?textid="+a+"'</script>";
						response.getWriter().println(script);
					} else {
						String script = "<script>alert('评论失败');location.href='../textdiscuss.jsp?textid="+a+"'</script>";
						response.getWriter().println(script);
					}

				} catch (Exception e) { 
					// TODO Auto-generated catch block
					e.printStackTrace();					
				}  
			}
			 
		}
	}

}

