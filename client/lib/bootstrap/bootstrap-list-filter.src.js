
(function($) {
	$.fn.btsListFilter = function(inputEl, options) {
		
		var searchlist = this,
			searchlist$ = $(this),
			inputEl$ = $(inputEl),
			items$ = searchlist$,
			callData,
			callReq;	//last callData execution

		function tmpl(str, data) {
			return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
				return data[key] || '';
			});
		}

		function debouncer(func, timeout) {
			var timeoutID;
			timeout = timeout || 300;
			return function () {
				var scope = this , args = arguments;
				clearTimeout( timeoutID );
				timeoutID = setTimeout( function () {
					func.apply( scope , Array.prototype.slice.call( args ) );
				}, timeout);
			};
		}

		options = $.extend({
			delay: 300,
			minLength: 1,
			initial: true,
			eventKey: 'keyup',
			resetOnBlur: true,
			sourceData: null,
			sourceTmpl: '<a class="list-group-item" href="#"><span>{title}</span></a>',
			sourceNode: function(data) {
				return tmpl(options.sourceTmpl, data);
			},
			emptyNode: function(data) {
				return '<a class="list-group-item well" href="#"><span>No Results</span></a>';
			},
			itemEl: '.list-group-item',
			itemChild: null,	
			itemFilter: function(item, val) {
				//val = val.replace(new RegExp("^[.]$|[\[\]|()*]",'g'),'');
				//val = val.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
				val = val && val.replace(new RegExp("[({[^.$*+?\\\]})]","g"),'');
				
				var text = $(item).text(),
					i = options.initial ? '^' : '',
					regSearch = new RegExp(i + val,'i');
				return regSearch.test( text );
			}
		}, options);		



		inputEl$.on(options.eventKey, debouncer(function(e) {
			
			var val = $(this).val();

			if(options.itemEl)
				items$ = searchlist$.find(options.itemEl);

			if(options.itemChild)
				items$ = items$.find(options.itemChild);

			var contains = items$.filter(function(){
					return options.itemFilter.call(searchlist, this, val);
				}),
				containsNot = items$.not(contains);

			if (options.itemChild){
				contains = contains.parents(options.itemEl);
				containsNot = containsNot.parents(options.itemEl).hide();
			}

			if(val!=='' && val.length >= options.minLength)
			{
				contains.show();
				containsNot.hide();

				if($.type(options.sourceData)==='function')
				{
					contains.hide();
					containsNot.hide();
					
					if(callReq)
					{
						if($.isFunction(callReq.abort))
							callReq.abort();
						else if($.isFunction(callReq.stop))
							callReq.stop();
					}
					
					callReq = options.sourceData.call(searchlist, val, function(data) {
						callReq = null;
						contains.hide();
						containsNot.hide();
						searchlist$.find('.bts-dynamic-item').remove();

						if(!data || data.length===0)
							$( options.emptyNode.call(searchlist) ).addClass('bts-dynamic-item').appendTo(searchlist$);
						else
							for(var i in data)
								$( options.sourceNode.call(searchlist, data[i]) ).addClass('bts-dynamic-item').appendTo(searchlist$);
					});
				}

			}
			else
			{
				contains.show();
				containsNot.show();
				searchlist$.find('.bts-dynamic-item').remove();
			}
		}, options.delay));

		if(options.resetOnBlur)
			inputEl$.on('blur', function(e) {
				$(this).val('').trigger(options.eventKey);
			});

		return searchlist$;
	};

})(jQuery);
