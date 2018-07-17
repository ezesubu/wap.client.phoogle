'use strict';
const APIURL = 'http://localhost:8080/phoogleApi/';

$(function() {
  $('#findPhone').on('click', function(){
    $('#loader').show();
    let brand = $('#searchInput').val();
    $.get(APIURL + 'search?', {brand})
      .done(fnShowPhones)
      .fail(fnErrorResponse);
  });

  $('#navCart').on('click', function(){
    $('#navCart').show();
    $.get(APIURL + 'cart')
      .done(fnsetCart)
      .fail(fnErrorResponse);
  });


  $('#clearImages').on('click', function(){
    $('.card-deck').html('');
  });

  $('#searchInput').autocomplete({
    serviceUrl: APIURL + 'search',
    paramName: 'brand',
    transformResult: function(response) {
      return {
        suggestions: $.map(JSON.parse(response), function(dataItem) {
          return  { value: dataItem.deviceName, data: dataItem  };
        })
      };
    },
    onSelect: function (suggestion) {
      fnShowPhones([suggestion.data])
    }
  });

});

function fnShowPhones(data){
  $('#loader').hide();
  $.each(data, function (index, phone) {
    let card = $('<div>', {
      'class': 'card',
      'style': 'width: 18rem;'
    });

    let cardImage= $('<img>',{
      'class': 'card-img-top',
      'src': 'https://picsum.photos/200/?blur'
    });
    let cardBody = $('<div>',{
      'class': 'card-body',
    });
    let cardTitle = $('<h5>',{
      'class': 'card-title',
      'text': phone.deviceName
    });
    let CardUlGruop = $('<ul>',{
      'class': 'list-group list-group-flush',
    });

    let cardBrand = $('<li>', {
      'class': 'list-group-item',
      'text': phone.brand
    });

    let cardResolution= $('<li>', {
      'class': 'list-group-item',
      'text': phone.resolution
    });

    let cardTechnologyn= $('<li>', {
      'class': 'list-group-item',
      'text': phone.technology
    });
    let cardBtns= $('<li>', {
      'class': 'list-group-item',

    });
    let cardBottonBuy = $('<a>',{
      'id'    : phone.deviceName,
      'class' : 'btn btn-primary',
      'text' : 'Add to cart'
    }).on('click', function(){
      let urlPost = APIURL + 'cart';
      $.post(urlPost,  { brand: $(this).attr('id')})
        .done(function () {
            alert('Item added to card');
        })
        .error(fnErrorResponse);
    });
    cardBtns.append(cardBottonBuy);
    CardUlGruop.append(cardBrand,cardResolution, cardTechnologyn );
    cardBody.append(cardTitle,CardUlGruop);
    card.append(cardImage,cardBody,cardBtns);
    $('.card-deck').append(card);
  });
}

function fnsetCart(data){
  $('#cartList tbody').html('');
  let total = 0;
  $('#loader').hide();
  $.each(data, function (index, phone) {
    let item = $('<tr>').append($('<td>',{'text': phone.deviceName}), $('<td>',{'text': phone.price}));
    total += phone.price;
    $('#cartList tbody').append(item);
  });
  let item = $('<tr>').append($('<td>',{'text': 'Total' }), $('<td>',{'text': total}));
  $('#cartList tbody').append(item);
}
function fnErrorResponse(xhr, status, exception){
  console.log(xhr, status, exception);
}
