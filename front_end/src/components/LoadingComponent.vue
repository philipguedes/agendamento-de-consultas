<template>
  <v-dialog v-model="loading" persistent no-click-animation width="50%">
    <v-card>
      <v-card-text>
        <v-progress-linear :indeterminate="true" color="primary"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'loading-component',
  data () {
    return {}
  },
  props: {
    loading: Boolean
  }
}
</script>