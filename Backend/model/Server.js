import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import fisioterapiaRoutes from "../routes/fisioterapia.routes.js";
import enfermeriaRoutes from "../routes/enfermeria.routes.js";
import medicinaRoutes from "../routes/medicina.routes.js";
import microbiologiaRoutes from "../routes/microbiologia.routes.js";
import nutricionRoutes from "../routes/nutricion.routes.js";

dotenv.config()

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes(){
        this.app.use("/fisioterapia",fisioterapiaRoutes);
        this.app.use("/enfermeria",enfermeriaRoutes);
        this.app.use("/medicina",medicinaRoutes);
        this.app.use("/microbiologia",microbiologiaRoutes);
        this.app.use("/nutricion",nutricionRoutes);
    }

    listener(){
        this.app.listen(this.port,()=>{
            console.log(`Server running in port ${this.port}`);
        })
    }
}



export default Server;