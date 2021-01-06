# SN - Social Network API
SN is an open source social network API, made using MongoDB Atlas and Node.JS

Features:
- Create Accounts
- Retrieving Accounts (individual or all)
- Update Accounts
- Delete Accounts
- Retrieve posts by user
- Create Posts
- Retrieve all posts
- Update Posts
- Delete Posts


What you will need:
- VS Code
- Node.JS
- Postman (This used to be a Chrome Extension, but you will now need to download it from the Postman website https://www.postman.com/downloads/)

How to Use:
- Download the repository as a .zip file
- Unzip the file
- Open VS Code and open the extracted folder
- In VS Code, create a new terminal
- Open up the package.json file and add all the npm packages listed and the respected versions
- Inside the terminal enter command 'node app.js' (this will start up the project), you will notice the terminal switch from powershell to node
- Once you get a statement in the terminal saying 'Server Started' and 'DB connected',
- Open Postman and continue to the next steps.

Below are instructions for how to use each feature:


**Accounts**

Sign Up
- Make a post request to 'localhost:8080/signup'
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
- You should then receive a 'msg' saying that the signup worked.

Sign In
- make a post request to 'localhost:8080/signin'
- Keep the header the same
- Inside the body tab, remove the name attribute
- Then hit send.
- You should recieve a JSON statement back with an authentication token, your email, name, and id in the database
- After signing in, you should create a new header titled 'Authorization' with a value of 'Bearer (authentication token here)'
 This authentication header will be very important to do things, such as deleting posts and making posts

Sign Out
- make a get request to 'localhost:8080/signout'
- You should get a 'msg' back saying that it was successful
	
Getting User Profile
- Make a get request to 'localhost:8080/user/:id'
 enter your user/profile id in place of ':id'
- Make sure the authorization header is attached, and then send
- You should get information abou the user returned

Updating Profile
- Make a put request to 'localhost:8080/user/:id'
 enter your user/profile id in place of ':id'
- attach the authorization and body headers. Inside the body header type what you want to update. Example:
{
	"name": "Updated Name"
}
- Send the request and you should get the updated profile returned
	
Deleting Account
- Make a delete request to 'localhost:8080/user/:id'
 enter your user/profile id in place of ':id'
- Make sure the authorization header is attached, then send the request
- You should get a message back saying that the account deletion was successful


**Posts**

Getting Posts
- Make a get request to 'localhost:8080/'
- You should now see a list of posts in the database with the author shown
- Note: Some posts may not show an author, these are posts from an older version

Getting Posts from Specific User
*You do not need to be signed in*
- Make a get request to 'localhost:8080/posts/get/:userid'
Replace ':userid' with the id of the user you want to view posts from
- You shouldn't need any headers selected
- Hit send, and you should see posts in the database by that user. They are ordered by date, so the newest ones are on the top and the oldest ones are at the bottom

Making Posts (note this has changed from previous versions)
- Make a post request to 'localhost:8080/post/new/:id'
enter your user/profile id in place of ':id'
- Make sure you have the authorization header selected in addition to the content header (you must be signed in to make a post)
- In the select body in Postman
- Change the data type from 'raw' to 'x-www-form-urlencoded'
- You will now get a form that wants keys and values
- title one key 'title' and the other 'body'. In the value sections, type what you want the title and body of the post to be
- Hit send and you should recieve information about your post back. You will also get information about the profile which made the post

Updating Posts
- Make a Put request to 'localhost:8080/post/:postid'
 enter the id of the post you want to update in place of ':postid'
- In the Body, select 'raw' and 'JSON' then type in the attributes you want to change
 ex. 
{
    "title":"new title"
}
- Hit send and you should see the new updated post sent back

Deleting Posts
- Make a delete request to 'localhost:8080/post/:postid'
 enter the id of the post in place of ':postid' (You can obtain the post id by getting posts from the account you want to delete the post from)
- Attach the authorization header
- Send the request and you should get a message saying that the post has been deleted


###Basic Project Overview:###
- SN uses Mongo Atlas. This repository contains the API code. The API will communicate with the database and return information to be displayed for the user. There is a front end in the works. But, for now, you must use PostMan to test the API.
