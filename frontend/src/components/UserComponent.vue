<template>
  <div class="body" id="body">
    <nav>
      <div class="logo" style="display:flex;">
        <h2><a href="/user" class="logo">Photogram</a></h2>
        <router-link to="/createPost"><i class="fas fa-camera"></i></router-link>
      </div>
      <div class="search-part">
        <label>
          <input class="search" placeholder="Search">
        </label>
        <i class="fas fa-times"></i>
      </div>
      <div class="icon-part">
        <i class="icon far fa-address-book"></i>
<!--        <i class="icon far fa-building"></i>-->
        <i class="icon far fa-comments"></i>
        <i class="icon far fa-compass"></i>
        <i class="icon far fa-heart"></i>
        <i class="icon far fa-user-circle"></i>
      </div>
    </nav>
    <div class="main">
      <div>
        <div class="stories">
          <div class="stories-bar">
            <div>
              <div class="arrows">
                <div class="left-arrow arrow">
                  <i class="fas fa-caret-left"></i>
                </div>
                <div class="right-arrow arrow">
                  <i class="fas fa-caret-right"></i>
                </div>
              </div>
              <b-carousel
                  id="carousel-1"
                  v-model="slide"
                  :interval="10000"
                  controls
                  fade
                  background="#fff"
                  img-width="1024"
                  img-height="120"
                  style="text-shadow: 1px 1px 2px #333;"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
              >
                <!-- Text slides with image -->
                <b-carousel-slide caption="" img-blank img-alt="Blank image">
                  <div class="one-slide-user-stories">
                    <div class="user-stories">
                      <img class="dp" src="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg" alt="">
                    </div>
                    <div class="user-stories">
                      <img class="dp" src="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg" alt="">
                    </div>
                    <div class="user-stories">
                      <img class="dp" src="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg" alt="">
                    </div>
                    <div class="user-stories">
                      <img class="dp" src="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg" alt="">
                    </div>
                    <div class="user-stories">
                      <img class="dp" src="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg" alt="">
                    </div>
                    <div class="user-stories">
                      <img class="dp" src="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg" alt="">
                    </div>
                  </div>
                </b-carousel-slide>
              </b-carousel>
            </div>
          </div>
        </div>
        <div class="posts">
          <div v-for="lePost in posts" v-bind:key="lePost.id" style="padding: 50px 0 50px 0">
            <!--      <div v-for="(lePost, i) in posts" v-bind:key='"lePost" + i'>-->
            <div class="post card" style="width: 40rem; margin-left: auto; margin-right: auto">
              <div class="card-header cardH">
                <div style="display: flex;">
                  <img class="dp" src="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg" alt="">
                  <h3 style="padding: 15px 0 0 20px; font-size: 20px"><strong>{{ lePost.author }}</strong></h3>
                </div>
                <div>
                  <img class="dots modalBtn" src="https://static.thenounproject.com/png/41104-200.png" alt="">
                </div>
              </div>
              <img v-bind:src="lePost.avatar" class="card-img-top" alt="">
              <div class="card-body" style="display: flex; font-size: 20px; justify-content: flex-start">
                <p class="card-title" style="text-align: left"><strong>{{ lePost.author }}: </strong>{{lePost.caption}}</p>
              </div>
              <div class="modal">
                <div class="modalContent">
                  <div class="option">
                    <p class="optionText">Report</p>
                  </div>
                  <div class="option">
                    <p class="optionText">Go to user profile</p>
                  </div>
                  <div class="option" @click="editPost(lePost.id)">
                    <p class="optionText">Edit</p>
                  </div>
                  <div class="option" style="border-bottom: 1px gray solid" @click="deletePost(lePost.id)">
                    <p class="optionText">Delete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        asdads
      </div>
    </div>
    <div>
      <button class="btn btn-danger" @click="handleSubmit">Logout</button>
      <button class="btn btn-dark" @click="testAPI">testAPI</button>
    </div>
  </div>
</template>

<script>

import {getAuthToken} from "@/utils/auth";
import Axios from 'axios';
// import $ from 'jquery';

