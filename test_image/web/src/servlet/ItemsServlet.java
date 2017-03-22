package servlet;
 
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import dao.ItemsDAO;
import entity.Items;

/**
 * Servlet implementation class ItemsServlet
 */
@WebServlet("/servlet/ItemsServlet")
public class ItemsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ItemsServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		
		if(request.getParameter("action")!=null)
		{
			ItemsDAO dao = new ItemsDAO();
			if(request.getParameter("action").equals("add")){
				DiskFileItemFactory factory = new DiskFileItemFactory();
				ServletFileUpload upload = new ServletFileUpload(factory);
				upload.setHeaderEncoding("ISO8859_1");
				List<FileItem> list = null;
				Map<String,String> map = new HashMap<String,String>();
				try {
					list = upload.parseRequest(request);
					
					for(FileItem fileitem : list){
						if(fileitem.isFormField()){
							//System.out.println(fileitem.getFieldName() + "---" + fileitem.getName() + "---" + toUtf8(fileitem.getString()));
							map.put(fileitem.getFieldName(), toUtf8(fileitem.getString()));
						}else{
							String name = fileitem.getFieldName();
							String filename = toUtf8(fileitem.getName());
							filename = filename.substring(filename.lastIndexOf("\\")+1);
							map.put(name, filename);
							String path = this.getServletContext().getRealPath("/images");
							InputStream in = fileitem.getInputStream();
							FileOutputStream out = new FileOutputStream(path + "//" + filename);
							byte[] buf = new byte[1024];
							int len = 0;
							while((len = in.read(buf)) > 0 ){
								out.write(buf, 0, len);
							}
						}
						//System.out.println(map.size());
					}
					dao.add(map);
					String script = "<script>alert('Release success');location.href='../admin.jsp'</script>";
					response.getWriter().println(script);
				} catch (FileUploadException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if(request.getParameter("action").equals("add1")){
				DiskFileItemFactory factory = new DiskFileItemFactory();
				ServletFileUpload upload = new ServletFileUpload(factory);
				upload.setHeaderEncoding("ISO8859_1");
				List<FileItem> list = null;
				Map<String,String> map = new HashMap<String,String>();
				try {
					list = upload.parseRequest(request);
					
					for(FileItem fileitem : list){
						if(fileitem.isFormField()){
							//System.out.println(fileitem.getFieldName() + "---" + fileitem.getName() + "---" + toUtf8(fileitem.getString()));
							map.put(fileitem.getFieldName(), toUtf8(fileitem.getString()));
						}else{
							String name = fileitem.getFieldName();
							String filename = toUtf8(fileitem.getName());
							filename = filename.substring(filename.lastIndexOf("\\")+1);
							map.put(name, filename);
							String path = this.getServletContext().getRealPath("/images");
							InputStream in = fileitem.getInputStream();
							FileOutputStream out = new FileOutputStream(path + "//" + filename);
							byte[] buf = new byte[1024];
							int len = 0;
							while((len = in.read(buf)) > 0 ){
								out.write(buf, 0, len);
							}
						}
						//System.out.println(map.size());
					}
					dao.add(map);				
						String script = "<script>alert('Release success');location.href='../index.jsp'</script>";
						response.getWriter().println(script);
				} catch (FileUploadException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if(request.getParameter("action").equals("update")){
				Items item = new Items();
				item.setName(request.getParameter("name"));
				item.setCity(request.getParameter("city"));
				item.setPrice(request.getParameter("price"));
				dao.update(request.getParameter("id"),item);
				response.sendRedirect(request.getContextPath()+"/admin.jsp");
			}
			if(request.getParameter("action").equals("delete")){
				dao.delete(request.getParameter("id"));
				response.sendRedirect(request.getContextPath()+"/admin.jsp");
			}
		}
		
		
	}
	//默认是ISO8859_1，先用ISO8859_1接受，然后转成utf-8
		private String toUtf8(String str){
			String result = "";
			try {
				result = new String(str.getBytes("ISO8859_1"),"utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			return result;
		}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

}
