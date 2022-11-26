CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT
);

CREATE TABLE user_tokens (
    token TEXT,
    userid INT,
    CONSTRAINT fkey_userid FOREIGN KEY(userid) REFERENCES users(id) ON DELETE CASCADE
);