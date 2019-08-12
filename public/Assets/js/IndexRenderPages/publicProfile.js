// <section class="back_bar-1">
//     <div class="back_bar-2">
//         <div class="bar">
//             <div class="circle"></div>
//         </div>
//         <p class="preloader_text">Loading..<span class="last-dot">.</span></p>
//     </div>
// </section>
const publicProfile =
    `<!--Public Preloader-->
    <div class="publicPreloader">
       <main>
       <p class="preloader_text">Loading..<span class="last-dot">.</span></p>
       </main>
    </div>
    <div class="container-fluid">
        <div class="alert alert-secondary alert_default" role="alert"
            style="position: absolute; bottom: 0; z-index: 999999;"></div>
        <div class="row">
            <!-- Main Sidebar -->
            <aside class="main-sidebar col-12 col-md-3 col-lg-2 px-0">
                <div class="main-navbar">
                    <nav class="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0"
                        style="border:none;">
                        <a class="navbar-brand w-100" style="line-height: 5px;">
                            <div class="site_name public_site_name" style="width:60%; margin:auto;"></div>
                        </a>
                        <a class="toggle-sidebar d-sm-inline d-md-none d-lg-none">
                            <i class="material-icons">&#xE5C4;</i>
                        </a>
                    </nav>
                </div>
                <form action="#" class="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none">
                    <div class="input-group input-group-seamless ml-3">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="fas fa-search"></i>
                            </div>
                        </div>
                        <input class="navbar-search form-control" type="text" placeholder="Search for something..."
                            aria-label="Search">
                    </div>
                </form>
                <div class="nav-wrapper">
                    <ul class="nav flex-column" id="profileSideBar">
                        <!-- <li class="nav-item">
                            <a class="nav-link " href="index.html">
                            <i class="material-icons">edit</i>
                            <span>Blog Dashboard</span>
                            </a>
                        </li> -->
                        <li class="nav-item">
                            <a class="nav-link " href="user-feed.html">
                                <i class="material-icons">vertical_split</i>
                                <span>Your Feeds</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="new-poll.html">
                                <i class="material-icons">note_add</i>
                                <span>Create New Poll</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="user-profile-lite.html">
                                <i class="material-icons">person</i>
                                <span>Your Profile</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="errors.html">
                                <i class="material-icons">error</i>
                                <span>Errors</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            <!-- End Main Sidebar -->
            <main class="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
                <div class="main-navbar mb-5 sticky-top bg-white" style="border:none;">
                    <!-- Main Navbar -->
                    <nav class="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
                        <form action="#" class="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                            <div class="input-group input-group-seamless ml-3">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <i class="fas fa-search"></i>
                                    </div>
                                </div>
                                <input class="navbar-search form-control" type="text"
                                    placeholder="Search for something..." aria-label="Search">
                            </div>
                        </form>
                        <ul class="navbar-nav border-left flex-row" id="profileNavLeft">
                            <li class="nav-item border-right dropdown notifications">
                                <a class="nav-link nav-link-icon text-center" href="#" role="button"
                                    id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <div class="nav-link-icon__wrapper">
                                        <i class="material-icons">&#xE7F4;</i>
                                        <span class="badge  badge-danger">2</span>
                                    </div>
                                </a>
                                <div class="dropdown-menu dropdown-menu-small" aria-labelledby="dropdownMenuLink">
                                    <a class="dropdown-item" href="#">
                                        <div class="notification__icon-wrapper">
                                            <div class="notification__icon">
                                                <i class="material-icons">&#xE6E1;</i>
                                            </div>
                                        </div>
                                        <div class="notification__content">
                                            <span class="notification__category">Analytics</span>
                                            <p>Your website’s active users count increased by
                                                <span class="text-success text-semibold">28%</span> in the last
                                                week.
                                                Great job!</p>
                                        </div>
                                    </a>
                                    <a class="dropdown-item" href="#">
                                        <div class="notification__icon-wrapper">
                                            <div class="notification__icon">
                                                <i class="material-icons">&#xE8D1;</i>
                                            </div>
                                        </div>
                                        <div class="notification__content">
                                            <span class="notification__category">Sales</span>
                                            <p>Last week your store’s sales count decreased by
                                                <span class="text-danger text-semibold">5.52%</span>. It could have
                                                been worse!</p>
                                        </div>
                                    </a>
                                    <a class="dropdown-item notification__all text-center" href="#"> View all
                                        Notifications </a>
                                </div>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-nowrap px-3" data-toggle="dropdown" href="#"
                                    role="button" aria-haspopup="true" aria-expanded="false">
                                    <span id="nav_image"></span>
                                    <span class="d-none d-md-inline-block" id="nav_name"
                                        style="color:#f58731; font-weight:bold;"></span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-small" style="margin-left: -45px;">
                                    <a class="dropdown-item" href="user-profile-lite.html">
                                        <i class="material-icons">&#xE7FD;</i> Profile</a>
                                    <a class="dropdown-item" href="new-poll.html">
                                        <i class="fas fa-poll"></i> Create New Poll</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item text-danger logout" style="cursor:pointer;">
                                        <i class="material-icons text-danger">&#xE879;</i> Logout
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <nav class="nav">
                            <a href="#"
                                class="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center border-left"
                                data-toggle="collapse" data-target=".header-navbar" aria-expanded="false"
                                aria-controls="header-navbar">
                                <i class="material-icons">&#xE5D2;</i>
                            </a>
                        </nav>
                    </nav>
                </div>
                <!-- / .main-navbar -->
                <div class="alert alert-success d-none mt-5 alert-dismissible fade show mb-0" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    <i class="fa fa-check mx-2"></i>
                    <strong>Success!</strong> Your profile has been updated!
                </div>
                <div class="main-content-container container-fluid px-4">
                    <!-- End Page Header -->
                    <!-- Default Light Table -->
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="card card-small mb-4 pt-3" style="background:#e6e6e6;">
                                <div class="card-header text-center">
                                    <div class="mx-auto" id="profileImage">
                                        <img data-toggle="modal" data-target="#imageModal"
                                            class="rounded-circle user_photo"
                                            src="https://res.cloudinary.com/getfiledata/image/upload/w_200,c_thumb,ar_4:4,g_face/noimage.jpg"
                                            alt="User Avatar" width="110">
                                    </div>
                                        <h4 class="color-brand" id="member_name">
                                        </h4>
                                        <div style="width:100%;">
                                            <small id="profileUsername" title="Change Username">
                                                @juniCodefire2019
                                            </small>
                                        </div>
                                        <div data-btn-follow>
                                        
                                        </div>
                                    <div class="user-poll-stats row text-center">
                                        <div class="col-6 asked-poll">
                                            <span class="color-brand">Followers</span><br>
                                            <span class="color-grey  google-font-commom">12k</span>
                                        </div>
                                        <div class="col-6 answered-poll">
                                            <span class="color-brand">Following</span><br>
                                            <span class="color-grey  google-font-commom">1.4k</span>
                                        </div>
                                        <div class="col-6 asked-poll">
                                            <span class="color-brand">Asked Polls</span><br>
                                            <span class="color-grey  google-font-commom">106</span>
                                        </div>
                                        <div class="col-6 answered-poll">
                                            <span class="color-brand">Answered Polls</span><br>
                                            <span class="color-grey  google-font-commom">419</span>
                                        </div>
                                    </div>
                                    <ul class="list-group bio-field list-group-flush">
                                        <li class="list-group-item p-4 bioBox" style=" height:36vh;">
                                            <strong class="d-block mb-2 color-brand">Bio
                                            </strong>
                                            <span class="normal-weight bio_box" id="profileBio">Lorem ipsum dolor
                                                sit
                                                amet
                                                consectetur adipisicingelit. Odio eaque,quidem, commodi soluta qui
                                                quae
                                                minima obcaecati quod dolorum sint alias, possimus illum assumenda
                                                eligendi
                                                cumque?</span>
                                        </li>
                                        <div class="modal fade" id="uploadImageModal" role="dialog"
                                            aria-labelledby="uploadImageModal" aria-hidden="true"
                                            style="z-index: 9999">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-body">
                                                        <div class="form-group">
                                                            <div class="se-pre">
                                                                <p align='center'></p>
                                                            </div>
                                                            <label for="inputBio">Profile Image Upload</label>
                                                            <div class="row col-9 mx-auto border user-page-interests"
                                                                style="height: auto;" id="ImagePreview">
                                                                <!--<div class="mx-auto border mt-3 imageBagDrop">
                                                                </div>-->
                                                            </div>
                                                            <small id="BioHelp"
                                                                class="form-text text-muted alert_note">Click
                                                                "Change" to choose another image.</small>
                                                        </div>
                                                        <button type="submit"
                                                            class="btn btn-primary saveImage">Save</button>
                                                        <label for="uploadImage" class="btn btn-primary"
                                                            style="margin-top: 9px; background-color: #d1b7e2; border-color: #d1b7e2;">Change</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-8 container" style="height: 85vh">
                            <div class=" col-12 card card-small mb-4">
                                <div class="col-12 card-header row border-bottom pb-0" style="border-radius:20px;">
                                    <div class="col-12">
                                        <div class="row col-12 px-0">
                                            <span class="col-6 csaolor-brand">
                                                <strong class="color-brand">Recent Polls</strong>
                                            </span>
                                            <span class="text-right col-6 csaolor-brand" style="text-align:left;">
                                                <strong class="color-brand">Total Polls: <span
                                                        id="profileTotalPolls"></span></strong>
                                            </span>
                                        </div>
                                        <div class="recent-polls-box scroller-brand" style="height: 47.5vh"
                                            id="profilePolls">
                                            <h4 class="text-center color-grey" style="margin-top: 23.75vh">No recent
                                                polls</h4>
                                        </div>
                                    </div>
                                    <div class="form-row col-12 px-0">
                                        <div class="form-group col-md-12 px-0">
                                            <div class="se-pre" role="status" id="user_interest_loader">
                                            </div>
                                            <hr>
                                            <label for="userbio" class="color-brand">My Interests</label>
                                            <div class="row col-12 ml-1 border user-page-interests public_profile_interest"
                                                id="user_interest_box">
                                            </div>
                                        </div>
                                    </div>
                                    </form>
                                </div>
                            </div>
                            </li>
                            </ul>
                        </div>
                    </div>
                    <!-- End Default Light Table -->
                </div>
        </div>

    </div>
        <!-- Modals -->
        <div class="modal fade" id="publicInterestsModal" role="dialog" aria-labelledby="" aria-hidden="true" style="z-index: 9999">
            <div style="max-width: 100vw;" class="col-12 modal-dialog" role="document">
                <div style="max-height: 85vh; " class="col-10 col-md-8 mx-auto modal-content">
                    <div class="modal-header col-12 row">
                        <h5 class="modal-title col-6" id="interestTitle">Literature</h5>
                        <h5 class="subscribers">Subscribers: 3755</h5>
                    </div>
                    <p data-feed-id></p>
                    <div class="preload_feeds" role="status"></div>
                    <div data-feeds-refresh>Refresh</div>
                    <div class="modal-body scroller px-0" style="height:85vh; overflow: auto;" data-feeds-block>

                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="imageModal" role="dialog" aria-labelledby="" aria-hidden="true"
            style="z-index: 9999; background-color: rgba(0,0,0,0.5)">
            <div style="max-width: 100vw;" class="col-12 modal-dialog" role="document">
                <div style="min-height: 90vh;" class="col-4 mx-auto modal-content">
                    <div class="modal-body col-12">
                        <div style="height: 80vh" class="border col-12 modal-image-box">
                        </div>
                    </div>
                </div>
            </div>
        </div>
 `;
