<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <div class="select-box">
      <select class="select-css" v-model="selectedUser">
        <option :value="0">Select User</option>
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>
      <button class="edit-button" @click="edit()">Edit</button>
    </div>
  </div>
</template>
<style scoped>
  .select-box {
    margin: auto;
    width: 15%;
  }
  .select-css {
    display: block;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: .6em 1.4em .5em .8em;
    width: 200px;
    max-width: 100%; 
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;
  }
  .select-css::-ms-expand {
      display: none;
  }
  .select-css:hover {
      border-color: #888;
  }
  .select-css:focus {
      border-color: #aaa;
      box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
      box-shadow: 0 0 0 3px -moz-mac-focusring;
      color: #222; 
      outline: none;
  }
  .select-css option {
      font-weight:normal;
  }
  body {
    padding: 3rem;
  }
  .edit-button {
    color: white;
    border-radius: 4px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    background: rgb(66, 184, 221); /* this is a light blue */
    font-size: 110%;
    width: 100%;
    padding: 5px;
  }
</style>
<script>
import axios from 'axios'

export default {
  name: 'Users',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      users: null,
      selectedUser: 0
    }
  },
  mounted() {
    var scope = this;

    axios.get("http://localhost:8080/users").then((response) => {
      scope.users = response.data;
    })
  },

  methods: {
    edit() {
      var scope = this;

      if(scope.selectedUser == 0)
        return;
      
      scope.$router.push({name: 'editUser', params: { id: scope.selectedUser }});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  color: #42b983;
}
</style>
