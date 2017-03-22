package entity; 
import dao.UserDAO;

public class User {
	private static boolean ture;
	private String name;
	private String realName;
	private String pwd;	 
	private boolean isAdmin;
	
	public User() { 
	} 
	
	public String getName() {
		return name;
	}
 
	public void setName(String name) {
		this.name = name;
	}
 
	public String getRealName() {
		return realName;
	}
 
	public void setRealName(String realName) {
		this.realName = realName;
	}
 
	public String getPwd() {
		return pwd;
	}
 
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
 
	public boolean isAdmin() {
		return isAdmin;
	}
 
	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}
 
	public static boolean AddUser(User u){
		//调用插入记录到数据库中的方法
		return ture;
	}

	public boolean TestLogin (User u) {
		UserDAO userDAO=new UserDAO();	
		return userDAO.TestLogin(u);		
	}
	public boolean TestReg (User u) {
		UserDAO userDAO=new UserDAO();	
		return userDAO.TestReg(u);		
	}
}
