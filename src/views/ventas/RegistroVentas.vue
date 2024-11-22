<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount, watch } from 'vue';
import { useRestApi } from '@/composables/crud';
import { format } from 'date-fns';

const { obtenerRegistrosVentas, venta_total,guardarDetalleVenta, obtenerIngestasEmpresa, ingestasEmpresa, obtenerRegistrosVenta, lobtenerRegistros, datos_ventas, obtenerTipoIngestas, datosIngestas, editarRegistro, datos, guardarRegistro, eliminarRegistro } = useRestApi() //Instancia composable Rest
const url = ref('ventas');
const urlsucursales = ref('sucursales');
const modalRegistro = ref(false);
const modalSucursal = ref(false);
const modalDetalleVenta = ref(false);
const modalBorrarRegistro = ref(false);
const venta = ref({
    venManoObra: null,
    venMateriaPrima: null,
    venEmpaques: null,
    venObservacion: null
});
const empresaId = ref();
const sucursalId = ref({})
const cantidades = ref({}); // Cantidades ingresadas para cada ingesta

const checkboxValue = ref([]);
const dt = ref(null);
const filters = ref({});
const radioValue = ref(null);
const submitted = ref(false);

const selectedIds = ref([]);

const expandedRows = ref([]);
const autoFilteredValue = ref([]);
const calendarValue = ref(null);

onBeforeMount(() => {
    initFilters();
});

watch(calendarValue, (newValue, oldValue) => {

    if (datos_ventas) {
        datos_ventas.value = {}
    }

    const formattedDate = format(newValue, "yyyy-MM-dd");
    obtenerRegistrosVentas(urlsucursales.value, formattedDate);
    obtenerRegistrosVenta(url.value, formattedDate);

})


const nuevoRegistro = () => {

    if (datos.value) {
        venta.value = datos.value;
        submitted.value = false;
        modalRegistro.value = true;
    } else {
        console.error("Datos no definidos. Verifica el origen de datos.");
        venta.value = {}
    }

    submitted.value = false;
    modalRegistro.value = true;
};


const nuevoDetalleVenta = (datos) => {
            // Inicializa las cantidades

            sucursalId.value = datos.sucId;

            

            obtenerIngestasEmpresa(url.value, datos.empId)

           // console.log(ingestasEmpresa);
            

            cantidades.value = {};

            if (datos.ventas && datos.ventas.length > 0) {
                console.log("entra");
                
                datos.ventas.forEach((venta) => {
                    cantidades.value[venta.tipoId] = venta.ingCantidad;
                });
            }  else {
                console.log("no entra");
                
            }
            // Mostrar el modal
            modalDetalleVenta.value = true;
        };

const ocultarModal = () => {
    modalRegistro.value = false;
    modalDetalleVenta.value = false;
    modalSucursal.value = false;
    submitted.value = false;
    cantidades.value = {}
};

const guardareditarRegistro = () => {

    const formattedDate = format(calendarValue.value, "yyyy-MM-dd");

    submitted.value = true;
        if (venta.value.venId) {

            editarRegistro(url.value, venta.value);

            obtenerRegistrosVenta(url.value, formattedDate);

        } else {

            venta.value.venFecha = formattedDate
            //Creacion
            guardarRegistro(url.value, venta.value);

            obtenerRegistrosVenta(url.value, formattedDate);

    }
    modalRegistro.value = false;
    venta.value = {};

};

