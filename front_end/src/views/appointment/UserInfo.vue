<template>
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
      placeholder="(Opcional)"
      mask="(##) #####-####"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="[rules.email]"
      regular
      label="Email"
      type="email"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  name: 'user-info',
  data () {
    return {
      form: false,
      email: undefined,
      name: undefined,
      phone: undefined,
      rules: {
        name: v => (v || '').match(/[A-Za-z]+/) || 'Nome inválido',
        email: v => (v || '').match(/\S+@\S+\.\S+/) || 'Email inválido',
        length: len => v => (v || '').length >= len || `O campo deve ter no mínimo ${len} caracteres`
      }
    }
  },
  props: {
    name: String,
    phone: String,
    email: String,
    valid: Boolean
  },
  computed: {
    validName () {
      const re = /[A-Za-z]+/
      const { name } = this.user
      return re.test(name)
    },
    validEmail () {
      const re = /\S+@\S+\.\S+/
      const { email } = this.user
      return re.test(email)
    }
  },
  watch: {
    name () {
      this.valid = this.validName && this.validEmail
    },
    email () {
      this.valid = this.validName && this.validEmail
    },
    phone () {
      this.valid = this.validName && this.validEmail
    }
  }
}
</script>

<style>
.info {
  min-width: 300px;
  height: 100%;
}
</style>
