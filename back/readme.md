<div>
<h2> Backend - Wallet </h2>

  <div>
    <p> In the folder back you must perform an npm install, to install the required dependencies.
We must create a ".env" file in which the following data must be entered: </p>
    
      DB_USER=postgres
      DB_PASSWORD=postgres
      DB_HOST=localhost
      DB_NAME=wallet
      PORT=3001   
    
    
  </div>
  
  
  <p>The values must be replaced by the corresponding ones. The database can be named whatever you prefer.

Once this is done, we can start the server by doing npm start, on the back folder. </p>

 <div> 
 <h3> Routes </h3>
   <div>
     <li> Post/session/signup: </li>   
   </div>
   <div>
    <p>We perform the data entry by body, as follows.</p>
     
        {
          "firstname": "Henry",                                              
          "lastname": "Perez",
          "email": "henry@gmail.com",
          "password": "password00",
          "phone": "1133333333",
          "pin": "654321"
        }
     
   </div>
   
   <p> This will return a status 200, confirming the creation of the user.</p>
   

   <li> Post/session/localsignin: </li>
   
   <p>Here we call passport.authenticate, as a login strategy, passing it the values err, and user.
    It will only take the email and password entered in the previous post.
    Now yes, the user has been authenticated. </p>
   
   
        {
          "email": "henry@gmail.com",
          "password": "password00"
        }
   
   
   
   <li>Post/session/signout: </li>
   
   <p>Path to close the session. </p>
   
   
   <li>Put/user/updateDate </li>
   
   <p>Path to modify user data. The data is entered by body, as shown below.
    It takes the id of the User model, verifies that it exists, and returns a status of 200, confirming the update. </p>
   
   
        {
          "firstname": "Henry",                                              
          "lastname": "Perez",
          "email": "henry@gmail.com",
          "password": "password00",
          "phone": "1144444444",
          "pin": "654321"
        }
   
   
   
   <li>Get/user/getData</li>
   <p>This route takes the id, searches the User model, and returns the information referring to the user in detail.
    In case of not finding it, it returns an error message. </p> 
   
 </div>

</div>
