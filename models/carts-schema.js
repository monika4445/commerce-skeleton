const sqlQuery = (`
CREATE TABLE IF NOT EXISTS carts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE)   
`);

function createCarts(my_database){
    my_database.run(sqlQuery)
}

module.exports = {createCarts};