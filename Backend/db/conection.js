import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI;
const nombreDB = process.env.BDKEY;
const client = new MongoClient(url);
const conection = async () =>{
    try {
        await client.connect();
        const db = client.db(nombreDB);
        const colections = {
            Fisioterapia: db.collection("Fisioterapia"),
            Enfermeria: db.collection("Enfermeria"),
            Medicina: db.collection("Medicina"),
            Nutricion: db.collection("Nutricion"),
            Microbiologia: db.collection("Microbiologia")
        };
        console.log("Coneccion Exitosa");
        return colections;
    } catch (error) {
        console.log(error);
        throw new Error("Paila no se pudo conectar a la db")
    }
}

export {conection, client}