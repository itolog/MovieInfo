<template>
  <main class="main">
    <section class="movies">
			<header class="header">
				<h1 class="title">Movie info APP</h1>
				<!-- <form v-on:submit="submit"></form> -->
      	<input type="text" v-model="msg" placeholder="search movie">
			</header>
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
			msg: 'batman',
			movies: []
    }
  },
  methods: {
    getAll (val) {
      this.$http.get(`http://www.omdbapi.com/?s=${val}&apikey=23ec762a`).then(response => {
				this.movies = response.body.Search
      }, response => {
        this.title = 'Error'
      })
    },
		toCard (evt) {
			let name = this.msg
			this.$router.push({ path: 'card', query: { movie: evt.toLowerCase() } })
		}
  },
  updated () {
		this.getAll(this.msg)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .main{
    display: flex;
		justify-content: center;
    width: 100%;
		background: url('https://www.thebitbag.com/wp-content/uploads/2016/11/Deadpool-2-Movie.jpg') no-repeat;
		background-attachment: fixed;
  }
	.header{
		display: flex;
		flex-flow: column;
		width: 100%;
		background: orange;
		margin-bottom: 20px;
	}
  .movies{
		display: flex;
		flex-flow: column;
		width: 100%;
		padding: 10px;
		margin-bottom: 50px;
	}
	.items{
		display: flex;
		flex-flow: column;
		margin: auto;
		background: rgb(190, 179, 179);
		margin-bottom: 20px;
		padding: 20px;
	}
	.items__info{
		margin-bottom: 10px;
		h3{
			cursor: pointer;
		}
	}
</style>
