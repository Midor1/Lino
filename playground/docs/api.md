FORMAT:1A

# LINO the Live system



# LINO API Root [/]

## Live WebSocket [/lives]
用于接收指定LIVE推送的消息
+ Parameters
    + lid (long)

## Group User

用于管理用户/权限的API

## Users [/users]

### Create a User [POST]

通常我们管这叫注册。AuthInfo信息必须是全的，不是打你。uid 随便填，反正不会用你给的。

+ Request (application/json)
    + Attributes
        + user (User, required)
        + authinfo (AuthInfo, required)

+ Response 200

### Get User list [GET]

+ Parameters
    + nickname (string) - search string for user nickname
    + from:0 (number) - the beginning of the list since there is a limit on number objects returned.

+ Response 200 (application/json)
    + Attributes
        + users (array[User])
    + Body
    
            [
                "users":
                        {
                            "uid":121449137,
                            "nickname":"prime",
                            "others":{}
                        },
                        {
                            "uid":314159126,
                            "nickname":"pi",
                            "others":{}
                        }
            ]

    

## authenticator [/users/auth]

### Wechat authentication [GET]

由微信授权页面重定向而来，不带code说明失败了。  
Response暂定200，未来可能要改，因为重定向什么的可能必须做。

+ Parameters
    + code (string, required)
    
+ Request

+ Response 200

### Password authentication [POST]

+ Request
    + Attributes
        + authinfo (AuthInfo, required)

+ Response 200

### deactivate current user [DELETE]

登出，用了个不太对劲的语义，放过我就好

+ Response 200

## user [/users/{uid}]

NOTE: "me" is the special uid for the active user  
example: GET /users/me/permission to get the active user's permission

### Get User Info [GET]

+ Response (application/json)
    + Attributes
        + user (User)
    + Body
            
            {
                "user":
                {
                    "uid":314159126,
                    "nickname":"pi",
                    "others":{}
                }
            }

### Change User Info [PUT]

只有管理员和自己能做。除了UID之外都能改。写上来的都会被改动。

+ Request (application/json)
    + Attributes
        + user (User)
        + password (string)

+ Response 200

## user permission [/users/{uid}/permission]

### Get user permission [GET]

WARNING: 因为安全因素考虑，返回的权限值不会高于当前用户的权限值

+ Response (application/json)
    + Attributes
        + permission (number)
    + Body
            
            {
                "permission":100
            }

### Modify user permission [POST]

只有管理员能做。

+ Request (application/json)
    + Attributes
        + permission (number,required)

+ Response 200

## forgotten user [/users/forgot]

### send reset mail [POST]

+ Request (application/json)
    + Attributes
        + mail (string)

+ Response 200

### reset login [GET]

我们的重置密码系统的实现的基本思路是从邮箱的链接直接登陆获得当前用户的权限。

+ Parameters
    + token (string, required)

+ Response 200

## Group Live

## Lives [/lives]

### Get live list [GET]

+ Parameters
    + name (string) - search string, specify nothing for all.
    + host (number) - uid of the live host. When set to 0 of not specified, all lives will be returned
    + upcoming :0 (number) - if set to 1, only the active live and future lives will be returned
    + from : 0 (number) - the beginning of the list, since there will a limit of number objects returned

+ Response
    + Attributes
        + lives (array[Live])
    + Body
            
            {
                "lives":[
                    {
                        "lid":233333333,
                        "name":"Eru's Miner Instructions",
                        "cover":21474836,
                        "begin_time":1493186857659,
                        "time_lasted":60000,
                        "status":0
                    },
                    {
                        "lid":234333333,
                        "name":"CJ's LW Lesson",
                        "cover":21474836,
                        "begin_time":1393186897659,
                        "time_lasted":604274,
                        "status":2
                    }
                ]
            }

### Create a live [POST]

+ Request
    + Atrributes
        + live (Live) - use 0 or unspecified lid to use the active user as the host

+ Response 200 (application/json)
    + Attributes
        + lid (number)
    + Body
            
            {
                "lid":233333333
            }

## A specific Live [/lives/{lid}]

### Get live info [GET]

+ Response 200 (application/json)
    + Atrributes
        + live (Live)
    + Body
            
            {
                "lid":233333333,
                "name":"Eru's Miner Instructions",
                "cover":21474836,
                "begin_time":1493186857659,
                "time_lasted":60000,
                "status":0
            }

### Modify live info [PUT]

+ Request
    + Attributes
        + live (Live) - lid not going to be modified whatever specified

+ Response 200

### Delete a live [DELETE]

+ Response 200

## likes of a live [/lives/{lid}/like]

### Get Like count of a live [GET]

+ Request

+ Response
    + Attributes
        + likes (number)
    + Body
    
        {
            "likes":233
        }
        
