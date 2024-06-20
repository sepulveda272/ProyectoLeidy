const url = "http://localhost:5000/enfermeria/all";
const urlNuevo = "http://localhost:5000/enfermeria/add";
const urlBorrar = "http://localhost:5000/enfermeria/del";
const urlActualizar = "http://localhost:5000/enfermeria/upd";


export const obtenerEnfermeria = async () => {
    try {
        const enfermeria = await fetch(url);
        const datosEnfermeria = await enfermeria.json();
        return datosEnfermeria;
    } catch (error) {
        console.log(error,"no sirve");
    }
};


export const nuevoEnfermeria = async (enfermeria) => {
    try {
        await fetch(urlNuevo,{
            method: "POST",
            body:JSON.stringify(enfermeria),
            headers:{'Content-Type':'application/json'}
        });
        window.location.href ="index.html"
    } catch (error) {
        console.log(error,"no sirve");
    }
};


export const deleteEnfermeria = async (_id) => {
  try {
        await fetch(`${urlBorrar}/${_id}`,{
            method:'DELETE'
        })
        window.location.href ="index.html"
    } catch (error) {
        console.log(error);
    }
};


export const editarEnfermeria = async (datos) => {
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


