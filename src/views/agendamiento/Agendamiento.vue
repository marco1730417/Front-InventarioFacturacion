<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRestApi } from '@/composables/crud';

const { cargarAgendamiento, datosAgendamiento, cambiarEstadoAgendamiento, obtenerRegistrosAgendamiento } = useRestApi() //Instancia composable Rest
const url = ref('agendamiento');


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


const dt = ref(null);
const filters = ref({});

const datosenviar = ref({ mes: selectedMes, anio: selectedAnio })

onBeforeMount(() => {
    initFilters();
});
onMounted(() => {

});

const cambiarEstado = (id) => {

    cambiarEstadoAgendamiento(url.value, id);
    // Cargamos las fechas dinamicas
    obtenerRegistrosAgendamiento(url.value, datosenviar.value);
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
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <div class="card flex justify-content-center">
                                <Dropdown v-model="selectedAnio" :options="anios" optionLabel="name"
                                    placeholder="Eliga un año" class="w-full md:w-14rem" />
                            </div>
                        </div>
                        <div class="my-2">
                            <div class="card flex justify-content-center">
                                <Dropdown v-model="selectedMes" :options="mes" optionLabel="name" placeholder="Eliga un mes"
                                    class="w-full md:w-14rem" />
                            </div>
                        </div>
                    </template>

                    <template v-slot:end>
                        <Button label="Generar" icon="pi pi-sync" class="p-button-success" @click="generar" />
                    </template>
                </Toolbar>

                <DataTable ref="dt" :value="datosAgendamiento" dataKey="id" :paginator="true" :rows="10" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25,40]"
                    currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} registros"
                    responsiveLayout="scroll">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Administración de Horas Ordinarias y Extraordinarias</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                    <!--     <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                 -->
                    <Column field="nombre" header="FECHA" :sortable="true" headerStyle="width:25%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">FECHA</span>
                            {{ slotProps.data.fecha }} <br>
                        </template>
                    </Column>
                    <Column field="ruc" header="DIA" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">DIA</span>
                            {{ slotProps.data.dia }}
                        </template>
                    </Column>
                    <Column field="direccion" header="ESTADO" :sortable="true" headerStyle="width:25%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">ESTADO</span>
                            <span v-if="slotProps.data.estado == 1"> Ordinaria</span>
                            <span v-if="slotProps.data.estado == 2"> Extraordinaria</span>

                        </template>
                    </Column>



                    <Column headerStyle="min-width:10rem;" header="ACCIONES ">
                        <template #body="slotProps">
                            <Button icon="pi pi-sync" class="p-button-rounded p-button-success mr-2"
                                @click="cambiarEstado(slotProps.data.id)" />
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
