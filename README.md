The error codes are as follows:

0. Successful query.
1. The operating mode was not specified.
2. The operating mode specified was not valid.

# Required fields for posts table

```
id - integer - auto inc
title - varchar
link - link to article - varchar
redditLink - link to reddit post - varchar
isOnion - boolean
```

Creation for this table:

```SQL
CREATE TABLE `posts` (
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(512),
    link VARCHAR(512),
    redditLink VARCHAR(512),
    isOnion BOOLEAN,
    PRIMARY KEY(id)
);
```

# Required fields for the users table

This table will secure the admin area of this application and will allow the user to login with their credentials.

fields needed:

```
id - integer - auto inc
username - varchar(30) - unique
salt - varchar(10)
hash - varchar(512)
last_login - bigInteger
```

Creation for this table:

```SQL
CREATE TABLE `users` (
    id INTEGER AUTO_INCREMENT,
    username VARCHAR(30) UNIQUE,
    salt VARCHAR(10),
    passhash VARCHAR(512),
    last_login BIGINT,
    PRIMARY KEY(id)
);
```

# Required fields for the login_tokens table

This table will store the token for each user's current login token. It will allow the application to verify that the user is logged in with a currently valid token.

Required fields:

```
id - integer - auto_increment
userid - integer - references users(id)
token - varchar(256)
```

Creating the table:

```SQL
CREATE TABLE login_tokens (
    id INTEGER AUTO_INCREMENT,
    userid INTEGER REFERENCES users(id),
    token VARCHAR(256),
    PRIMARY KEY(id)
);
```