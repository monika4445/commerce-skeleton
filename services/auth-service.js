const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../jwt/jwt-generate');
const {sendEmail} = require('../mailers/confirm-email');
require('dotenv').config();
const PORT = process.env.PORT;
const SECRET = process.env.JWT_SECRET;
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');

const db = new sqlite3.Database('./database.db');

class AuthService {
  static async registerUser(email, password, is_admin, cart_id, is_verified) {
    const existingUser =  db.get('SELECT email FROM users WHERE email = ?', email);

    if (existingUser.email) {
      throw new Error(`Email '${email}' is already registered`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
  
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO users (email, password, is_admin, cart_id, is_verified) VALUES ( ?, ?, ?, ?, ?)',
              [email, hashedPassword, is_admin, cart_id, is_verified],
              async function(err){
                    if (err) {
                      reject(err);
                    } else {

                      let token = generateAccessToken({email});
                      const link = `http://localhost:${PORT}/auth/verify/${token}`;
                      await sendEmail(email, link);

                      const lastInsertId = this.lastID;
                      db.get('SELECT * FROM users WHERE id = ?', [lastInsertId], async function(err, row) {
                        if (err) {
                          reject(err);
                        } else {
                          resolve(row);
                        }
                      });
       }});
     });

  }

static async login(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], async function(err, row){
      if (err) {
        reject(err);
      } else {
        const passwordMatch = await bcrypt.compare(password, row.password);

        if (email === row.email && passwordMatch) {
          const token = generateAccessToken({ email: row.email, is_admin: row.is_admin, is_verified: row.is_verified });
          resolve(token);
        } else {
          reject(new Error("Wrong credentials"));
        }
      }
    });
  });
}

static async verify(token){
  const decoded = jwt.verify(token, SECRET);
 
  return new Promise((resolve, reject) => {
    db.run('UPDATE users SET is_verified=1 WHERE email=?', [decoded.email], (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

}

module.exports = AuthService;
