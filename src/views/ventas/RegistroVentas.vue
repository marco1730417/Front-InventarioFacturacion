<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount, watch  } from 'vue';
import { useRestApi } from '@/composables/crud';
import { format } from 'date-fns';

const { obtenerRegistrosVentas,obtenerRegistrosVenta,lobtenerRegistros,datos_ventas,obtenerTipoIngestas,datosIngestas, editarRegistro, datos, guardarRegistro, eliminarRegistro } = useRestApi() //Instancia composable Rest
const url = ref('ventas');
const urlsucursales = ref('sucursales');
const modalRegistro = ref(false);
const modalSucursal = ref(false);
const modalBorrarRegistro = ref(false);
const venta = ref({
    venManoObra: null,
    venMateriaPrima:null,
    venEmpaques:null,
    venObservacion:null
});
const empresaId = ref();
const sucursal = ref({})

const checkboxValue = ref([]);
const dt = ref(null);
const filters = ref({});
const radioValue = ref(null);
const submitted = ref(false);
const selectedIds=ref([])
const expandedRows = ref([]);
const autoFilteredValue = ref([]);
const calendarValue = ref(null);

onBeforeMount(() => {
    initFilters();
});

 watch(calendarValue, (newValue, oldValue) => {
  
    if(datos_ventas)
    datos_ventas.value={}

}) 

onMounted(() => {

 /*    obtenerRegistrosVentas(urlsucursales.value,calendarValue.value); */
    // Extrae los IDs de las ingestas asociadas y asígnalos a checkboxValue
   // checkboxValue.value = datos.value.ingestas.map((ingesta) => ingesta.tipoId);
   
 
    obtenerTipoIngestas(url.value);
});

const cargarInformacion=() => {
    const formattedDate = format(calendarValue.value, "yyyy-MM-dd");
    obtenerRegistrosVentas(urlsucursales.value,formattedDate);
    obtenerRegistrosVenta(url.value,formattedDate);

}


const nuevoRegistro = () => {
   

    if (datos.value) {
        venta.value = datos.value;
        submitted.value = false;
        modalRegistro.value = true;
    } else {
        console.error("Datos no definidos. Verifica el origen de datos.");
        venta.value={}
    }

   /*  if(!datos)
    venta.value = {};

    else venta.value = datos.value
 */
    submitted.value = false;
    modalRegistro.value = true;
};


const ocultarModal = () => {
    modalRegistro.value = false;
    modalSucursal.value = false;
    submitted.value = false;
};

const guardareditarRegistro = () => {
    
    const formattedDate = format(calendarValue.value, "yyyy-MM-dd");

    submitted.value = true;
    if (venta.value.venManoObra && venta.value.venMateriaPrima && venta.value.venEmpaques ) {
        if (venta.value.empId) {
            //Edicion

            venta.value.ingestas= selectedIds.value

            editarRegistro(url.value, venta.value);

            obtenerRegistros(url.value);

        } else {

            venta.value.venFecha= formattedDate
            //Creacion
            guardarRegistro(url.value, venta.value);

            obtenerRegistros(url.value);

        }
       
    }
    modalRegistro.value = false;
    venta.value = {};

};
const guardareditarRegistroSucursal = () => {


    submitted.value = true;
    if (sucursal.value) {
        if (sucursal.value.sucId) {
            //Edicion
            editarRegistro(urlsucursales.value, sucursal.value);
            obtenerRegistros(url.value);

        } else {

            //Creacion
            guardarRegistro(urlsucursales.value, sucursal.value);
            obtenerRegistros(url.value);

        }
        modalSucursal.value = false;
        sucursal.value = {};
    }
};

const edicionRegistro = (edicionRegistro) => {

    venta.value = { ...edicionRegistro };

    checkboxValue.value = venta.value.ingestas || []; // Populate checkbox selections
    
    selectedIds.value = checkboxValue.value.map(item => item.tipoId);

    modalRegistro.value = true;
};
const edicionRegistroSucursal = (edicionRegistroSucursal) => {
    sucursal.value = { ...edicionRegistroSucursal };

console.log(sucursal.value);

    modalSucursal.value = true;
};

const confirmarEliminarRegistro = (edicionRegistro) => {
    venta.value = edicionRegistro;
    modalBorrarRegistro.value = true;
};

const deleteClient = (id) => {

    eliminarRegistro(url.value, id);

    obtenerRegistros(urlsucursales.value);
};


const exportCSV = () => {
    dt.value.exportCSV();
};


