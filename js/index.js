// Clock
$(document).ready(function () {
    var FLASH_ON_MINUTE = true;
    var FLASH_ON_HOUR = true;

    var clock = document.getElementById('clock');

    clock.addEventListener('animationend', function (){
        clock.classList.remove('flash');
        clock.classList.remove('drop');
    });

    var flashClock = function () {
        clock.classList.add('flash');
    };

    var setClock = function () {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (hours > 12) {
            var hours = hours - 12;
            var ap = "p";
        } else if (hours == 12) {
            var ap = "p";
        } else if (hours == 24) {
            var hours = hours - 12;
            var ap = "a";
        } else {
            var ap = "a";
        }

        if (seconds % 59 == 0 && hours % 59 == 0 && FLASH_ON_HOUR) {
            flashClock();
        } else if (seconds % 59 == 0 && FLASH_ON_MINUTE) {
            flashClock();
        }

        document.getElementById('clock').innerHTML = hours + ":" + minutes + ap;
    };

    setInterval(setClock, 1000);
    setClock();
});

$(".cont").ready(function () {
    setInterval(function () {
        var height = $(".foreground").height();
        var top = $(".foreground").height();
        var div = $(window).width();
        $(".cont").css("height", height + 30);
        $(".foreground").css("top", -top + 15);
        $(".text").css("margin-top", top - 60);
    }, 0.01);
});

// Color settings
$(document).ready(function () {
    var setMood = function () {
        var dawn = '#78d';
        var day = '#1bf';
        var dusk = '#036';

        var mood = new Date();
        var hour = mood.getHours();

        // Dawn
        if ((hour > 5 && hour < 8) || (hour > 17 && hour < 19)) {
            $('body').css('background', dawn);
            $('.trees').css('fill', dawn);
            $('.sky-dawn').css('opacity', '1');
            $('.sky-day').css('opacity', '1');
            $('.hills').css('fill', '#c66');
            $('.hills').css('opacity', '1');
        }
        // Day
        else if (hour > 7 && hour < 18) {
            $('body').css('background', day);
            $('.trees').css('fill', day);
            $('.sky-dawn').css('opacity', '0');
            $('.sky-day').css('opacity', '1');
            $('.hills').css('fill', '#db9');
            $('.hills').css('opacity', '1');
        }
        // Night
        else {
            $('body').css('background', dusk);
            $('.trees').css('fill', dusk);
            $('.sky-day').css('opacity', '0');
            $('.hills').css('fill', '#0be');
            $('.hills').css('opacity', '1');
        }
    };

    setInterval(setMood, 1000 * 60); // 1 Minute
    setMood();
});