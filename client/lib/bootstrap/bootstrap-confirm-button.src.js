/*!
 * Bootstrap Confirm Button
 * https://github.com/stefanocudini/bootstrap-confirm-button
 *
 * Copyright 2014, Stefano Cudini - stefano.cudini@gmail.com
 * Licensed under the MIT license.
 */

jQuery.fn.btsConfirmButton = function(options, callback) {

	options = $.extend({
		msg: "I'm sure!",
		className: 'btn-danger',
		timeout: 2000
	}, options);

    $(this).each(function(idx, btn) {
        var timeoToken,
            thisBtn$ = $(btn),
            oriText = thisBtn$.html();

        function resetBtn() {
            thisBtn$.html(oriText).removeClass(options.className).data('confirmed',false);
        }

        thisBtn$.data('confirmed', false);
        thisBtn$.on('click.confirm', function(e) {
            e.preventDefault();
            if(thisBtn$.data('confirmed'))
            {
                callback.call(thisBtn$, e);
                resetBtn();
            }
            else
            {
                thisBtn$.data('confirmed',true);
                thisBtn$.html(options.msg).addClass(options.className).bind('mouseout.confirm', function() {
                    timeoToken = setTimeout(resetBtn, options.timeout);
                }).bind('mouseover.confirm', function() {
                    clearTimeout(timeoToken);
                });
            }
        }).removeClass(options.className);

    });

	return $(this);
};
