/*
Table of Contents:
------------------
1. Loading
2. Page scrolling
3. Countdown
4. OWL Gallery
5. Form
6. Select arrow
7. Map

/* 1. Loading
====================*/
'use strict';

//jQuery to collapse the navbar on scroll
var newNav = $('nav.clone');
$(window).on('scroll', function() {
	if ($(this).scrollTop() > 350) {
		newNav.removeClass('unstick').addClass('stick');
	} else {
		newNav.removeClass('stick').addClass('unstick');
	}
});
if ($('.wedding-date').length != 0) {
	$('.wedding-date').arctext({
		radius: 360
	});
}

/* 2. Page scrolling
=====================*/
//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
	$('a.page-scroll').on('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top - 76
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});
});
$('nav li').on('click', 'a', function() {
	$('.navbar-collapse.in').collapse('hide');
});

/* 3. Countdown
=======================*/
function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function initializeClock(id, endtime) {
	var clock = document.getElementById(id);
	var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');
	var newChild;

	function updateClock() {
		var t = getTimeRemaining(endtime);
		var daysArr = String(t.days).split('');
		daysSpan.innerHTML = '';
		for (var i = 0; i < daysArr.length; i++) {
			newChild = document.createElement('span');
			newChild.innerHTML = daysArr[i];
			daysSpan.appendChild(newChild);
		}
		var hoursArr = String(('0' + t.hours).slice(-2)).split('');
		hoursSpan.innerHTML = '';
		for (var i = 0; i < hoursArr.length; i++) {
			newChild = document.createElement('span');
			newChild.innerHTML = hoursArr[i];
			hoursSpan.appendChild(newChild);
		}
		var minuteArr = String(('0' + t.minutes).slice(-2)).split('');
		minutesSpan.innerHTML = '';
		for (var i = 0; i < minuteArr.length; i++) {
			newChild = document.createElement('span');
			newChild.innerHTML = minuteArr[i];
			minutesSpan.appendChild(newChild);
		}
		var secondArr = String(('0' + t.seconds).slice(-2)).split('');
		secondsSpan.innerHTML = '';
		for (var i = 0; i < secondArr.length; i++) {
			newChild = document.createElement('span');
			newChild.innerHTML = secondArr[i];
			secondsSpan.appendChild(newChild);
		}
		if (t.total <= 0) {
			clearInterval(timeinterval);
		}
	}
	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}
// set your wedding date here
var deadline = 'December 3 2016 20:30';
initializeClock('timer', deadline);

/* 4. Owl Gallery
==================================*/

function renderCarousel() {
	var $owl = $('.owl-carousel');
	$owl.owlCarousel({
		loop: true,
		autoplay: true,
		responsiveClass: true,
		items: 4,
		afterInit: function () {
			$owl.find('.owl-wrapper').each(function () {
				var w = $(this).width() / 2;
				$(this).width(w);
				$(this).css('margin', '0 auto');
			});
		},
		afterUpdate: function () {
			$owl.find('.owl-wrapper').each(function () {
				var w = $(this).width() / 2;
				$(this).width(w);
				$(this).css('margin', '0 auto');
			});
		}
	});
	// Disable owl-gallery zoom (click events)
	$('.instafeed-link').click(function(link) {
		var href = jQuery(link.currentTarget).attr("href");
		var win = window.open(href, '_blank');
		if (win) {
			//Browser has allowed it to be opened
			win.focus();
		} else {
			//Browser has blocked it
			window.location.href = href;
		}
		link.preventDefault();
		link.stopPropagation();
	})
}

function executeInstafeed() {
	var template = '';
	template += '<div>';
	template += 	'<a href="{{link}}" data-lightbox="roadtrip" class="instafeed-link">';
	template += 		'<img src="{{image}}" alt="photo">';
	template += 	'</a>';
	template += '</div>';
	var feed = new Instafeed({
		get: 'tagged',
		tagName: 'aydboda',
		clientId: '3d9c90848064457ab0d3fd26eb10b493',
		accessToken: '3444147760.ba4c844.b5bc86926925441fab0b475d2db8da62',
		template: template,
		resolution: 'low_resolution',
		after: renderCarousel,
		filter: function(image) {
			return new Date(image.created_time*1000).getFullYear() === 2016;
		},
		links: true
	});
	feed.run();
}

$(window).on('load', function() {
	executeInstafeed();
});

/* 5. Form
===================================*/
(function($, window, document, undefined) {
	var $form = $('#contact-form');
	$form.submit(function(e) {
		// remove the error class
		$('.form-group').removeClass('has-error');
		$('.help-block').remove();
		// get the form data
		var formData = {
			'entry.46704672': $('input[name="form-name"]').val(), // name
			'entry.1019557586': $('input[name="form-email"]').val(), //email
			'entry.815126747': $('input[name="form-count"]').val() // count
		};
		// process the form
		$.ajax({
			type: 'POST',
			url: "https://docs.google.com/forms/d/e/1FAIpQLSePJUP_uxmpgjeaTtqXehiy8YoQaBHBM1UAT5z4k-IFNb9qsg/formResponse?embedded=true",
			data: formData,
			dataType: "xml",
			complete: function() {
				$form.html('<div class="message-success"></div>');
			}
		});
		e.preventDefault();
	});
}(jQuery, window, document));

/* 6. Select arrow
=======================================*/
$(document).on('click', function(event) {
	if ($(event.target).closest('.select-wrap').length)
		return;
	$('.select-wrap').removeClass('active');
	event.stopPropagation();
});
$('.select-wrap').on('click', 'select', function() {
	$('.select-wrap').toggleClass('active');
	return false;
});

/* 7. Map
=========================================*/
var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map_canvas'), {
		center: {
			lat: -34.7981447,
			lng: -56.0067451
		},
		zoom: 12,
		scrollwheel: true,
		mapTypeControl: false
	});
	var image = 'img/point.png';
	var beachMarker = new google.maps.Marker({
		position: {
			lat: -34.7981447,
			lng: -56.0067451
		},
		map: map,
		icon: image
	});
}
