<template>
  <div class="container card">
    <form enctype="multipart/form-data" name="form" id="form">
      <h4>Create a post!</h4>
      <div class="flex" style="margin-top: 10px; margin-bottom: 10px">
        <label for="title"></label>
        <input class="unit form-control form-control-sm" name="title" id="title" type="text" placeholder="Title"/>
      </div>
      <div class="flex" style="margin-top: 10px; margin-bottom: 10px">
        <label for="image"></label>
        <input class="form-control unit" name="image" id="image" type="file" @change="onFileChange" />
      </div>
      <div class="" id="preview">
        <img v-if="url" :src="url" height="270px"  alt=""/>
      </div>
      <div class="flex" style="margin-top: 10px; margin-bottom: 10px; height: 200px">
        <label for="caption"></label>
        <textarea class="form-control form-control-sm unit" name="caption" id="caption" type="text" placeholder="Add caption..." />
      </div>
      <div class="form-control unit" style="margin: 10px auto;">
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
      <div class="unit" style="margin-right: auto;
       margin-left: auto; display: flex; justify-content: space-between">
        <router-link to="/user" tag="button" class="btn btn-info" style="color: white">Go back</router-link>
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
      url: null,
      loading: false
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    async handleSubmit(e) {
      e.preventDefault()

      var form = document.forms.namedItem("form");
      var title = form.elements.namedItem("title").value
      var image = document.getElementById("image").files[0];
      var caption = form.elements.namedItem("caption").value
      var visibility = form.elements.namedItem("visibility").value
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

#form {
  padding-top: 50px;
}

.container {
  display: block;
  background-color: #ffffff;
  width: 430px;
  height: 100%;
  margin-top: 5%;
  padding-bottom: 5%;
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

</style>
