<template>
  <div class="checklist">
    <button class="button is-info" @click="editAdditionalInfo">
      <span>保存修改</span>
    </button>
    <b-table v-for="list of article.checkList" v-bind:key="list.title" :data="list.checkList" detailed detail-key="id" :opened-detailed="defaultOpenedDetails">
              <template scope="props">
                  <b-table-column :label="list.title" style="width: 60%">
                    {{props.row.title}}
                    <div v-if="!props.row.selected" style="color: red">
                      未通过原因：{{props.row.additionalInfo || "暂无"}}
                    </div>
                  </b-table-column>
                  <b-table-column label="通过" centered>
                    <b-switch v-model="props.row.selected"></b-switch>
                  </b-table-column>
              </template>
              <template slot="detail" scope="props">
                <b-field label="附加信息">
                  <b-input maxlength="200" type="textarea" v-model="props.row.additionalInfo"></b-input>
                </b-field>
              </template>
    </b-table>
  </div>
</template>

<script>
import debounce from "lodash";
export default {
  props: ["article"],
  data() {
    return {
      defaultOpenedDetails: [],
    }
  },
  methods: {
    editAdditionalInfo: function() {
      this.$store.dispatch('SET_CHECKLIST_STATE', { id: this.$props.article.id, checkList: this.$props.article.checkList})
        .then(() => this.$snackbar.open("Settings saved."))
        .catch(error => {
          this.$snackbar.open({
            message: "Failed to get articles. Please sign in first.",
            type: "is-danger",
            actionText: "Sign in",
            onAction: () => {
              this.$router.push("/signin");
            }
          });
        });
    }
  }
};
</script>