<template>
    <section class="section">
        <div class="container">
        <b-field label="DisplayName">
            <b-input v-model="settings.displayTitle"></b-input>
        </b-field>
        <b-field label="Slogan">
            <b-input v-model="settings.slogan"></b-input>
        </b-field>
        <div class="field is-grouped">
            <div class="control">
                <button class="button" @click="submitConfig">Submit</button>
            </div>
        </div>
    </div>
    </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["settings"]),
  methods:{
      submitConfig: function () {
          this.$store.dispatch("SUBMIT_SETTINGS").then(()=>{
              this.$snackbar.open("Config saved.")
          }).catch((error) => {
        this.$snackbar.open({
          message: 'Failed to commit changes.',
          type: 'is-danger',
        });
      });
      }
  }
}
</script>
