// Navbar

$('.navTrigger').click(function () {
	$(this).toggleClass('active');
	$('#mainListDiv').toggleClass('show_list');
	$('#mainListDiv').fadeIn();
});

$(window).scroll(function () {
	if ($(document).scrollTop() > 50) {
		$('.nav').addClass('affix');
	} else {
		$('.nav').removeClass('affix');
	}
});

// $(window).on('load', function() {
// 	$('.masthead').delay(10000).fadeOut('slow');
// });

// $(window).on('load', function() {
// 	$('.masthead').animate(
// 		{
// 			'background-image': url('../img/map2.jpg')
// 		},
// 		5000
// 	);
// });

// $(window).on('load', function() {
// 	$('.masthead').css('background-image', "url('/img/map2.jpg')");
// });

// $(window).on('load', function() {
// 	$('.beagle1').removeProp("src");
// 	$('.beagle1').attr('img', "src='/img/Beagle2.png'");
// });

// $(document).ready(function() {
// 	$('.beagle1').animate({ src: 'img/Beagle2.png' }, 5000);
// });

$(window).on('load', function () {
	$('.masthead').toggleClass('.landing');
});

// Scroll down button
$(function () {
	$('.scroll-down').click(function () {
		$('html, body').animate({
			scrollTop: $('#about').offset().top
		}, 'slow');
		return false;
	});
});

$('.ppic img').hover(function () {
	$(this).attr('src', 'img/JL2.jpg');

}, function () {
	$(this).attr('src', 'img/JL.jpg');
});


// Back to top button
$(window).scroll(function () {
	if ($(this).scrollTop() > 100) {
		$('.back-to-top').fadeIn('slow');
	} else {
		$('.back-to-top').fadeOut('slow');
	}
});
$('.back-to-top').click(function () {
	$('html, body').animate({
		scrollTop: 0
	}, 500, 'easeInOutExpo');
	return false;
});

/*--/ Typewriter effect /--*/
setTimeout(() => {
	if ($('.text-slider').length == 1) {
		var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			delay: 500,
			typeSpeed: 80,
			loop: true,
			backDelay: 1000,
			backSpeed: 30
		});
	}
}, 3000);

/*--/ Achievements Flip Counter /--*/
function handleTickInit1(tick) {
	var timer = Tick.helper.interval(
		function () {
			tick.value = 44;
		},
		44, {
			autostart: false
		}
	);
	// waypoint to trigger flip on scroll
	$(document).ready(function () {
		jQuery(function ($) {
			var $flippers = $('#timeline');

			$flippers.each(function (event, direction) {
				var waypoint = new Waypoint({
					element: $(this),
					handler: function () {
						timer.start();
					},
					offset: '75%'
				});
			});
		});
	});
}

function handleTickInit2(tick) {
	var timer = Tick.helper.interval(
		function () {
			tick.value = 25;
		},
		25, {
			autostart: false
		}
	);
	// waypoint to trigger flip on scroll
	$(document).ready(function () {
		jQuery(function ($) {
			var $flippers = $('#timeline');

			$flippers.each(function (event, direction) {
				var waypoint = new Waypoint({
					element: $(this),
					handler: function () {
						timer.start();
					},
					offset: '75%'
				});
			});
		});
	});
}

function handleTickInit3(tick) {
	var timer = Tick.helper.interval(
		function () {
			tick.value = 146;
		},
		146, {
			autostart: false
		}
	);
	// waypoint to trigger flip on scroll
	$(document).ready(function () {
		jQuery(function ($) {
			var $flippers = $('#timeline');

			$flippers.each(function (event, direction) {
				var waypoint = new Waypoint({
					element: $(this),
					handler: function () {
						timer.start();
					},
					offset: '75%'
				});
			});
		});
	});
}

// Gsap animations
gsap.registerPlugin(ScrollTrigger);

function showDimensions() {
	return console.log($('#about').height()), console.log($('#about').width());
}

showDimensions();

gsap.from('.nameTag', {
	scrollTrigger: '.nameTag',
	delay: 1,
	duration: 2,
	ease: 'power2',
	x: 2000
});

gsap.to('.moon', {
	scrollTrigger: {
		trigger: '.moon',
		endTrigger: '.trees',
		start: 'top center',
		markers: false,
		delay: 1,
		toggleActions: 'restart none none reset'
	},
	duration: 15,
	ease: 'slow',
	x: -$('#about').height() * 4,
	y: $('#about').width() / 3
});

gsap.to('.clouds', {
	scrollTrigger: {
		trigger: '.clouds',
		start: 'top center',
		markers: false,
		toggleActions: 'restart pause reverse reset',
		scrub: true
	},
	duration: 10,
	ease: 'slow',
	xPercent: 100
});

gsap.from('.service-box', {
	scrollTrigger: '.service-box',
	delay: 0.1,
	duration: 2,
	ease: 'power2',
	stagger: 0.4,
	x: -2000,
	rotation: 360
});

gsap.from('.box-shadow-full1', {
	scrollTrigger: {
		trigger: '.trees',
		start: 'top center',
		delay: 1
	},
	duration: 8,
	opacity: 0
});