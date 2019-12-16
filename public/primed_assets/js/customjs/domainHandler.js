const dispatch = (url, default_link) => {
	if(location.origin === 'https://primedpoll.com' ||  location.origin === 'https://www.primedpoll.com'){
		location.replace(url)
	}else {
	    location.replace(default_link)
	}
}
const authIn = (command) => {

	switch (command) {
		case 'login':
			dispatch('https://app.primedpoll.com/user/signin.html', '/user/signin.html');
		break;
		case 'signup':
			dispatch('https://app.primedpoll.com/user/signup.html', '/user/signup.html');
		break;
		case 'forgot':
			dispatch('https://app.primedpoll.com/user/forget_password.html', '/user/forget_password.html');
		break;
		case 'reset':
			dispatch('https://app.primedpoll.com/user/reset_password.html', '/user/reset_password.html');
		break;
		case 'confirm':
			dispatch('https://app.primedpoll.com/user/confirmation-registration.html', '/user/confirmation-registration.html');
		break;
		case 'complete':
			dispatch('https://app.primedpoll.com/user/signup.html', '/user/signup.html');
		break;
	}
}