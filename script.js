var TxtRotate = function (el, toRotate, period) {
this.toRotate = toRotate;
this.el = el;
this.loopNum = 0;
this.period = parseInt(period, 10) || 2000;
this.txt = "";
this.tick();
this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
var i = this.loopNum % this.toRotate.length;
var fullTxt = this.toRotate[i];

if (this.isDeleting) {
this.txt = fullTxt.substring(0, this.txt.length - 1);
} else {
this.txt = fullTxt.substring(0, this.txt.length + 1);
}

this.el.innerHTML = '<span class="wrap" style="color:white;">' + this.txt + "</span>";

var that = this;
var delta = 300 - Math.random() * 600;

if (this.isDeleting) {
delta /= 2;
}

if (!this.isDeleting && this.txt === fullTxt) {
delta = this.period;
this.isDeleting = true;
} else if (this.isDeleting && this.txt === "") {
this.isDeleting = false;
this.loopNum++;
delta = 500;
console.log(this.loopNum);
}

if(this.loopNum == 19)
{
  try {
    clearTimeout(myTimeout);
  } catch (e) {
    console.log(e.toString());
  } finally {
    window.location.href = "./new/index.html";
  }

}

const myTimeout = setTimeout(function () {
that.tick();
}, delta);
};

window.onload = function () {
var elements = document.getElementsByClassName("txt-rotate");
for (var i = 0; i < elements.length; i++) {
var toRotate = elements[i].getAttribute("data-rotate");
var period = elements[i].getAttribute("data-period");

if (toRotate) {

  new TxtRotate(elements[i], JSON.parse(toRotate), period);
}

}

// INJECT CSS
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666}";
document.body.appendChild(css);


};

let audioPlaying = true,
    backgroundAudio, browser;
browser = navigator.userAgent.toLowerCase();
$('<audio class="audio1" src="audio.mp3" loop></audio>').prependTo('body');
if (!browser.indexOf('firefox') > -1) {
    $('<embed id="background-audio" src="audio.mp3" autostart="1"></embed>').prependTo('body');
    backgroundAudio = setInterval(function() {
        $("#background-audio").remove();
        $('<embed id="background-audio" src="hbd.mp3"></embed>').prependTo('body');
    }, 120000); // 120000 is the duration of your audio which in this case 2 mins.
}
