var current = 0;
var tabs = $(".tab");
var tabs_pill = $(".tab-pills");

loadFormData(current);

$('#book_room_vehicle--add').change(function(){
   $('.transfer-information').removeClass('d-none') ;
});

function loadFormData(n) {
  $(tabs_pill[n]).addClass("active");
  $(tabs[n]).removeClass("d-none");
  $("#back_button").attr("disabled", n == 0 ? true : false);

  n == tabs.length
    ? $("#next_button").text("Submit").removeAttr("onclick")
    : $("#next_button")
        .attr("type", "button")
        .text("Next")
        .attr("onclick", "next()");
  

}

function next() {
  $(tabs[current]).addClass("d-none");
  $(tabs_pill[current]).removeClass("active");;

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
  if(current == 4){
    addBooking();
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
  $('.addBooking').click(function (e) {
    e.preventDefault();
    addBooking();
    
});

});
function checkAvailable() {
  let fromDate = $('#book_room_from').val();
  let toDate = $('#book_room_to').val();
  let adults = $('#adults').val();
  let children = $('#children').val();
  let quantity = parseInt(adults) + parseInt(children);
  let isChildren = (children > 0) ? true : false;

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
              <button class="btn mt-5 btn-outline-primary room" data-id="${item._id}">
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
$('.btn-meal').on('click', function(e){
  if( e.target.tagName.toLowerCase() == "input"){
    return;
  }
  $(this).toggleClass("active");

})



function addBooking(){
  let checkIn = $('#book_room_from').val() + "T17:00:00.000+00:00";
  let checkOut = $('#book_room_to').val() + "T17:00:00.000+00:00";
  let adults = $('#adults').val();
  let children = $('#children').val();
  let guests = parseInt(adults) + parseInt(children);
  let fname = $('#fname').val();
  let lname = $('#lname').val();
  let phone = $('#phone').val();
  let id_room = $('.room.active').data("id");
  let vehicle = $('#book_room_vehicle--add').val();
  if (vehicle !== "None") {
    let pickUp = $('#book_room_vehicle_pickUp--add').val();
    let dropOff = $('#book_room_vehicle_destination--add').val();
    let time = $('#book_room_vehicle_time--add').val() + "T17:00:00.000+00:00";
    vehicle = {
        vehicle,
        pickup_location: pickUp,
        destination: dropOff,
        time
    }
  }

  let note = $('#room_note--add').val();
  let meals =[];
  $('.btn-meal.active').map((i,meal) => {
    const id = $(meal).data('id');
    const quantity = $(meal).find('#number_meals').val();
    const mealObj = {
      meal_id: id,
      quantity
    }
    meals.push(mealObj);    
  })
  const data = {
    fname,
    lname,
    phone,
    checkIn,
    checkOut,
    note,
    guests,
    // status,
    room: id_room,
    meals,
    transport: vehicle
  }
  console.log(data);
  $.ajax({
    url: '/api/reservation/add',
    method: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function(data){
      console.log(data);
      if (data.status === 400) return toastr.error(data.message);
            toastr.success('Booking added successfully');
            setInterval(function () {
                window.location.reload();
            }, 2000);
    },
    error:function(err){
      console.log(err)
    }
  })
}

