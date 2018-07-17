'use strict';
const APIURL = 'http://localhost:8080/phoogleApi/';

$(function () {

  $.get(APIURL + 'Session')
    .done(fnCheckSession)
    .fail(fnNoSession);

  $('#findPhone').on('click', function () {
    $('#loader').show();
    let brand = $('#searchInput').val();
    $.get(APIURL + 'search?', {brand})
      .done(fnShowPhones)
      .fail(fnErrorResponse);
  });

  $('#navCart').on('click', function () {
    $('#navCart').show();
    $.get(APIURL + 'cart')
      .done(fnsetCart)
      .fail(fnErrorResponse);
  });


  $('#clearImages').on('click', function () {
    $('.card-columns').html('');
  });

  $('#searchInput').autocomplete({
    serviceUrl: APIURL + 'search',
    paramName: 'brand',
    transformResult: function (response) {
      var responseFormat =  JSON.parse(response);
      if(responseFormat.length > 0){
        return {
          suggestions: $.map(responseFormat, function (dataItem) {
            return {value: dataItem.deviceName, data: dataItem};
          })
        };
      }
    },
    onSelect: function (suggestion) {
      fnShowPhones([suggestion.data])
    }
    });

  $('#signInForm').submit(function () {
    $('#loader').show();
    $('#navLogout').hide();
    let username = $('#inputUsername').val();
    let password = $('#inputPassword').val();
    $.get(APIURL + 'Login?', {username, password})
      .done(fnLogedIn)
      .fail(fnErrorResponse);
    return false;
  });

  $('#navLogout').click(function () {
    var r = confirm('Do you want logout?');
    if (r == true) {
      $.get(APIURL + 'Logout')
        .done(fnLogedOut)
        .fail(fnErrorResponse);
    } else {
      return false;
    }

  });

  function fnShowPhones(data) {
    $('#loader').hide();
    $.each(data, function (index, phone) {
      let card = $('<div>', {
        'class': 'card',
        'style': 'width: 18rem;'
      });

      let cardImage= $('<img>',{
        'class': 'phone-image card-img-top',
        'src': phone.image
      });
      let cardBody = $('<div>', {
        'class': 'card-body',
      });
      let cardTitle = $('<h5>', {
        'class': 'card-title',
        'text': phone.deviceName
      });
      let CardUlGruop = $('<ul>', {
        'class': 'list-group list-group-flush',
      });

      let cardBrand = $('<li>', {
        'class': 'list-group-item',
        'text': phone.brand
      });

      let cardResolution = $('<li>', {
        'class': 'list-group-item',
        'text': phone.resolution
      });

      let cardTechnologyn = $('<li>', {
        'class': 'list-group-item',
        'text': phone.technology
      });
      let cardBtns = $('<li>', {
        'class': 'list-group-item',

      });
      let cardBottonBuy = $('<a>', {
        'id': phone.deviceName,
        'class': 'btn btn-primary',
        'text': 'Add to cart'
      }).on('click', function () {
        let urlPost = APIURL + 'cart';
        $.post(urlPost, {brand: $(this).attr('id')})
          .done(function () {
            alert('Item added to card');
          })
          .error(fnErrorResponse);
      });
      cardBtns.append(cardBottonBuy);
      CardUlGruop.append(cardBrand, cardResolution, cardTechnologyn);
      cardBody.append(cardTitle, CardUlGruop);
      card.append(cardImage, cardBody, cardBtns);
      $('.card-columns').append(card);
    });
  }

  function fnsetCart(data) {
    $('#cartList tbody').html('');
    let total = 0;
    $('#loader').hide();
    $.each(data, function (index, phone) {
      let item = $('<tr>').append($('<td>', {'text': phone.deviceName}), $('<td>', {'text': phone.price}));
      total += phone.price;
      $('#cartList tbody').append(item);
    });
    let item = $('<tr>').append($('<td>', {'text': 'Total'}), $('<td>', {'text': total}));
    $('#cartList tbody').append(item);
  }

  function fnErrorResponse(xhr, status, exception) {
    console.log(xhr, status, exception);
  }

  function fnLogedIn(data) {
    $('#loginModal').modal('hide');
    $('#navLogin').hide();
    $('#navLogout').show();
    var x = document.cookie;
    debugger;
    console.log(x);
    console.log(data);
  }

  function fnLogedOut() {
    $('#navLogin').show();
    $('#navLogout').hide();
  }

  function fnCheckSession(data) {
    debugger;
    if (data.length > 0) {
      $('#navLogin').hide();
    }
  }
  function fnNoSession(xhr, status, exception) {
    if(xhr.status === 588)
    {
      $('#navLogout').hide();
    }
  }


});



