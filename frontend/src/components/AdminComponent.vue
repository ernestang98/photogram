<template>
  <div>
    <h1>You should not see this shit</h1>
    <button class="btn btn-danger" @click="handleSubmit">Logout</button>
    <button class="btn btn-dark" @click="testAPI">testAPI</button>
  </div>
</template>

<script>
import {getAuthToken} from "@/utils/auth";
import Axios from "axios";

export default {
  name: "Admin",
  methods: {
    async handleSubmit() {
      await setTimeout(()=>{
        alert("Logged Out!")
      }, 0)
      localStorage.setItem("auth-token","");
      localStorage.setItem("isAdmin","");
      this.$router.push("/login")
    },
    async testAPI() {
      const URL = "http://localhost:8080/api/"
      const token = getAuthToken()
      await Axios.get(URL, {
        headers: {
          "X-Auth-Token": token
        }
      }).then(res => {
        let array = []
        console.log(Object.keys(res.data).length)
        for (let i = 0; i < Object.keys(res.data).length; i++) {
          let key = Object.keys(res.data)[i].toString()
          let value = res.data[Object.keys(res.data)[i]].toString()
          let final = key + ": " + value
          array.push(final)
        }
        array = array.join("\n")
        alert(array)
      })
    }
  }
}
</script>

<style scoped>

</style>
