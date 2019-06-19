

function _(str) {
    return document.querySelector(str);
}
loadbtn();
function loadbtn() {
    console.log("this is js");
    _("#package").innerHTML = ``;
    var colors = ['red', 'green', 'blue', 'yellow', 'indigo', 'violet'];
    var interests = ['Art', 'Bible', 'School', 'Triangle', 'Football', 'Bar'];


    for (counter = 0; counter < interests.length; counter++) {
        _("#package").innerHTML += `
    <div class="interest${counter} text-center mt-2 ml-3 col-3 px-0 interest">${interests[counter]}</div>`;
        var random_color = colors[Math.floor(Math.random() * colors.length)];
        _(".interest" + counter).style.backgroundColor += random_color;


    }
}


setInterval( function () {
loadbtn();
}, 3000)