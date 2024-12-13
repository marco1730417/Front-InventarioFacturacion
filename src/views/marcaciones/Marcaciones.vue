<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRestApi } from '@/composables/crud';
import { useUserStore } from '@/store/user.js';

const auth = useUserStore();

const { datosMarcaciones, guardarRegistroEntrada, guardarRegistroSalida, obtenerRegistrosMarcaciones } = useRestApi() //Instancia composable Rest
const url = ref('marcaciones');

const marcacion = ref({});
const fecha_inicio = ref(null);
const fecha_fin = ref(null)
const dt = ref(null);
const filters = ref({});
const usuario = ref(auth.user.id);
const dataenviar = ref({ usuario_id: usuario.value })
dataenviar.value.fechaInicio = fecha_inicio
dataenviar.value.fechaFinal = fecha_fin


marcacion.value.usuario_id = usuario.value

onBeforeMount(() => {
    initFilters();
});
onMounted(() => {


    obtenerRegistrosMarcaciones(url.value, dataenviar.value);

});


const guardarRegistrodeEntrada = async () => {

    //Creacion
 await   guardarRegistroEntrada(url.value, marcacion.value);
    obtenerRegistrosMarcaciones(url.value, dataenviar.value);

};


const obtenerRegistrosdeMarcaciones =  () => {
  

    obtenerRegistrosMarcaciones(url.value, dataenviar.value);

};

const guardarRegistrodeSalida = async () => {

    //Creacion
   await guardarRegistroSalida(url.value, marcacion.value);

    obtenerRegistrosMarcaciones(url.value, dataenviar.value);

};



const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-6">
            <div class="card p-fluid">
                <h5>INGRESO</h5>

                <Button label="Timbrar" icon="pi pi-sign-in" style="width: auto" @click="guardarRegistrodeEntrada" />
            </div>

        </div>
        <div class="col-12 lg:col-6">
            <div class="card p-fluid">
                <h5>SALIDA</h5>
                <Button label="Timbrar" icon="pi pi-sign-out" class="p-button-danger" style="width: auto"
                    @click="guardarRegistrodeSalida" />

            </div>

        </div>

        <div class="col-12 lg:col-12">
            <Toast />
                

            <div class="grid p-fluid">
        <div class="col">
            <div class="card">
                <h5>Control de Asistencia</h5>
                <div class="p-fluid grid">
                    <div class="col-9 md:col-4">
                        <div class="field">
                            <label for="inputtext">Fecha Inicio</label>
                            <Calendar :showIcon="true" :showButtonBar="true" v-model="fecha_inicio"></Calendar>

                        </div>
                   
                    </div>

                    <div class="col-9 md:col-4">
                        <div class="field">
                            <label for="inputmask">Fecha Fin</label>
                            <Calendar :showIcon="true" :showButtonBar="true" v-model="fecha_fin"></Calendar>

                        </div>
                
                    </div>
                    <div class="col-9 md:col-3">
                        <div class="field">
                            <label for="inputmask">Acciones</label>
                            <Button label="Consultar" icon="pi pi-search" class="p-button-success" @click="obtenerRegistrosdeMarcaciones" />
              
                        </div>
                
                    </div>
                </div>
            </div>
        </div>
    </div>


            <div class="card">

           <!--      <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <div class="card flex justify-content-center">
                                <h5>Fecha Inicio</h5>
                                <Calendar :showIcon="true" :showButtonBar="true" v-model="fecha_inicio"></Calendar>


                            </div>
                        </div>
                        <div class="my-1">
                            <div class="">
                      

                            </div>
                            
                        </div>
                        <div class="my-2">
                            <div class="card flex justify-content-center">
                                <h5>Fecha Final</h5>
                                <Calendar :showIcon="true" :showButtonBar="true" v-model="fecha_fin"></Calendar>


                            </div>
                            
                        </div>
                    </template>

                    <template v-slot:end>
                        <Button label="Buscar" icon="pi pi-search" class="p-button-info" @click="obtenerRegistrosdeMarcaciones" />
                    </template>
                </Toolbar> -->

                <DataTable ref="dt" :value="datosMarcaciones" dataKey="id" :paginator="true" :rows="10" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} registros"
                    responsiveLayout="scroll">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Historial de Marcaciones</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                    <!--     <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                 -->
                    <Column field="nombre" header="FECHA"  headerStyle="width:25%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">FECHA</span>

                            {{ slotProps.data.fecha }}

                        </template>
                    </Column>
                    <Column field="identificacion" header="ENTRADA" 
                        headerStyle="width:25%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">ENTRADA</span>
                            {{ slotProps.data.hora_entrada }}
                        </template>
                    </Column>
                    <Column field="identificacion" header="SALIDA" 
                        headerStyle="width:25%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">SALIDA</span>
                            {{ slotProps.data.hora_salida }}
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
