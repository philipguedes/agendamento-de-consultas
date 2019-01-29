<template>
  <div>
    <v-tabs
      centered
      color="cyan"
      dark
      icons-and-text
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab href="#tab-1">
        Criar
        <v-icon>fas fa-edit</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Buscar
        <v-icon>fas fa-search</v-icon>
      </v-tab>


      <v-tab-item :value="'tab-1'">
        <create-appointment></create-appointment>
      </v-tab-item>

      <v-tab-item :value="'tab-2'">
        <search-appointment></search-appointment>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import CreateAppointment from '@/views/admin/CreateAppointment'
import SearchAppointment from '@/views/admin/SearchAppointment'

export default {
  name: 'admin',
  data () {
    return {}
  },
  components: {
    CreateAppointment, SearchAppointment
  }
}
</script>

<style>
.appointment {
  height: 300px;
  width: 640px;
}
</style>
