const url = "http://localhost:5000/medicina/all";
const urlNuevo = "http://localhost:5000/medicina/add";
const urlBorrar = "http://localhost:5000/medicina/del";
const urlActualizar = "http://localhost:5000/medicina/upd";


export const obtenerMedicina = async () => {
    try {
        const medicina = await fetch(url);
        const datosMedicina = await medicina.json();
        return datosMedicina;
    } catch (error) {
        console.log(error,"no sirve");
    }
};


export const nuevoMedicina = async (medicina) => {
    try {
        await fetch(urlNuevo,{
            method: "POST",
            body:JSON.stringify(medicina),
            headers:{'Content-Type':'application/json'}
        });
        window.location.href ="index.html"
    } catch (error) {
        console.log(error,"no sirve");
    }
};


export const deleteMedicina = async (_id) => {
  try {
        await fetch(`${urlBorrar}/${_id}`,{
            method:'DELETE'
        })
        window.location.href ="index.html"
    } catch (error) {
        console.log(error);
    }
};


export const editarMedicina = async (datos) => {
    try {
        await fetch(`${urlActualizar}/${datos._id}`, {
            method: "PATCH",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(datos)
        }).then(response => response.json()).then(updatedDatos => {
            console.log('Datos actualizados:', updatedDatos);
        });
        window.location.href ="index.html"
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
};


