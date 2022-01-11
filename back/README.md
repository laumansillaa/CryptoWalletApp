# Backend documentation

In <back> folder you must execute <npm install> command in order to install the required dependencies.
Then create an <.env> file, in which the following data must be entered:
```
    DB_USER=postgresUsername
    DB_PASSWORD=postgresPassword
    DB_NAME=postgresDatabaseName

    DB_HOST=localhost
    PORT=3001   
```
You must replace the first three values with your corresponding Postgres credentials,
and the database name (<postgresDatabaseName>) can be whatever you prefer (you must creat that data base on your computer!).

Once this is done, you can start the server by executing <npm start> inside <back> folder.

## Routes

### Sign up:

- Method: post 
- Route: /session/signup

You must send through body the following data:
``` 
  {
    firstname: "someFirstName",                                              
    lastname: "someLastName",
    email: "someEmail@gmail.com",
    password: "somePassword1234",
    phone: "012345678",
    pin: "123456"
  }
``` 
All the values have to be of type <string> and with the following restrictions:
- <firstname> and <lastname> must be non empty.
- <email> must be a valid email. 
- <password> must contain at least 8 characters and contain at least one number.
- <phone> has no restrictions.
- <pin> must be exactly 6 characters long and contain only numbers.

The possible respnses are:
- 'Sign up succeeded.' (status 200).
- 'Sign up failed: email not available.' (status 400).
- 'Sign up failed: invalid values.' (status 400).

### Sign in (with email):

- Method: post 
- Route: /session/localSignin

You must send through body the following data:
``` 
  {
    email: "someEmail@gmail.com",
    password: "somePassword1234",
  }
``` 
All the values have to be of type <string> and must be non empty.

The possible respnses are:
- 'Sign in succeeded.' (status 200).
- 'Sign in failed: bad credentials.' (status 401).
   
### Sign in (with Google):

- Method: get 
- Route: /session/googleSignin

You must send no data.

The possible respnses are:
- Redirection to client url. (status 200).
- 'Sign in failed: bad credentials.' (status 401).
   
### Sign out:

- Method: post 
- Route: /session/signout

You must send no data.

The only possible response is:
- 'Sign in out succeeded.' (status 200).

### Update user data:

- Method: put 
- Route: /user/updateData

You must send through body the following data:
``` 
  {
    firstname: "someNewFirstName",                                              
    lastname: "someNewLastName",
    email: "someNewEmail@gmail.com",
    password: "someNewPassword1234",
    phone: "012345678",
    pin: "123456"
  }
``` 
All the values have to be of type <string> and with the following restrictions:
- <firstname> and <lastname> must be non empty.
- <email> must be a valid email. 
- <password> must contain at least 8 characters and contain at least one number.
- <phone> has no restrictions.
- <pin> must be exactly 6 characters long and contain only numbers.
If there are some fields that you don't want to update, just send the previous
values so they remain the same.

The possible respnses are:
- 'User update succeeded.' (status 200).
- 'User update failed: invalid values.' (status 400).

### Get user data:

- Method: get 
- Route: /user/getData

You must send no data.

The only possible respnse is:
- User data stored in an object (status 200):
``` 
  {
    firstname: "someFirstName",                                              
    lastname: "someLastName",
    email: "someEmail@gmail.com",
    password: "somePassword1234",
    phone: "012345678",
    pin: "123456"
  }
``` 
