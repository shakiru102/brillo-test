<template>
    <v-form @submit.prevent="handleLogin"> 
        <cards>
        <template v-slot:title>
            <div>Login</div>
        </template>
        <template v-slot:contents>
            <v-text-field v-model="user.username" label="Enter email or number" ></v-text-field>
            <v-text-field v-model="user.password" label="Password" type="password" ></v-text-field>
            </template>
            <template v-slot:buttons>
                <v-btn type="submit" x-large  :loading="loading" color="#1565C0">login</v-btn>
                <v-btn to="/signup"  x-large  >sign up</v-btn>
            </template>
        </cards>
        <v-snackbar
        v-model="snackbar"
        top
        light
        color="#E0E0E0"
        >
       <div class="caption text-center">{{ message }}</div>
   </v-snackbar> 
    </v-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useContext, useRouter } from '@nuxtjs/composition-api'
import { loginDetails } from '~/types/interface'

export default defineComponent({

    setup() {

        const user = ref<loginDetails>({
            username: '',
            password: ''
        })
        const loading = ref<boolean>(false)
        const snackbar = ref<boolean>(false)
        const message = ref<string>('')
        const router = useRouter()
        const { $axios, store } = useContext()

         onMounted(async () => {
        await $axios.$get('/user/auths')
        .then(res => {
            store.commit('SetUser', res)
            router.push('/')
        })
        .catch(err => router.push('/login'))
    })

        const handleLogin = async () => {
            loading.value = !loading.value
            await $axios.post('/user/login', user.value)
            .then(() => {
              loading.value = !loading.value
              router.push('/')
            })
            .catch(err => {
              loading.value = !loading.value
              snackbar.value = !snackbar.value
              message.value = err.response.data
              
            })
        }
        

        return { handleLogin, snackbar, loading, message, user }
    },
})
</script>
