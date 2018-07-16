'use strict';
$(function() {
  $('#findPhone').on('click', function(){
    $('#loader').show();
     let brand = $('#searchInput').val();
    $.get('http://localhost:8080/phoneAPI/search?', {brand})
      .done(fnShowPhones)
      .fail(fnErrorResponse);
  })

});

function fnShowPhones(data){
  $('#loader').hide();
  console.log(data);
  $.each(data, function (index, phone) {
    console.log(phone);
  });
}


function fnErrorResponse(xhr, status, exception){
  console.log(xhr, status, exception);
}
