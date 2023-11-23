const SessionRepository = require("../repositories/SessionRepository")
const SessionService = require("../services/SessionService")
const { sign } = require("jsonwebtoken");
const authConfig = require("../configs/auth");

class SessionsController {
  async createSession(req, res) {
    const { email, password } = req.body

    const sessionRepository = new SessionRepository();
    const sessionService = new SessionService(sessionRepository);

    const user = await sessionService.execute({ email, password })
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn
    });

    res.cookie("token", token, {
      httpOnly: true, // Segurança - cookie so pode ser acessado através de requisição http
      sameSite: "none",
      secure: true,
      maxAge: 15 * 60 * 1000
    })

    res.status(201).json({ user })
  }
}

module.exports = SessionsController;