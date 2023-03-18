const sqlQuery = (`
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    is_admin INTEGER DEFAULT 0,
    is_verified INTEGER DEFAULT 0,
    cart_id INTEGER,
    FOREIGN KEY (cart_id) REFERENCES carts (id))
    `);
  
function createUsers(my_database){
    my_database.run(sqlQuery)
}

module.exports = {createUsers};