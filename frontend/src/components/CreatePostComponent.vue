<template>
  <div class="container card">


    <div class="row">
      <div class="col-12 col-lg-8 ml-auto mr-auto mb-4">
        <div class="header">
          <h4>Create a post!</h4>
        </div>
        <div class="multisteps-form__progress">
          <button class="multisteps-form__progress-btn js-active" @click="navigate($event)" type="button" id="theUpload" title="upload">Upload</button>
          <button class="multisteps-form__progress-btn" @click="navigate($event)" type="button" id="theCaption" title="caption">Caption</button>
          <button class="multisteps-form__progress-btn" @click="navigate($event)" type="button" id="theConfirm" title="confirm">Confirm</button>
        </div>
      </div>
    </div>

    <form name="form1" class="form form1">
      <div class="flex" style="margin-bottom: 10px">
        <label for="image"></label>
        <input class="form-control unit" name="image" id="image" type="file" @change="onFileChange" />
      </div>
      <div class="" id="preview">
        <img v-if="url" :src="url" height="400px" width="400px" alt=""/>
      </div>
      <div class="unit" style="margin-right: auto; margin-top: 20px;
       margin-left: auto; display: flex; justify-content: flex-end">
        <router-link to="/user" tag="button" class="btn btn-info" style="color: white; margin-right: 10px">Back</router-link>
        <button class="btn btn-primary" @click="navigate($event)" id="theNext" type="button">Next</button>
      </div>
    </form>

    <form enctype="multipart/form-data" name="form2" class="form form2">
      <div class="flex" style="margin-top: 10px; margin-bottom: 30px">
        <label for="title"></label>
        <input class="unit form-control form-control-sm" name="title" id="title" type="text" placeholder="Title"/>
      </div>
      <div class="flex" style="margin-top: 10px; margin-bottom: 30px; height: 200px">
        <label for="caption"></label>
        <textarea v-model="caption" class="form-control form-control-sm unit" name="caption" id="caption" type="text" placeholder="Add caption..." />
      </div>
      <div class="form-control unit" style="margin: 10px auto 131px auto; border: transparent">
        <div class="flexS">
          <div style="margin-right: 20px">
            <input type="radio" id="public" name="visibility" value="public" checked>
            <label style="margin-left: 5px" for="public">Public</label>
          </div>
          <div style="margin-right: 20px">
            <input type="radio" id="protected" name="visibility" value="protected">
            <label style="margin-left: 5px" for="protected">Protected</label>
          </div>
          <div style="margin-right: 20px">
            <input type="radio" id="private" name="visibility" value="private">
            <label style="margin-left: 5px" for="private">Private</label>
          </div>
        </div>
      </div>
      <div class="unit" style="margin-right: auto; margin-top: 20px;
       margin-left: auto; display: flex; justify-content: flex-end">
        <button class="btn btn-info" @click="navigate($event)" id="theBack" type="button" style="color: white; margin-right: 10px">Back</button>
        <button class="btn btn-primary" @click="navigate($event)" id="theNext" type="button">Next</button>
      </div>
    </form>

    <form enctype="multipart/form-data" name="form3" class="form form3">

      <div class="posts">
          <div class="post card" style="width: 20rem; margin-left: auto; margin-right: auto">
            <div class="card-header cardH">
              <div style="display: flex;">
                <img class="dp" src="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg" alt="">
                <h3 style="padding: 10px 0 0 20px; font-size: 15px"><strong>{{ author }}</strong></h3>
              </div>
              <div>
                <img class="dots modalBtn" src="https://static.thenounproject.com/png/41104-200.png" alt="">
              </div>
            </div>
            <img :src="url" class="card-img-top" height="318" alt="">
            <div class="card-body" style="display: flex; font-size: 15px; justify-content: flex-start">
              <p class="card-title" style="text-align: left"><strong>{{ author }}: </strong>{{ caption }}</p>
            </div>
          </div>
      </div>

      <div class="unit" style="margin-right: auto; margin-top: 33px;
       margin-left: auto; display: flex; justify-content: flex-end">
        <button class="btn btn-info" @click="navigate($event)" id="theBack" type="button" style="color: white; margin-right: 10px">Back</button>
        <button class="btn btn-primary" @click="handleSubmit">Post it!</button>
      </div>
    </form>


  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "CreatePost",
  data() {
    return {
      url: "https://i.stack.imgur.com/frlIf.png",
      loading: false,
      page: 1,
      author: localStorage.getItem("name"),
      caption: ""
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    changePage(value) {
      let toGo;
      if (value === "next") {
        toGo = this.page + 1
      } else {
        toGo = this.page - 1
      }

      switch(toGo) {
        case 1:
          this.page = toGo
          break
        case 2:
          if (document.getElementById("image").files[0]) {
            this.page = toGo
          }
          break
        case 3:
          if (this.caption !== "" &&
              document.forms.namedItem("form2").elements.namedItem("title").value !== "") {
            this.page = toGo
          }
          break
        default:
          break
      }

      switch(this.page) {
        case 1:
          document.getElementsByClassName("form1")[0].style.display = "block"
          document.getElementsByClassName("form2")[0].style.display = "none"
          document.getElementsByClassName("form3")[0].style.display = "none"
          return null
        case 2:
          document.getElementsByClassName("form1")[0].style.display = "none"
          document.getElementsByClassName("form2")[0].style.display = "block"
          document.getElementsByClassName("form3")[0].style.display = "none"
          return null
        case 3:
          document.getElementsByClassName("form1")[0].style.display = "none"
          document.getElementsByClassName("form2")[0].style.display = "none"
          document.getElementsByClassName("form3")[0].style.display = "block"
          return null
        default:
          return null
      }
    },
    navigate(event) {
      switch(event.currentTarget.id) {
        case "theUpload":
          return null
        case "theCaption":
          return null
        case "theConfirm":
          return null
        case "theNext":
          this.changePage("next")
          return null
        case "theBack":
          this.changePage("back")
          return null
        default:
          return null
      }
    },
    async handleSubmit(e) {
      e.preventDefault()
      var formTheRest = document.forms.namedItem("form2");
      var title = formTheRest.elements.namedItem("title").value
      var image = document.getElementById("image").files[0];
      var caption = formTheRest.elements.namedItem("caption").value
      var visibility = formTheRest.elements.namedItem("visibility").value
      var author = localStorage.getItem("name")

      let data = new FormData

      data.append("title", title)
      data.append("image", image)
      data.append("caption", caption)
      data.append("visibility", visibility)
      data.append("author", author)

      await Axios.post('http://localhost:8080/api/createPost', data, {
        headers: {
          contentType: "multipart/form-data"
        }
      }).then(res=>{
        if (res.statusText === "OK") {
          this.$router.push("/user")
        }
        else {
          alert("Error! Something wrong happen...")
        }
      })

      setTimeout(()=>{
        // alert("Post created!")
      }, 100)

    }
  }
}
</script>

