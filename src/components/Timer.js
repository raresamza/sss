// function addHours(date, hours) {
//     date.setHours(date.getHours() + hours);

//     return date;
// }

var myfunc = setInterval(function () {

    // var countDownDate = new Date();

    // console.log(countDownDate)

    // var newCountDownDate = addHours(countDownDate, 1);

    // console.log(newCountDownDate.toString());

    // var now = new Date().getTime();
    // var timeleft = countDownDate - now;

    // Calculating the days, hours, minutes and seconds left
    // var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    // var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    // var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    // Result is output to the specific element
    // console.log(days, hours, minutes, seconds)
    var year = (new Date()).getFullYear();
    console.log(year);
    // Sample output: 2016 
}, 5000);

export { myfunc }