### Like a Live [PUT]

You have to login to like a live and may not like a live twice

+ Request

+ Response

### Cancel like to a Live [DELETE]

You have to login to do so, and things will not change if you never liked it.

+ Request

+ Response

       

## messages of a live [/lives/{lid}/thread]

### Get messages of a live [GET]

+ Parameters
    + begin_time : 0 (number) 
    + end_time : maxnumber (number)
    + begin_count : 0 (number)
    + end_count : maxnumber (number)
    + reversed_count_order : 1 (number) - when set to 1, messages will be counted back to front

+ Request

+ Response (application/json)
    + Attributes
        + messages (array[Message])
    + Body
            
            {
                "messages":[
                    {
                        "mid":7654321,
                        "content":"Hello",
                        "replyto":0,
                        "time":1493186857659
                    },
                    {
                        "mid":7654323,
                        "content":"Hello",
                        "replyto":7654321,
                        "time":1493186857800
                    }
                ]
            }

### Create a message [POST]

因为主线消息要求更高的权限，replyto的合法性会被检测。

+ Request
    + Attributes
        + message (Message, required)

+ Response
    + Attributes
        + mid (number)
    + Body 200 (application/json)
            
            {
                "mid":7654321
            }

## a single message of a live [/lives/{lid}/thread/{mid}]

### Get message [GET]
    
+ Response (application/json)
    + Attributes
        + message (Message)
    + Body
            
            {
                "mid":7654321,
                "content":"Hello",
                "replyto":0,
                "time":1493186857659
            }

### Delete message [DELETE]

+ Response 200

## Group File

## Files [/files]

### Create new file [POST]

POST the raw file here

+ Request (???)

+ Response 200 (application/json)
    + Attributes
        + file (File) -  set owner to 0 to use the current user as the owner
    + Body
            
            {
                "fid":91827364,
                "hash":"5ae7cb2789cbe987",
                "owner":121449137
            }

## File [/files/{fid}]

### Retrieve the file [GET]

+ Response 200 (???)

### Delete the file [DELETE]

只有管理员或者文件主人能做。不建议使用因为会让前端想疯。

+ Response 200

## Group PersonalComment

## Personal Comment List [/personalcomments/{uid}]

### get Personal Comment list [GET]

Replys are treated the same as those non-reply messages

+ Parameters
    + begin_time : 0 (number) 
    + end_time : maxnumber (number)
    + begin_count : 0 (number)
    + end_count : maxnumber (number)
    + reversed_count_order : 1 (number) - when set to 1, messages will be counted back to front

+ Response 200 (application/json)
    + Attributes
        + messages (array[Message])
    + Body
                
            {
                "lives":[
                    {
                        "uid":233333333,
                        "name":"Eru's Miner Instructions",
                        "cover":21474836,
                        "begin_time":1493186857659,
                        "time_lasted":60000,
                        "status":0
                    },
                    {
                        "uid":234333333,
                        "name":"CJ's LW Lesson",
                        "cover":21474836,
                        "begin_time":1393186897659,
                        "time_lasted":604274,
                        "status":2
                    }
                ]
            }

### create Personal Comment [POST]

+ Request 
    + Attributes
        + message (Message, required) - mid is not needed to be specified

+ Response
    + Attributes
        + mid (number)
    + Body
            
            {
                "mid":249314732
            }

## A Personal Comment [/personalcomments/{uid}/{mid}]

### Get a personal message [GET]

+ Response 200 (application/json)
    + Attributes
        + message (Message)
    + Body
            {
                "message":
                    {
                        "mid":7654321,
                        "content":"Hello",
                        "replyto":0,
                        "time":1493186857659
                    }
            }

### Delete a personal message [DELETE]

Attention that this operation does not guarantee that messages reply to this message is deleted, and it should be determined by the client if needed.

+ Response 200

## Data Structures 

### User

+ uid (number, required)
+ nickname (string, required)
+ others (object)

### AuthInfo

验证时邮箱，用户名任选一个。注册时所有信息必填

+ name (string)
+ mail (string)
+ password(string, required)

### File

+ fid (number, required)
+ hash (string)
+ owner (number)

### Live

表示单个直播的信息

+ lid (number, required) - live ID
+ name (string, required)
+ description (string, required)
+ cover (number) - file id of the cover image
+ begin_time (number, required) - 64-bit system time
+ time_lasted (number, required) - 64-bit system time. Stand for estimated time before it starts, and the accurate time elasped after ended.
+ status :0 (number) - 0 for not started, 1 for now in live, 2 for ended

### Message

+ mid (number, required)
+ content (string) - Front End Defined message content
+ replyto (number) - If exists and non-zero, this message is a reply to the message referenced
+ time (number) -  Time the message emitted.