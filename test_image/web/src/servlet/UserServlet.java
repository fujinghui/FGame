package servlet;

import java.io.IOException; 
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
import entity.User;

/**
 * Servlet implementation class UserServlet
 */
public class UserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String action="";     
	private User user=new User(); 
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserServlet() {
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
			//登录处理
			if(action.equals("login")){
				try {
					//获取用户名,密码,角色
					user.setName(request.getParameter("name"));
					user.setPwd(request.getParameter("pwd")); 
					if(request.getParameter("use")=="admin"){
						user.setAdmin(true);
					}
					else {
						user.setAdmin(false);
					}		
					//判断用户的合法性
					if(user.TestLogin(user)){
						String script = "<script>alert('会员登陆成功');location.href='index.jsp'</script>";
						request.getSession().setAttribute("user", user);
						request.getSession().setAttribute("name", request.getParameter("name"));
						response.getWriter().println(script);
						} 
					else{ 
						String script = "<script>alert('用户名或密码错误，请重新登陆');location.href='login1.jsp'</script>";
						response.getWriter().println(script); 
					}
				} catch (Exception e) { 
					// TODO Auto-generated catch block
					e.printStackTrace();					
				}  
			}
			
			if(action.equals("adminlogin")){
				try {
					//获取用户名,密码,角色
					user.setName(request.getParameter("name"));
					user.setPwd(request.getParameter("pwd")); 
					if(request.getParameter("use")=="admin"){
						user.setAdmin(true);
					}
					else {
						user.setAdmin(false);
					}		
					//判断用户的合法性
					if(user.TestLogin(user)){
						String script = "<script>alert('管理员登陆成功');location.href='dengluhou.jsp'</script>";
						request.getSession().setAttribute("user", user);
						request.getSession().setAttribute("name", request.getParameter("name"));
						response.getWriter().println(script);
						} 
					else{ 
						String script = "<script>alert('用户名或密码错误，请重新登陆');location.href='login.jsp'</script>";
						response.getWriter().println(script); 
					}
				} catch (Exception e) { 
					// TODO Auto-generated catch block
					e.printStackTrace();					
				}  
			}
			//注册处理
			if(action.equals("reg")){
				try {
					//获取用户名,密码,角色
					String name = request.getParameter("name");
					String pwd = request.getParameter("pwd");
					String realname = request.getParameter("realname");
					if(name.trim().equals("") || pwd.trim().equals("") || realname.trim().equals("")){
						String script = "<script>alert('内容不能为空');location.href='register.jsp'</script>";
						response.getWriter().println(script); 
						return ;
					}
					user.setName(request.getParameter("name"));
					user.setPwd(request.getParameter("pwd"));
					user.setRealName(request.getParameter("realName"));
					//判断用户的合法性
					if(user.TestReg(user)){
						request.getSession().setAttribute("user", user);
						request.getSession().setAttribute("name", request.getParameter("name"));
						String script = "<script>alert('注册成功');location.href='login1.jsp'</script>";
						response.getWriter().println(script);						 
					}else{ 
						String script = "<script>alert('注册失败！请重新注册');location.href='login1.jsp'</script>";
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
