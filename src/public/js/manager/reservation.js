$(document).ready(function () {
    $('.update-reservation').on('click', function () {
        let id = $(this).attr('data-id');
        console.log(id)
        fillData(id);
        $('.editReservationBtn').click(function (e) {
          e.preventDefault();
          editReservation(id);
        })
    });
});

function fillData(id) {
    $.ajax({
        url: '/api/reservation/' + id,
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            console.log(data)
            $('#reservation_fname--edit').val(data.fname);
            $('#reservation_lname--edit').val(data.lname);
            $('#reservation_phone--edit').val(data.phone);
            $("#reservation_status--edit option[value='" + data.status +"']").attr("selected", 1);
            $('#reservation_room--edit').val(data.room.roomNumber);
            $("#reservation_vehicle--edit option[value='" + data.vehicle +"']").attr("selected", 1);
            $('#reservation_note--edit').val(data.note);
        }
    })
}
function editReservation(id) {
    let fname = $('#reservation_fname--edit').val();
    let lname = $('#reservation_lname--edit').val();
    let phone = $('#reservation_phone--edit').val();
    let status = $('#reservation_status--edit').val();
    let room = new Array($('#reservation_room--edit').val());
    let vehicle = $('#reservation_vehicle--edit').val();
    let note = $('#reservation_note--edit').val();

    $.ajax({
        url: '/api/reservation/' + id,
        type: 'PUT',
        data: JSON.stringify({
            fname,
            lname,
            phone,
            status,
            roomNumber: room,
            transport: vehicle,
            note
        }),
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            toastr.success('Reservation updated successfully');
            setInterval(function () {
                window.location.reload();
            }, 2000);
        },
        error: function (err) {
            console.log(err);
        }
    })
}
