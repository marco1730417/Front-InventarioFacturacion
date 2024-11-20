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
                            <Button label="Nuevo" icon="pi pi-plus" class="p-button-success mr-2"
                                @click="nuevoRegistro" />
                  
                        </div>
                    </template>

                </Toolbar>

                <DataTable :value="datos" v-model:expandedRows="expandedRows" dataKey="empId" responsiveLayout="scroll">

                    <Column :expander="true" headerStyle="width: 3rem" />
                    <Column field="name" header="EMPRESA" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.empNombre }}
                        </template>
                    </Column>

                    <Column field="empUbicacion" header="UBICACION" :sortable="true"
                       >
                        <template #body="slotProps">
                            <span class="p-column-title">UBICACION</span>
                            {{ slotProps.data.empUbicacion }}
                        </template>
                    </Column>


                    <Column field="empCorreo" header="CONTACTOS" :sortable="true"
                       >
                        <template #body="slotProps">
                            <span class="p-column-title">CONTACTOS</span>
                            {{ slotProps.data.empCorreo }} <br>  {{ slotProps.data.empTelefono }}
                        </template>
                    </Column>
                 
                    <Column headerStyle="min-width:10rem;" header="ACCIONES ">
                        <template #body="slotProps">
                            <Button title="Editar empresa" icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="edicionRegistro(slotProps.data)" />
                
                            <Button title="Agregar sucursal" icon="pi pi-home" class="p-button-rounded p-button-info mt-2"
                                @click="crearSucursal(slotProps.data.empId)" />

                        </template>
                    </Column>
                    <template #expansion="slotProps">
                        <div class="p-3">
                            <h6 class="text-center"><strong>SUCURSALES -  {{ slotProps.data.empNombre }}</strong> </h6>
                            <DataTable :value="slotProps.data.sucursales" responsiveLayout="scroll">
                                <template #empty> Ninguna sucursal asociada. </template>

                                <Column field="id" header="SUCURSAL" :sortable="true">
                                    <template #body="sucursalData">
                                        {{ sucursalData.data.sucNombre }}
                                    </template>
                                </Column>
                                <Column field="id" header="UBICACION" :sortable="true">
                                    <template #body="sucursalData">
                                        {{ sucursalData.data.sucUbicacion }}
                                    </template>
                                </Column>
                             
                                <Column field="date" header="CONTACTOS" :sortable="true">
                                    <template #body="sucursalData">
                                        {{ sucursalData.data.sucTelefono }} <br>
                                        - {{ sucursalData.data.sucCorreo }} </template>
                                </Column>


                                <Column headerStyle="width:4rem">
                                    <template #body="sucursalData">
                                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                        @click="edicionRegistroSucursal(sucursalData.data )" />

                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </template>
                </DataTable>

                <!-- EMPRESAS -->

                <Dialog v-model:visible="modalRegistro" :style="{ width: '750px' }" header="Nueva Empresa"
                    :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Nombre</label>
                  
                   

                        <InputText id="name" v-model.trim="empresa.empNombre" required="true" autofocus :class="{ 'p-invalid': submitted && !empresa.empNombre }" />
                        <small class="p-invalid" v-if="submitted && !empresa.empNombre">Nombre es requerido.</small>                    
                    </div>


                    <div class="field">
                        <label for="name">Ubicacion</label>
                        <InputText id="name" v-model.trim="empresa.empUbicacion"
                            />
                    </div>

                    <div class="field">
                        <label for="name">Correo</label>
                        <InputText id="name" v-model.trim="empresa.empCorreo" required="true" autofocus
                            :class="{ 'p-invalid': submitted && !empresa.empCorreo }" />
                        <small class="p-invalid" v-if="submitted && !empresa.empCorreo">Correo es requerido.</small>
                    </div>

                    
                    <div class="field">
                        <label for="name">Teléfono</label>
                        <InputText id="name" v-model.trim="empresa.empTelefono" />
                    </div>

                    <h5>Tipos de Ingesta</h5>

              
                   <div class="grid">
                        
                  
                        <div v-for="(item, index) in datosIngestas" :key="index" class="col-12 md:col-4">
                            <div class="field-checkbox mb-0">
                                <Checkbox :id="`checkOption${index}`" name="option"
                                          :class="{ 'p-invalid': submitted && selectedIds.length === 0 }"
                                          :value="item.id" v-model="selectedIds" />
                                <label :for="`checkOption${index}`"> {{ item.nombre }} </label>
                            </div>
                        <small class="p-invalid" v-if="submitted && checkboxValue.length == 0">Debe elegir al menos una ingesta.</small>

                    </div>
                
                
                </div> 

                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="ocultarModal" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="guardareditarRegistro" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="modalBorrarRegistro" :style="{ width: '450px' }" header="Confirmar"
                    :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="empresa">Estas seguro de eliminar a <b>{{ empresa.name }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text"
                            @click="modalBorrarRegistro = false" />
                        <Button label="SI" icon="pi pi-check" class="p-button-text" @click="deleteClient(empresa.id)" />
                    </template>
                </Dialog>

                <!--   SUCURSALES -->

                <Dialog v-model:visible="modalSucursal" :style="{ width: '750px' }" header="Agregar Sucursal"
                    :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Nombre</label>
                        <InputText id="name" v-model.trim="sucursal.sucNombre" required="true" autofocus
                            :class="{ 'p-invalid': submitted && !empresa.sucNombre }" />
                        <small class="p-invalid" v-if="submitted && !empresa.sucNombre">Name is required.</small>
                    </div>


                    <div class="field">
                        <label for="name">Descripcion</label>
                        <InputText id="name" v-model.trim="sucursal.sucDescripcion" required="true" autofocus
                            :class="{ 'p-invalid': submitted && !sucursal.sucDescripcion }" />
                        <small class="p-invalid" v-if="submitted && !sucursal.sucDescripcion">Numero de cedula es
                            requerido.</small>
                    </div>

                    <div class="field">
                        <label for="name">Ubicacion</label>
                        <InputText id="name" v-model.trim="sucursal.sucUbicacion" required="true" autofocus
                            :class="{ 'p-invalid': submitted && !sucursal.sucUbicacion }" />
                        <small class="p-invalid" v-if="submitted && !sucursal.sucUbicacion">Ubicacion es
                            requerido.</small>
                    </div>



                    <div class="field">
                        <label for="name">Correo</label>
                        <InputText id="name" v-model.trim="sucursal.sucCorreo" required="true" autofocus
                            :class="{ 'p-invalid': submitted && !sucursal.sucCorreo }" />
                        <small class="p-invalid" v-if="submitted && !sucursal.sucCorreo">Correo es requerido.</small>
                    </div>



                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="ocultarModal" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text"
                            @click="guardareditarRegistroSucursal" />
                    </template>
                </Dialog>

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