<template>
  <div v-if="error" class="alert alert-danger" role="alert">{{error}}</div>
  <main class="p-3" v-else>
    <nav class="py-3">
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button class="nav-link active" id="all-tab" data-bs-toggle="tab" data-bs-target="#all" type="button" role="tab" aria-controls="all" aria-selected="true">All</button>
        <button class="nav-link" id="favourite-tab" data-bs-toggle="tab" data-bs-target="#favourite" type="button" role="tab" aria-controls="favourite" aria-selected="false">Favourite <span class="badge bg-primary" v-if="favouriteMovies.length">{{favouriteMovies.length}}</span></button>
      </div>
    </nav>

    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
          <header>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Search for items" aria-label="Search for items" aria-describedby="search-btn"  v-model="searchValue" @keyup.enter="getData">
              <button class="btn btn-primary" type="button" id="search-btn"  @click="getData">Search</button>
            </div>
          </header>
          <section v-if="movies.length">
            <MovieList :movies="movies" @toggleFavourite="toggleFavourite" />
            <Paging :pagination="pagination" @pageChange="pageChange" />
          </section>
          <div v-else class="alert alert-primary" role="alert">Nothing to Show</div>
      </div>
      <div class="tab-pane fade" id="favourite" role="tabpanel" aria-labelledby="favourite-tab">
        <MovieList :movies="favouriteMovies" @toggleFavourite="toggleFavourite" v-if="favouriteMovies.length" />
        <div v-else class="alert alert-primary" role="alert">No favourite items</div>
      </div>
    </div>

  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import MovieList from './components/MovieList.vue';
import Paging from './components/Paging.vue';
import { Movie, Pagination } from './types'; 
import { API_URL } from './constants'; 

export default defineComponent({
  name: 'App', 
  components: {
    MovieList,    
    Paging
  },
  setup() {
    const searchValue = ref('');
    const favouriteMovies = ref<Movie[]>([]);
    const movies = ref<Movie[]>([]);
    const pagination = ref<Pagination>({
        page: 1,
        total_pages: 0
    })
    const error = ref('');

    const toggleFavourite = (movie: Movie) => {
      const index = favouriteMovies.value.findIndex((m) => m.imdbID === movie.imdbID);
      if (index !== -1) {
        favouriteMovies.value.splice(index, 1);
      } else {
        favouriteMovies.value.push({
          ...movie,
          favourite: true,
        });
      }
    };

    const getData = async (page?: number) => {
      const url: string = API_URL + (searchValue.value.trim().length > 0 ? `Title=${searchValue.value}` : '') + (page ? `&page=${page}` : '');
      try {
        let res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            movies.value = data.data;
            pagination.value = {
              page: data.page,
              total_pages: data.total_pages
            }
        } else {
            error.value = 'something went wrong';
        }
      } catch (err: unknown) {
        if (typeof err === "string") {
            error.value = err.toUpperCase();
        } else if (err instanceof Error) {
            error.value = err.message;
        }
      }
    }

    const pageChange = (num: number) => {
      getData(num);
    }

    const computedMovieList = computed(() => {
      const favIdsObj: any = favouriteMovies.value
        .reduce((l, { imdbID }) => ({ ...l, [imdbID]: true }), {});
        
        return movies.value.map((el) => ({ ...el, favourite: favIdsObj[el.imdbID] || false }));
    });

    getData();

    return {
      searchValue,
      getData,
      movies: computedMovieList,
      pagination,
      toggleFavourite,
      favouriteMovies,
      pageChange,
      error
    }
  }
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 30px 0;
}
</style>
