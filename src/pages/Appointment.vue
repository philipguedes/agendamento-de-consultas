<template>
  <user-info></user-info>
</template>

<script>
import Scheduling from '../views/appointment/Scheduling'
import UserInfo from '../views/appointment/UserInfo'

export default {
  name: 'appointment',
  data () {
    return {}
  },
  components: {
    Scheduling, UserInfo
  }
}
</script>
