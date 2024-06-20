import { ObjectId } from "mongodb";
import {conection} from "../db/conection.js"

export const getNutricion = async(req,res)=> {
    try {
        const nutricionDB = (await conection()).Nutricion;
        const nutricion = await nutricionDB.find().toArray();
        res.json(nutricion);
    } catch (error) {
      console.log(error);
    }
}

export const addNutricion = async (req, res) => {
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
  
      const nuevaNutricion = {
        Nombre_Laboratorio,
        Responsable,
        Inventario,
        Nombre,
        Cantidad,
        Marca,
        Funcion,
        Procedencia
      };
  
      await db.Nutricion.insertOne(nuevaNutricion);
  
      res.json(nuevaNutricion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error al agregar la nutricion" });
    }
  }
  
export const deleteNutricion = async (req, res) => {
    try {
        const { id } = req.params;
        const nutricionId = new ObjectId(id);
        const nutricionDB = (await conection()).Nutricion;
        const nutricion = await nutricionDB.deleteOne({
        _id: nutricionId,
        });
        if (!nutricion) {
        return res.status(404).json({ error: "nutricion no encontrado" });
        }
        await nutricionDB.deleteOne(
        { _id: nutricionId }
        );
        res.json({ message: "Se ha elimenado el nutricion", nutricion });
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({ error: "Hubo un error al eliminar al nutricion de la database" });
    }
};

export const updateNutricion = async (req, res) => {
    try {
      const { id } = req.params;
      const nutricionId = new ObjectId(id);
      const nutricionDB = (await conection()).Nutricion;
  
      const {
        Nombre_Laboratorio,
        Responsable,
        Inventario,
        Nombre,
        Marca,
        Funcion,
        Procedencia
      } = req.body;
  
      const nutricion = await nutricionDB.findOne({
        _id: nutricionId,
      });
      if (!nutricion) {
        return res.status(404).json({ error: "nutricion no encontrado" });
      }

      if (!Array.isArray(Inventario)) {
        return res.status(400).json({ error: "El inventario debe ser una lista." });
      }

      const Cantidad = Inventario.length;
  
      await nutricionDB.updateOne(
        { _id: nutricionId },
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
      res.json({ message: "Se ha Actualizado correctamente el nutricion", nutricion });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error al Actualizar al nutricion" });
    }
  };