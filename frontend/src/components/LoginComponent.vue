<template>
  <div>
    <div class="global-container">
      <img height="550px" alt="" src="https://klhill.github.io/free-instagram-highlights-themes/img/highlights-mockup.png"/>
      <div style="display: block">
        <div class="card login-form">
          <div class="card-body">
            <h3 class="card-title text-center header">Photogram</h3>
            <div class="card-text">



              <form>
                <div class="form-group">
  <!--                <label for="email">Email address</label>-->
                  <input type="text" placeholder="email" class="form-control form-control-sm" id="email" aria-describedby="emailHelp" required
                         v-model="email">
                </div>
                <div class="form-group">
  <!--                <div class="spread">-->
  <!--                  <label for="password">Password</label>-->
  <!--                  <a href="#" style="float:right;font-size:12px;color:red">Forgot password?</a>-->
  <!--                </div>-->
                  <input type="password" placeholder="password" class="form-control form-control-sm" id="password" required v-model="password">
                  <a href="#" style="padding:10px 0 10px 0;float:right;font-size:12px;color:#d90808">Forgot password?</a>
                </div>
                <button class="btn btn-primary btn-block" v-on:click="handleSubmit">Log In</button>
              </form>
            </div>
          </div>
        </div>
        <div class="card login-form">
          <div class="sign-up">
            Don't have an account? <router-link to="/register">Sign Up</router-link>
          </div>
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
    </div>
    <div id="footer" style="background: white; margin-top: 50px">
      <div style="width: 40%; background: white; margin-left: auto; margin-right: auto">
        <div id="links">
          <a href="#" target="_blank" class="link">About</a>
          <a href="#" target="_blank" class="link">Blog</a>
          <a href="#" target="_blank" class="link">Jobs</a>
          <a href="#" target="_blank" class="link">Help</a>
          <a href="#" target="_blank" class="link">API</a>
          <a href="#" target="_blank" class="link">Privacy</a>
          <a href="#" target="_blank" class="link">Terms</a>
          <a href="#" target="_blank" class="link">Top Accounts</a>
          <a href="#" target="_blank" class="link">Hashtags</a>
          <a href="#" target="_blank" class="link">Locations</a>
          <a href="#" target="_blank" class="link">Beauty</a>
          <a href="#" target="_blank" class="link">Dance & Performance</a>
          <a href="#" target="_blank" class="link">Fitness</a>
          <a href="#" target="_blank" class="link">Locations</a>
          <a href="#" target="_blank" class="link">Food & Drink</a>
          <a href="#" target="_blank" class="link">Home & Garden</a>
          <a href="#" target="_blank" class="link">Music</a>
          <a href="#" target="_blank" class="link">Visual Arts</a>
        </div>
      </div>
      <router-link to="/" tag="button" class="btn home btn-info"><i class="fas fa-home"></i> Home</router-link>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Login",

  data() {
    return{
      email : "useremail@email.com",
      password : "1234!@#$qwerQWER",
    }
  },

  methods: {
    async handleSubmit(e) {
      e.preventDefault()

      if (!this.password || !this.email) {
        alert("Enter all fields please")
      }
      else {
        let URL = "http://localhost:8080/api/login"
        Axios.post(URL, {
          email: this.email,
          password: this.password
        }).then(res=>{
          localStorage.setItem("auth-token", res.data.token);
          localStorage.setItem("isAdmin", res.data.user.isAdmin);
          localStorage.setItem("name", res.data.user.name);

          if (res.data.user.isAdmin === false) {
            this.$router.push("/user")
          }
          else {
            this.$router.push("/admin")
          }
          setTimeout(()=>{
            // alert("Login Successful!")
          }, 100)
        }).catch(e => {
          console.log(e)
          alert("Incorrect Username and/or Password")
        })
      }
    }
  }
}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');

.header {
  font-family: 'Grand Hotel', cursive;
  font-size: 60px;
}

.global-container{
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  margin-top: 60px;
}

form{
  padding-top: 10px;
  font-size: 14px;
  margin-top: 30px;
}

.card-title{ font-weight:300; }

.btn {
  font-size: 14px;
  width: 300px;
}

.home {
  margin-top: 20px;
  font-size: 14px;
  width: 100px !important;
}

.login-form{
  width:330px;
  margin:20px;
}

.sign-up{
  text-align:center;
  padding:20px 0 20px 0;
  font-size: 13px;
}

.link {
  color: gray;
  font-size: 12px;
  margin: 0 5px 0 5px;
}

input {
  margin: 10px 0 10px 0;
}

</style>
