<template>
  <!-- Hero header: will stick at the top -->
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        Kontent
      </router-link>
    <span class="navbar-burger burger"
                    :class="{ 'is-active': isMenuActive }"
                    @click="isMenuActive = !isMenuActive">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
      
    </div>

    <div id="navMenuColorprimary" class="navbar-menu" :class="{ 'is-active': isMenuActive }">
      <div class="navbar-start">
      </div>
  
      <div class="navbar-end">
        <router-link to="/" class="navbar-item">
          Landing
        </router-link>
        <router-link to="/list" class="navbar-item">
          List
        </router-link>
        <a @click="compose" class="navbar-item">
          Compose
        </a>
        <div class="navbar-item is-hoverable">
            <p class="control">
              <a class="button is-primary is-inverted" v-if="username">
                {{ username }}
              </a>
              <router-link to="/signin" class="button is-primary is-inverted" v-else>
                <span>
                    Signin to Kontent
                </span>
              </router-link>
            </p>
            <div class="navbar-dropdown">
              <a @click="signout" class="navbar-item" v-if="username">
                <span>
                  Sign out
                </span>
              </a>
              <a class="navbar-item" v-else>
                <span>
                  Sign Up
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
import { mapState } from 'vuex'
export default {
  computed: mapState([
        'username'
    ]),
  methods:{
    signout: function () {
      axios.get("/api/signout")
      location.reload()
    },
    compose: function () {
      this.$store.commit('SET_EDITING_ARTICLE', { title:'', text:'' });
      this.$router.push('/compose')
    }
  },
  mounted(){
    this.$store.dispatch('LOAD_USER_STATE')
  },
  data() {
            return {
                isMenuActive: false
            }
        },
}
</script>

<style scoped>
  nav{
    border-bottom: 2px solid #00b1d2;
  }
</style>
