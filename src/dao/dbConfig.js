import mongoose from "mongoose"

const URI = "mongodb+srv://ecommerce:1am1ntAPIj2ZOFzs@cluster0.z7vh8gz.mongodb.net/ecommerce?retryWrites=true&w=majority"


mongoose.connect(URI)
    .then(() => console.log("Conexion a base de datos exitosa"))
    .catch(error => console.log(error))