const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="col-12">

                            <div v-if="datos" class="grid">
                                <div class="col-12 md:col-6 lg:col-3">
                                    <div class="shadow-2 p-3 border-round">
                                        <div class="flex justify-content-between mb-3">
                                            <div>
                                                
                                                <span class="block text-500 font-medium mb-3">Mano de Obra</span>
                                                <div class="text-900 font-medium text-xl">$ {{datos.venManoObra}}</div>
                                            </div>
                                            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                                                <i class="pi pi-user text-blue-500 text-xl"></i>
                                            </div>
                                        </div>
                       
                                    </div>
                                </div>
                                <div class="col-12 md:col-6 lg:col-3">
                                    <div class="surface-card shadow-2 p-3 border-round">
                                        <div class="flex justify-content-between mb-3">
                                            <div>
                                                <span class="block text-500 font-medium mb-3">Materia Prima</span>
                                                <div class="text-900 font-medium text-xl">$ {{datos.venMateriaPrima}}</div>
                                            </div>
                                            <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
                                                <i class="pi pi-star-fill text-orange-500 text-xl"></i>
                                            </div>
                                        </div>
                         
                                    </div>
                                </div>
                                <div class="col-12 md:col-6 lg:col-3">
                                    <div class="surface-card shadow-2 p-3 border-round">
                                        <div class="flex justify-content-between mb-3">
                                            <div>
                                                <span class="block text-500 font-medium mb-3">Empaques</span>
                                                <div class="text-900 font-medium text-xl">$ {{datos.venEmpaques}}</div>
                                            </div>
                                            <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                                                <i class="pi pi-ticket text-cyan-500 text-xl"></i>
                                            </div>
                                        </div>
                                     
                                    </div>
                                </div>
                                <div class="col-12 md:col-6 lg:col-3">
                                    <div class="surface-card shadow-2 p-3 border-round">
                                        <div class="flex justify-content-between mb-3">
                                            <div>
                                                <span class="block text-500 font-medium mb-3">Costo</span>
                                                <div class="text-900 font-medium text-xl">$ {{datos.venCosto}}</div>
                                            </div>
                                            <div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width: 2.5rem; height: 2.5rem">
                                                <i class="pi pi-dollar text-purple-500 text-xl"></i>
                                            </div>
                                        </div>
                                     
                                    </div>
                                </div>
                            </div>
               
            

                    <div class="card">
                        <h5>Venta Diaria

                        </h5>
                        
                        <h5>Calendar</h5>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarValue"></Calendar>
                        <Button style="float: right;" @click="cargarInformacion" label="Buscar" class="p-button-success mr-2 mb-2" />
                        <Button v-if="datos_ventas" label="General" style="float: right" class="p-button-info mr-2"
                                @click="nuevoRegistro" />
                                
                        <ToggleButton v-model="idFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Unfreeze Id" offLabel="Freeze Id" style="width: 10rem" />
        
                        <DataTable :value="datos_ventas" :scrollable="true" scrollHeight="400px" :loading="loading2" scrollDirection="both" class="mt-3">
                            <Column field="sucursal_nombre" header="Empresa" :style="{ width: '150px' }" frozen></Column>
                          
                           </DataTable>




                                 <!-- VENTA GENERAL -->

                <Dialog v-model:visible="modalRegistro" :style="{ width: '400px' }" header="Generales"
                :modal="true" class="p-fluid">
                <div class="field">
                    <label for="name">Mano de Obra</label>
                   <!--  <InputText id="name" v-model.trim="venta.venManoObra" required="true" autofocus :class="{ 'p-invalid': submitted && !venta.venManoObra }" />
                   -->  
                   
                   <div class="p-inputgroup">
                    <InputText v-model.trim="venta.venManoObra" required="true" autofocus :class="{ 'p-invalid': submitted && !venta.venManoObra }" placeholder="Price" />
                    <span class="p-inputgroup-addon">$</span>
                    <span class="p-inputgroup-addon">.00</span>
                </div>
                   
                   <small class="p-invalid" v-if="submitted && !venta.venManoObra">Mano de obra es requerido.</small>                    
                </div>


                <div class="field">
                    <label for="name">Materia Prima</label>
                  <!--   <InputText id="name" v-model.trim="venta.venMateriaPrima" required="true" autofocus :class="{ 'p-invalid': submitted && !venta.venMateriaPrima }" />
                   --> 
                  
                   <div class="p-inputgroup">
                    <InputText v-model.trim="venta.venMateriaPrima" required="true" autofocus :class="{ 'p-invalid': submitted && !venta.venMateriaPrima }" placeholder="Price" />
                    <span class="p-inputgroup-addon">$</span>
                    <span class="p-inputgroup-addon">.00</span>
                </div>

                   <small class="p-invalid" v-if="submitted && !venta.venMateriaPrima">Materia Prima es requerido.</small>                    
                </div>

                <div class="field">
                    <label for="name">Empaques</label>
                <!--     <InputText id="name" v-model.trim="venta.venEmpaques" required="true" autofocus :class="{ 'p-invalid': submitted && !venta.venEmpaques }" />
                 -->   
                
                 <div class="p-inputgroup">
                    <InputText v-model.trim="venta.venEmpaques" required="true" autofocus :class="{ 'p-invalid': submitted && !venta.venEmpaques }" placeholder="Price" />
                    <span class="p-inputgroup-addon">$</span>
                    <span class="p-inputgroup-addon">.00</span>
                </div>

                 <small class="p-invalid" v-if="submitted && !venta.venEmpaques">Materia Prima es requerido.</small>                    
                </div>

                <div class="field">
                    <label for="name">Observacion</label>
                 <!--    <InputText id="name" v-model.trim="venta.venEmpaques" required="true" autofocus :class="{ 'p-invalid': submitted && !venta.venEmpaques }" />
                   -->
                    <Textarea v-model.trim="venta.venObservacion" id="venObservacion" rows="2" />
                                    
                </div>
              

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="ocultarModal" />
                    <Button label="Save" icon="pi pi-check" class="p-button-text" @click="guardareditarRegistro" />
                </template>
            </Dialog>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';

::v-deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>