import { Router } from 'express';
import ProductManager from "../dao/managers/productManagerMongo.js"

const pm = new ProductManager()

const router = Router()

const publicAcces = (req,res,next) =>{
    if(req.session.username) return res.redirect('/profile');
    next();
}

const privateAcces = (req,res,next)=>{
    if(!req.session.username) return res.redirect('/login');
    next();
}

router.get("/", async (req, res) => {
    res.render('login', {
        style: 'styles.css'
    })

})

router.get("/products", async (req, res) => {
    console.log(req.session)
    const listadeproductos = await pm.getProductsView()
    res.render("products", { listadeproductos, style: 'styles.css' })
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts", {style: 'styles.css'})
})

router.get("/chat", (req, res) => {
    res.render("chat",{style:'chat.css'})
})

router.get("/register", publicAcces, (req,res)=>{
    res.render("register",{style: 'styles.css'})
})

router.get("/login", publicAcces, (req,res)=>{
    res.render("login",{style: 'styles.css'})
})

router.get("/profile", privateAcces ,(req,res)=>{
    res.render("profile",{user: req.session.user, style: 'styles.css'})
})

export default router