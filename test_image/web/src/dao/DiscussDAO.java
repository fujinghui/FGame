package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Map;

import util.DBHelper;
import entity.Discuss;
import entity.Items;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import util.DBHelper;


//商品的业务逻辑类
public class DiscussDAO {

	// 获得所有的商品信息
	public ArrayList<Discuss> getAllDiscuss() {
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		ArrayList<Discuss> list2 = new ArrayList<Discuss>(); // 商品集合
		try {
			conn = DBHelper.getConnection();
			String sql = "select * from discuss;"; // SQL语句
			stmt = conn.prepareStatement(sql);
			rs = stmt.executeQuery();
			while (rs.next()) {
				Discuss discuss = new Discuss();
				discuss.setId(rs.getInt("id"));
				discuss.setTextid(rs.getInt("textid"));
				discuss.setName(rs.getString("name"));
				discuss.setContent(rs.getString("content"));
				list2.add(discuss);// 把一个商品加入集合
			}
			return list2; // 返回集合。
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		} finally {
			// 释放数据集对象
			if (rs != null) {
				try {
					rs.close();
					rs = null;
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}
			// 释放语句对象
			if (stmt != null) {
				try {
					stmt.close();
					stmt = null;
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}
		}

	}

	// 根据商品编号获得商品资料
	public ArrayList<Discuss> getDiscussById(int id) {
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		ArrayList<Discuss> list3 = new ArrayList<Discuss>();
		try {
			conn = DBHelper.getConnection();
			String sql = "select * from discuss where id=?;"; // SQL语句
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, id);
			rs = stmt.executeQuery();
			while (rs.next()) {
				Discuss discuss = new Discuss();
				discuss.setId(rs.getInt("id"));
				discuss.setTextid(rs.getInt("textid"));
				discuss.setName(rs.getString("name"));
				discuss.setContent(rs.getString("content"));
				list3.add(discuss);// 把一个商品加入集合
			}
			return list3; 
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		} finally {
			// 释放数据集对象
			if (rs != null) {
				try {
					rs.close();
					rs = null;
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}
			// 释放语句对象
			if (stmt != null) {
				try {
					stmt.close();
					stmt = null;
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}

		}
	}
	public Discuss getdiscuss(int textid) {
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try {
			conn = DBHelper.getConnection();
			String sql = "select * from discuss where textid=?;"; // SQL语句
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1,textid);
			rs = stmt.executeQuery();
			if (rs.next()) {
				Discuss discuss = new Discuss();
				discuss.setTextid(rs.getInt("textid"));
				discuss.setName(rs.getString("name"));
				discuss.setContent(rs.getString("content"));
				return discuss;
			} else {
				return null;
			}

		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		} finally {
			// 释放数据集对象
			if (rs != null) {
				try {
					rs.close();
					rs = null;
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}
			// 释放语句对象
			if (stmt != null) {
				try {
					stmt.close();
					stmt = null;
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}

		}
	}
	public Discuss getTextdiscuss(int textid) {
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try {
			conn = DBHelper.getConnection();
			String sql = "select * from textdiscuss where textid=?;"; // SQL语句
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1,textid);
			rs = stmt.executeQuery();
			if (rs.next()) {
				Discuss discuss = new Discuss();
				discuss.setTextid(rs.getInt("textid"));
				discuss.setName(rs.getString("name"));
				discuss.setTextcontent(rs.getString("textcontent"));
				return discuss;
			} else {
				return null;
			}

		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		} finally {
			// 释放数据集对象
			if (rs != null) {
				try {
					rs.close();
					rs = null;
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}
			// 释放语句对象
			if (stmt != null) {
				try {
					stmt.close();
					stmt = null;
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}

		}
	}
	public ArrayList<Discuss> getAllTextdiscussById(int textid) {
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		ArrayList<Discuss> list3 = new ArrayList<Discuss>();
		try {
			conn = DBHelper.getConnection();
			String sql = "select * from textdiscuss where textid=?;"; // SQL语句
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, textid);
			rs = stmt.executeQuery();
			while (rs.next()) {
				Discuss discuss = new Discuss();
				discuss.setTextid(rs.getInt("textid"));
				discuss.setName(rs.getString("name"));
				discuss.setTextcontent(rs.getString("textcontent"));
				list3.add(discuss);// 把一个商品加入集合
			}
			return list3; 
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		} finally {
			// 释放数据集对象
			if (rs != null) {
				try {
					rs.close();
					rs = null;
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}
			// 释放语句对象
			if (stmt != null) {
				try {
					stmt.close();
					stmt = null;
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}

		}
	}
}