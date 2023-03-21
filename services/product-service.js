const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

class ProductService {
  static async getAllProducts() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async getProductById(id){
    if (!id) {
      res.status(400).send('Please provide the "id" parameter.');
      return;
    }
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM products WHERE id=${id}`, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async createProduct(name, description, price, image){

    return new Promise((resolve, reject) => {
       db.run('INSERT INTO products(name, description, price, image) VALUES (?, ?, ?, ?)', [name, description, price, image],
       async function(err){
        if (err) {
          reject(err);
        } else {

          const lastInsertId = this.lastID;
          db.get('SELECT * FROM products WHERE id = ?', [lastInsertId], async function(err, row) {
            if (err) {
              reject(err);
            } else {
              resolve(row);
            }
          });

        }});
      })

      
  }

  static async deleteProductById(id){ 
    if (!id) {
        res.status(400).send('Please provide the "id" parameter.');
        return;
      }
      return new Promise((resolve, reject) => {
    db.run(
    'DELETE FROM products WHERE id = ?',
    [id],
    async function(err){
      if (err) {
        reject(err);
      } else {
        db.all('SELECT * FROM products', (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });      }}
  );

    });
}

static async updateProductById(id, name, description, price, image){
  if (!id) {
    res.status(400).send('Please provide the "id" parameter.');
    return;
  }
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?',
      [name, description, price, image, id],
      function(err){
        if (err) {
          reject(err);
        } else {
          db.get('SELECT * FROM products WHERE id = ?', [id], function(err, row) {
            if (err) {
              reject(err);
            } else {
              resolve(row);
            }
          });
        }
      }
    );
  });
}

static async partialUpdateProductById(id, updates){
  if (!id) {
    res.status(400).send('Please provide the "id" parameter.');
    return;
  }
  const setValues = Object.keys(updates).map(update => `${update} = ?`).join(', ');
  const values = Object.values(updates);

  return new Promise((resolve, reject) => {
    db.run(`UPDATE products SET ${setValues} WHERE id = ?`, [...values, id], function(err){
      if (err) {
        reject(err);
      } else {
        db.get('SELECT * FROM products WHERE id = ?', [id], function(err, row) {
          if (err) {
            reject(err);
          } else {
            const updatedProduct = { id: row.id, ...row, ...updates };
            resolve(updatedProduct);
          }
        });
      }
    });
  });
}

}

module.exports = ProductService;
