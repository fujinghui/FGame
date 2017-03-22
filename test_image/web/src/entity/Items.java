package entity;

//商品类
public class Items {

	private int id; // 商品编号
	private String name; // 商品名称
	private String city; // 产地
	private String price; // 价格
	private String picture; // 商品图片
	private String content;

	//保留此不带参数的构造方法
	public Items()
	{
		
	}
	
	public Items(int id,String name,String city,String price,String picture,String content)
	{
		this.id = id;
		this.name = name;
		this.city = city;
		this.picture = picture;
		this.price = price;
		this.content=content;
		
	}
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}
	
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	
	
	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return this.getId()+this.getName().hashCode();// 为了让相同的商品对象生成相同的hashcode
	}

	@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
		if(this==obj)
		{
			return true;
		}
		if(obj instanceof Items) //判断是否是商品类
		{
			Items i = (Items)obj;
			//判断商品的编号和名称一致的话就认为是同一个商品
			if(this.getId()==i.getId()&&this.getName().equals(i.getName()))
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}

	public String toString()
	{
		return "商品编号："+this.getId()+",商品名称："+this.getName();
	}

}
