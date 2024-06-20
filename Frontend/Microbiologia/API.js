const url = "http://localhost:5000/microbiologia/all";
const urlNuevo = "http://localhost:5000/microbiologia/add";
const urlBorrar = "http://localhost:5000/microbiologia/del";
const urlActualizar = "http://localhost:5000/microbiologia/upd";


export const obtenerMicrobiologia = async () => {
    try {
        const microbiologia = await fetch(url);
        const datosMricrobiologia = await microbiologia.json();
        return datosMricrobiologia;
    } catch (error) {
        console.log(error,"no sirve");
    }
};


export const nuevoMicrobiologia = async (microbiologia) => {
    try {
        await fetch(urlNuevo,{
            method: "POST",
            body:JSON.stringify(microbiologia),
            headers:{'Content-Type':'application/json'}
        });
        window.location.href ="index.html"
    } catch (error) {
        console.log(error,"no sirve");
    }
};


export const deleteMicrobiologia = async (_id) => {
  try {
        await fetch(`${urlBorrar}/${_id}`,{
            method:'DELETE'
        })
        window.location.href ="index.html"
    } catch (error) {
        console.log(error);
    }
};


export const editarMicrobiologia = async (datos) => {
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


