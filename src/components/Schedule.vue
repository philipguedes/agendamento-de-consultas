<template>
  <div>
  <b-card>
    <div class="row">
      <div class="col-md-12">
          <p>oi</p>
      </div>
    </div>
   </b-card>
  </div>
</template>

<script>
export default {
  name: 'schedule',
  data () {
    return {
      date: new Date(),
      options: {
        format: 'DD/MM/YYYY',
        useCurrent: false,
        daysOfWeekDisabled: [0, 6]
      }
    }
  },
  methods: {
    disableDate: (dt) => {
      console.log('hey, ' + dt)
    },
    onDateChange () {
      console.log(this)
      this.$emit('changed', this.date)
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>

