import { ObjectId } from "mongodb";
import {conection} from "../db/conection.js"

export const getMicriobiologia = async(req,res)=> {
    try {
        const microbiologiaDB = (await conection()).Microbiologia;
        const microbiologia = await microbiologiaDB.find().toArray();
        res.json(microbiologia);
    } catch (error) {
      console.log(error);
    }
}

export const addMicriobiologia = async (req, res) => {
    try {
      const {
        Nombre_Laboratorio,
        Responsable,
        Inventario,
        Nombre,
        Marca,
        Funcion,
        Procedencia
      } = req.body;
      
      if (!Array.isArray(Inventario)) {
        return res.status(400).json({ error: "El inventario debe ser una lista." });
      }
  
      const Cantidad = Inventario.length;
  
      const db = await conection();
  
      const nuevaMicrobiologia = {
        Nombre_Laboratorio,
        Responsable,
        Inventario,
        Nombre,
        Cantidad,
        Marca,
        Funcion,
        Procedencia
      };
  
      await db.Microbiologia.insertOne(nuevaMicrobiologia);
  
      res.json(nuevaMicrobiologia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error al agregar la microbiologia" });
    }
  }
  
export const deleteMicriobiologia = async (req, res) => {
    try {
        const { id } = req.params;
        const microbiologiaId = new ObjectId(id);
        const microbiologiaDB = (await conection()).Microbiologia;
        const microbiologia = await microbiologiaDB.deleteOne({
        _id: microbiologiaId,
        });
        if (!microbiologia) {
        return res.status(404).json({ error: "microbiologia no encontrado" });
        }
        await microbiologiaDB.deleteOne(
        { _id: microbiologiaId }
        );
        res.json({ message: "Se ha elimenado el microbiologia", microbiologia });
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({ error: "Hubo un error al eliminar al microbiologia de la database" });
    }
};

export const updateMicriobiologia = async (req, res) => {
    try {
      const { id } = req.params;
      const microbiologiaId = new ObjectId(id);
      const microbiologiaDB = (await conection()).Microbiologia;
  
      const {
        Nombre_Laboratorio,
        Responsable,
        Inventario,
        Nombre,
        Marca,
        Funcion,
        Procedencia
      } = req.body;
  
      const microbiologia = await microbiologiaDB.findOne({
        _id: microbiologiaId,
      });
      if (!microbiologia) {
        return res.status(404).json({ error: "microbiologia no encontrado" });
      }

      if (!Array.isArray(Inventario)) {
        return res.status(400).json({ error: "El inventario debe ser una lista." });
      }

      const Cantidad = Inventario.length;
  
      await microbiologiaDB.updateOne(
        { _id: microbiologiaId },
        {
          $set: {
            Nombre_Laboratorio,
            Responsable,
            Inventario,
            Nombre,
            Cantidad,
            Marca,
            Funcion,
            Procedencia
          },
        }
      );
      res.json({ message: "Se ha Actualizado correctamente el microbiologia", microbiologia });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error al Actualizar al microbiologia" });
    }
  };