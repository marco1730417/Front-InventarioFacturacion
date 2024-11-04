<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
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
const dt = ref(null);
const filters = ref({});
const radioValue = ref(null);
const checkboxValue = ref([]);
const submitted = ref(false);

const expandedRows = ref([]);

onBeforeMount(() => {
    initFilters();
});
onMounted(() => {

    obtenerRegistros(url.value);
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
    submitted.value = false;
};

const guardareditarRegistro = () => {

    submitted.value = true;
    if (empresa.value) {
        if (empresa.value.empId) {
            //Edicion

            empresa.value.ingestas= checkboxValue.value

            editarRegistro(url.value, empresa.value);

            obtenerRegistros(url.value);

        } else {

            empresa.value.ingestas= checkboxValue.value
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
    modalRegistro.value = true;
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

                    <template v-slot:end>
                        <Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable :value="datos" v-model:expandedRows="expandedRows" dataKey="empId" responsiveLayout="scroll">

                    <Column :expander="true" headerStyle="width: 3rem" />
                    <Column field="name" header="EMPRESA" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.empNombre }}
                        </template>
                    </Column>


                    <!--   <Column field="empDescripcion" header="DESCRIPCION" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">DESCRIPCION</span>
                            {{ slotProps.data.empDescripcion }}
                        </template>
                    </Column> -->
                    <Column field="empUbicacion" header="UBICACION" :sortable="true"
                        headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">UBICACION</span>
                            {{ slotProps.data.empUbicacion }}
                        </template>
                    </Column>


                    <Column field="empCorreo" header="CONTACTOS" :sortable="true"
                        headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">CONTACTOS</span>
                            {{ slotProps.data.empCorreo }} - {{ slotProps.data.empTelefono }}
                        </template>
                    </Column>
                    <!--  <Column field="empCorreo" header="TELEFONO" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">TELEFONO</span>
                            {{ slotProps.data.empTelefono }}
                        </template>
                    </Column> -->
                    <Column headerStyle="min-width:10rem;" header="ACCIONES ">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="edicionRegistro(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
                                @click="confirmarEliminarRegistro(slotProps.data)" />
                            <Button icon="pi pi-home" class="p-button-rounded p-button-info mt-2"
                                @click="crearSucursal(slotProps.data.empId)" />

                        </template>
                    </Column>
                    <template #expansion="slotProps">
                        <div class="p-3">
                            <h5>Sucursales de {{ slotProps.data.empNombre }}</h5>
                            <DataTable :value="slotProps.data.sucursales" responsiveLayout="scroll">
                                <Column field="id" header="SUCURSAL" :sortable="true">
                                    <template #body="slotProps">
                                        {{ slotProps.data.sucNombre }}
                                    </template>
                                </Column>
                                <Column field="id" header="UBICACION" :sortable="true">
                                    <template #body="slotProps">
                                        {{ slotProps.data.sucUbicacion }}
                                    </template>
                                </Column>
                                <!--  <Column field="customer" header="Customer" :sortable="true">
                                    <template #body="slotProps">
                                        {{ slotProps.data.sucDescripcion }}
                                    </template>
                                </Column> -->
                                <Column field="date" header="CONTACTOS" :sortable="true">
                                    <template #body="slotProps">
                                        {{ slotProps.data.sucTelefono }}
                                        - {{ slotProps.data.sucCorreo }} </template>
                                </Column>


                                <Column headerStyle="width:4rem">
                                    <template #body>
                                        <Button icon="pi pi-search" />
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </template>
                </DataTable>

                <!-- EMPRESAS -->

                <Dialog v-model:visible="modalRegistro" :style="{ width: '750px' }" header="Detalles de Registro"
                    :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Nombre</label>
                        <InputText id="name" v-model.trim="empresa.empNombre" required="true" autofocus
                            :class="{ 'p-invalid': submitted && !empresa.empNombre }" />
                        <small class="p-invalid" v-if="submitted && !empresa.empNombre">Name is required.</small>
                    </div>


                    <div class="field">
                        <label for="name">Descripcion</label>
                        <InputText id="name" v-model.trim="empresa.empDescripcion" required="true" autofocus
                            :class="{ 'p-invalid': submitted && !empresa.empDescripcion }" />
                        <small class="p-invalid" v-if="submitted && !empresa.empDescripcion">Numero de cedula es
                            requerido.</small>
                    </div>

                    <div class="field">
                        <label for="name">Ubicacion</label>
                        <InputText id="name" v-model.trim="empresa.empUbicacion" required="true" autofocus
                            :class="{ 'p-invalid': submitted && !empresa.empUbicacion }" />
                        <small class="p-invalid" v-if="submitted && !empresa.empUbicacion">Ubicacion es
                            requerido.</small>
                    </div>



                    <div class="field">
                        <label for="name">Correo</label>
                        <InputText id="name" v-model.trim="empresa.empCorreo" required="true" autofocus
                            :class="{ 'p-invalid': submitted && !empresa.empCorreo }" />
                        <small class="p-invalid" v-if="submitted && !empresa.empCorreo">Correo es requerido.</small>
                    </div>

                    <h5>Tipos de Ingesta</h5>
                    <div class="grid">
                        
                        <div v-for="(item, index) in datosIngestas" :key="index" class="col-12 md:col-4">
                            <div class="field-checkbox mb-0">
                                <Checkbox v-if="empresa.empId" id="checkOption1" name="option" :value="item.id" v-model="checkboxValue" />
                              
                                <label for="checkOption1"> {{ item.nombre }} </label>
                            </div>
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