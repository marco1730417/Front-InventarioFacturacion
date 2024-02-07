<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user.js';
const authStore = useUserStore();
const { layoutConfig, onMenuToggle, contextPath } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();
const menu = ref();
const toggle = (event) => {
            menu.value.toggle(event);
           
        }
        const items = ref([
            {
                label:'Dashboard',
                icon:'pi pi-fw pi-home',
                to: '/', 
            },
       
           
            {
                separator:true
            },
            {
                label:'Cerrar sesión',
                icon:'pi pi-fw pi-power-off',
                command: () => logout()
          
            }
        ]);

onMounted(() => {
    bindOutsideClickListener();
});

const logout = async () => {
    let data = {
        id: authStore.user.id,
    }
    await authStore.logout(data);
    authStore.$reset();
};

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};
const onSettingsClick = () => {
    topbarMenuActive.value = false;
    router.push('/documentation');
};
const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>GATFC</span>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
          <!--   <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <i class="pi pi-calendar"></i>
                <span>Calendar</span>
            </button>
            <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <i class="pi pi-user"></i>
                <span>Profile</span>
            </button>
            <button @click="onSettingsClick()" class="p-link layout-topbar-button">
                <i class="pi pi-cog"></i>
                <span>Settings</span>
            </button> -->

   <Button severity="secondary" raised icon="pi pi-users" :label="authStore.user.name" @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu"/>
   
           <!--  <button @click="toggle()" class="p-link layout-topbar-button"
            aria-haspopup="true" aria-controls="overlay_tmenu"
            >
                <i class="pi pi-users"></i>
                <span>{{authStore.user.name}}</span>
            </button> -->

    <TieredMenu id="overlay_tmenu" ref="menu" :model="items" :popup="true" />



        </div>
    </div>
</template>

<style lang="scss" scoped></style>
