package ejb;

import javax.ejb.Local;


@Local
public interface MessageSenderLocal {
	public void sendMessage(String message);
}
