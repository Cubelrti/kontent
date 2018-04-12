<template>
  <div v-html="checklist" class="checklist">
    <b-table :data="articles" :selected.sync="selected" @click="select" :loading="loading">
        <template scope="props">
            <b-table-column label="Title">
                {{ props.row.title }}
            </b-table-column>
            <b-table-column label="Date" centered>
                {{ new Date(parseInt(props.row.id)).toLocaleDateString() }}
            </b-table-column>
        </template>
    </b-table>
  </div>
</template>

<script>
import debounce from "lodash";
export default {
  props: ["listData"],
};
</script>