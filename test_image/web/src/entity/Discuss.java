package entity;

//商品类
public class Discuss {

	private int id; // 商品编号
	private int textid;
	private String name;
	private String content;
	private String textcontent;
	

	//保留此不带参数的构造方法
	public Discuss()
	{
		
	}
	
	public Discuss(int id,String name,String content,int textid,String textcontent)
	{
		this.id = id;
		this.name=name;
		this.content=content;
		this.textid=textid;
		this.textcontent=textcontent;
		
	}
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public int getTextid() {
		return textid;
	}

	public void setTextid(int textid) {
		this.textid = textid;
	}
	
	public String getTextcontent() {
		return textcontent;
	}

	public void setTextcontent(String textcontent) {
		this.textcontent = textcontent;
	}
	
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
