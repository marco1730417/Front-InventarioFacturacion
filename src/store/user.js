// /store/user.js
//this.router para store de pinia funciona como plugin, por esta razon fue necesario cambiar el main.js para poder trabajar con pinia y this.router al mismo tiempo
import axios from 'axios'
import { defineStore } from "pinia";
import { inject } from 'vue'

export const useUserStore = defineStore("user", {
  
    state: () => ({

        user: null,
        mensaje: null,
        token: null,
        establecimiento:null,
        rol_funcionario:null,
        secret : 12345,
        dataencrypted:null,
    }),

    
    
    persist: true,

    actions: {
        async login(datos) {
            try {
                const res = await axios.post('login', datos);
                this.mensaje = res.data;
                //Validamos que al menos exista el dato usuario para cargar los estados
                if (this.mensaje.user) {
                    this.user = this.mensaje.user;
                    this.token = this.mensaje.token;
                    this.router.push({ path: '/' }); // Pantalla de usuario administrador
                }
            } catch (error) {
                if (error.response.status === 401) {
                    // Mostrar alerta de credenciales incorrectas
                    alert('Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.');
                } else {
                    // Otro manejo de errores
                    console.error('Error en la solicitud:', error);
                }
            }
        }
     ,
        
        
        async logout(datos) {
            try {
                
            const res =  await axios.post('logout', datos);
            this.mensaje = res.data;
            if(this.mensaje.status == 200)
            this.router.push({ path: '/auth/login' }); 
        } catch (err) {
        /*     location.reload(); */
          }
        },

    


    },


});