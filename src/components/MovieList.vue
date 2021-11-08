<template>
  <table
    class="table table-bordered table-striped"
    v-if="movies.length"
  >
    <thead>
      <tr>
        <th>Movie Title</th>
        <th width="120">Year</th>
        <th width="120">IMDB ID</th>
        <th width="120">Favourite</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="movie in movies" :key="movie.imdbID">
        <td>
          {{ movie.Title }}
        </td>
        <td>
          {{ movie.Year }}
        </td>
        <td>
          {{ movie.imdbID }}
        </td>
        <td>
          <button
            type="button"
            class="btn btn-sm btn-outline-primary"
            @click="$emit('toggleFavourite', movie)"
          >
            {{ movie.favourite ? "&#9733;" : "&#9734;" }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Movie } from '../types'; 

export default defineComponent({
  name: "MovieList",
  emits: ['toggleFavourite'],
  props: {
    movies: {
      required: true,
      type: Array as PropType<Movie[]>
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
