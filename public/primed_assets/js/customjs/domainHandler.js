const dispatch = (url, default_link) => {
	if(location.origin == 'primedpoll.com' ||  location.origin == 'www.primedpoll.com' ||  location.origin == 'app.primedpoll.com'){
		location.replace(url)
	}else {
	    location.replace(default_link)
	}
}
const authIn = (command) => {

	switch (command) {
		case 'login':
			dispatch('app.primedpoll.com/user/signin.html', '/user/signin.html');
		break;
		case 'signup':
			dispatch('app.primedpoll.com/user/signup.html', '/user/signup.html');
		break;
		case 'forgot':
			dispatch('app.primedpoll.com/user/forget_password.html', '/user/forget_password.html');
		break;
		case 'reset':
			dispatch('app.primedpoll.com/user/reset_password.html', '/user/reset_password.html');
		break;
		case 'confirm':
			dispatch('app.primedpoll.com/user/confirmation-registration.html', '/user/confirmation-registration.html');
		break;
		case 'complete':
			dispatch('app.primedpoll.com/user/signup.html', '/user/signup.html');
		break;
	}
}