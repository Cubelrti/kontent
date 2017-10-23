<template>
  <!-- Hero header: will stick at the top -->
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        Kontent
      </router-link>

      
    </div>
  
    <div id="navMenuColorprimary" class="navbar-menu">
      <div class="navbar-start">
      </div>
  
      <div class="navbar-end">
        <router-link to="/" class="navbar-item">
          Landing
        </router-link>
        <router-link to="/list" class="navbar-item">
          List
        </router-link>
        <router-link to="/compose" class="navbar-item">
          Compose
        </router-link>
        <div class="navbar-item is-hoverable">
            <p class="control">
              <router-link to="/signin" class="button is-primary is-inverted">
                <span>
                    Signin to Kontent
                </span>
              </router-link>
            </p>
            <div class="navbar-dropdown">
              <a @click="signout" class="navbar-item">
                <span>
                  Sign out
                </span>
              </a>
            </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
export default {
  methods:{
    signout: function () {
      axios.get("/api/signout");
      location.reload();
    }
  }
}
</script>

<style scoped>
  nav{
    border-bottom: 2px solid #00b1d2;
  }
</style>
