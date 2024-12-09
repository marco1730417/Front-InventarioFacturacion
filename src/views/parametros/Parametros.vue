<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRestApi } from '@/composables/crud';

const { obtenerRegistros, editarRegistro,  datos,guardarRegistro, eliminarRegistro } = useRestApi() //Instancia composable Rest
const url = ref('parametros');


const modalRegistro = ref(false);
const modalBorrarRegistro = ref(false);
const parametro = ref({});
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
    parametro.value = {};
    submitted.value = false;
    modalRegistro.value = true;
};

const ocultarModal = () => {
    modalRegistro.value = false;
    submitted.value = false;
};

const guardareditarRegistro = () => {
    submitted.value = true;
    if (parametro.value.nombre && parametro.value.valor ) {
        if (parametro.value.id) {
            //Edicion
            editarRegistro(url.value,parametro.value);
    
            obtenerRegistros(url.value);    
            
        } else {

            //Creacion
            guardarRegistro(url.value,parametro.value);
       
            obtenerRegistros(url.value);    
            
        }
        modalRegistro.value = false;
        parametro.value = {};
    }
};


const edicionRegistro = (edicionRegistro) => {
    parametro.value = { ...edicionRegistro };
    modalRegistro.value = true;
};

const confirmarEliminarRegistro = (edicionRegistro) => {
    parametro.value = edicionRegistro;
    modalBorrarRegistro.value = true;
};

const deleteRegistro = (id) => {

    eliminarRegistro(url.value,id);
    
    obtenerRegistros(url.value);   

    modalBorrarRegistro.value = false;
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
                            <h5 class="m-0">Administración de Parámetros</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>
    
                    <Column field="nombre" header="NOMBRE" :sortable="true" >
                        <template #body="slotProps">
                            <span class="p-column-title">NOMBRE</span>
                            {{ slotProps.data.nombre }} 
                      
                        </template>
                    </Column>
          
                    <Column field="identificacion" header="DESCRIPCION" :sortable="true" >
                        <template #body="slotProps">
                            <span class="p-column-title">DESCRIPCION</span>
                            {{ slotProps.data.descripcion }}
                        </template>
                    </Column>
               
                    <Column field="identificacion" header="VALOR" :sortable="true" >
                        <template #body="slotProps">
                            <span class="p-column-title">VALOR</span>
                            {{ slotProps.data.valor }}
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
                        <InputText id="name" v-model.trim="parametro.nombre" required="true" autofocus :class="{ 'p-invalid': submitted && !parametro.nombre }" />
                        <small class="p-invalid" v-if="submitted && !parametro.nombre">Name is required.</small>
                    </div>
                
                    <div class="field">
                        <label for="name">Tipo</label>
                    
                        <Dropdown :options="datos" optionGroupLabel="descripcion" v-model="parametro.descripcion" optionValue="descripcion" optionLabel="descripcion" placeholder="Select" 
                        
                        
                        />
                        <small class="p-invalid" v-if="submitted && !parametro.descripcion">descripcion es requerido.</small>
                    
                    </div>
                
                    <div class="field">
                        <label for="name">Valor.</label>
                        <InputNumber :minFractionDigits="2" :maxFractionDigits="5" id="name" v-model.trim="parametro.valor" required="true" autofocus />
                    </div>
            
              


                
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="ocultarModal" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="guardareditarRegistro" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="modalBorrarRegistro" :style="{ width: '450px' }" header="Confirmar" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="parametro"
                            >Estas seguro de eliminar a <b>{{ parametro.nombre }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="modalBorrarRegistro = false" />
                        <Button label="SI" icon="pi pi-check" class="p-button-text" @click="deleteRegistro(parametro.id)" />
                    </template>
                </Dialog>


            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>
