<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRestApi } from '@/composables/crud';

const { obtenerRegistros, editarRegistro,  datos,guardarRegistro, eliminarRegistro } = useRestApi() //Instancia composable Rest
const url = ref('empresas');
const urlsucursales = ref('sucursales');



const modalRegistro = ref(false);
const modalSucursal= ref(false);
const modalBorrarRegistro = ref(false);
const empresa = ref({});
const sucursal = ref({})
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
    empresa.value = {};
    submitted.value = false;
    modalRegistro.value = true;
};
const crearSucursal =() =>{
    modalSucursal.value = true;


};

const ocultarModal = () => {
    modalRegistro.value = false;
    submitted.value = false;
};

const guardareditarRegistro = () => {

    console.log(empresa.value);
    

    submitted.value = true;
    if (empresa.value) {
        if (empresa.value.empId) {
            //Edicion
            editarRegistro(url.value,empresa.value);
    
            obtenerRegistros(url.value);    
            
        } else {

            //Creacion
            guardarRegistro(url.value,empresa.value);
       
            obtenerRegistros(url.value);    
            
        }
        modalRegistro.value = false;
        empresa.value = {};
    }
};
const guardareditarRegistroSucursal= () => {


submitted.value = true;
if (sucursal.value) {
    if (sucursal.value.empId) {
        //Edicion
        editarRegistro(urlsucursales.value,sucursal.value);
        obtenerRegistros(url.value);    
        
    } else {

        //Creacion
        guardarRegistro(urlsucursales.value,sucursal.value);
        obtenerRegistros(url.value);    
        
    }
    modalSucursal.value = false;
    sucursal.value = {};
}
};

const edicionRegistro = (edicionRegistro) => {
    empresa.value = { ...edicionRegistro };
    modalRegistro.value = true;
};

const confirmarEliminarRegistro = (edicionRegistro) => {
    empresa.value = edicionRegistro;
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
                            <h5 class="m-0">Administración de Empresas</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                    <Column field="empNombre" header="NOMBRE" :sortable="true" headerStyle="width:25%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">NOMBRE</span>
                            {{ slotProps.data.empNombre }} 
                      
                        </template>
                    </Column>
                
                    <Column field="empDescripcion" header="DESCRIPCION" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">DESCRIPCION</span>
                            {{ slotProps.data.empDescripcion }}
                        </template>
                    </Column>
                    <Column field="empUbicacion" header="UBICACION" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">UBICACION</span>
                            {{ slotProps.data.empUbicacion }}
                        </template>
                    </Column>
             

                    <Column field="empCorreo" header="CORREO" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">CORREO</span>
                            {{ slotProps.data.empCorreo }}
                        </template>
                    </Column>
                    <Column field="empTelefono" header="TELEFONO" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">TELEFONO</span>
                            {{ slotProps.data.empTelefono }}
                        </template>
                    </Column>
                                   
                    <Column headerStyle="min-width:10rem;" header="ACCIONES ">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="edicionRegistro(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmarEliminarRegistro(slotProps.data)" />
                            <Button icon="pi pi-home" class="p-button-rounded p-button-info mt-2" @click="crearSucursal(slotProps.data)" />
                    
                        </template>
                    </Column>
                </DataTable>

                <!-- EMPRESAS -->

                <Dialog v-model:visible="modalRegistro" :style="{ width: '750px' }" header="Detalles de Registro" :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Nombre</label>
                        <InputText id="name" v-model.trim="empresa.empNombre" required="true" autofocus :class="{ 'p-invalid': submitted && !empresa.empNombre }" />
                        <small class="p-invalid" v-if="submitted && !empresa.empNombre">Name is required.</small>
                    </div>
           

                    <div class="field">
                        <label for="name">Descripcion</label>
                        <InputText id="name" v-model.trim="empresa.empDescripcion" required="true" autofocus :class="{ 'p-invalid': submitted && !empresa.empDescripcion }" />
                        <small class="p-invalid" v-if="submitted && !empresa.empDescripcion">Numero de cedula es requerido.</small>
                    </div>
               
                    <div class="field">
                        <label for="name">Ubicacion</label>
                        <InputText id="name" v-model.trim="empresa.empUbicacion" required="true" autofocus :class="{ 'p-invalid': submitted && !empresa.empUbicacion }" />
                        <small class="p-invalid" v-if="submitted && !empresa.empUbicacion">Ubicacion es requerido.</small>
                    </div>
               

       
                    <div class="field">
                        <label for="name">Correo</label>
                        <InputText id="name" v-model.trim="empresa.empCorreo" required="true" autofocus :class="{ 'p-invalid': submitted && !empresa.empCorreo }" />
                        <small class="p-invalid" v-if="submitted && !empresa.empCorreo">Correo es requerido.</small>
                    </div>
               

                
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="ocultarModal" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="guardareditarRegistro" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="modalBorrarRegistro" :style="{ width: '450px' }" header="Confirmar" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="empresa"
                            >Estas seguro de eliminar a <b>{{ empresa.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="modalBorrarRegistro = false" />
                        <Button label="SI" icon="pi pi-check" class="p-button-text" @click="deleteClient(empresa.id)" />
                    </template>
                </Dialog>
                
                <!--   SUCURSALES -->
                
                <Dialog v-model:visible="modalSucursal" :style="{ width: '750px' }" header="Agregar Sucursal" :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Nombre</label>
                        <InputText id="name" v-model.trim="sucursal.sucNombre" required="true" autofocus :class="{ 'p-invalid': submitted && !empresa.sucNombre }" />
                        <small class="p-invalid" v-if="submitted && !empresa.sucNombre">Name is required.</small>
                    </div>
           

                    <div class="field">
                        <label for="name">Descripcion</label>
                        <InputText id="name" v-model.trim="sucursal.sucDescripcion" required="true" autofocus :class="{ 'p-invalid': submitted && !sucursal.sucDescripcion }" />
                        <small class="p-invalid" v-if="submitted && !sucursal.sucDescripcion">Numero de cedula es requerido.</small>
                    </div>
               
                    <div class="field">
                        <label for="name">Ubicacion</label>
                        <InputText id="name" v-model.trim="sucursal.sucUbicacion" required="true" autofocus :class="{ 'p-invalid': submitted && !sucursal.sucUbicacion }" />
                        <small class="p-invalid" v-if="submitted && !sucursal.sucUbicacion">Ubicacion es requerido.</small>
                    </div>
               

       
                    <div class="field">
                        <label for="name">Correo</label>
                        <InputText id="name" v-model.trim="sucursal.sucCorreo" required="true" autofocus :class="{ 'p-invalid': submitted && !sucursal.sucCorreo }" />
                        <small class="p-invalid" v-if="submitted && !sucursal.sucCorreo">Correo es requerido.</small>
                    </div>
               

                
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="ocultarModal" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="guardareditarRegistroSucursal" />
                    </template>
                </Dialog>

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>
