<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body columns is-centered">
      <form action="/api/signin" method="POST" class="box column is-half">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input name="username" class="input" type="text" placeholder="Username">
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input name="password" class="input" type="password" placeholder="Password">
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button type="submit" value="Submit" class="button is-success is-medium">
              Sign in
            </button>
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style scoped>
  .control > button{
    width: 100%;
  }
</style>
