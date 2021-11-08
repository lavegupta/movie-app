<template>
  <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center" v-if="pagination.total_pages > 10">
        <li 
        :class="[
          'page-item',
          pagination.page < 10 ? 'disabled' : '',
        ]"
        @click="change(pagination.page - 10)"
        >
          <span class="page-link" aria-label="Previous 10">
            <span aria-hidden="true">&laquo;&laquo;</span>
          </span>
        </li>
        <li 
        :class="[
          'page-item',
          pagination.page === 1 ? 'disabled' : '',
        ]"
        @click="change(pagination.page - 1)"
        >
          <span class="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </span>
        </li>
        <li class="page-item disabled" aria-current="page">
          <span class="page-link">{{pagination.page}}/{{pagination.total_pages}} page</span>
        </li>
        <li 
        :class="[
          'page-item',
          pagination.page === pagination.total_pages ? 'disabled' : '',
        ]"
        @click="change(pagination.page + 1)"
        >
          <span class="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </span>
        </li>
        <li 
        :class="[
          'page-item',
          pagination.page > pagination.total_pages - 10 ? 'disabled' : '',
        ]"
        @click="change(pagination.page + 10)"
        >
          <span class="page-link" aria-label="Next 10">
            <span aria-hidden="true">&raquo;&raquo;</span>
          </span>
        </li>
      </ul>



      <ul class="pagination justify-content-center" v-else>
        <li
        v-for="i in pagination.total_pages"
        :key="i"
        :class="[
          'page-item',
          pagination.page === i ? 'active' : '',
        ]"
        @click="change(i)"
        >
          <span class="page-link">{{ i }}</span>
        </li>
      </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Pagination } from '../types'; 

export default defineComponent({
  name: "Paging",
  emits: ['pageChange'],
  props: {
    pagination: {
      required: true,
      type: Object as PropType<Pagination>
    }
  },
  setup (props, context) {
      const change = (page: number) => {
        page <= props.pagination.total_pages
         && 0 < page 
         && context.emit("pageChange", page);
      }
      return {
          change
      }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .page-link {
    cursor: pointer;
  }
</style>
