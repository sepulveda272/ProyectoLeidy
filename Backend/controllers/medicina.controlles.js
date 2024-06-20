import { ObjectId } from "mongodb";
import {conection} from "../db/conection.js"

export const getMedicina = async(req,res)=> {
    try {
        const medicinaDB = (await conection()).Medicina;
        const medicina = await medicinaDB.find().toArray();
        res.json(medicina);
    } catch (error) {
    console.log(error);
    }
}

export const addMedicina = async (req, res) => {
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
  
      const nuevaMedicina = {
        Nombre_Laboratorio,
        Responsable,
        Inventario,
        Nombre,
        Cantidad,
        Marca,
        Funcion,
        Procedencia
      };
  
      await db.Medicina.insertOne(nuevaMedicina);
  
      res.json(nuevaMedicina);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error al agregar la medicina" });
    }
  }
  
export const deleteMedicina = async (req, res) => {
    try {
        const { id } = req.params;
        const medicinaId = new ObjectId(id);
        const medicinaDB = (await conection()).Medicina;
        const medicina = await medicinaDB.deleteOne({
        _id: medicinaId,
        });
        if (!medicina) {
        return res.status(404).json({ error: "medicina no encontrado" });
        }
        await medicinaDB.deleteOne(
        { _id: medicinaId }
        );
        res.json({ message: "Se ha elimenado el medicina", medicina });
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({ error: "Hubo un error al eliminar al medicina de la database" });
    }
};

export const updateMedicina = async (req, res) => {
    try {
      const { id } = req.params;
      const medicinaId = new ObjectId(id);
      const medicinaDB = (await conection()).Medicina;
  
      const {
        Nombre_Laboratorio,
        Responsable,
        Inventario,
        Nombre,
        Marca,
        Funcion,
        Procedencia
      } = req.body;
  
      const medicina = await medicinaDB.findOne({
        _id: medicinaId,
      });
      if (!medicina) {
        return res.status(404).json({ error: "medicina no encontrado" });
      }

      if (!Array.isArray(Inventario)) {
        return res.status(400).json({ error: "El inventario debe ser una lista." });
      }

      const Cantidad = Inventario.length;
  
      await medicinaDB.updateOne(
        { _id: medicinaId },
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
      res.json({ message: "Se ha Actualizado correctamente el medicina", medicina });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error al Actualizar al medicina" });
    }
  };