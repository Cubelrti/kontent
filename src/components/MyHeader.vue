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
                <a class="navbar-item" href="">
          Landing
        </a>
        <a class="navbar-item" href="">
          List
        </a>
        <a class="navbar-item" href="">
          Compose
        </a>
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
