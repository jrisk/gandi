<template>
  <div>
<header>
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    controls
    fade
    indicators
    img-width="1024"
    img-height="480"
    >
    <a href="/home"><b-carousel-slide caption="Welcome" img-src="/public/img/comp_outdoors.jpg" />
    </a>
    
    <a href="/skoolia"><b-carousel-slide caption="Skoolia" img-src="/public/img/CQUniversity.jpg" />
    </a>

    <a href="/project-list"><b-carousel-slide caption="More" img-src="/public/img/people-using-computer.png" style="background-color: white" />
    </a>
  </b-carousel>
</header>

<!-- Page Content -->
<section class="py-5 text-center services-section">
      <div class="container"> 
        <h2 class="text-center">Jarisk Services</h2>
        <p class="text-muted mb-5 text-center">Web Development</p>

        <div class="row">

          <div class="col-sm-6 col-lg-4 mb-3">
            <h6>Javascript</h6>
            <i class="fab fa-js-square"></i>
            <p class="text-muted">Node, ECMA6, Angular, React, Vue</p>
          </div>

          <div class="col-sm-6 col-lg-4 mb-3">
            <h6>Full Stack</h6>
            <i class="fas fa-ethernet"></i>
            <p class="text-muted">HTML, CSS, Bootstrap, PHP, MySQL, Webpack</p>
          </div>

          <div class="col-sm-6 col-lg-4 mb-3">
            <h6>Web Admin</h6>
            <i class="fas fa-tools"></i>
            <p class="text-muted">5 Sites under Management</p>
              <div class="d-flex">
                <ul class="list-inline mx-auto justify-content-center">
                  <li class="list-inline-item"><a class="main-links" href="https://topeurotips.com">Top Euro Tips</a></li> 
                  <li class="list-inline-item"><a class="main-links" href="http://www.dothispodcast.com">Do This Podcast</a></li>
                  <li class="list-inline-item"><a class="main-links" href="http://www.regionplural.com">Region Plural</a></li>
                  <li class="list-inline-item"><a class="main-links" href="http://www.madcryptogains.com">Mad Crypto Gains (wip)</a></li>
                </ul>
              </div>
          </div>

          <div class="col-sm-6 col-lg-4 mb-3">
            <h6>Writing</h6>
            <i class="fas fa-lightbulb"></i>
            <p class="text-muted">Articles and Blogs</p>
          </div>

          <div class="col-sm-6 col-lg-4 mb-3">
            <h6>Translations</h6>
            <i class="fas fa-comment"></i>
            <p class="text-muted">Language translation API service</p>
          </div>

          <div class="col-sm-6 col-lg-4 mb-3">
            <h6>Dev Ops</h6>
            <i class="fas fa-cloud"></i>
            <p class="text-muted">Stack-tracing, Log-reading, Server maintenance</p>
          </div>

        </div>
      </div>
</section>

  <section class="main">
    <div class="container mt-4">
        <h1 class="text-center mb-4 p-4 blog-head">Selected Quotes</h1>
        <div class="row blog-rows">

        <div class="card-columns">

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
              <p style="color: blue;">“It is important to reason from first principles then by analogy. The normal way we conduct our lives is we reason by analogy.  We are doing this because it's like something else that was done, or it is like what other people are doing. With first principles you boil things down to the most fundamental truths…and then reason up from there.”</p>
              <footer class="blockquote-footer">
                <small class="text-muted">
                  <cite title="Source Title">Elon Musk</cite>
                </small>
              </footer>
            </blockquote>
          </div>

          <div class="card shadow border-0 p-3 bg-primary text-white text-right">
            <blockquote class="blockquote mb-0">
              <p>“We live in a society exquisitely dependent on science and technology, in which hardly anyone knows anything about science and technology.”</p>
              <footer class="blockquote-footer">
                <small style="color: orange;">
                  Carl Sagan
                </small>
              </footer>
            </blockquote>
          </div>

          <div class="card shadow border-0 p-3 bg-primary text-white text-right">
            <blockquote class="blockquote mb-0">
              <p>“Technology is nothing. What's important is that you have a faith in people, that they're basically good and smart, and if you give them tools, they'll do wonderful things with them.”</p>
              <footer class="blockquote-footer">
                <small style="color: orange;">
                  Steve Jobs
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

.main-links {
  text-decoration: none;
}

.main-list {
  list-style: none;
}
</style>