<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRestApi } from '@/composables/crud';
import { useUserStore } from '@/store/user.js';

const auth = useUserStore();

const { GuardarMarcacionSalida, datos, GuardarMarcacion, obtenerRegistros } = useRestApi() //Instancia composable Rest
const url = ref('marcaciones');
const urlusuarios = ref('usuarios');
const time = ref()
const fecha = ref()
const timesalida = ref()
const fechasalida = ref()
const selectedUsuario = ref();
const selectedUsuarioSalida = ref();

const marcacion = ref({});
const fecha_inicio = ref(null);
const fecha_fin = ref(null)
const dt = ref(null)
const filters = ref({})
const submitted = ref(false)
const usuario = ref(auth.user.id)


const dataenviar = ref({ usuario_id: selectedUsuario })
dataenviar.value.fecha = fecha
dataenviar.value.hora = time

const dataenviarsalida = ref({ usuario_id: selectedUsuarioSalida })
dataenviarsalida.value.fechasalida = fechasalida
dataenviarsalida.value.hora_salida = timesalida


marcacion.value.usuario_id = usuario.value

onBeforeMount(() => {
    initFilters();
});
onMounted(() => {


    obtenerRegistros(urlusuarios.value);   

});

const GuardarMarcacionIng = () => {

    GuardarMarcacion(url.value, dataenviar.value);

};
const GuardarMarcacionSa = () => {

    GuardarMarcacionSalida(url.value, dataenviarsalida.value);

};



const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-12">
            <Toast />
            <div class="card">
                <h5>Ingreso Manual para Hora de Ingreso</h5>
            <div class="p-fluid grid">
                    <div class="col-9 md:col-3">
                        <div class="field">
                            <label for="inputtext">Elija el Usuario</label>
                            <Dropdown v-model="selectedUsuario" :options="datos" optionLabel="name" placeholder="Eliga un usuario"
                                    class="w-full md:w-14rem" />
                        </div>
                   
                    </div>

                    <div class="col-9 md:col-3">
                        <div class="field">
                            <label for="inputmask">Selecione una fecha</label>
                             <input type="date" v-model="fecha" id="appt" name="appt" min="09:00" max="18:00" required />
 
                         <!--    <Calendar v-model="fecha" />
 -->
                        </div>
                
                    </div>
                    <div class="col-9 md:col-3">
                        <div class="field">
                            <label for="inputmask">Escriba una hora</label>
                           <input type="time" v-model="time" id="appt" name="appt" min="09:00" max="18:00" required />
                       <!--      <Calendar id="calendar-timeonly" v-model="time" timeOnly />
                        --> </div>
                
                    </div>
                    <div class="col-9 md:col-3">
                        <div class="field">
                            <label for="inputmask">Acciones</label>
                            <Button label="Guardar" icon="pi pi-save" class="p-button-success" @click="GuardarMarcacionIng" />
              
                        </div>
                
                    </div>
                </div>
            </div>
  
                
            <div class="card">
                <h5>Ingreso Manual para Hora de Salida</h5>
          
            <div class="p-fluid grid">
                    <div class="col-9 md:col-3">
                        <div class="field">
                            <label for="inputtext">Elija el Usuario</label>
                            <Dropdown v-model="selectedUsuarioSalida" :options="datos" optionLabel="name" placeholder="Eliga un usuario"
                                    class="w-full md:w-14rem" />
                        </div>
                   
                    </div>

                    <div class="col-9 md:col-3">
                        <div class="field">
                            <label for="inputmask">Selecione una fecha</label>
                             <input type="date" v-model="fechasalida" id="appt" name="appt" min="09:00" max="18:00" required />
 
                         <!--    <Calendar v-model="fecha" />
 -->
                        </div>
                
                    </div>
                    <div class="col-9 md:col-3">
                        <div class="field">
                            <label for="inputmask">Escriba una hora</label>
                           <input type="time" v-model="timesalida" id="appt" name="appt" min="09:00" max="18:00" required />
                       <!--      <Calendar id="calendar-timeonly" v-model="time" timeOnly />
                        --> </div>
                
                    </div>
                    <div class="col-9 md:col-3">
                        <div class="field">
                            <label for="inputmask">Acciones</label>
                            <Button label="Guardar" icon="pi pi-save" class="p-button-success" @click="GuardarMarcacionSa" />
              
                        </div>
                
                    </div>
                </div>
            </div>

          <!--       <Toolbar class="mb-4">
             
             <template v-slot:start>
            
                 <div class="my-6">
                     <div class="card flex justify-content-center">
                         <Dropdown v-model="selectedUsuario" :options="datos" optionLabel="name" placeholder="Eliga un usuario"
                             class="w-full md:w-14rem" />
                     </div>
                 </div>
                 <div class="my-2">
                     <div class="card flex justify-content-center">
                        <input type="date" v-model="fechasalida" id="appt" name="appt" min="09:00" max="18:00" required />

                     </div>
                 </div>
                 <div class="my-2">
                     <div class="card flex justify-content-center">
                        <input type="time" v-model="timesalida" id="appt" name="appt" min="09:00" max="18:00" required />
                        
                     </div>
                 </div>
             </template>

             <template v-slot:end>
                 <Button label="Guardar Salida" icon="pi pi-save" class="p-button-danger" @click="GuardarMarcacionSa" />
             </template>
         </Toolbar> -->

    </div>
</div>
</template>


<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>
