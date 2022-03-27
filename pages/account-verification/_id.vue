<template>
<div v-if="!exists" class="parent">
       Loading
    </div>
    <div class="parent" v-else>
        <div v-if="verify" class="text-center">
            <v-icon color="success" size="100px">mdi-checkbox-marked-circle-outline</v-icon>
            <div class="success--text mt-5">Account has been verified</div>
        </div>
        <div v-else class="text-center">
            <v-icon color="error" size="100px">mdi-close-circle-outline</v-icon>
            <div class="error--text mt-5">Account was not verified</div>
        </div>
    </div>
    
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, useContext, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
    setup() {
        const verify = ref<boolean>(true)
        const exists = ref<boolean>(false)
        const { $axios } = useContext()
        const route = useRoute()
        onMounted(async () => {
          await $axios.get(`/api/user/verifyaccount?id=${ route.value.params.id }`)
          .then((res) => {
              verify.value = true
              exists.value = true
              console.log(res);
              
          })
          .catch(err => {
              verify.value = false
              exists.value = true
              console.log(err.response.data);
              
          })
        })
        return { verify, exists }
    },
})
</script>

<style lang="scss" scoped>
 .parent{
     height: 100vh;
     display: grid;
     place-items: center;
 }
</style>