<style scoped>

.form1 {
  display: block;
}

.form2 {
  display: none;
}

.form3 {
  display: none;
}

.form {
  padding-top: 20px;
  height: 540px
}

.container {
  display: block;
  background-color: #ffffff;
  width: 500px;
  height: 100%;
  margin-top: 2%;
  padding-bottom: 2%;
}

.flex {
  display: flex;
  justify-content: center
}

.flexS {
  display: flex;
  justify-content: flex-start !important;
}


.unit {
  width: 400px;
}

.header {
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  width: 450px
}

.btn {
  width: 80px
}







.multisteps-form__progress {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  width: 450px;
}

.multisteps-form__progress-btn {
  transition-property: all;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  transition-delay: 0s;
  position: relative;
  padding-top: 20px;
  color: rgba(108, 117, 125, 0.7);
  text-indent: -9999px;
  border: none;
  background-color: transparent;
  outline: none !important;
  cursor: pointer;
}

@media (min-width: 500px) {
  .multisteps-form__progress-btn {
    text-indent: 0;
  }
}

.multisteps-form__progress-btn:before {
  position: absolute;
  top: 0;
  left: 50%;
  display: block;
  width: 13px;
  height: 13px;
  content: '';
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  transition: all 0.15s linear 0s, -webkit-transform 0.15s cubic-bezier(0.05, 1.09, 0.16, 1.4) 0s;
  transition: all 0.15s linear 0s, transform 0.15s cubic-bezier(0.05, 1.09, 0.16, 1.4) 0s;
  transition: all 0.15s linear 0s, transform 0.15s cubic-bezier(0.05, 1.09, 0.16, 1.4) 0s, -webkit-transform 0.15s cubic-bezier(0.05, 1.09, 0.16, 1.4) 0s;
  border: 2px solid currentColor;
  border-radius: 50%;
  background-color: #fff;
  box-sizing: border-box;
  z-index: 3;
}

.multisteps-form__progress-btn:after {
  position: absolute;
  top: 5px;
  left: calc(-50% - 13px / 2);
  transition-property: all;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  transition-delay: 0s;
  display: block;
  width: 100%;
  height: 2px;
  content: '';
  background-color: currentColor;
  z-index: 1;
}

.multisteps-form__progress-btn:first-child:after {
  display: none;
}

.multisteps-form__progress-btn.js-active {
  color: #007bff;
}

.multisteps-form__progress-btn.js-active:before {
  -webkit-transform: translateX(-50%) scale(1.2);
  transform: translateX(-50%) scale(1.2);
  background-color: currentColor;
}

.multisteps-form__form {
  position: relative;
}

.multisteps-form__panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  opacity: 0;
  visibility: hidden;
}

.multisteps-form__panel.js-active {
  height: auto;
  opacity: 1;
  visibility: visible;
}




















.dp {
  border-radius: 50%;
  border: solid #606060 1px;
  height: 30px
}

.cardH {
  background-color: white !important;
  display: flex;
  justify-content: space-between;
}

.dots {
  height: 30px
}

</style>
