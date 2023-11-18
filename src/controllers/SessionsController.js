const SessionRepository = require("../repositories/SessionRepository")
const SessionService = require("../services/SessionService")

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body

    const sessionRepository = new SessionRepository();
    const sessionService = new SessionService(sessionRepository);

    const { token, user } = await sessionService.execute({ email, password })

    res.cookie("token", token, {
      httpOnly: true, // Segurança - cookie so pode ser acessado através de requisição http
      sameSite: "none",
      secure: true,
      maxAge: 15 * 60 * 1000
    })


    res.status(201).json({ token, user });
  }
}

module.exports = SessionsController;