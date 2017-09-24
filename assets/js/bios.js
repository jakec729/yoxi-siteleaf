function findAncestor($el, $class) {
	while ( ($el = $el.parentElement) && !$el.classList.contains($class));
	return $el;
}

$buttons = document.querySelectorAll('.bio-toggle');
$buttons.forEach(function($button){
	$button.addEventListener('click', function(e) {
		e.preventDefault();

		$bio = findAncestor($button = e.target.parentNode, 'bio');
		$bio.classList.toggle('is-open');
	});
});
