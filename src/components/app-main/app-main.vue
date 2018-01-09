<template>
  <main class="main">
    <section class="movies">
			<header class="header">
				<h1 class="title">Movie info APP</h1>
				<!-- <form v-on:submit="submit"></form> -->
      	<input class="search" type="text" v-model="msg" placeholder="search movie">
			</header>
			<div class="server-err" v-if="err">{{ title }}</div>
			<!-- movie cards -->
			<div class="items" v-for="movie in movies" :key="movie.id">
				<!-- info -->
				<div class="items__info" title="more info">
					<h3 class="items__title" v-on:click="toCard($event.target.innerText)">{{movie.Title}}</h3>
					<span class="items__year">Year: {{movie.Year}}</span>
				</div>
				<!-- poster -->
				<div class="items__poster">
					<img class="items__poster_img" :src=movie.Poster alt="poster">
				</div>
			</div>
			<!-- movie cards end -->
    </section>
  </main>
</template>

<script>
export default {
  name: 'app-main',
  data () {
    return {
			msg: '',
			title: '',
			err: false,
			movies: []
    }
  },
  methods: {
    getAll (val) {
      this.$http.get(`http://www.omdbapi.com/?s=${val}&apikey=23ec762a`).then(response => {
				this.movies = response.body.Search
      }, response => {
        this.title = 'Server Error'
				this.err = true
      })
    },
		toCard (evt) {
			let name = this.msg
			this.$router.push({ path: 'card', query: { movie: evt.toLowerCase() } })
		},
		searchNull () {
				if (this.movies == undefined) {
					this.err = true
					this.title = 'no such movie...'
				} else {
					this.err = false
				}
		}
  },
  updated () {
		this.searchNull()
		this.getAll(this.msg)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  @import './app-main';
</style>
