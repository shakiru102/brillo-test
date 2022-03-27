<template>
  <v-container class="pt-10" >
      <v-row justify="center" align="center" v-if="$store.state.user">
    <v-col cols="12" sm="8" md="6">
      <v-card min-height="500px" color="transparent">
        <v-img :src="require('@/assets/Rectangle 5.jpg')" alt="cover-image"></v-img>
        <v-card-text class="d-flex justify-center">
        <div class="text-center img-position" >
          <v-avatar
          size="150px"
        >
          <v-img :src="require('@/assets/WhatsApp Image 2022-02-19 at 6.59.23 PM.jpeg')" alt="alt"></v-img>
        </v-avatar> 
          <div class="mt-3">{{ $store.state.user.email }}</div>
          <div>{{ $store.state.user.phonenumber }}</div>
          <div>{{ $store.state.user.interest }}</div>
        </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    
  },
})
</script>

<style scoped>
.img-position{
  position: relative;
  bottom: 5em;

}
</style>
