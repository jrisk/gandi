<template>
  <div>
<header>
  <!--<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" role="listbox">
      <div class="carousel-item active" style="background-image: url('public/img/comp_outdoors.jpg')">
        <div class="carousel-caption d-none d-md-block">
          <h2 class="display-4">First Slide</h2>
          <p class="lead">This is a description for the first slide.</p>
        </div>
      </div>
      <div class="carousel-item" style="background-image: url('https://4.bp.blogspot.com/-InDD3Hm_bhU/XB4_TK3TT7I/AAAAAAAAAJ4/r5tUeCOqq1MTchFh7D7pWdf582A4qYIIwCEwYBhgL/s1600/Businesswoman-working-at-a-computer-1280x720.jpg')">
        <div class="carousel-caption d-none d-md-block">
          <h2 class="display-4">Second Slide</h2>
          <p class="lead">This is a description for the second slide.</p>
        </div>
      </div>
      <div class="carousel-item" style="background-image: url('https://1.bp.blogspot.com/-GWl5F8P4t-8/XB4_VV4VE5I/AAAAAAAAAKE/SmHRzas-LpMpDBoLn6otR9AznVsr6L7OgCEwYBhgL/s1600/t1larg.africa.cnn.jpg')">
        <div class="carousel-caption d-none d-md-block">
          <h2 class="display-4">Third Slide</h2>
          <p class="lead">This is a description for the third slide.</p>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
  </div>-->
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators
    img-width="1024"
    img-height="480"
  >
    <b-carousel-slide caption="Welcome" img-src="/public/img/comp_outdoors.jpg" />
    <b-carousel-slide caption="Skoolia" img-src="/public/img/computer_job.png" />
    <b-carousel-slide caption="Other" img-src="/public/img/online-learning.jpg" />
  </b-carousel>
</header>

<!-- Page Content -->
<section class="py-5 text-center services-section">
      <div class="container"> 
        <h2 class="text-center">Jarisk Services</h2>
        <p class="text-muted mb-5 text-center">Javascript</p>
        <div class="row">
          <div class="col-sm-6 col-lg-4 mb-3">
            <svg class="lnr text-primary services-icon">
              <use xlink:href="#lnr-magic-wand"></use>
            </svg>
            <h6>Php</h6>
            <p class="text-muted">Ex cupidatat eu officia consequat incididunt labore occaecat ut veniam labore et cillum id et.</p>
          </div>
          <div class="col-sm-6 col-lg-4 mb-3">
            <svg class="lnr text-primary services-icon">
              <use xlink:href="#lnr-heart"></use>
            </svg>
            <h6>Web Dev</h6>
            <p class="text-muted">Tempor aute occaecat pariatur esse aute amet.</p>
          </div>
          <div class="col-sm-6 col-lg-4 mb-3">
            <svg class="lnr text-primary services-icon">
              <use xlink:href="#lnr-rocket"></use>
            </svg>
            <h6>Web Admin</h6>
            <p class="text-muted">Voluptate ex irure ipsum ipsum ullamco ipsum reprehenderit non ut mollit commodo.</p>
          </div>
          <div class="col-sm-6 col-lg-4 mb-3">
            <svg class="lnr text-primary services-icon">
              <use xlink:href="#lnr-paperclip"></use>
            </svg>
            <h6>Writing</h6>
            <p class="text-muted">Tempor commodo nostrud ex Lorem occaecat duis occaecat minim.</p>
          </div>
          <div class="col-sm-6 col-lg-4 mb-3">
            <svg class="lnr text-primary services-icon">
              <use xlink:href="#lnr-screen"></use>
            </svg>
            <h6>Translations</h6>
            <p class="text-muted">Et fugiat sint occaecat voluptate incididunt anim nostrud ea cillum cillum consequat.</p>
          </div>
          <div class="col-sm-6 col-lg-4 mb-3">
            <svg class="lnr text-primary services-icon">
              <use xlink:href="#lnr-inbox"></use>
            </svg>
            <h6>Dev Ops</h6>
            <p class="text-muted">Et labore tempor et adipisicing dolor.</p>
          </div>
        </div>
      </div>
</section>

  <section class="main">
    <div class="container mt-4">
        <h1 class="text-center mb-4 p-4 blog-head">Writings</h1>
        <div class="row blog-rows">

        <div class="card-columns">

          <div class="card shadow border-0">
            <img class="card-img-top" src="https://4.bp.blogspot.com/-InDD3Hm_bhU/XB4_TK3TT7I/AAAAAAAAAJ4/r5tUeCOqq1MTchFh7D7pWdf582A4qYIIwCEwYBhgL/s1600/Businesswoman-working-at-a-computer-1280x720.jpg" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Card title that wraps to a new line</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>

          <div class="card shadow border-0 p-3">
            <blockquote class="blockquote mb-0 card-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <footer class="blockquote-footer">
                <small class="text-muted">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
              </footer>
            </blockquote>
          </div>

          <div class="card shadow border-0">
            <img class="card-img-top" src="https://4.bp.blogspot.com/-InDD3Hm_bhU/XB4_TK3TT7I/AAAAAAAAAJ4/r5tUeCOqq1MTchFh7D7pWdf582A4qYIIwCEwYBhgL/s1600/Businesswoman-working-at-a-computer-1280x720.jpg" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>

          <div class="card shadow border-0 bg-primary text-white text-center p-3">
            <blockquote class="blockquote mb-0">
              <p>“The syntactical nature of reality, the real secret of magic, is that the world is made of words. And if you know the words that the world is made of, you can make of it whatever you wish.”</p>
              <footer class="blockquote-footer">
                <small style="color: orange;">Terrence Mckenna
                </small>
              </footer>
            </blockquote>
          </div>

          <div class="card shadow border-0 p-3 text-right">
            <blockquote class="blockquote mb-0">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <footer class="blockquote-footer">
                <small class="text-muted">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
              </footer>
            </blockquote>
          </div>

          </div> <!-- columns -->

      </div> <!-- row -->

    </div> <!-- container -->

  </section>
</div>
</template>

<script>
export default {
  data () {
    return {
      quotes: []
    }
  },
  methods: {
    quote_gen() {
      //this.quotes = QuoteRepository();
    }
  }
}

</script>

<style>
.carousel-item {
  height: 100vh;
  min-height: 350px;
  background: no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
section {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.lnr {
  display: inline-block;
  fill: currentColor;
  width: 1em;
  height: 1em;
  vertical-align: -0.05em;
  stroke-width: 1;
}

.services-icon {
  margin-bottom: 20px;
  font-size: 30px;
}
.bgc2, .vLine, .hLine {
    background-color: #0F52BA;
}

.quote-icon {
  font-size: 40px;
  margin-bottom: 20px;
}
.services-icon {
    font-size: 60px;
    margin-left: 2rem;
}

.services-section {
  background: white;
}

.blog-head {
  color: white;
}

.blog-rows {
  color: orange;
}
</style>