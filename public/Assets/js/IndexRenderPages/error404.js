
const error404 =
  `<!--Public Preloader-->
	<section class="back_bar-1">
		<div class="back_bar-2">
			<div class="bar">
				<div class="circle"></div>
				<!--<p class="preloader_text">Loading...</p>-->
			</div>
		</div>
	</section>
    <div class="container-fluid">
    <div class="row">
      <!-- End Main Sidebar -->
      <main class="main-content col-lg-12 col-md-12 col-sm-12 p-0">
        <div class="main-navbar sticky-top bg-white" style="border:none;">
          <!-- Main Navbar -->
          <nav class="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
            <form action="#" class="main-navbar__search w-100 d-md-flex d-lg-flex" >
              <div class="input-group input-group-seamless ml-3" >
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i class="fas fa-search"></i>
                  </div>
                </div>
                <input class="navbar-search form-control" type="text" placeholder="Search by username (please exclude the @ symbol)..."
                  aria-label="Search">
              </div>
            </form>
          </nav>
          <div class="col-md-3 site_name" style="height:0vh;">
            <img onclick="location.href='${ window.location.origin }'" class="mt-2" src="../Assets/images/01.png" alt=""></div>
        </div>

        <!-- / .main-navbar -->
        <div class="error">
          <div class="error__content">
            <h2>404</h2>
            <h3>Page you are looking is not found!</h3>
            <p>Why am i getting this, url you enter does not exist or no internet connection, you can try searching by username at
              the search tab above.</p>
            <div class="error_btn_redirect">
              <button type="button" class="btn btn-accent error_redirect-1" onclick="location.href='${ window.location.origin } '">&larr;
                Home</button>
              <div style="float:left; width: 5%; height: 50px;">

              </div>
              <button type="button" class="btn btn-accent error_redirect-1" onclick="location.href='${ window.location.origin }/Users/signin.html'">
                Login &rarr;</button>
            </div>

          </div>
          <!-- / .error_content -->
        </div>
        <!-- / .error -->
      </main>
    </div>
  </div>
    `;