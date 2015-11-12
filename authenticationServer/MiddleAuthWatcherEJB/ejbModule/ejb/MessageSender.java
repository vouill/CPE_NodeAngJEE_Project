package ejb;

import javax.annotation.Resource;
import javax.annotation.security.PermitAll;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.Topic;

import comm.UserModel;

/**
 * Session Bean implementation class MessageSender
 */
@Stateless
public class MessageSender implements MessageSenderLocal {

    /**
     * Default constructor. 
     */
	
	
	@Inject
	JMSContext context;

	@Resource(mappedName ="java:/jms/watcherAuthJMS")
	Topic topic;
<<<<<<< Updated upstream
	
=======
	Queue queue;

>>>>>>> Stashed changes
    public MessageSender() {
    	
    	sendMessage("Hello world");
 
    }
    @PermitAll
    public void sendMessage(String message) {
   
    	context.createProducer().send(topic,message);
    }
    
    public void sendMessage(UserModel user) {
    	context.createProducer().send(topic,user);
    	}

}
