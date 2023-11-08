$(document).ready(function () {
    $('.addReservationBtn').on('click', function () {
        addReservation();
    });
});

function addReservation() {
    let fname = $('#reservation_fname--add').val();
    let lname = $('#reservation_lname--add').val();
    let phone = $('#reservation_phone--add').val();
    let checkin = $('#reservation_checkin--add').val();
    let checkout = $('#reservation_checkout--add').val();
    let adult = $('#reservation_adult--add').val();
    let children = $('#reservation_children--add').val();
    let guests = parseInt(adult) + parseInt(children);
    let room = $('#reservation_room--add').val();
    let pickUp = $('#reservation_pickUp--add').val();
    let destination = $('#reservation_destination--add').val();
    let vehicle = $('#reservation_vehicle--add').val();
    let appointment = $('#reservation_appointment--add').val();
    let note = $('#reservation_note--add').val();

    console.log(fname, lname, phone, checkin, checkout, adult, children, room, pickUp, destination, vehicle, appointment, note);

    $.ajax({
        url: '/api/reservation/add',
        type: 'POST',
        data: {
            fname: fname,
            lname: lname,
            phone: phone,
            checkIn: checkin,
            checkOut: checkout,
            rooms: room,
            guests: guests,
            // pickUp: pickUp,
            // destination: destination,
            // vehicle: vehicle,
            // appointment: appointment,
            note: note
        },
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            window.location.reload();
        },
        error: function (err) {
            console.log(err);
        }
    })
}
