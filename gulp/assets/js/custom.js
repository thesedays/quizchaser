(function(window, $, undefined) {
	var quiz = {
		settings: {},
		init: function() {
			var q = quiz,
				s = q.settings;

			s.$quizes = $('.quiz');
			s.$radio = s.$quizes.find(':radio');

			s.$quizes.not(':first').hide();

			$('.progress-bar').attr('data-step', 0);

			s.$radio.on('change', function() {
				var $parent = $(this).parents('.quiz'),
					index = s.$quizes.index($parent);

				$('.progress-bar').attr('data-step', index + 2);

				if($(this).parents('.quiz').hasClass('last')) {
					setTimeout(function() {
						window.location.href = 'finish.html';
					}, 1000);
					window.location.href = 'finish.html';
				} else {
					s.$quizes.filter(':visible').hide().next().show();
				}
			});
		}
	};

	$(quiz.init);
}(window, window.jQuery));