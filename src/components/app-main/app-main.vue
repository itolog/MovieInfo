<template>
  <main class="main">
    <section class="movies">
			<header class="header" id="t2">
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
		<section class="navigation" v-if="scrollBottom">
			<button class="navigation__btn_prev" v-on:click="prev">PREV</button>
			<button class="navigation__btn_next" v-on:click="next">NEXT</button>
		</section>
		<transition name="upp" >
			<scroll-to target="#t2" class="upp" v-if="scrollBottom" >
				<span class="icon is-large">
  				<i class="fa fa-chevron-up"></i>
				</span>
			</scroll-to>
		</transition>
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
			scrollBottom: false,
			scrolled: false,
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
		// scrolled function
		scroll () {
			this.scrolled = window.pageYOffset
			if (this.scrolled >= 200) {
				this.scrollBottom = true
			} else {
				this.scrollBottom = false
			}
		},
		// GET all movies
    getAll (name, page = 1) {
      this.$http.get(`http://www.omdbapi.com/?s=${name}&page=${page}&apikey=23ec762a`).then(response => {
				this.movies = response.body.Search
				this.dataMovie = response.body.totalResults
      }, response => {
        this.title = 'Server Error'
				this.err = true
      })
		},
		//  Routing
		toCard (evt) {
			let name = this.msg
			this.$router.push({ path: 'card', query: { movie: evt.toLowerCase() } })
		},
		// check for availability movies
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
		}
  },
	created  () {
			window.addEventListener('scroll', this.scroll)
	},
	destroyed () {
		window.removeEventListener('scroll', this.scroll);
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
