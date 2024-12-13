<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRestApi } from '@/composables/crud';

const { obtenerRegistros, editarRegistro,  datos,guardarRegistro, eliminarRegistro } = useRestApi() //Instancia composable Rest
const url = ref('usuarios');


const modalRegistro = ref(false);
const modalBorrarRegistro = ref(false);
const usuario = ref({});
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
    usuario.value = {};
    submitted.value = false;
    modalRegistro.value = true;
};

const ocultarModal = () => {
    modalRegistro.value = false;
    submitted.value = false;
};

const  guardareditarRegistro = async  () => {
    submitted.value = true;
    if (usuario.value.name && usuario.value.identificacion && usuario.value.hora_entrada && usuario.value.hora_salida ) {
        if (usuario.value.id) {
            //Edicion
            await    editarRegistro(url.value,usuario.value);
     
            
        } else {

            //Creacion
            await   guardarRegistro(url.value,usuario.value);
            
        }
        
        await obtenerRegistros(url.value); 

        modalRegistro.value = false;
        usuario.value = {};
    }
};


const edicionRegistro = (edicionRegistro) => {
    usuario.value = { ...edicionRegistro };
    modalRegistro.value = true;
};

const confirmarEliminarRegistro = (edicionRegistro) => {
    usuario.value = edicionRegistro;
    modalBorrarRegistro.value = true;
};

const deleteClient = async (id) => {
    try {
        // Esperar a que se elimine el registro
        await eliminarRegistro(url.value, id); 
        
        // Una vez que la eliminación se complete, obtener los registros actualizados
        await obtenerRegistros(url.value); 
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
    }
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
                            <h5 class="m-0">Administración de Usuarios</h5>
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
                            {{ slotProps.data.name }} 
                      
                        </template>
                    </Column>
                 <!--    <Column field="identificacion" header="EMAIL" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Email</span>
                            {{ slotProps.data.email }}
                        </template>
                    </Column> -->
                    <Column field="identificacion" header="IDENTIFICACION" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">IDENTIFICACION</span>
                            {{ slotProps.data.identificacion }}
                        </template>
                    </Column>
                    <Column field="sueldo" header="SUELDO" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Sueldo</span>
                            {{ slotProps.data.sueldo }}
                        </template>
                    </Column>
                <!--     <Column field="cargo" header="CARGO" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Cargo</span>
                            {{ slotProps.data.cargo }}
                        </template>
                    </Column> -->
           
                    <Column field="sueldo" header="PERFIL" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">PERFIL</span>
                         <span v-if="slotProps.data.perfil == 1">Administrador</span>   
                         
                         <span v-if="slotProps.data.perfil == 2">Estándar</span>   
                        </template>
                    </Column>
                    <!-- <Column field="sueldo" header="HORAS" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">HORAS</span>
                            {{ slotProps.data.numero_horas_laborables }}
                        </template>
                    </Column>
                    <Column field="hora_entrada" header="INGRESO" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">INGRESO</span>
                            {{ slotProps.data.hora_entrada }}
                        </template>
                    </Column>
                    <Column field="hora_salida" header="SALIDA" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">SALIDA</span>
                            {{ slotProps.data.hora_salida }}
                        </template>
                    </Column>
                  -->

                  <Column field="ruc" header="HORARIO" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">HORARIO</span>
                        {{ slotProps.data.hora_entrada }} -  {{ slotProps.data.hora_salida }} /  {{ slotProps.data.numero_horas_laborables }} Hrs
                    </template>
                </Column>
                                   
                    <Column headerStyle="min-width:10rem;" header="ACCIONES ">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="edicionRegistro(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmarEliminarRegistro(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="modalRegistro" :style="{ width: '750px' }" header="Detalles de Registro" :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Nombres y Apellidos</label>
                        <InputText id="name" v-model.trim="usuario.name" required="true" autofocus :class="{ 'p-invalid': submitted && !usuario.name }" />
                        <small class="p-invalid" v-if="submitted && !usuario.name">Name is required.</small>
                    </div>
                 <!--    <div class="field">
                        <label for="name">Email</label>
                        <InputText id="name" v-model.trim="usuario.email" required="true" autofocus  />
                    </div> -->
                    <div class="field">
                        <label for="name">Número de cédula</label>
                        <InputText id="name" v-model.trim="usuario.identificacion" required="true" autofocus :class="{ 'p-invalid': submitted && !usuario.identificacion }" />
                        <small class="p-invalid" v-if="submitted && !usuario.identificacion">Numero de cedula es requerido.</small>
                    </div>
                   <!--  <div class="field">
                        <label for="description">Dirección</label>
                        <Textarea id="description" v-model="usuario.direccion" required="true" rows="3" cols="20" />
                    </div> -->
                    <div class="field">
                        <label for="name">Salario.</label>
                        <InputNumber :minFractionDigits="2" :maxFractionDigits="5" id="name" v-model.trim="usuario.sueldo" required="true" autofocus />
                        <!-- <small>Por favor si se usa decimales separar con punto (.)</small> -->
                    </div>
                  <!--   <div class="field">
                        <label for="description">Cargo</label>
                        <Textarea id="description" v-model="usuario.cargo" required="true" rows="3" cols="20" />
                    </div> -->
                 <!--    <div class="field">
                        <label for="description">Número Horas Laborables (Escribir en formato: 08:00:00)</label>
                  <InputText id="description" v-model="usuario.numero_horas_laborables" required="true" />
                    
                    </div> -->
       
                    <div class="field">
                        <label for="description">Hora Entrada</label>
                  <InputText id="description" type="time" v-model="usuario.hora_entrada" required="true" autofocus :class="{ 'p-invalid': submitted && !usuario.hora_entrada }"/>
                  <small class="p-invalid" v-if="submitted && !usuario.hora_entrada">Hora de entrada es requerido.</small>
                 
                    </div>
       
                    <div class="field">
                        <label for="description">Hora Salida</label>
                  <InputText id="description" type="time" v-model="usuario.hora_salida" required="true"  autofocus :class="{ 'p-invalid': submitted && !usuario.hora_salida }"/>
                  <small class="p-invalid" v-if="submitted && !usuario.hora_salida">Hora de salida es requerido.</small>
                 
                    </div>


                
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="ocultarModal" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="guardareditarRegistro" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="modalBorrarRegistro" :style="{ width: '450px' }" header="Confirmar" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="usuario"
                            >Estas seguro de eliminar a <b>{{ usuario.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="modalBorrarRegistro = false" />
                        <Button label="SI" icon="pi pi-check" class="p-button-text" @click="deleteClient(usuario.id)" />
                    </template>
                </Dialog>


            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>
