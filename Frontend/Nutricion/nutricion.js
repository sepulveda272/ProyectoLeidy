import { obtenerNutricion, nuevoNutricion, deleteNutricion, editarNutricion } from "./API.js";

document.addEventListener("DOMContentLoaded", () => {
  mostrarLista();

  const searchInput = document.querySelector("#search-input");
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    mostrarLista(searchTerm);
  });

  document.getElementById("downloadExcel").addEventListener("click", exportTableToExcel);
});

function exportTableToExcel() {
  const table = document.querySelector(".tabla-desktop");
  const workbook = XLSX.utils.table_to_book(table, {sheet: "Sheet1"});
  XLSX.writeFile(workbook, "tabla_nutricion.xlsx");
}


/* LISTAR CATEGORIAS - CRUD (R) */
async function mostrarLista(searchTerm = "") {
  const datos = await obtenerNutricion();
  const tbody = document.querySelector("#table-body");
  const errorMessage = document.querySelector("#error-message");
  const table = document.querySelector(".tabla-desktop");
  tbody.innerHTML = "";

  if (Array.isArray(datos)) {
    const filteredDatos = datos.filter(item => 
      item.Nombre_Laboratorio.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredDatos1 = datos.filter(item => 
      item.Marca.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredDatos2 = datos.filter(item => 
      item.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredDatos3 = datos.filter(item => 
      item.Responsable.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const combinedFilteredDatos = [...new Set([...filteredDatos, ...filteredDatos1, ...filteredDatos2, ...filteredDatos3])];

    if (combinedFilteredDatos.length === 0) {
      errorMessage.textContent = "No se encuentra lo que busca, verifica bien.";
      errorMessage.style.display = "block";
      table.style.display = "none";
    } else {
      errorMessage.style.display = "none";
      table.style.display = "table";

      let totalCantidad = 0

      combinedFilteredDatos.forEach((item, index) => {
        const {
          Nombre_Laboratorio,
          Responsable,
          Inventario,
          Nombre,
          Cantidad,
          Marca,
          Funcion,
          Procedencia,
          _id,
        } = item;

        totalCantidad += Number(Cantidad) || 0;

        tbody.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${Nombre_Laboratorio}</td>
            <td>${Responsable}</td>
            <td>${Inventario.join(", ")}</td>
            <td>${Nombre}</td>
            <td>${Cantidad}</td>
            <td>${Marca}</td>
            <td>${Funcion}</td>
            <td>${Procedencia}</td>
            <td>-</td>
            <td>-</td>
            <td><button type="click" class="btn btn-danger eliminar" data-id="${_id}">Eliminar</button></td>
            <td><button type="click" class="btn btn-success update" data-id="${_id}" data-bs-toggle="modal" data-bs-target="#modalUpdate">Editar</button></td>
          </tr>
        `;
      });

      document.querySelector("#total-cantidad").textContent = totalCantidad

    }
  } else {
    console.error("Datos no son un arreglo:", datos);
  }
}


/* INGRESAR NUEVA CATEGORIA - CRUD (C) */
const formulario = document.querySelector("#formDatos");
formulario.addEventListener("submit", validarNutricion);

function validarNutricion(e) {
  e.preventDefault();
  const Nombre_Laboratorio = document.querySelector("#Nombre_Laboratorio").value;
  const Responsable = document.querySelector("#Responsable").value;
  const Inventario = document.querySelector("#Inventario").value.split(",").map((item) => item.trim());
  const Nombre = document.querySelector("#Nombre").value;
  const Marca = document.querySelector("#Marca").value;
  const Funcion = document.querySelector("#Funcion").value;
  const Procedencia = document.querySelector("#Procedencia").value;

  const enfermeria = {
    Nombre_Laboratorio,
    Responsable,
    Inventario,
    Nombre,
    Marca,
    Funcion,
    Procedencia,
  };

  if (validate(enfermeria)) {
    alert("Todos los campos son obligatorios");
    return;
  }

  nuevoNutricion(enfermeria).then(() => mostrarLista()); // Actualizar la lista después de agregar
}

/* ELIMINAR CATEGORIA - CRUD (D) */
document.querySelector("#table-body").addEventListener("click", borrar);

function borrar(e) {
  if (e.target.closest(".eliminar")) {
    const button = e.target.closest(".eliminar");
    const idEnfermeria = button.getAttribute("data-id");
    const confir = confirm("¿Desea eliminar esta Enfermeria?");
    if (confir) {
      deleteNutricion(idEnfermeria).then(() => mostrarLista()); // Actualizar la lista después de eliminar
    }
  }
}

/* ACTUALIZAR CATEGORIA - CRUD (U) */
document.querySelector("#table-body").addEventListener("click", actualizar);

function actualizar(e) {
  if (e.target.closest(".update")) {
    const button = e.target.closest(".update");
    const idActualizar = button.getAttribute("data-id");

    // Llenar el formulario con los datos existentes
    const datosExistentes = obtenerNutricion().then(datos => {
      const datosNutricion = datos.find(item => item._id === idActualizar);
      document.querySelector("#Nombre_Laboratorio_Edit").value = datosNutricion.Nombre_Laboratorio;
      document.querySelector("#Responsable_Edit").value = datosNutricion.Responsable;
      document.querySelector("#Inventario_Edit").value = datosNutricion.Inventario.join(", ");
      document.querySelector("#Nombre_Edit").value = datosNutricion.Nombre;
      document.querySelector("#Marca_Edit").value = datosNutricion.Marca;
      document.querySelector("#Funcion_Edit").value = datosNutricion.Funcion;
      document.querySelector("#Procedencia_Edit").value = datosNutricion.Procedencia;
    });

    const formEditNutricion = document.querySelector("#formEditNutricion");
    formEditNutricion.addEventListener("submit", (event) => {
      event.preventDefault();
      const Nombre_Laboratorio = document.querySelector("#Nombre_Laboratorio_Edit").value;
      const Responsable = document.querySelector("#Responsable_Edit").value;
      const Inventario = document.querySelector("#Inventario_Edit").value.split(",").map(item => item.trim());
      const Nombre = document.querySelector("#Nombre_Edit").value;
      const Marca = document.querySelector("#Marca_Edit").value;
      const Funcion = document.querySelector("#Funcion_Edit").value;
      const Procedencia = document.querySelector("#Procedencia_Edit").value;

      const datos = {
        _id: idActualizar,
        Nombre_Laboratorio,
        Responsable,
        Inventario,
        Nombre,
        Marca,
        Funcion,
        Procedencia
      };

      editarNutricion(datos).then(() => mostrarLista());
    }, { once: true });
  }
}

function validate(objeto) {
  return !Object.values(objeto).every((element) => element !== "");
}
