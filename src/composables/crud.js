import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast';


export function useRestApi() 
{
  const toast = useToast();
  const datos = ref(null);
  const datosId = ref([]);
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
    datosIdAuxiliar,
    obtenerRegistros,
    guardarRegistro,
    editarRegistro,
    eliminarRegistro,
    obtenerRegistrosporId,
    
  }
}