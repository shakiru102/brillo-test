<template>
    <v-app-bar flat color="transparent" >
        <v-app-bar-title>BRILLOCONNECTZ</v-app-bar-title>
        <v-spacer></v-spacer>
        <div class="hidden-sm-and-down" v-if="$store.state.user != null">
            <v-btn v-for="(item, index)  in navs" :key="index" small :to="item.to" text dark>
                <v-icon left small>{{ item.icon }}</v-icon>
                {{ item.name }}
            </v-btn>
        </div>
    </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
    setup() {
        const navs = ref<{name: string; to: string; icon: string}[]>([
            { icon: 'mdi-account', name: 'Profile', to: '/' },
            { icon: 'mdi-account-group', name: 'Buddies', to: '/buddies' },
            { icon: 'mdi-magnify', name: 'Discover', to: '/discover' },
            { icon: 'mdi-cog', name: 'Settings', to: '/settings' },
        ])

        return { navs }
    },
})
</script>