export default {
  name: "User",
  components: {

  },
  data() {
    return {
      posts: []
    }
  },
  async mounted() {
    const token = getAuthToken()
    await Axios.get("http://localhost:8080/api/", {
      headers: {
        "X-Auth-Token": token
      }
    }).then(res=>{
      localStorage.setItem("details", JSON.stringify(res.data));
    })

    await Axios.get("http://localhost:8080/api/queryPost", {
      headers: {
        "X-Auth-Token": token
      }
    }).then(res=>{
      this.posts = res.data
    })

    for (let i = 0; i < this.posts.length; i++) {
      let i = [
        document.getElementsByClassName("modalBtn")[i],
        document.getElementsByClassName("modal")[i],
        document.getElementsByClassName("modalContent")[i],
        document.getElementsByClassName("option")[i * 4],
        document.getElementsByClassName("option")[i * 4 + 1],
        document.getElementsByClassName("option")[i * 4 + 2],
        document.getElementsByClassName("option")[i * 4 + 3],
      ];

      i[0].onclick = function() {
        i[1].style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.height = "100%";
      }

      i[2].onclick = function() {
        i[1].style.display = "none";
        document.body.style.overflow = "auto";
        document.body.style.height = "auto";
      }
    }
  },
  methods: {
    editPost(id){
      // const URL = "http://localhost:8080/api/editPost/" + id
      this.$router.push("/editPost/" + id)
    },
    async deletePost(id) {
      const URL = "http://localhost:8080/api/deletePost"
      await Axios.delete(URL, {
        data: { id: id }
      });
      location.reload();
    },
    async handleSubmit() {
      await setTimeout(()=>{
        // alert("Logged Out!")
      }, 50)
      localStorage.setItem("auth-token","");
      localStorage.setItem("isAdmin","");
      localStorage.setItem("details","");
      this.$router.push("/login")
    },
    async testAPI() {
      const URL = "http://localhost:8080/api/"
      const token = getAuthToken()
      await Axios.get(URL, {
        headers: {
          "X-Auth-Token": token
        }
      }).then(res=>{
        let array = []
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
@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');
.body{
  height: 100%;
  background-color: #f3f3f3;
}
.btn {
  font-size: 14px;
}
nav {
  display: flex;
  justify-content: space-between;
  background-color: white;
}
.logo {
  font-family: 'Grand Hotel', cursive;
  font-size: 50px;
  padding: 10px 0 10px 20px;
  text-decoration: none;
  color: black
}
.search {
  margin: 20px 0 0 0;
  padding: 5px 0 5px 40%;
  font-size: 20px;
  width: 325px;
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: #fafafa;
}
.search:focus{
  margin: 20px 0 0 0;
  padding: 5px 0 5px 5%;
  font-size: 20px;
  width: 325px;
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: #fafafa;
}
.fa-times{
  display:none
}
.icon-part{
  font-size: 35px;
  margin: 20px 10px 0 0;
}
.icon {
  margin: 0 15px 0 15px;
}
.fa-camera{
  font-size: 45px;
  text-align: center;
  margin: 0 0 5px 30px;
  color: #4f4f4f;
}
.fa-camera:hover{
  font-size: 45px;
  text-align: center;
  margin: 0 0 5px 30px;
  color: #9f9f9f;
}

.dp {
  border-radius: 50%;
  border: solid #606060 2px;
  height: 50px
}

.cardH {
  background-color: white !important;
  display: flex;
  justify-content: space-between;
}

.dots {
  height: 40px
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  overflow: auto;
  background-color: #000; /* Fallback color */
  background-color: rgba(0,0,0,0.3);
}

.modalContent {
  /*background-color: #f5f5f5;*/
  border-radius: 2px;
  /*box-shadow: 0 0 14px 1px #dd6ff8;*/
  padding: 16% 0 0 32%;
}

.option {
  border-top: gray solid 1px;
  border-left: gray solid 1px;
  border-right: gray solid 1px;
  background-color: white;
  height: 75px;
  width: 500px;
  text-align: center;
}

.option:hover {
  background-color: #d9d9d9;
}

.optionText {
  color: black;
  padding: 1em;
  text-align: center;
  display:inline-block;
  text-decoration: none !important;
  margin:0 auto;
  font-size: 20px;
}
.stories {
  display: flex;
  justify-content: center;
}

.stories-bar {
  margin: 50px 0 0 0;
  background-color: white !important;
  display: flex;
  justify-content: space-between;
  width: 40rem !important;
  /*height: 5rem;*/
  border: 1px #e5e5e5 solid
}
.one-slide-user-stories {
  display: flex;
  justify-content: start;
}
.user-stories {
  margin: 0 13px;
  position: relative;
  top: 28px;
}
.arrow {
  position: relative;
  top: 5px;
  z-index: 10;
  font-size: 50px;
}
.left-arrow {
  padding-left: 30px;
}
.right-arrow {
  padding-right: 30px;
}
.arrows {
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 1px;
}
.main {
  display: grid;
  grid-template-columns: 2fr 1fr
}
</style>
