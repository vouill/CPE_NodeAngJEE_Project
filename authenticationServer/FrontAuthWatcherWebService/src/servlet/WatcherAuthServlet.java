package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import comm.UserModel;

/**
 * Servlet implementation class WatcherAuthServlet
 */
@WebServlet("/WatcherAuthServlet")
public class WatcherAuthServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	
	Object obj;
	JSONParser parser ;
	UserModel user ;
	JSONObject jsontoreturn;
	JSONObject jsonObject;
	
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public WatcherAuthServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
				parser = new JSONParser();
				
				
				String jsonstring = request.getParameter("json").toString();
				 try {
					obj = parser.parse(jsonstring);
					jsonObject = (JSONObject) obj;
					
					String login = (String) jsonObject.get("login");
					String pwd = (String) jsonObject.get("pwd");
					
					user = new UserModel(login,pwd);
					
					user.printuser();
					
					jsontoreturn=new JSONObject();

					
					jsontoreturn=user.tojson();
					 PrintWriter out = response.getWriter();
				      out.println(jsontoreturn);
			        out.close();
			        out.flush();
					
					
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
