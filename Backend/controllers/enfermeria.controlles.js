import { ObjectId } from "mongodb";
import {conection} from "../db/conection.js"

export const getEnfermeria = async(req,res)=> {
    try {
        const enfermeriaDB = (await conection()).Enfermeria;
        const enfermeria = await enfermeriaDB.find().toArray();
        res.json(enfermeria);
    } catch (error) {
      console.log(error);
    }
}

export const addEnfermeria = async (req, res) => {
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
  
      const nuevaEnfermeria = {
        Nombre_Laboratorio,
        Responsable,
        Inventario,
        Nombre,
        Cantidad,
        Marca,
        Funcion,
        Procedencia
      };
  
      await db.Enfermeria.insertOne(nuevaEnfermeria);
  
      res.json(nuevaEnfermeria);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error al agregar la enfermeria" });
    }
  }
  
export const deleteEnfermeria = async (req, res) => {
    try {
        const { id } = req.params;
        const enfermeriaId = new ObjectId(id);
        const enfermeriaDB = (await conection()).Enfermeria;
        const enfermeria = await enfermeriaDB.deleteOne({
        _id: enfermeriaId,
        });
        if (!enfermeria) {
        return res.status(404).json({ error: "enfermeria no encontrado" });
        }
        await enfermeriaDB.deleteOne(
        { _id: enfermeriaId }
        );
        res.json({ message: "Se ha elimenado el enfermeria", enfermeria });
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({ error: "Hubo un error al eliminar al enfermeria de la database" });
    }
};

export const updateEnfermeria = async (req, res) => {
    try {
      const { id } = req.params;
      const enfermeriaId = new ObjectId(id);
      const enfermeriaDB = (await conection()).Enfermeria;
  
      const {
        Nombre_Laboratorio,
        Responsable,
        Inventario,
        Nombre,
        Marca,
        Funcion,
        Procedencia
      } = req.body;
  
      const enfermeria = await enfermeriaDB.findOne({
        _id: enfermeriaId,
      });
      if (!enfermeria) {
        return res.status(404).json({ error: "enfermeria no encontrado" });
      }

      if (!Array.isArray(Inventario)) {
        return res.status(400).json({ error: "El inventario debe ser una lista." });
      }

      const Cantidad = Inventario.length;
  
      await enfermeriaDB.updateOne(
        { _id: enfermeriaId },
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
      res.json({ message: "Se ha Actualizado correctamente el enfermeria", enfermeria });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error al Actualizar al enfermeria" });
    }
  };