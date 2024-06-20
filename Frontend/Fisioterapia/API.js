const url = "http://localhost:5000/fisioterapia/all";
const urlNuevo = "http://localhost:5000/fisioterapia/add";
const urlBorrar = "http://localhost:5000/fisioterapia/del";
const urlActualizar = "http://localhost:5000/fisioterapia/upd";


export const obtenerFisioterapia = async () => {
    try {
        const fisioterapia = await fetch(url);
        const datosFisioterapia = await fisioterapia.json();
        return datosFisioterapia;
    } catch (error) {
        console.log(error,"no sirve");
    }
};


export const nuevoFisioterapia = async (fisioterapia) => {
    try {
        await fetch(urlNuevo,{
            method: "POST",
            body:JSON.stringify(fisioterapia),
            headers:{'Content-Type':'application/json'}
        });
        window.location.href ="index.html"
    } catch (error) {
        console.log(error,"no sirve");
    }
};


export const deleteFisioterapia = async (_id) => {
  try {
        await fetch(`${urlBorrar}/${_id}`,{
            method:'DELETE'
        })
        window.location.href ="index.html"
    } catch (error) {
        console.log(error);
    }
};


export const editarFisioterapia = async (datos) => {
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


