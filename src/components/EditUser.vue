<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>

    <div class="container">
      <div class="row">
        <div class="col-75">
          <input v-model="user.name" type="text" id="name" name="name" placeholder="Your name..">
        </div>
      </div>
      <div class="row">
        <div class="col-75">
            <input v-model="user.email" type="text" id="email" name="email" placeholder="Your last name..">
        </div>
      </div>
      <div class="row">
        <div class="col-75">
            <input v-model="user.avatar" type="text" id="avatar" name="avatar" placeholder="Your last name..">
        </div>
      </div>
      <div class="row">
        <div class="col-75">
          <input type="submit" value="Save" @click="save()">
        </div>
      </div>
    </div>

  </div>
</template>
<style scoped>
  * {
    box-sizing: border-box;
  }

  input[type=text], select, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }

  label {
    padding: 12px 12px 12px 0;
    display: inline-block;
  }

  input[type=submit] {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
  }

  input[type=submit]:hover {
    background-color: #45a049;
  }

  .container {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
  }

  .col-25 {
    float: left;
    width: 25%;
    margin-top: 6px;
  }

  .col-75 {
    float: left;
    width: 75%;
    margin-top: 6px;
  }

  /* Clear floats after the columns */
  .row:after {
    content: "";
    display: table;
    clear: both;
  }

  /* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 600px) {
    .col-25, .col-75, input[type=submit] {
      width: 100%;
      margin-top: 0;
    }
  }
  
  .container {
    margin: auto;
    width: 50%;
  }
</style>
<script>
import axios from 'axios'
import VueLocalStorage from 'vue-localstorage'

export default {
  name: 'EditUser',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentUser: null,
      user: {
        name: null,
        email: null,
        avatar: null
      }
    }
  },
  mounted() {
    var scope = this;
    scope.currentUser = scope.$router.history.current.params.id;

    axios.get("http://localhost:8080/users/" + scope.currentUser).then((response) => {
      scope.user = response.data;
    });

    setInterval(() => {
      scope.watchQuee();
    }, 3000)
  },

  methods: {
    save() {
      var scope = this;

      this.$localStorage.set('someNumber', 123);
      let num = this.$localStorage.get('someNumber');
      axios.put("http://localhost:8080/users/" + scope.currentUser, scope.user).then((response) => {
        scope.users = response.data;
      },
      (error) => {
        let usersQuee = scope.$localStorage.get('users', null);
        if(usersQuee == null)
          usersQuee = [];
        scope.user.id = scope.currentUser;
        usersQuee.push(scope.user);
      })
    },

    watchQuee() {
      let scope = this;

      let usersQuee = scope.$localStorage.get('users', null);
      if(usersQuee == null)
        return false;
      
      usersQuee.forEach(function (user, index) {
        axios.put("http://localhost:8080/users/" + user.id, user).then((response) => {
          if(index + 1 == usersQuee.length)
            scope.$localStorage.remove('users');
        },
        (error) => {
          //
        })
      });
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
