const url = "http://localhost:5000/nutricion/all";
const urlNuevo = "http://localhost:5000/nutricion/add";
const urlBorrar = "http://localhost:5000/nutricion/del";
const urlActualizar = "http://localhost:5000/nutricion/upd";


export const obtenerNutricion = async () => {
    try {
        const nutricion = await fetch(url);
        const datosNutricion = await nutricion.json();
        return datosNutricion;
    } catch (error) {
        console.log(error,"no sirve");
    }
};


export const nuevoNutricion = async (nutricion) => {
    try {
        await fetch(urlNuevo,{
            method: "POST",
            body:JSON.stringify(nutricion),
            headers:{'Content-Type':'application/json'}
        });
        window.location.href ="index.html"
    } catch (error) {
        console.log(error,"no sirve");
    }
};


export const deleteNutricion = async (_id) => {
  try {
        await fetch(`${urlBorrar}/${_id}`,{
            method:'DELETE'
        })
        window.location.href ="index.html"
    } catch (error) {
        console.log(error);
    }
};


export const editarNutricion = async (datos) => {
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


