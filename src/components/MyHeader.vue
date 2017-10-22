<template>
  <!-- Hero header: will stick at the top -->
  <nav class="navbar is-primary is-bold">
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
        <div class="navbar-item">
            <p class="control">
              <router-link to="/signin" class="button is-primary is-inverted">
                <span>
                    Signin to Kontent
                </span>
              </router-link>
            </p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  nav{
    background-image: linear-gradient(141deg, #00d1b2 0%, #00d1b2 71%, #00e7eb 100%);
  }
</style>
