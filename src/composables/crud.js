import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast';


export function useRestApi() 
{
  const toast = useToast();
  const datos = ref(null);
  const datosIngestas = ref(null);
  const ingestasEmpresa = ref(null);
  const datosId = ref([]);
  const datosMarcaciones = ref([]);
  const datosReporteMarcaciones = ref([]);
  const datos_ventas = ref(null)
  const datosAgendamiento = ref([]);

  
  
  const datosIdAuxiliar = ref([]);
  const error = ref(null)

  async function obtenerRegistros(url) 
  {
    try {
      const response = await axios.get(`${url}/obtener-registros`)
      datos.value = response.data;
    } catch (e) {
      error.value = e
      toast.add({ severity: 'error', summary: error.value, detail: error, life: 4000 });

    } 
  }
  async function obtenerIngestasEmpresa(url,empId) 
  {
    try {
     
      const response = await axios.get(`${url}/obtener-ingestas-empresa/${empId}`)
      ingestasEmpresa.value = response.data.data;
    } catch (e) {
      error.value = e
      toast.add({ severity: 'error', summary: error.value, detail: error, life: 4000 });

    } 
  }

  async function obtenerRegistrosVentas(url,fecha) 
  {
    try {
      const response = await axios.get(`${url}/obtener-registros/${fecha}`)
      datos_ventas.value = response.data;
    } catch (e) {
      error.value = e
      toast.add({ severity: 'error', summary: error.value, detail: error, life: 4000 });

    } 
  }
  async function obtenerRegistrosVenta(url,fecha) 
  {
    try {
      const response = await axios.get(`${url}/obtener-registros/${fecha}`)
      datos.value = response.data.data;
    } catch (e) {
      error.value = e
      toast.add({ severity: 'error', summary: error.value, detail: error, life: 4000 });

    } 
  }
  async function obtenerTipoIngestas(url) 
  {
    try {
      const response = await axios.get(`${url}/obtener-tipo-ingestas`)
      datosIngestas.value = response.data;
    } catch (e) {
      error.value = e
      toast.add({ severity: 'error', summary: error.value, detail: error, life: 4000 });

    } 
  }
  async function obtenerRegistrosporId(url,id) 
  {
    try {
      const response = await axios.get(`${url}/obtener-registros/${id}`)
      datosId.value = response.data;
  
    } catch (e) {
      error.value = e
      toast.add({ severity: 'error', summary: error.value, detail: error, life: 4000 });

    } 
  }
  async function cambiarEstadoAgendamiento(url,id) 
  {
    try {
      const response = await axios.get(`${url}/cambiar-estado-agendamiento/${id}`)
      datosId.value = response.data;
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Dato almacenado correctamente', life: 3000 });

  
    } catch (e) {
      error.value = e
      toast.add({ severity: 'error', summary: error.value, detail: error, life: 4000 });

    } 
  }


  
  async function obtenerRegistrosMarcaciones(url,data) 


  {
    console.log(data);
    try {
      const response = await axios.post(`${url}/obtener-registro-marcaciones`,data)
      datosMarcaciones.value = response.data;
  
    } catch (e) {
      error.value = e
      toast.add({ severity: 'error', summary: error.value, detail: error, life: 4000 });

    } 
  }

  async function calcularMarcaciones(url,data) 

  {
    try {
      const response = await axios.post(`${url}/calcular-marcaciones`,data)
      datosReporteMarcaciones.value = response.data;
  
    } catch (e) {
      error.value = e
      toast.add({ severity: 'error', summary: error.value, detail: error, life: 4000 });

    } 
  }

  async function obtenerRegistrosAgendamiento(url,data) 


  {
    try {
      const response = await axios.post(`${url}/obtener-registro-agendamiento`,data)
      datosAgendamiento.value = response.data;
  
    } catch (e) {
      error.value = e
      toast.add({ severity: 'error', summary: error.value, detail: error, life: 4000 });

    } 
  }


  async function guardarRegistro(url,data) 
  {
    try {
      const response = await axios.post(`${url}/guardar-registro`,data)
      if (response.status == 200) {
        toast.add({ severity: 'success', summary: 'Éxito', detail: response.msj, life: 3000 });

    } else { 
  
      toast.add({ severity: 'error', summary: 'Error', detail: response.msj, life: 3000 });
  
  }
    } catch (error) {
     
    }
  }

  async function guardarDetalleVenta(url,data) 
  {
    try {
      const response = await axios.post(`${url}/guardar-detalle-venta`,data)
      if (response.status == 200) {
        toast.add({ severity: 'success', summary: 'Éxito', detail: response.msj, life: 3000 });

    } else { 
  
      toast.add({ severity: 'error', summary: 'Error', detail: response.msj, life: 3000 });
  
  }
    } catch (error) {
     
    }
  }

  async function guardarRegistroEntrada(url,data) 
  {
    try {
      const response = await axios.post(`${url}/guardar-registro-entrada`,data)
      if (response.status == 200) {
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Dato almacenado correctamente', life: 3000 });

    }

    } catch (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Dato ya existente', life: 3000 });
       
    } 
  }

  async function guardarRegistroSalida(url,data) 
  {
    try {
      const response = await axios.post(`${url}/guardar-registro-salida`,data)
      if (response.status == 200) {
     
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Dato almacenado correctamente', life: 3000 });
 
      } else { 
  
      toast.add({ severity: 'error', summary: 'Error', detail: response.msj, life: 3000 });
  
  }
    } catch (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Dato ya existente', life: 3000 });
 
    }
  }

  async function GuardarMarcacion(url,data) 
  {
    try {
      const response = await axios.post(`${url}/guardar-marcacion`,data)
      if (response.status == 200) {
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Dato almacenado correctamente', life: 3000 });

    } else { 
  
      toast.add({ severity: 'error', summary: 'Error', detail: response.msj, life: 3000 });
  
  }
    } catch (error) {
     
    }
  }
  async function GuardarMarcacionSalida(url,data) 
  {
    try {
      const response = await axios.post(`${url}/guardar-marcacion-salida`,data)
      if (response.status == 200) {
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Dato almacenado correctamente', life: 3000 });


    } else { 
  
      toast.add({ severity: 'error', summary: 'Error', detail: response.msj, life: 3000 });
  
  }
    } catch (error) {
     
    }
  }

  async function cargarAgendamiento(url,data) 
  {
    try {
      const response = await axios.post(`${url}/cargar-agendamiento`,data)
      if (response.status == 200) {
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Dato almacenado correctamente', life: 3000 });


    } else { 
  
      toast.add({ severity: 'error', summary: 'Error', detail: response.msj, life: 3000 });
  
  }
    } catch (error) {
     
    }
  }

  async function editarRegistro(url,data) 
  {
    try {
      const response = await axios.post(`${url}/editar-registro`,data)
      if (response.data.status == 200) {
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Dato actualizado correctamente', life: 3000 });

    }

    } catch (error) {
      if (error.response.data.errors)
      toast.add({ severity: 'error', summary: error, detail: error.response.data.errors, life: 4000 });
  else
      toast.add({ severity: 'error', summary: error, detail: error, life: 4000 });
    }
  }

  async function eliminarRegistro(url,id) 
  {
    try {
      const response = await axios.get(`${url}/eliminar-registro/${id}`)
      if (response.data.status == 200) {
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Dato eliminado correctamente', life: 3000 });
          
    }

    } catch (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Algo ha salido mal', life: 4000 });
      toast.add({ severity: 'error', summary: 'Error', detail: error, life: 4000 });

    }
  }



  return {
    datos,   
    error,
    datosId,
    datosMarcaciones,
    datosIdAuxiliar,
    obtenerRegistrosVentas,
    obtenerRegistrosVenta,
    guardarDetalleVenta,
    datos_ventas,
    obtenerRegistros,
    obtenerRegistrosAgendamiento,
    obtenerIngestasEmpresa,
    guardarRegistro,
    editarRegistro,
    eliminarRegistro,
    obtenerRegistrosporId,
    obtenerRegistrosMarcaciones,
    guardarRegistroEntrada,
    guardarRegistroSalida,
    cargarAgendamiento,
    cambiarEstadoAgendamiento,
    datosAgendamiento,
    calcularMarcaciones,
    obtenerTipoIngestas,
    datosIngestas,
    ingestasEmpresa,
    datosReporteMarcaciones,
    GuardarMarcacion,
    GuardarMarcacionSalida,
    
  }
}