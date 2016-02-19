/*  Pagination */
function changePage(event) {
  
  var pageNo = $(this).html();

  $('.portfolio-page').hide();
  $('#page-' + pageNo).fadeIn();
  $('.pagination li').removeClass('active');
  $(this).addClass('active');
}

