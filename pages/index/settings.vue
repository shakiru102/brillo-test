<template>
    <v-container class="">
      <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card min-height="500px" flat color="transparent pb-10" v-if="profile != null">
        <v-card-text>
        <v-card-title >
            <div>Profile</div>
            <v-spacer></v-spacer>
            <v-btn @click="handleSignout" color="error" icon >
                <v-icon>mdi-power</v-icon>
            </v-btn>
        </v-card-title>
        <v-text-field dense v-model="profile.username" label="Username"></v-text-field>
        <v-text-field dense v-model="profile.email" label="Email"></v-text-field>
        <v-text-field dense v-model="profile.phonenumber" label="Phonenumber"></v-text-field>
        <v-select
            dense
            v-model="profile.interest"
            :items="['Football', 'Basketball', 'Ice Hockey', 'Motorsports', 'Bandy', 'Rugby', 'Skiing', 'Shooting']"
            label="Interest"
        ></v-select>
        <v-btn absolute @click="handleProfileUpdate" :loading="updateProfile" right color="primary" text>update profile</v-btn>
        </v-card-text>
        <v-card-text>
        <v-card-title>Password</v-card-title>
        <v-text-field dense type="password" v-model="changePassword.password" label="Current Password"></v-text-field>
        <v-text-field dense type="password" v-model="changePassword.newPassword" label="New Password"></v-text-field>
        <v-btn @click="handlePasswordUpdate" :loading="updatePasssword" absolute right color="primary" text>update password</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-snackbar
       v-model="snackbar"
       top
       light
       color="#E0E0E0"
   >
       <div class="caption text-center">{{ message }}</div>
   </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useContext, useRouter } from '@nuxtjs/composition-api'
import { changePassword, userDetails } from '~/types/interface'

export default defineComponent({
    setup() {
     
     const profile = ref<userDetails>({
         email: '',
        phonenumber: '',
        interest: '',
        password: '',
         _id: '',
         username: ''
     })
     const updateProfile = ref<boolean>(false)
     const updatePasssword = ref<boolean>(false)
     const snackbar = ref<boolean>(false)
     const message = ref<string>('')
     const changePassword = ref<changePassword>({
         password: '',
         newPassword: ''
     })
     const { $axios, store } = useContext()
     const router = useRouter()

     const handleProfileUpdate = async () => {
         try {
             updateProfile.value = !updateProfile.value
            const res = await $axios.post(`/user/updatedata/${profile.value?._id}`, { 
                email: profile.value?.email,
                phonenumber: profile.value?.phonenumber,
                interest: profile.value?.interest,
                username: profile.value?.username
             } as userDetails)
            snackbar.value = !snackbar.value
            message.value = res.data
            updateProfile.value = !updateProfile.value
            store.commit('SetUser', {
                email: profile.value.email,
                phonenumber: profile.value.phonenumber,
                interest: profile.value.interest,
                username:  profile.value.username,
                _id: profile.value._id
            } as userDetails)
         } catch (error: any) {
             snackbar.value = !snackbar.value
            message.value = error.response.data
            updateProfile.value = !updateProfile.value
         }
     }

     const handlePasswordUpdate = async () => {
         updatePasssword.value = !updatePasssword.value
        await $axios.post(`/user/updatepassword/${ profile.value?._id }`, changePassword.value)
        .then(res => {
            snackbar.value = !snackbar.value
            message.value = res.data
            updatePasssword.value = !updatePasssword.value
        })
        .catch(err => {
            snackbar.value = !snackbar.value
            message.value = err.response.data
            updatePasssword.value = !updatePasssword.value
        })
     }

     onMounted(() => {
         const data = store.state.user
         profile.value.email = data.email
         profile.value.phonenumber = data.phonenumber
         profile.value.interest = data.interest
         profile.value._id = data._id
         profile.value.username = data.username
     })

     const handleSignout = async () => {
         console.log('clicked')
         await $axios.get('/user/signout')
         .then(() => router.push('/login'))
     }

     return { profile , changePassword , snackbar , message , updatePasssword , updateProfile, handleProfileUpdate, handlePasswordUpdate , handleSignout }
       
        
    },
})
</script>