const guardarDetalle = () => {
    const formattedDate = format(calendarValue.value, "yyyy-MM-dd");

    const data = {
        cantidades: cantidades.value,
        sucId: sucursalId.value,
        fecha: formattedDate
    }

    guardarDetalleVenta(url.value, data)

    submitted.value = true;
    modalDetalleVenta.value = false;
    venta.value = {};

    obtenerRegistrosVentas(urlsucursales.value, formattedDate);
    obtenerRegistrosVenta(url.value, formattedDate);

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
                <div class="col-12">

                    <div v-if="datos" class="grid">
                        <div class="col-12 md:col-6 lg:col-3">
                            <div class="shadow-2 p-3 border-round">
                                <div class="flex justify-content-between mb-3">
                                    <div>

                                        <span class="block text-500 font-medium mb-3">Costo MO</span>
                                        <div class="text-900 font-medium text-xl">$ {{ datos.venManoObra }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                        style="width: 2.5rem; height: 2.5rem">
                                        <i class="pi pi-user text-blue-500 text-xl"></i>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-3">
                            <div class="surface-card shadow-2 p-3 border-round">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Costo MP</span>
                                        <div class="text-900 font-medium text-xl">$ {{ datos.venMateriaPrima }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                                        style="width: 2.5rem; height: 2.5rem">
                                        <i class="pi pi-star-fill text-orange-500 text-xl"></i>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-3">
                            <div class="surface-card shadow-2 p-3 border-round">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Empaques</span>
                                        <div class="text-900 font-medium text-xl">$ {{ datos.venEmpaques }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round"
                                        style="width: 2.5rem; height: 2.5rem">
                                        <i class="pi pi-ticket text-cyan-500 text-xl"></i>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-3">
                            <div class="surface-card shadow-2 p-3 border-round">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Total Costo</span>
                                        <div class="text-900 font-medium text-xl">$ {{ datos.venCosto }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
                                        style="width: 2.5rem; height: 2.5rem">
                                        <i class="pi pi-dollar text-purple-500 text-xl"></i>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-3">
                            <div class="surface-card shadow-2 p-3 border-round">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Ingresos Totales</span>
                                        <div class="text-900 font-medium text-xl">$ {{ venta_total }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
                                        style="width: 2.5rem; height: 2.5rem">
                                        <i class="pi pi-dollar text-purple-500 text-xl"></i>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-3">
                            <div class="surface-card shadow-2 p-3 border-round">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Utilidad</span>
                                        <div class="text-900 font-medium text-xl">$ {{venta_total  - datos.venCosto  }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
                                        style="width: 2.5rem; height: 2.5rem">
                                        <i class="pi pi-dollar text-purple-500 text-xl"></i>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div v-if="datos.venObservacion" class="col-12 md:col-6 lg:col-6">
                            <div class="surface-card shadow-2 p-3 border-round">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Observacion</span>
                                        <div class="text-900 font-medium text-xl">{{datos.venObservacion}}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
                                        style="width: 2.5rem; height: 2.5rem">
                                        <i class="pi pi-eye text-purple-500 text-xl"></i>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>



                    <div class="card">


                        <h5>Seleccione una fecha</h5>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarValue"></Calendar>

                        <Button v-if="datos_ventas" label="Valores Generales" style="float: right" class="p-button-success mr-2"
                            @click="nuevoRegistro" />

                        <ToggleButton v-model="idFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open"
                            onLabel="Unfreeze Id" offLabel="Freeze Id" style="width: 10rem" />

                        <DataTable v-if="datos_ventas" :value="datos_ventas" :scrollable="true" scrollHeight="400px"
                            :loading="loading2" scrollDirection="both" class="mt-3">
                            <Column field="sucursal_nombre" header="Empresa" :sortable="true" :style="{ width: '100px' }" frozen>
                           
                                <template #body="slotProps">
                                    <span class="p-column-title">Empresa</span>
                                    <span> {{ slotProps.data.empresa_nombre }} <br>
                                        {{ slotProps.data.sucursal_nombre }}
                                    </span>
                                </template>

                            </Column>
                  


                            <Column field="empUbicventasacion" header="Ventas" :style="{ width: '300px' }" >
                                <template #body="slotProps">
                                    <span class="p-column-title">Ingestas</span>

                                    <DataTable :value="slotProps.data.ventas" :scrollable="true" 
                                        :loading="loading2" scrollDirection="both" class="mt-3">
                                        <template #empty> Ninguna venta asociada. </template>

                                        <Column field="nombre" header="Ingesta" >
                                            <template #body="slotProps">
                                                <span class="p-column-title">Tipo Ingesta</span>
                                                <span v-if="slotProps.data.venId != null"> {{ slotProps.data.nombre }}
                                                </span>
                                            </template>
                                        </Column>


                                        <Column field="ingCantidad" header="Cantidad" >
                                            <template #body="slotProps">
                                                <span class="p-column-title">Cantidad</span>
                                                <span v-if="slotProps.data.venId != null"> {{ slotProps.data.ingCantidad
                                                    }} </span>
                                            </template>
                                        </Column>
                                        <Column field="valor" header="Valor" >
                                            <template #body="slotProps">
                                                <span class="p-column-title">Valor</span>
                                                <span>$ {{ slotProps.data.valor
                                                    }} </span>
                                            </template>
                                        </Column>

                                        <Column field="total_ingesta" header="Total" >
                                            <template #body="slotProps">
                                                <span class="p-column-title">Total</span>
                                                <span>$ {{ slotProps.data.total_ingesta
                                                    }} </span>
                                            </template>
                                        </Column>

                                        


                                    </DataTable>

                                </template>
                            </Column>

                            <Column field="total_venta_diaria" header="Total">
                                <template #body="slotProps">
                                    <span class="p-column-title">Total</span>
                                    <span>$ {{ slotProps.data.total_venta_diaria
                                        }} </span>
                                </template>
                            </Column>

                            <Column header="Acciones ">
                                <template #body="slotProps">
                                    <Button title="Editar venta" icon="pi pi-pencil"
                                        class="p-button-rounded p-button-success mr-2"
                                        @click="nuevoDetalleVenta(slotProps.data)" />
                                </template>
                            </Column>
                        </DataTable>




                        <!-- VENTA GENERAL -->

                        <Dialog v-model:visible="modalRegistro" :style="{ width: '400px' }" header="Generales"
                            :modal="true" class="p-fluid">
                            <div class="field">
                                <label for="name">Mano de Obra</label>

                                <div class="p-inputgroup">
                                  <!--   <InputText v-model.trim="venta.venManoObra" required="true" autofocus
                                        :class="{ 'p-invalid': submitted && !venta.venManoObra }" placeholder="Price" /> -->

                                        <InputNumber  v-model.trim="venta.venManoObra" required="true" autofocus
                                        placeholder="Price" class="w-full" :min="0" />

                                    <span class="p-inputgroup-addon">$</span>
                                    <span class="p-inputgroup-addon">.00</span>
                                </div>

                                <small class="p-invalid" v-if="submitted && !venta.venManoObra">Mano de obra es
                                    requerido.</small>
                            </div>


                            <div class="field">
                                <label for="name">Materia Prima</label>

                                <div class="p-inputgroup">
                                <!--     <InputText v-model.trim="venta.venMateriaPrima" required="true" autofocus
                                        :class="{ 'p-invalid': submitted && !venta.venMateriaPrima }"
                                        placeholder="Price" /> -->

                                        <InputNumber  v-model.trim="venta.venMateriaPrima" required="true" autofocus
                                        placeholder="Price" class="w-full" :min="0" />

                                    <span class="p-inputgroup-addon">$</span>
                                    <span class="p-inputgroup-addon">.00</span>
                                </div>

                                <small class="p-invalid" v-if="submitted && !venta.venMateriaPrima">Materia Prima es
                                    requerido.</small>
                            </div>

                            <div class="field">
                                <label for="name">Empaques</label>

                                <div class="p-inputgroup">
                         <!--            <InputText v-model.trim="venta.venEmpaques" required="true" autofocus
                                        :class="{ 'p-invalid': submitted && !venta.venEmpaques }" placeholder="Price" /> -->

                                        <InputNumber  v-model.trim="venta.venEmpaques" required="true" autofocus
                                        placeholder="Price" class="w-full" :min="0" />

                                    <span class="p-inputgroup-addon">$</span>
                                    <span class="p-inputgroup-addon">.00</span>
                                </div>

                                <small class="p-invalid" v-if="submitted && !venta.venEmpaques">Materia Prima es
                                    requerido.</small>
                            </div>

                            <div class="field">
                                <label for="name">Observacion</label>

                                <Textarea v-model.trim="venta.venObservacion" id="venObservacion" rows="2" />

                            </div>


                            <template #footer>
                                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="ocultarModal" />
                                <Button label="Save" icon="pi pi-check" class="p-button-text"
                                    @click="guardareditarRegistro" />
                            </template>
                        </Dialog>

                        <!-- DETALLE VENTA -->
                        <Dialog v-model:visible="modalDetalleVenta" :style="{ width: '600px' }" header="Ingreso de Ingestas"
                            :modal="true" class="p-fluid">
                            <div class="field">

                                <div class="grid">

                                    <div v-for="(item, index) in ingestasEmpresa" :key="index" class="col-12 md:col-6">
                                        <div class="field">
                                            <!-- Nombre de la ingesta -->
                                            <label :for="`inputCantidad${index}`" class="block">
                                               <strong> {{ item.nombre
                                            }} </strong></label> <br>
                                            <!-- Input para la cantidad -->
                                            <InputNumber v-model="cantidades[item.tipoId]" :id="`inputCantidad${index}`"
                                                :placeholder="`Cantidad de ${item.nombre}`" class="w-full" :min="0" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <template #footer>
                                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="ocultarModal" />
                                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="guardarDetalle" />
                            </template>
                        </Dialog>


                    </div>
                </div>

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