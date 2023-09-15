import { Router } from 'express';
import { usersManager } from '../dao/managers/UserManagerMongo.js';
import { compareData, hashData } from '../utils.js';
import passport from 'passport';
const router = Router()


router.get('/'), async (req, res) => {
    res.redirect('/register');
}

router.post('/register', async (req, res) => {
    const { first_name, last_name, username, email, age, password } = req.body;
    if (!first_name || !last_name || !username || !email || !age || !password) {
        return res.status(400).json({ message: "Faltan datos" })
    }
    const userDB = await usersManager.findUser(username)
    if (userDB) {
        return res.status(400).json({ message: "El usuario ya esta registrado" })
    }
    const hashPassword = await hashData(password)
    const newUser = await usersManager.createUser({ ...req.body, password:hashPassword })
    res.status(200).json({ message: "Usuario creado", user: newUser })
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Faltan datos" })
    }
    const userDB = await usersManager.findUser(username)
    if (!userDB) {
        return res.status(400).json({ message: 'Registrate primero' })
    }
    const passwordIncorrect = await compareData(password, userDB.password)
    if (!passwordIncorrect) {
        return res.status(401).json({ message: 'El usuario o la contraseña no son correctas' })
    }
    req.session['username'] = username
    res.status(200).json({ message: 'Session created', user: userDB })
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "No pudo cerrar sesion" })
        res.redirect('/login');
    })
})

router.get(
    "/githubSignup",
    passport.authenticate("github", { scope: ["user:email"] })
);


router.get(
    "/github",
    passport.authenticate("github", {
      failureRedirect: "/register",
      successRedirect: "/products",
}))



export default router