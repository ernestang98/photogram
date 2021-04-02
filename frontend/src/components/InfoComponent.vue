<template>
  <div class="hello">
    <h1>{{ Welcome }}</h1>
    <div class="details">
      <br>
      <img alt="" src="https://miro.medium.com/max/442/1*TjRR2msP6G116cSOr_96VA.png">
      <h4>Information about application:</h4>
      <div class="container">
        <div class="info">
          <p class="details" v-for="element in data" v-bind:key="element">• {{ element }}</p>
        </div>
      </div>
      <br><br>
    </div>
    <router-link to="/login" tag="button" class='btn btn-primary'>Login</router-link>
    <router-link to="/register" tag="button" class="btn btn-secondary">Register</router-link>
  </div>
</template>

<script>
export default {
  name: 'Info',
  data() {
    return {
      data: [
        'MEVN Stack - MongoDB, Express.js, Vue.js, Node.js',
        'Deployed on Github Pages & Heroku Servers',
        'Login & Registration Services',
        'Authentication with JWT Token',
        'CRUD (Create-Read-Use-Delete) Services'
      ],
      message: ""
    }
  },
  props: ['Welcome']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hello {
  margin-top: 60px;
}

h3 {
  margin: 40px 0 0;
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
  color: #42b983;
}

.info {
  text-align: left;
  margin: 0 auto;
  padding-left: 32%;
  padding-top: 3%
}

.btn {
  margin: 0 5px 0 5px;
}

h4 {
  margin: 20px 0 20px 0;
}

</style>
