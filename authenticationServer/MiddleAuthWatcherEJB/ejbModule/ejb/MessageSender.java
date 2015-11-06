package ejb;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.Queue;
import javax.jms.Topic;

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
	Queue queue;
    public MessageSender() {
    	
    	sendMessageJMS20("Hello world");
 
    }
    
    public void sendMessageJMS20(String message) {
   
    	context.createProducer().send(queue,message);
    }

}
