import { ObjectId } from "mongodb";
import {conection} from "../db/conection.js"

export const getFisioterapia = async(req,res)=> {
    try {
        const fisioterapiaDB = (await conection()).Fisioterapia;
        const fisioterapia = await fisioterapiaDB.find().toArray();
        res.json(fisioterapia);
      } catch (error) {
        console.log(error);
      }
}

export const addFisioterapia = async (req, res) => {
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
  
      const nuevaFisioterapia = {
        Nombre_Laboratorio,
        Responsable,
        Inventario,
        Nombre,
        Cantidad,
        Marca,
        Funcion,
        Procedencia
      };
  
      await db.Fisioterapia.insertOne(nuevaFisioterapia);
  
      res.json(nuevaFisioterapia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error al agregar la fisioterapia" });
    }
  }
  
export const deleteFisioterapia = async (req, res) => {
    try {
        const { id } = req.params;
        const fisioterapiaId = new ObjectId(id);
        const fisioterapiaDB = (await conection()).Fisioterapia;
        const fisioterapia = await fisioterapiaDB.deleteOne({
        _id: fisioterapiaId,
        });
        if (!fisioterapia) {
        return res.status(404).json({ error: "fisioterapia no encontrado" });
        }
        await fisioterapiaDB.deleteOne(
        { _id: fisioterapiaId }
        );
        res.json({ message: "Se ha elimenado el fisioterapia", fisioterapia });
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({ error: "Hubo un error al eliminar al fisioterapia de la database" });
    }
};

export const updateFisioterapia = async (req, res) => {
    try {
      const { id } = req.params;
      const fisioterapiaId = new ObjectId(id);
      const fisioterapiaDB = (await conection()).Fisioterapia;
  
      const {
        Nombre_Laboratorio,
        Responsable,
        Inventario,
        Nombre,
        Marca,
        Funcion,
        Procedencia
      } = req.body;
  
      const fisioterapia = await fisioterapiaDB.findOne({
        _id: fisioterapiaId,
      });
      if (!fisioterapia) {
        return res.status(404).json({ error: "fisioterapia no encontrado" });
      }

      if (!Array.isArray(Inventario)) {
        return res.status(400).json({ error: "El inventario debe ser una lista." });
      }

      const Cantidad = Inventario.length;
  
      await fisioterapiaDB.updateOne(
        { _id: fisioterapiaId },
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
      res.json({ message: "Se ha Actualizado correctamente el empleado", fisioterapia });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error al Actualizar al empleado" });
    }
  };