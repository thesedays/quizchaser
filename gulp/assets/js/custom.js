(function(window, $, undefined) {
	var quiz = {
		settings: {},
		init: function() {
			var q = quiz,
				s = q.settings;

			s.$choices = $('.choices');
			s.$radio = s.$choices.find(':radio');

			s.$choices.not(':first').hide();

			s.$radio.find(':radio').on('input', function() {
				if($(this).parents('.choices').hasClass('last')) {
					window.location.href = 'finish.html';
				} else {
					s.$choices.filter(':visible').hide().next().show();
				}
			});
		}
	};

	$(quiz.init);
}(window, window.jQuery));