const root = document.querySelector('#root');
console.log('open')
if ((location.pathname === '/' || location.pathname === '/index.html') && location.hash === "") {
	console.log('open')

	root.innerHTML =
		` <div class="se-pre-con">
			<p align='center'></p>
		 </div>
		<div class="container-fluid">
        <div class="row">
            <nav class="navbar navbar-expand-lg navbar-light our-nav col-12">
                <a class="navbar-brand ml-2 py-1" href="#">
                    <img src="primed_assets/img/06.png" alt="">
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item mx-3">
                            <a class="nav-link" href="#">Home</a>
                        </li>
                        <li class="nav-item mx-3">
                            <a class="nav-link" href="#">About</a>
                        </li>
                        <li class="nav-item mx-3">
                            <a class="nav-link" href="#">Blog</a>
                        </li>
                        <li class="nav-item mx-3">
                            <a class="nav-link" href="#">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div id="carouselExampleIndicators" class="col-12 carousel slide landing-full px-0" data-ride="carousel" data-interval="false">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item first-slide active">
                        <div class="col-12 col-md-8 mx-auto carousel-words text-center">
                            <h1 class="mt-5">Do not wait- <span>Drop</span> your poll for a vote!</h1>
                            <p class="quote mb-5"><i class="fa fas fa-quote-left"></i>Voting is super important, and
                                your vote counts. <span class="quote-author">GloZell</span></p>
                            <div class="landing-buttons col-12 col-md-6 mx-auto row mx-0 mt-3">
                                <button onclick="authIn('signup')" class="btn col-12 col-md mx-2 mt-2 py-3 btn-white-outline">GET STARTED</button>
                                <button  onclick="authIn('login')" class="btn col-12 col-md mx-2 mt-2 py-3 btn-blue-outline">LOGIN</button>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item second-slide">
                        <!-- <div class="video-container">
                            <video src="primed_assets/img/Avengers Endgame 2019 PROPER 720p WEB-DL x264 ESubs - MkvHub.Com.mkv" autoplay loop controls></video>
                        </div> -->
                        <div class="col-12 col-md-8 mx-auto carousel-words text-center">
                            <h1 class="mt-5">Do not wait- <span>Drop</span> your poll for a vote!</h1>
                            <p class="quote mb-5"><i class="fa fas fa-quote-left"></i>Voting is super important, and
                                your vote counts. <span class="quote-author">GloZell</span></p>
                            <div class="landing-buttons col-12 col-md-6 mx-auto row mx-0 mt-3">
                                <button onclick="authIn('signup')" class="btn col-12 col-md mx-2 mt-2 py-3 mt-2 btn-white-outline">GET
                                    STARTED</button>
                                <button onclick="authIn('login')" class="btn col-12 col-md mx-2 mt-2 py-3 mt-2 btn-blue-outline">LOGIN</button>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item third-slide">
                        <div class="col-12 col-md-8 mx-auto carousel-words text-center">
                            <h1 class="mt-5">Do not wait- <span>Drop</span> your poll for a vote!</h1>
                            <p class="quote mb-5"><i class="fa fas fa-quote-left"></i>Voting is super important, and
                                your vote counts. <span class="quote-author">GloZell</span></p>
                            <div class="landing-buttons col-12 col-md-6 mx-auto row mx-0 mt-3">
                                <button  onclick="authIn('signup')" class="btn col-12 col-md mx-2 mt-2 py-3 btn-white-outline">GET STARTED</button>
                                <button  onclick="authIn('login')" class="btn col-12 col-md mx-2 mt-2 py-3 btn-blue-outline">LOGIN</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mb-5 row mx-0 mx-auto top-interests">
                        <h5 class="text-center col-12">Top Interests</h5>
                        <div class="col mx-1 interest-con text-center">
                            <span>Politics</span>
                        </div>
                        <div class="col mx-1 interest-con text-center">
                            <span>Fiction</span>
                        </div>
                        <div class="col mx-1 interest-con text-center">
                            <span>GOT</span>
                        </div>
                        <div class="col mx-1 interest-con text-center">
                            <span>Laughs</span>
                        </div>
                        <div class="col mx-1 interest-con text-center">
                            <span>Tech</span>
                        </div>
                        <div class="col mx-1 interest-con text-center">
                            <span>Nigeria</span>
                        </div>
                        <div class="col mx-1 interest-con text-center">
                            <span>TV</span>
                        </div>
                    </div>
                </div>
                <!-- <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a> -->
            </div>
        </div>
    </div>
    `};
