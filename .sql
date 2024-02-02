CREATE TABLE IF NOT EXISTS fb_users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  bio VARCHAR(500),
  auth_id TEXT NOT NULL
)

CREATE TABLE IF NOT EXISTS fb_categories(
  id SERIAL PRIMARY KEY,
  category VARCHAR(255) NOT NULL
)

CREATE TABLE IF NOT EXISTS fb_comments(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES fb_users(id),
  name VARCHAR(255) NOT NULL,
  message VARCHAR(500) NOT NULL,
  category_id INTEGER REFERENCES fb_categories(id)
)

CREATE TABLE IF NOT EXISTS fb_commentlikes(
  id SERIAL PRIMARY KEY,
  comment_id INTEGER NOT NULL REFERENCES fb_comments(id),
  user_id INTEGER NOT NULL
)

CREATE TABLE IF NOT EXISTS fb_replies(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  reply VARCHAR(500) NOT NULL,
  comment_id INTEGER REFERENCES fb_comments(id)
)

CREATE TABLE IF NOT EXISTS fb_replylikes(
  id SERIAL PRIMARY KEY,
  reply_id INTEGER NOT NULL REFERENCES fb_replies(id),
  user_id INTEGER NOT NULL
)

CREATE TABLE IF NOT EXISTS fb_followers(
  id SERIAL PRIMARY KEY,
  followee_id INTEGER NOT NULL REFERENCES fb_users(id),
  follower_id INTEGER NOT NULL
)

INSERT INTO fb_categories(category) VALUES
('Social Networking'),
('Microblogging'),
('Professional Networking'),
('Media Sharing'),
('Discussion Forums'),
('Review and Opinion'),
('Bookmarking and Content Discovery'),
('Blogging'),
('Live Streaming'),
('Dating Apps')

INSERT INTO fb_comments(user_id, name, message, category_id) VALUES(
    1, 'admin', 'This is just a test Post... sry', 1
)

INSERT INTO fb_replies(name, reply, comment_id) VALUES ('admin', 'This is just a Test reply... sry :(', 2)