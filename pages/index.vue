<template>
  <div>
    <nuxt-child />
    <v-bottom-navigation
    absolute
    bottom
    :value="value"
    color="primary"
    class="hidden-md-and-up"
  >
    <v-btn v-for="(item, index) in navs" :to="item.to"  exact-path :key="index">
      <span>{{item.name}}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useContext, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  // middleware: 'auth',
  setup() {
    const { $axios, store } = useContext()
    const router = useRouter()
    const value = ref<number>(1)
     const navs = ref<{name: string; to: string, icon: string}[]>([
            { icon: 'mdi-account', name: 'Profile', to: '/' },
            { icon: 'mdi-account-group', name: 'Buddies', to: '/buddies' },
            { icon: 'mdi-magnify', name: 'Discover', to: '/discover' },
            { icon: 'mdi-cog', name: 'Settings', to: '/settings' },
        ])
    onMounted(async () => {
        await $axios.$get('/user/auths')
        .then(res => {
          store.commit('SetUser', res)
          console.log(res)
        })
        .catch(err => router.push('/login'))
    })
    
    return { value, navs }
  },
})
</script>

<style scoped>
.img-position{
  position: relative;
  bottom: 5em;

}
</style>

