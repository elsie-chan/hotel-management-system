var current = 0;
var tabs = $(".tab");
var tabs_pill = $(".tab-pills");

loadFormData(current);

function loadFormData(n) {
  $(tabs_pill[n]).addClass("active");
  $(tabs[n]).removeClass("d-none");
  $("#back_button").attr("disabled", n == 0 ? true : false);

  n == tabs.length - 1
    ? $("#next_button").text("Submit").removeAttr("onclick")
    : $("#next_button")
        .attr("type", "button")
        .text("Next")
        .attr("onclick", "next()");
}

function next() {
  $(tabs[current]).addClass("d-none");
  $(tabs_pill[current]).removeClass("active");
  
  if(current ==1){
    if(validateName() == false){
      loadFormData(current);
    }
    else{
      current++;
    loadFormData(current);
    }
  }else{
    current++;
  loadFormData(current);
  }

}

function back() {
  $(tabs[current]).addClass("d-none");
  $(tabs_pill[current]).removeClass("active");

  current--;
  loadFormData(current);
}


$(document).ready(function (){
  $('.checkAvailableBtnBookroom').on('click', function (e) {
      e.preventDefault();
      checkAvailable();
  });

});
function checkAvailable() {
  let fromDate = $('#book_room_from').val();
  let toDate = $('#book_room_to').val();
  let adults = $('#adults').val();
  let children = $('#children').val();
  let quantity = parseInt(adults) + parseInt(children);
  let isChildren = (children > 0) ? true : false;
  console.log(fromDate, toDate, quantity, isChildren);

  if ( !fromDate || !toDate) {
    toastr.error('Please fill all fields!');
    return;
  }
  $.ajax({
      url: '/api/reservation/booking',
      type: 'POST',
      data: JSON.stringify({
          fromDate,
          toDate,
          quantity,
          isChildren
      }),
      contentType: 'application/json',
      success: function (data) {
          window.href = '#next';
          console.log(data);
          if (data.status === 400){
            toastr.info(data.message);
              return;
          }
          if (data.length === 0) {
              toastr.info('No room available!');
              return;
          };
          $('.roomsList').empty();
          data.forEach(function (item) {
              const result = `
              <div class="col-md-6 col-lg-4" data-aos="fade-up">
              <button class="btn mt-5 btn-outline-primary room">
                  <div class="p-3 text-center room-info" >
                      <h2>${item.roomNumber}</h2>
                      <span class="text-uppercase letter-spacing-1">${parseInt(item.price).toLocaleString("vi-VN",{
                        currency:"VND", style: "currency"
                      })} / per night</span>
                  </div>
              </button>
          </div>
          `
              $('.roomsList').append(result);

          })

          $('.room').on('click', function(e) {
            e.preventDefault();
            $('.btn-next').prop('disabled', false);

          })
          $('.room').on('click', function(e){
            if($(this).hasClass('active')){
              $('.room').removeClass("active");
            }else{
              $('.room').removeClass("active");
              $(this).addClass('active');
            }
          })
      },
      error: function (err) {
          console.log(err);
      }
  })
}

function validateName(){
  let fname = $('#fname').val();
  let lname = $('#lname').val();
  let phone = $('#phone').val();
  console.log(fname, lname, phone);
  if ( (fname =="" || lname=="" || phone=="") ) {
    toastr.error('Please fill all fields!');
    return false;
  }
  return true;

}
$('.meal').on('click', function(e){
  if($(this).hasClass('active')){
    $(this).removeClass('active');
  }else{
    $(this).addClass('active');
  }
})