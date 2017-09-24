// var $ = require('jquery');

$links = document.querySelectorAll('.nav-item');
$toggle = document.querySelector('.nav-toggle');

$links = [].slice.call($links);
$links.push( $toggle );

$links.forEach(function($link){
	$link.addEventListener('click', function(e){
		document.querySelector('html').classList.toggle('nav-open');
	});
});
