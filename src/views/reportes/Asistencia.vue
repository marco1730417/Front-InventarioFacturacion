<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRestApi } from '@/composables/crud';

const { cargarAgendamiento, datosAgendamiento, calcularMarcaciones, datosReporteMarcaciones, obtenerRegistros,datos } = useRestApi() //Instancia composable Rest

const url = ref('reportes');
const urlusuarios = ref('usuarios');

const selectedUsuario = ref();
const selectedAnio = ref();
const anios = ref([

    { name: '2024', code: '2024' },
    { name: '2025', code: '2025' },
]);

const selectedMes = ref();
const mes = ref([
    { name: 'Enero', code: '01' },
    { name: 'Febrero', code: '02' },
    { name: 'Marzo', code: '03' },
    { name: 'Abril', code: '04' },
    { name: 'Mayo', code: '05' },
    { name: 'Junio', code: '06' },
    { name: 'Julio', code: '07' },
    { name: 'Agosto', code: '08' },
    { name: 'Septiembre', code: '09' },
    { name: 'Octubre', code: '10' },
    { name: 'Noviembre', code: '11' },
    { name: 'Diciembre', code: '12' },

]);

const modalRegistro = ref(false);
const modalBorrarRegistro = ref(false);
const cliente = ref({});
const dt = ref(null);
const filters = ref({});

const datosenviar = ref({ mes: selectedMes, anio: selectedAnio , usuario_id:selectedUsuario })

const submitted = ref(false);


onBeforeMount(() => {
    initFilters();
});
onMounted(() => {

    obtenerRegistros(urlusuarios.value);   
});

const generarReporte = () => {

    // Cargamos las fechas dinamicas
    calcularMarcaciones(url.value, datosenviar.value);
};


const generar = () => {

    //Creamos las fechas dinamicas
    cargarAgendamiento(url.value, datosenviar.value);
    // Cargamos las fechas dinamicas
    obtenerRegistrosAgendamiento(url.value, datosenviar.value);
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
                <Toast />
                
            <div class="grid p-fluid">
        <div class="col">
            <div class="card">
                <h5>Control de Asistencia</h5>
                <div class="p-fluid grid">
                    <div class="col-9 md:col-3">
                        <div class="field">
                            <label for="inputtext">Elija el Año</label>
                            <Dropdown v-model="selectedAnio" :options="anios" optionLabel="name"
                                    placeholder="Eliga un año" class="w-full md:w-14rem" />
                        </div>
                   
                    </div>

                    <div class="col-9 md:col-3">
                        <div class="field">
                            <label for="inputmask">Elija el Mes</label>
                            <Dropdown v-model="selectedMes" :options="mes" optionLabel="name" placeholder="Eliga un mes"
                                    class="w-full md:w-14rem" />
                            
                        </div>
                
                    </div>
                    <div class="col-9 md:col-3">
                        <div class="field">
                            <label for="inputmask">Elija el Usuario</label>
                            <Dropdown v-model="selectedUsuario" :options="datos" optionLabel="name" placeholder="Eliga un usuario"

class="w-full md:w-14rem" />      
                        </div>
                
                    </div>
                    <div class="col-9 md:col-3">
                        <div class="field">
                            <label for="inputmask">Acciones</label>
                            <Button label="Consultar" icon="pi pi-search" class="p-button-success" @click="generarReporte" />
              
                        </div>
                
                    </div>
                </div>
            </div>
        </div>
    </div>
          
                <DataTable ref="dt" :value="datosReporteMarcaciones" dataKey="id" :paginator="true" :rows="10" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} registros"
                    responsiveLayout="scroll">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Control de Asistencia</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                    <!--     <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                 -->
                    <Column field="nombre" header="FECHA" :sortable="true" headerStyle="width:5%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">FECHA</span>
                            {{ slotProps.data.fecha }} <br>
                        </template>
                    </Column>
                    <Column field="ruc" header="MARCACIONES" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">MARCACIONES</span>
                            {{ slotProps.data.hora_entrada }} - {{ slotProps.data.hora_salida }}
                        </template>
                    </Column>
             
        
                </DataTable>



            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>
