    $( function() /* popover action */
    {
    	$("[data-toggle=popover]").popover({
      html: true, 
      content: function() {
          return $('#popover-content').html();
        }
      });
    } );

    $('body').on('click', function (e) { /* closes popover when clicked outside of it */
    //only buttons
    if ($(e.target).data('toggle') !== 'popover'
        && $(e.target).parents('.popover.in').length === 0) { 
        $('[data-toggle="popover"]').popover('hide');
    }
});