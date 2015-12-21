$(document).ready(function () {
    var FLASH_ON_MINUTE = true;
    var FLASH_ON_HOUR = true;

    var clock = document.getElementById('clock');

    clock.addEventListener('animationend', function (){
        clock.classList.remove('flash');
        clock.classList.remove('drop');
    });

    var setWeather = function() {
        $.simpleWeather({
            location: '94114',
            woeid: '',
            unit: 'f',
            success: function (weather) {
                var updated = moment(Date.parse(weather.updated));
                var $weather = $('#weather');

                $('#temp .value').show().html(weather.temp);
                $weather.find('.text').show().html(weather.currently);
                $weather.find('.icon').show().html('<i class="wi wi-yahoo-' + weather.code + '"/>');
                $weather.find('.updated').show().html(updated.format('[(]h:mm[)]'));
                $('#sunrise').html(weather.sunrise);
                $('#sunset').html(weather.sunset);
            },
            error: function (error) {
                $("#temp").hide();
                $("#weather").hide();
            }
        });
    };

    var flashClock = function () {
        clock.classList.add('flash');
    };

    var setClock = function () {
        var now = new Date();
        var m = moment(now);

        var hours = m.hours();
        var minutes = m.minutes();
        var seconds = m.seconds();

        var beforeHour = seconds % 59 == 0 && hours % 59 == 0;
        var beforeMinute = seconds % 59 == 0;

        if (beforeHour && FLASH_ON_HOUR) {
            flashClock();
        } else if (beforeMinute && FLASH_ON_MINUTE) {
            flashClock();
        }

        var timeString = m.format('h:mma');
        document.getElementById('clock').innerHTML = timeString.substr(0, timeString.length - 1);
    };

    setInterval(setClock, 1000);
    setClock();

    setInterval(setWeather, 1000 * 60 * 15); // 15 minutes
    setWeather();

});

$(".cont").ready(function () {
    setInterval(function () {
        var height = $(".foreground").height();
        var top = $(".foreground").height();
        var div = $(window).width();
        $(".cont").css("height", height + 30);
        $(".foreground").css("top", -top + 15);
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