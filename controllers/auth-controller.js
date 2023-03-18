const AuthService = require('../services/auth-service');

class AuthController {
  static async register(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password; 
      const is_admin  = req.body.is_admin || 0;
      const cart_id = req.body.cart_id || 0;
      const is_verified = req.body.is_verified || 0;
    
      if (!email || !password) {
        throw new Error('Missing required fields');
      }

      const user = await AuthService.registerUser(email, password, is_admin, cart_id, is_verified);
      res.status(201).json({
        message: "User registered successfully",
        user
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "Error registering user" });
    }
  }

static async login(req, res) {
  const { email, password } = req.body;

  try {
    const token = await AuthService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: "Error logging in" });
  }
}

static async verify(req, res){
  const token = req.params.token;
  try {
    await AuthService.verify(token);
    res.send('Verified');
  } catch (err) {
    res.status(500).send('Error verifying token');
  }
}

}

module.exports = AuthController;
