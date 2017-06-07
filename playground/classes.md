# Classes

暂时先把类的定义写在这以后做成类图  

## Package lino

	public class lino{
		// the main entrance of the app
		public static void main(String[] args);
	}

## Package lino.models
	
	public interface JSONSerializable{
		String toJSON();
	}

	public class User implements JSONSerializable{
		private long uid;
		public long getUid();
		public String nickname;
		public int permission;
		public JSONSerializable others;
		public String toJSON();
		User(long uid, String nickname, JSONSerializable others); not public so not created out of the package
		public static User fromJSON(String JSONString);
	}

	public class UserManager{
		public User getUser(long uid);
		public Collection<User> getUsers();
		public Collection<User> getUsers(String nickname);
		public Collection<User> getUsers(int limit, int from);
		public Collection<User> getUsers(String nickname, int limit, int from);
		public User authUser(AuthInfo authInfo) throws AuthFailureException;
		public User authUser(String wechatToken) throws AuthFailureException;
		public User createUser(String nickname, JSONSerializable others, AuthInfo authInfo) throws DuplicateUserException;
		public User createUser(String nickname, JSONSerializable others, String wechatToken) throws DuplicateUserException;
		public void saveUser(User user);//any modification to users MUST be explicitly made here.
		public void saveUser(User user, AuthInfo authInfo);
	}

	public class AuthInfo{
		String mail;
		String hashedPassword;
		public static AuthInfo fromJSON(String JSONString);
	}

	class userProperties implements JSONSerializable{
		//used to store others properties of users not defined yet

		public String toJSON();
	}
	
	public class Live implements JSONSerializable{
		private long lid;
		public long getLid();
		public String name;
		public String description;
		public long cover;
		public long beginTime;
		public long duration;
		public int status;
		public String toJSON();
		public static Live fromJSON(String JSONString);
		Live(long lid, String name, String description, long cover, long beginTime, long duration, int status);
	}

	public class LiveManager{
		public Live getLive(long lid);
		public Collection<Live> getLives(String name, long host, bool upcoming); //only returns lives in progress and scheduled future
		public Collection<Live> getLives(String name, long host, bool upcoming, int limit, int from);
		public Live createLive(String name, long host, long cover, long beginTime, long duration);
		public void saveLive(Live live);
		public void deleteLive(Live live);
	}

	public class File implements JSONSerializable{
		private long fid;
		public long getFid();
		public String hash;
		public long owner;
		public InputStream getInputStream();
		public String toJSON();
	}

	public class FileManager{
		public File createFile(char[] data, long owner);
		public File getFile(long fid);
		public File deleteFile(long fid);
	}

	public class Message implements JSONSerializable{
		private long mid;
		public long getMid();
		public String content;
		public long replyto;
		public long time;
		public long owner; //usually we do not add it to the output JSON because of the front end behaviour.
		public String toJSON();
		public static Message fromJSON(String JSONString);
		Message(String content, long replyto, long time);
	}

	public class PersonalMessageManager{
		public Message createMessage(long owner, String content, long replyto, long time);
		public Message getMessage(long mid);
		public Collection<Message> getMessages(long owner, long beginTime, long endTime, int beginCount, int endCount, bool reversedOrder);
	}

	public class LiveMessageManager{
		public Message createMessage(long owner, String content, long replyto, long time);
		public Message getMessage(long mid);
		public Collection<Message> getMessages(long lid, long beginTime, long endTime, int beginCount, int endCount, bool reversedOrder);
	}

	public class SessionManager{
		public User getCurrentUser(String token);
		public void setCurrentUser(String token, User user);
		public void deprecateSession(String token);
	}

	public class LiveMessageBroadCaster{
		// the class deals with multiple servers serving in the service so please use this whatever there is broadcast listener on this server or not.
		public LiveMessageBroadCaster(long lid, Subscriber subscriber);
		public void broadCast(Message message);//check validity of data before broadcasting or just unserialize and serialize it.
	}

	public interface Subscriber{
		public void push(Message message);
	}

## Package utilities

	public class AppConfig{
		public static fromJSON(String JSONString);
		public static int RETURN_LIMIT = 10;
		public static String FileSotageLocation = "./files";

	}

## Package lino.controllers

We will be using Spark the Java web framework, and the following document will be especially using 

+ spark.Request
+ spark.Response
+ spark.Route
+ org.eclipse.jetty.websocket.api.Session

I do not want to list all routes here, which is a non-pleasant job. We will have these tool classes enlisted.

	public class RouteWrapper implements Route{
		public RouteWrapper(Route permissionChecker, Route handler);
		public Object handle(Request request, Response response);
	}

	public class PermissionLevelChecker implements Route{
		public PermissionLevelChecker(int permissionRequired);
		public Object handle(Request request, Response response);
	}

	public class SelfAndAdminChecker implements Route{
		public SelfAndAdminChecker();
		public Object handle(Request request, Response response);
	}

Anyway, I'm defining them here.

	public class CreateUserRoute implements Route{
		public Object handle(Request request, Response response);
	}

	public class GetUserListRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class WeChatAuthRoute implements Route{
		public Object handle(Request request, Response response);
	}

	public class PasswordAuthRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class LogoutRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class GetUserRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class ChangeUserRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class ModifyUserRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class GetUserPermissionRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class ModifyUserPermissionRoute implements Route{
		public Object handle(Request request, Response response);
	}

	public class ChangeUserRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class SendResetMailRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class RestLoginRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class GetLiveListRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class CreateLiveRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class ChangeUserRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class GetLiveRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class ModifyLiveRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class DeleteLiveRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class GetLiveMessagesRoute implements Route{
		public Object handle(Request request, Response response);
	}

	public class CreateLiveMessageRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class GetLiveMessageByIDRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class DeleteLiveMessageByIDRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class ChangeUserRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class CreateFileRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class GetFileRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class DeleteFileRoute implements Route{
		public Object handle(Request request, Response response);
	}

	public class GetPersonalCommentsRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class ChangeUserRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class CreatePersonalCommentRoute implements Route{
		public Object handle(Request request, Response response);
	}

	public class GetPersonalCommentByIDRoute implements Route{
		public Object handle(Request request, Response response);
	}
	
	public class DeletePersonalCommentByIDRoute implements Route{
		public Object handle(Request request, Response response);
	}

	public class PushHandler{
		public void connected(Session session);
		public void closed(Session session, int statusCode, String reason);
		public void message(Session session, String message) throws IOException;
	}
	
	
	
	
	
	