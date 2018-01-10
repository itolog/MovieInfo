<template>
  <main class="main">
    <section class="movies">
			<header class="header">
				<h1 class="title">Movie info APP</h1>
      	<input class="search" type="text" v-model="msg" placeholder="please enter the name of the movie..." autofocus>
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
		<section class="navigation">
			<button class="navigation__btn_prev" v-on:click="prev">PREV</button>
			<button class="navigation__btn_next" v-on:click="next">NEXT</button>
		</section>
		<button class="upp" @click="upp">upp</button>
  </main>
</template>

<script>
export default {
  name: 'app-main',
  data () {
    return {
			msg: '',
			idPage: 1,
			title: '',
			err: false,
			movies: [],
			dataMovie: []
    }
  },
	computed: {
		lastPage () {
			return Math.ceil(this.dataMovie / 10);
		}
 	}, 
  methods: {
    getAll (name, page = 1) {
      this.$http.get(`http://www.omdbapi.com/?s=${name}&page=${page}&apikey=23ec762a`).then(response => {
				this.movies = response.body.Search
				this.dataMovie = response.body.totalResults
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
		},
		prev () {
		if ( this.idPage > 1) {
				this.idPage--;
				window.scrollTo( 0, 0 );
		}
		
		},
		next () {
			if (this.idPage < this.lastPage) {
				this.idPage++;
				window.scrollTo( 0, 0 );
			}	
		},
		upp () {
			window.scrollTo( 0, 0 );
		}
  },
	created  () {
			// this.getAll("terminator", this.indexPage)
	},
  updated () {
		this.searchNull()
		setTimeout(() => {
			this.getAll(this.msg, this.idPage)
		}, 500)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  @import './app-main';
</style>
