# Backend documentation

In `back` folder you must execute `npm install` command in order to install the required dependencies.
Then create an `.env` file, in which the following enviroment variables must be defined:
```
    DB_USER = ""
    DB_PASSWORD = ""
    DB_NAME = ""
    DB_HOST = "localhost"

    IP_HOST = ""
    PORT = "3001"

    ADMIN_ETHEREUM_PUBLIC_KEY = ""
    ADMIN_ETHEREUM_PRIVATE_KEY = ""

    TOKEN_MERCADOPAGO = "TEST-1256359479485533-011422-c43ac4c47ecf9be92a84de2708a6b79c-568635558"
```
You must replace the first three values with your corresponding Postgres credentials,
and the database name (`DB_NAME`) can be whatever you prefer (you must create that data base on your computer!).
Variable `IP_HOST` must be asigned to your computer ip host. You also must install Ganache (https://trufflesuite.com/ganache/)
in order to set a local ethereum blockchain. Once installed, you can choose any of the 10 accounts available in the program
to fill both `ADMIN_ETHEREUM_PUBLIC_KEY` and `ADMIN_ETHEREUM_PRIVATE_KEY` (to visualize them, you must press the button which
says "Show Keys" and has a key symbol).

Once this is done, you can start the server by executing `npm start` command inside `back` folder.

# Routes

In order to get access to all the available routes, you must first set a session using either one of the following
routes: /session/localSignin, /session/googleSignin, /session/signup (see how to interact with these routes down below.).
If you try to reach any other route without being authenticated, the response will be "Access denied" (status 401).

### Sign up:

- Method: post 
- Route: /session/signup

You must send through __body__ the new user data. For example:
``` 
  {
    firstname: "someFirstname",                                              
    lastname: "someLastname",
    email: "someEmail@mail.com",
    password: "somePassword00",
    phone: "1100000000",
    pin: "000000"
  }
``` 
All the values must be of type string and verify the following restrictions:
- `firstname` and `lastname` must be non empty.
- `email` must be a valid email. 
- `password` must have at least 8 characters and contain at least one number.
- `phone` has no restrictions.
- `pin` must be exactly 6 characters long and contain only numbers.

The possible respnses are:
- "Sign up succeeded." (status 200).
- "Sign up failed: email not available." (status 400).
- "Sign up failed: invalid values." (status 400).
- An error in case something went wrong.

### Sign in (with email):

- Method: post 
- Route: /session/localSignin

You must send through __body__ the user credentials. For example:
``` 
  {
    email: "someEmail@mail.com",
    password: "somePassword00",
  }
``` 
All the values must be of type string.

The possible respnses are:
- "Sign in succeeded." (status 200).
- "Sign in failed: bad credentials." (status 401).
- An error in case something went wrong.
   
### Sign in (with Google):

- Method: get 
- Route: /session/googleSignin

You must send no data.

The possible respnses are:
- Redirection to client url. (status 200).
- "Sign in failed: bad credentials." (status 401).
- An error in case something went wrong.
   
### Sign out:

- Method: post 
- Route: /session/signout

You must send no data.

The only possible response is "Sign out succeeded." (status 200).

### Update user data:

- Method: put 
- Route: /user/updateData

You must send through __body__ the updated user data. For example:
``` 
  {
    firstname: "someNewFirstname",                                              
    lastname: "someNewLastname",
    email: "someNewEmail@mail.com",
    password: "someNewPassword00",
    phone: "1100000000",
    pin: "000000"
  }
``` 
All the values must be of type string and verify the following restrictions:
- `firstname` and `lastname` must be non empty.
- `email` must be a valid email. 
- `password` must contain at least 8 characters and contain at least one number.
- `phone` has no restrictions.
- `pin` must be exactly 6 characters long and contain only numbers.

If there are some fields that you don't want to update, just send the previous
values so they remain the same.

The possible respnses are:
- "User update succeeded." (status 200).
- "User update failed: invalid values." (status 400).
- An error in case something went wrong.

### Get user data:

- Method: get 
- Route: /user/getData

You must send no data.

The possible respnses are: 
- The user data stored in an object (status 200). For example:
``` 
  {
    firstname: "someFirstname",                                              
    lastname: "someLastname",
    email: "someEmail@mail.com",
    password: "somePassword00",
    phone: "1100000000",
    pin: "000000",
    contacts: [
      {
        name: "someContactName",
        ethereumPublicKey: "0x5E3476BE144120aee33cEE61082Bc24261B9CD28",
        stellarPublicKey: "0xCD2Bc2433ae82DCee33cEE61082Bc24261B9Cae1"
      },
      {
        name: "someOtherContactName",
        ethereumPublicKey: "0x429a92d23b33194edD3cEE61082Bc24261a203de",
        stellarPublicKey: "0x5E3476BE1233194edD3cEE61082Bc24261B9CD28"
      }
    ],
    publicKeys: {
      ethereum: "0x5E3476BE1233194edD3cEE61082Bc24261B9CD28"
      stellar: "0x5E3476BE1233194edD3cEE61082Bc24261B9CD28"
    }
  }
``` 
All the values will be of type string.
- An error in case something went wrong.

### Add a new contact:

- Method: post 
- Route: /user/addContact

You must send through __body__ the new contact data. For example:
``` 
  {
    name: "contactName",
    ethereumPublicKey: "0x5E3476BE144120aee33cEE61082Bc24261B9CD28",                                              
    stellarPublicKey: "0x5E3476BE1233194edD3cEE61082Bc24261B9CD28"
  }
``` 
All the values must be of type string.

The possible respnses are: 
- "Contact addition succeeded." (status 200).
- An error in case something went wrong.

### Purchase an Ethereum token:

- Method: post 
- Route: /operation/ethereum/purchase

You must send through __body__ the purchase parameters. For example:
``` 
  {
    currency: "USDT",
    amount: "200",                                              
    purchaseCurrency: "BTC"
  }
``` 
All the values must be of type string and verify the following restrictions:
- `currency` must be "USDT".
- `amount` must be any digit that you want. 
- `purchaseCurrency` must be "ETH".

The possible respnses are:
- "Ethereum purchase succeeded." (status 200).
- An error in case something went wrong.

### Purchase an Stellar token:

- Method: post 
- Route: /operation/stellar/purchase

You must send through __body__ the the purchase parameters. For example
``` 
  {
    currency: "USDT",
    amount: "200",                                              
    purchaseCurrency: "ETH"
  }
``` 
All the values must be of type string and verify the following restrictions:
- `currency` must be "USDT".
- `amount` must be any digit that you want. 
- `purchaseCurrency` can be any of the following values: "BTC", "ETH", "BNB", "SQL", "ADA", "XRP", "LUNA", "DOT", "AVAX",
  "DOGE", "SHIB", "MATIC", "LINK", "LTC", "ALGO", "XLM", "NEAR", "ATOM".

The possible respnses are:
- "Stellar purchase succeeded." (status 200).
- An error in case something went wrong.

### Get user operations record:

- Method: get 
- Route: /operation/record

You must send no data.

The possible respnses are: 
- The user operations record stored in an array of objects (status 200). For example:
``` 
  [ 
    {
      operationType: "purchase",
      blockchain: "ethereum",
      from: "0x5E3476BE1233194edD3cEE61082Bc24261B9CD28",
      to: "bank",
      currency: "USDT",
      amount: "200",
      purchasedCurrency: "ETH",
      purchasedAmount: "0.05"
    },
    {
      operationType: "purchase",
      blockchain: "stellar",
      from: "0x5E3476BE1233194edD3cEE61082Bc24261B9CD28",
      to: "bank",
      currency: "USDT",
      amount: "200",
      purchasedCurrency: "BTC",
      purchasedAmount: "0.005"

    },
    {
      operationType: "transaction",
      blockchain: "ethereum",
      from: "0x5E3476BE1233194edD3cEE61082Bc24261B9CD28",
      to: "0x1B9fb7381145895c5086c648Cd7bF31249158a95",
      currency: "ETH",
      amount: "0.05",
      purchasedCurrency: null,
      purchasedAmount: null
    },
    {
      operationType: "transaction",
      blockchain: "stellar",
      from: "0x5E3476BE1233194edD3cEE61082Bc24261B9CD28",
      to: "0x1B9fb7381145895c5086c648Cd7bF31249158a95",
      currency: "BTC",
      amount: "0.005",
      purchasedCurrency: null,
      purchasedAmount: null
    }
  ]
``` 
All the values will be of type string.
- An error in case something went wrong.

### Get user balance:

- Method: get 
- Route: /balance/data

You must send no data.

The possible respnses are: 
- An object containing the data from both blockchains, Ethereum and Stellar(status 200). For example:
``` 
  { 
    ethereum: {
      usd: "200",
      currencies: [
        {
          currency: "ETH",
          amount: "0.05"
        }
      ]
    },
    stellar: {
      usd: "600",
      currencies: [
        {
          currency: "BTC",
          amount: "0.005"
        },
        {
          currency: "BNB",
          amount: "1"
      ]
    },
  }
``` 
All the values will be of type string.
- An error in case something went wrong.
