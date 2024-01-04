<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRestApi } from '@/composables/crud';
import { useUserStore } from '@/store/user.js';

const auth = useUserStore();

const { datosMarcaciones, guardarRegistroEntrada, guardarRegistroSalida, obtenerRegistrosMarcaciones } = useRestApi() //Instancia composable Rest
const url = ref('marcaciones');


const modalRegistro = ref(false);
const modalBorrarRegistro = ref(false);
const marcacion = ref({});
const fecha_inicio = ref('');
const fecha_fin = ref('');
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const usuario = ref(auth.user.id);

const dataenviar = ref({ usuario_id: usuario.value })

marcacion.value.usuario_id = usuario.value;

onBeforeMount(() => {
    initFilters();
});
onMounted(() => {


    obtenerRegistrosMarcaciones(url.value, dataenviar.value);

});


const guardarRegistrodeEntrada = () => {

    //Creacion
    guardarRegistroEntrada(url.value, marcacion.value);
    obtenerRegistrosMarcaciones(url.value, dataenviar.value);

};

const guardarRegistrodeSalida = () => {

    //Creacion
    guardarRegistroSalida(url.value, marcacion.value);

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
            <div class="card">

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
                    <Column field="nombre" header="FECHA" :sortable="true" headerStyle="width:25%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">FECHA</span>

                            {{ slotProps.data.fecha }}

                        </template>
                    </Column>
                    <Column field="identificacion" header="ENTRADA" :sortable="true"
                        headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">ENTRADA</span>
                            {{ slotProps.data.hora_entrada }}
                        </template>
                    </Column>
                    <Column field="identificacion" header="SALIDA" :sortable="true"
                        headerStyle="width:14%; min-width:10rem;">
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
