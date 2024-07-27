let start = document.getElementById("start");
let stop = document.getElementById("stop");
let reset = document.getElementById("reset");

let startTime;
let stopTime = 0;
let intervalId;

//milliSecondsを0埋め2桁で返す関数
function getDoubleDigit(number) {
    if(number.toString().length === 1) {
        return "00";
    } else if(number.toString().length === 2) {
        return ("0" + number).slice(0, 2);
    } else if(number.toString().length === 3) {
        return number.toString().slice(0, 2);
    }
}

//タイマーを表示する関数
function displayTime() {
    let time = new Date(Date.now() - startTime + stopTime);

    let h = ("00" + (time.getHours() - 9)).slice(-2);
    let m = ("00" + time.getMinutes()).slice(-2);
    let s = ("00" + time.getSeconds()).slice(-2);
    let ms = getDoubleDigit(time.getMilliseconds());

    let timeText = `${h}:${m}:${s}.`;

    $(document).ready(function() {
        $(".timer-text").text(timeText);
        $(".timer-milli-seconds").text(ms);
    });

    intervalId = setTimeout(displayTime, 10);
}

//スタートボタンが押されたら計測をスタートする
start.addEventListener("click", function() {
    startTime = Date.now();
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = true;

    displayTime();
});

//ストップボタンが押されたら計測をストップする
stop.addEventListener("click", function() {
    stopTime += Date.now() - startTime;
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
    clearTimeout(intervalId);
});

//リセットボタンが押されたらタイマーをリセットする
reset.addEventListener("click", function() {
    stopTime = 0;
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
    $(document).ready(function() {
        $(".timer-text").text("00:00:00.");
        $(".timer-milli-seconds").text("00");
    });
});