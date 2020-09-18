# SN - OSS Social Network
SN is an open source social network application, made using a MERN stack.

Note: This is just the API

What you will need:
- VS Code (running and the project)
- Node.JS (for server side JS)
- Postman (chrome extension)

How to Use:
- Download the repository as a .zip file
- Unzip the file
- Open VS Code and open the extracted folder
- In VS Code, create a new terminal
- Open up the package.json file and add all the npm packages listed and the respected versions
- Inside the terminal enter command 'node app.js' (this will start up the project), you will notice the terminal switch from powershell to node
- Once you get a statement in the terminal saying 'Server Started' and 'DB connected',
- Open Postman and continue to the next steps.

#Sign Up
- Make a post request to 'localhost:3000/signup'
- Create a new header
- Create a key with 'Content-Type' and a value of 'application/json'
- Then in the body tab:
- copy and paste the following:
{
	"name": "User",
	"email": "user@gmail.com",
	"password": "password"
}
- Change the name and email fields (leave the password the same)
- Hit Send (you will get back an error)
- The error will say that the password must have a number, so add a number and hit send again.
- You should then recieve a 'msg' saying that the signup worked.

#Sign In
- make a post request to 'localhost:3000/signin'
- Keep the header the same
- Inside the body tab, remove the name attribute
- Then hit send.
- You should recieve a JSON statement back with an authentication token, your email, name, and id in the database

#Sign Out
- make a get request to 'localhost:3000/signout'
- You should get a 'msg' back saying that it was successful

#Getting Posts
- To get posts you must be signed in. But, try without being signed in first.
- Make a get request to 'localhost:3000/'
- You should get a message back saying that you are not authorized.
- Complete the sign in process again, copy the authentication token
- Create a new header with key of 'Authorization'. In the value section type 'Bearer token', replacing 'token' with the token you copied earlier.
- Now select the new header and deselect the old one.
- You should now see a list of posts in the database.

#Making Posts
- Make a post request to 'localhost:3000/post'
- Inside the JSON header, type:
{
	"title": "New Post",
	"body": "This is a new post"
}
- With this header selected, hit send
- You should get back the post id, title, and body.
- If you repeat the process of requesting all the posts, your new post should show up.


#Basic Project Overview:
- SN uses Mongo Atlas. The database is currently hosted with Microsoft Azure. This repository contains the API code. The API will communicate with the database and return information to be displayed for the user. There is currently no front end, you must use Postman to test and use this API.
