<template>
  <div>
    <div class="global-container">

      <div class="card login-form top">
        <div class="card-body">
          <h3 class="card-title text-center header">Photogram</h3>
          <h5 class="subheader">Sign up to see photos and videos from your friends.</h5>
          <div class="card-text">

            <form>
              <div class="form-group">
                <input type="text" class="form-control form-control-sm" id="name" aria-describedby="name" required
                v-model="name">
              </div>

              <div class="form-group">
                <input type="number" class="form-control form-control-sm" id="contactNumber"
                       aria-describedby="contactNumber" required v-model="contactNumber">
<!--                <small class="form-text text-muted">We'll never share your contact number with anyone else.</small>-->
              </div>
              <div class="form-group">
                <input type="text" class="form-control form-control-sm" id="email" aria-describedby="email"
                       pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" required
                       v-model="email">
<!--                <small class="form-text text-muted">We'll never share your email with anyone else.</small>-->
              </div>

              <div class="form-group">
                <input type="password" class="form-control form-control-sm" id="password" aria-describedby="password"
                       pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$" required
                       v-model="password">
<!--                <small class="form-text text-muted">Minimum 8 characters with at least 1 Upper Case,-->
<!--                  1 lower case, 1 numeric character, and 1 special characters.</small>-->
              </div>
              <div class="form-group">
                <input type="password" class="form-control form-control-sm" id="passwordC" aria-describedby="password"
                       v-model="passwordC">
              </div>

              <button type="submit" class="btn btn-primary btn-block" v-on:click="handleSubmit">Sign up</button>
            </form>
            <p style="font-size: 12px; margin-top: 10px;">
              By signing up, you agree to our Terms , Data Policy and Cookies Policy .
            </p>
          </div>
        </div>
      </div>
      <div class="card login-form top" style="padding-top: 15px; font-size:13px;">
        <p>Have an account? <router-link to="/login">Login here!</router-link></p>
      </div>

      <div>
        <p>Get the app</p>
        <div>
          <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo" target="_blank">
            <img style="margin-right: 5px" height="40px" src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="">
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D11CF3DBD-73D0-4E0F-B86A-8FA5958D90AC%26utm_content%3Dlo%26utm_medium%3Dbadge" target="_blank">
            <img style="margin-left: 5px" height="40px" src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt="">
          </a>
        </div>
      </div>

    </div>
    <router-link to="/" tag="button" class="btn btn-info"><i class="fas fa-home"></i> Home</router-link>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: "Register",
  data(){
    return {
      name : "User Account",
      email : "useremail@email.com",
      password : "1234!@#$qwerQWER",
      passwordC : "1234!@#$qwerQWER",
      contactNumber : 12345678
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      let pwRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
      let emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")
      if (!this.name || !this.password || !this.email || !this.passwordC || !this.contactNumber) {
        alert("Enter all fields please")
      }
      else if (!this.email.match(emailRegex)) {
        alert("Enter a proper email!")
      }
      else if (!this.password.match(pwRegex)) {
        alert("Enter a password with at least 8 characters, 1 small case, 1 upper case, 1 number, " +
            "and 1 special characters")
      }
      else if (this.password !== this.passwordC) {
        alert("Password & Confirm Password are different!")
      }
      else {
        let URL = "http://localhost:8080/api/user/register"
        Axios.post(URL, {
          name: this.name,
          email: this.email,
          password: this.password,
          passwordC: this.passwordC,
          contactNumber: this.contactNumber
        }).then(res=>{
          console.log(res.data)
          this.$router.push("/login")
          alert("Registration Successful :)")
        }).catch(err=>{
          console.log(err)
          alert("Email has already been registered!")
        })
      }
    }
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');

.global-container{
  height:100%;
  display: block;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  margin-top: 20px;
}

form{
  padding-top: 10px;
  font-size: 14px;
  margin-top: 30px;
}

.card-title{ font-weight:300; }

.btn{
  font-size: 14px;
  margin-top:20px;
}

.login-form{
  width:400px;
  margin:20px;
  padding: 0 50px 0 50px;
}

.header {
  font-family: 'Grand Hotel', cursive;
  font-size: 60px;
}

.subheader {
  color: #b8b8b8;
  font-weight: bold;
}

.form-group {
  margin: 5px 0 5px 0;
}

.top {
  margin-left: auto;
  margin-right: auto;
}

.btn-block {
  width: 100%;
}

</style>
