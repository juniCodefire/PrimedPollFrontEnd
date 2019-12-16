function _(str) {
    return document.querySelector(str);
}
console.log("in js")
const pollCard = _("#poll-card");

if(pollCard){
	console.log("in poll card")
	pollCard.addEventListener('submit', function (e) {
        _('#loading-gif').style.display = "block";
        e.preventDefault();
        console.log("clicked")
})
}