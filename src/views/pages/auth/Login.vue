
<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/store/user.js';

const authStore = useUserStore();

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const submit1 = async () => {
      const response = await axios.post('/login', {
        email: email.value,
        password: password.value,
      });
      localStorage.setItem('token', response.data.token);
      await 
    router.push('/');
    };

    const submit = async () => {
        let data = {
            email: email.value,
        password: password.value,
    }
    
 await authStore.login(data);
    };

    return {
      email,
      password,
      submit,
    };
  },
};
</script>
<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--secondary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/logo-1.png" alt="Image" height="80" class="mb-3" />
                    </div>
                    <form class="space-y-4" @submit.prevent="submit">
      
                    <div>
                        <label for="email" class="block text-900 text-xl font-medium mb-2">Cédula</label>
                        <InputText id="email" type="text" placeholder="Ingrese su cedula" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" />

                        <label for="password" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="password" v-model="password" placeholder="Ingrese su contraseña" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

            
                        <Button type="submit" label="INGRESAR" class="w-full p-3 text-xl"></Button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
