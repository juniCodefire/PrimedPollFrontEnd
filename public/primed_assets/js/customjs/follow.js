//Follow a member in primedpoll

const follow = (event, index, followBtns, baseUrl, token) => {
    event.preventDefault();
    const element = event.srcElement || event.target;
    const id = element.dataset.followId;
    const api = `${ baseUrl }api/follow/${ id }`;
    replaceFunc(id, pass = 1);
    fetch(api, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Authorization": "Bearer" + token,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            twistBtn(data)
        })
        .catch(error => console.log(error));
}

const twistBtn = ({
    check,
    follow,
}) => {
    replaceFunc(follow.following_id, pass = 0, check);

}

const replaceFunc = (id, pass, check = null) => {
    const specificFollowDivs = Array.from(document.querySelectorAll(`.follow${ id }`));
    const specificFollowBtns = Array.from(document.querySelectorAll(`.follow-btn${ id }`));

    const followBtn = document.querySelector(`#follow-id-1${ id }`);
    specificFollowDivs.map((specificFollowDiv, i) => {
        if (pass == 1) {
            specificFollowDiv.style.opacity = "0.5";
        } else if (pass == 0) {
            specificFollowDiv.style.opacity = "1";
        }
    })

    specificFollowBtns.map((specificFollowBtn, i) => {
        if (pass == 1) {
            specificFollowBtn.setAttribute('disabled', 'true');
            specificFollowBtn.style.cursor = "not-allowed";
        } else if (pass == 0) {
            specificFollowBtn.removeAttribute('disabled');
            specificFollowBtn.style.cursor = "pointer";
            if (check === 1) {
                followBtn.style.padding = "0px 10px";
                specificFollowBtn.textContent = "Unfollow";
                insertTracker(id, statusVal = 1);
            } else {
                specificFollowBtn.textContent = "Follow";
                followBtn.style.padding = "";
                insertTracker(id, statusVal = 0);
            }
        }
    })

}
const insertTracker = (id, statusVal = null) => {
    const arrayUpdater = (toFollow) => {
        toFollow.status = statusVal;
    }
    toFollows.filter(tofollow => {
        tofollow.id === id ? arrayUpdater(tofollow) : null
    });
}