<template>
  <div class="info">
    <v-form
      ref="form"
      v-model="form"
      class="pa-3 pt-4"
    >
      <v-text-field
        v-model="name"
        :rules="[rules.name, rules.length(3)]"
        regular
        label="Name"
      ></v-text-field>
      <v-text-field
        v-model="phone"
        regular
        label="Celular"
        mask="(##) # ####-####"
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        regular
        label="Email"
        type="email"
        error
      ></v-text-field>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'user-info',
  data () {
    return {
      agreement: false,
      email: undefined,
      form: false,
      isLoading: false,
      name: undefined,
      phone: undefined,
      rules: {
        name: v => (v || '').match(/[A-Za-z]+/) || 'Nome inválido',
        email: v => (v || '').match(/@/) || 'Email inválido',
        length: len => v => (v || '').length >= len || `O campo deve ter no mínimo ${len} caracteres`
      }
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<style>
.info {
  min-width: 300px;
  height: 100%;
}
</style>
