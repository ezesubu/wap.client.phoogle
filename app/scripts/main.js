'use strict';
$(function() {


  $('#findPhone').on('click', function(){
    $('#loader').show();
     let brand = $('#searchInput').val();
    $.get('http://localhost:8080/phoneAPI/search?', {brand})
      .done(fnShowPhones)
      .fail(fnErrorResponse);
  })

  $('#searchInput').autocomplete({
    serviceUrl: 'http://localhost:8080/phoneAPI/search',
    paramName: 'brand',
    transformResult: function(response) {
      return {
        suggestions: $.map(response.myData, function(dataItem) {
          console.log(myData);
          return { value: dataItem.brand, data: dataItem.deviceName };
        })
      };
    }
    onSelect: function (suggestion) {
      alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
    }
  });

});

function fnShowPhones(data){
  $('#loader').hide();
  console.log(data);
  $.each(data, function (index, phone) {
  // <div class="card" style="width: 18rem;">
  //     <img class="card-img-top" src="..." alt="Card image cap">
  //     <div class="card-body">
  //     <h5 class="card-title">Card title</h5>
  //   <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  //   <a href="#" class="btn btn-primary">Go somewhere</a>
  //   </div>
  //   </div>
   $('#content').append($('<div>', {
      'class': 'card',
      'style': 'width: 18rem;',
      'text': phone.deviceName
  }));

  });
}


function fnErrorResponse(xhr, status, exception){
  console.log(xhr, status, exception);
}
