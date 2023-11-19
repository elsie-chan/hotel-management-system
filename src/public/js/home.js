$(document).ready(function (){
    $('.checkAvailableBtn').on('click', function (e) {
        e.preventDefault();
        checkAvailable();
    });
    $('.sendFbBtn').on('click', function (e) {
        e.preventDefault();
        sendFeedback();
    });
});
function checkAvailable() {
    let fromDate = $('#checkin_date').val();
    let toDate = $('#checkout_date').val();
    let adults = $('#adults').val();
    let children = $('#children').val();
    let quantity = parseInt(adults) + parseInt(children);
    let isChildren = (children > 0) ? true : false;
    console.log(fromDate, toDate, quantity, isChildren);
    if (!fromDate || !toDate || !quantity) {
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
            if (data.status === 400) {
                toastr.error(data.message);
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
                <a href="https://www.traveloka.com/vi-vn/hotel" class="room">
                    <figure class="img-wrap">
                        <img src="/uploads/rooms/${item.images}" alt="Cannot load image" class="img-fluid mb-3">
                    </figure>
                    <div class="p-3 text-center room-info">
                        <h2>${item.roomType.name}</h2>
                        <span class="text-uppercase letter-spacing-1">${item.price} / per night</span>
                    </div>
                </a>
            </div>
            `
                $('.roomsList').append(result);

            })
        },
        error: function (err) {
            console.log(err);
        }
    })
}
function sendFeedback() {
    let id = $('#reservationId').val();
    let phone = $('#phone').val();
    let message = $('#message').val();
    if (!id || !phone || !message) {
        toastr.warning('Please fill all fields!')
    }

    $.ajax({
        url: '/api/feedback/send-feedback/',
        type: 'POST',
        data: JSON.stringify({
            reservation: id,
            guest: phone,
            note: message
        }),
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            if(data.status === 400) {
                toastr.error(data.message);
                return;
            }
            toastr.success('Feedback sent successfully!');
            setTimeout(function () {
                window.location.href = '/contact';
            }, 1000);
        },
        error: function (err) {
            console.log(err)
        }
    })
}
