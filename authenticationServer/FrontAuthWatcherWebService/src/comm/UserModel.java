package comm;

import org.json.simple.JSONObject;

public class UserModel {
	
	String login;
	String pwd;
	String lastname;
	String surname;
	String role;
	
	public UserModel(){
		this.login = "logindebase";
		this.pwd = "pwddebase";
		this.lastname = "deau";
		this.surname = "cours";
		this.role = "dps";
	}
	
	public UserModel(String login, String pwd){
		this.login = login;
		this.pwd = pwd;
		this.lastname = "deau";
		this.surname = "cours";
		this.role = "dps";
	}
	
	public UserModel(String login, String pwd, String lastname, String surname,
			String role) {
		super();
		this.login = login;
		this.pwd = pwd;
		this.lastname = lastname;
		this.surname = surname;
		this.role = role;
	}
	public void printuser(){
		System.out.println("login : "+this.login);
		System.out.println("pwd : "+this.pwd);
		System.out.println("surname : "+this.surname);
		System.out.println("lastname : "+this.lastname);
		System.out.println("role : "+this.role);
		
	}
	
	public JSONObject tojson()
	{
		JSONObject obj=new JSONObject();
		  obj.put("login",this.login);
		  obj.put("pwd",this.pwd);
		  obj.put("surname",this.surname);
		  obj.put("lastname",this.lastname);
		  obj.put("role",this.role);
		  return obj;
	}

	
	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	

}
