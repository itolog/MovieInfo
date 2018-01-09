<template>
  <main class="main">
    <section class="movie">
      <header class="header">
         <router-link class="header__href" to="/">HOME</router-link>
        <h1>{{ res.Title }}</h1>
      </header>
      <!-- Content -->
      <div class="content">
        <!-- poster -->
        <div class="content__poster">
          <img :src=res.Poster :alt=res.Title>
        </div>
        <!-- content side -->
        <div class="content__info">
          <table class="table">
            <tr>
              <td>Year</td>
              <td>{{res.Year}}</td>
            </tr>
            <tr>
              <td>Country</td>
              <td>{{res.Country}}</td>
            </tr>
             <tr>
              <td>Director</td>
              <td>{{res.Director}}</td>
            </tr>
             <tr>
              <td>Writer</td>
              <td>{{res.Writer}}</td>
            </tr>
             <tr>
              <td>Production</td>
              <td>{{res.Production}}</td>
            </tr>
            <tr>
              <td>Runtime</td>
              <td>{{res.Runtime}}</td>
            </tr>
            <tr>
              <td>Genre</td>
              <td>{{res.Genre}}</td>
            </tr>
            <tr>
              <td>Actors</td>
              <td>{{res.Actors}}</td>
            </tr>
            <tr>
              <td>imdbRating</td>
              <td>{{res.imdbRating}}</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- content end -->
      <div class="about">
        <h3>PLOT</h3>
        {{ res.Plot }}
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'app-card',
  data () {
    return {
      res: [],
      queryMovie: ''
    }
  },
  methods: {
     getCard (val) {
      this.$http.get(`http://www.omdbapi.com/?t=${val}&apikey=23ec762a&plot=full`).then(response => {
        this.res = response.body
      }, response => {
        this.title = 'Error'
      })
    }
  },
  created () {
    this.queryMovie = window.location.hash.slice(13)
    this.getCard(this.queryMovie)
  }
}
</script>

<style lang="scss" scoped>
  @import "./app-card"
</style>
