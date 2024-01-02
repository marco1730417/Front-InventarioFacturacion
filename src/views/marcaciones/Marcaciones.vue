<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRestApi } from '@/composables/crud';

const { obtenerRegistros, editarRegistro,  datos,guardarRegistro, eliminarRegistro } = useRestApi() //Instancia composable Rest
const url = ref('clientes');


const modalRegistro = ref(false);
const modalBorrarRegistro = ref(false);
const cliente = ref({});
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);


onBeforeMount(() => {
    initFilters();
});
onMounted(() => {

 obtenerRegistros(url.value);    
});


const nuevoRegistro = () => {
    cliente.value = {};
    submitted.value = false;
    modalRegistro.value = true;
};

const ocultarModal = () => {
    modalRegistro.value = false;
    submitted.value = false;
};

const guardareditarRegistro = () => {
    submitted.value = true;
    if (cliente.value.nombre && cliente.value.ruc ) {
        if (cliente.value.id) {
            //Edicion
            editarRegistro(url.value,cliente.value);
    
            obtenerRegistros(url.value);    
            
        } else {

            //Creacion
            guardarRegistro(url.value,cliente.value);
       
            obtenerRegistros(url.value);    
            
        }
        modalRegistro.value = false;
        cliente.value = {};
    }
};


const edicionRegistro = (edicionRegistro) => {
    cliente.value = { ...edicionRegistro };
    modalRegistro.value = true;
};

const confirmarEliminarRegistro = (edicionRegistro) => {
    cliente.value = edicionRegistro;
    modalBorrarRegistro.value = true;
};

const deleteClient = (id) => {

    eliminarRegistro(url.value,id);
    
    obtenerRegistros(url.value);   
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
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="Nuevo" icon="pi pi-plus" class="p-button-success mr-2" @click="nuevoRegistro" />
                        </div>
                    </template>

                    <template v-slot:end>
                   <Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="datos"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                 
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} registros"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Administración de Clientes</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                <!--     <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                 -->    <Column field="nombre" header="NOMBRE" :sortable="true" headerStyle="width:25%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">NOMBRE</span>
                            {{ slotProps.data.nombre }} <br>
                            {{ slotProps.data.ruc }}
                        </template>
                    </Column>
                    <Column field="ruc" header="EMAIL" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Email</span>
                            {{ slotProps.data.email }}
                        </template>
                    </Column>
                    <Column field="direccion" header="DIRECCION" :sortable="true" headerStyle="width:25%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">DIRECCION</span>
                            {{ slotProps.data.direccion }}
                        </template>
                    </Column>
                    <Column field="telefono" header="TELEFONO" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">TELEFONO</span>
                            {{ slotProps.data.telefono }}
                        </template>
                    </Column>
                 
                                   
                    <Column headerStyle="min-width:10rem;" header="ACCIONES ">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="edicionRegistro(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmarEliminarRegistro(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="modalRegistro" :style="{ width: '450px' }" header="Detalles de Registro" :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Nombre</label>
                        <InputText id="name" v-model.trim="cliente.nombre" required="true" autofocus :class="{ 'p-invalid': submitted && !cliente.nombre }" />
                        <small class="p-invalid" v-if="submitted && !cliente.nombre">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="name">Ruc</label>
                        <InputText id="name" v-model.trim="cliente.ruc" required="true" autofocus :class="{ 'p-invalid': submitted && !cliente.ruc }" />
                        <small class="p-invalid" v-if="submitted && !cliente.ruc">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="description">Direccion</label>
                        <Textarea id="description" v-model="cliente.direccion" required="true" rows="3" cols="20" />
                    </div>
                    <div class="field">
                        <label for="name">Telefono</label>
                        <InputText id="name" v-model.trim="cliente.telefono" required="true" autofocus />
                    </div>
                    <div class="field">
                        <label for="name">Email</label>
                        <InputText id="name" v-model.trim="cliente.email" required="true" autofocus  />
                    </div>
       


                
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="ocultarModal" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="guardareditarRegistro" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="modalBorrarRegistro" :style="{ width: '450px' }" header="Confirmar" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="cliente"
                            >Estas seguro de eliminar a <b>{{ cliente.nombre }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="modalBorrarRegistro = false" />
                        <Button label="SI" icon="pi pi-check" class="p-button-text" @click="deleteClient(cliente.id)" />
                    </template>
                </Dialog>


            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>
