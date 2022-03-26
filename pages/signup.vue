<template>
  <v-form @submit.prevent="handleSignup"> 
      <cards>
      <template v-slot:title>
          <div>Register</div>
      </template>
      <template v-slot:contents>
            <v-text-field v-model="userDetails.email" label="Email" ></v-text-field>
            <v-text-field label="Phonenumber" v-model="userDetails.phonenumber" ></v-text-field>
            <v-select
                v-model="userDetails.interest"
                :items="['Football', 'Basketball', 'Ice Hockey', 'Motorsports', 'Bandy', 'Rugby', 'Skiing', 'Shooting']"
                label="Choose Interest"
                item-color="grey"
            ></v-select>
            <v-text-field v-model="userDetails.password" label="Password" type="password" ></v-text-field>
      </template>
       <template v-slot:buttons>
                <v-btn :loading="loading" type="submit" x-large color="#1565C0">sign up</v-btn>
                <v-btn to="/login" x-large >login</v-btn>
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
import { userDetails } from '~/types/interface'

export default defineComponent({
    setup() {
        const userDetails = ref<userDetails>({
            email: '',
            phonenumber: '', 
            password: '',
            interest: ''
        })
        const message = ref<string>('')
        const loading = ref<boolean>(false)
        const snackbar = ref<boolean>(false)

        const { $axios, store } = useContext()
        const router = useRouter()

        const handleSignup = async () => {
            loading.value = !loading.value
            await $axios.post('/user/signup', userDetails.value)
            .then( res => {
                loading.value = !loading.value
                snackbar.value = !snackbar.value
                message.value = res.data
                router.push('/login')
            })
            .catch(err => {
                loading.value = !loading.value
                snackbar.value = !snackbar.value
                 message.value = err.response.data
            })
        }

        onMounted(async () => {
        await $axios.$get('/user/auths')
        .then(res => {
            store.commit('SetUser', res)
            router.push('/')
        })
        .catch(err => router.push('/signup'))
    })



        return { userDetails, loading, handleSignup, message, snackbar }
    },
})
</script>
