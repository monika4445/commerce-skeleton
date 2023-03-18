const MainService = require('../services/main-service');

class MainController {
  static async home(req, res) {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      const message = await MainService.home(token);

      res.send(message);
    } catch (error) {
      console.log(error);
      res.status(401).send("Error. Not verified");
    }
  }

}

module.exports = MainController;
