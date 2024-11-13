<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount, warn } from 'vue';
import { useRestApi } from '@/composables/crud';

const { obtenerRegistros,obtenerTipoIngestas,datosIngestas, editarRegistro, datos, guardarRegistro, eliminarRegistro } = useRestApi() //Instancia composable Rest
const url = ref('empresas');
const urlsucursales = ref('sucursales');
const modalRegistro = ref(false);
const modalSucursal = ref(false);
const modalBorrarRegistro = ref(false);
const empresa = ref({});
const empresaId = ref();
const sucursal = ref({})

const checkboxValue = ref([]);
const dt = ref(null);
const filters = ref({});
const radioValue = ref(null);
const submitted = ref(false);
const selectedIds=ref([])
const expandedRows = ref([]);

onBeforeMount(() => {
    initFilters();
});
onMounted(() => {

    obtenerRegistros(url.value);
    // Extrae los IDs de las ingestas asociadas y asígnalos a checkboxValue
   // checkboxValue.value = datos.value.ingestas.map((ingesta) => ingesta.tipoId);
   
 
    obtenerTipoIngestas(url.value);
});


const nuevoRegistro = () => {
    empresa.value = {};
    submitted.value = false;
    modalRegistro.value = true;
};
const crearSucursal = (empId) => {
    modalSucursal.value = true;
    empresaId.value = empId;
    sucursal.value.empId = empresaId.value
};

const ocultarModal = () => {
    modalRegistro.value = false;
    modalSucursal.value = false;
    submitted.value = false;
};

const guardareditarRegistro = () => {

    submitted.value = true;
    if (empresa.value.empCorreo && empresa.value.empNombre.trim() ) {
        if (empresa.value.empId) {
            //Edicion

            empresa.value.ingestas= selectedIds.value

            editarRegistro(url.value, empresa.value);

            obtenerRegistros(url.value);

        } else {

            empresa.value.ingestas= selectedIds.value
            //Creacion
            guardarRegistro(url.value, empresa.value);

            obtenerRegistros(url.value);

        }
        modalRegistro.value = false;
        empresa.value = {};
    }
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

    empresa.value = { ...edicionRegistro };

    checkboxValue.value = empresa.value.ingestas || []; // Populate checkbox selections
    
    selectedIds.value = checkboxValue.value.map(item => item.tipoId);

    modalRegistro.value = true;
};
const edicionRegistroSucursal = (edicionRegistroSucursal) => {
    sucursal.value = { ...edicionRegistroSucursal };

console.log(sucursal.value);

    modalSucursal.value = true;
};

const confirmarEliminarRegistro = (edicionRegistro) => {
    empresa.value = edicionRegistro;
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
                    <div class="card">
                        <h5>Ventas Diarias Columns</h5>
                     
                        <ToggleButton v-model="idFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Unfreeze Id" offLabel="Freeze Id" style="width: 10rem" />
        
                        <DataTable :value="datos" :scrollable="true" scrollHeight="400px" :loading="loading2" scrollDirection="both" class="mt-3">
                            <Column field="empNombre" header="Empresa" :style="{ width: '150px' }" frozen></Column>
                            <Column field="sucNombre" header="Sucursal" :style="{ width: '200px' }">
                           
                                
                          
                            </Column>
               
                           </DataTable>
                    </div>
                </div>
               <!--  {{datos}} -->
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