$( function() {
  $("[data-toggle=popover]").popover({
    html: true, 
    content: function() {
      return $('#popover-content').html();
    }
  });
});

$('body').on('click', function (e) {
  if (
    $(e.target).data('toggle') !== 'popover' 
    && !$(e.target).parents('.popover.in').length 
    && $('.popover.in').length
  ) { 
    $("[data-toggle=popover]").trigger('click');
  }
});