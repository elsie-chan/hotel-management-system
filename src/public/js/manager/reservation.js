
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
    $('.addMeal').click(function (e) {
        e.preventDefault();
        let id  = $(this).attr('data-id');
        console.log(id)
        $('.addMealBtn').click(function (e) {
            e.preventDefault();
            addMeal(id);
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
    let room = $('#reservation_room--edit').val();
    let vehicle = $('#reservation_vehicle--edit').val();
    let note = $('#reservation_note--edit').val();
    const data = {
        fname,
        lname,
        phone,
        status,
        room,
        vehicle,
        note
    }
    console.log(data)

    $.ajax({
        url: '/api/reservation/' + id,
        type: 'PUT',
        data: JSON.stringify({
            fname,
            lname,
            phone,
            status,
            room,
            transport: vehicle,
            note
        }),
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            if (data.status === 400) return toastr.error(data.message);
            toastr.success('Reservation updated successfully');
            setInterval(function () {
                window.location.reload();
            }, 2000);ho
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function addMeal(id) {
    let meals = [];
    $('.meal.active').map((i, meal) => {
        // meals.push(meal.getAttribute('data-id'))
        const id = $(meal).data('id');
        const quantity = $(meal).find('.quantity').val();
        const mealObj = {
            _id: id,
            quantity
        }
        meals.push(mealObj);
    })
    // console.log(meals)
    $.ajax({
        url: '/api/reservation/add-meal/' + id,
        type: 'POST',
        data: JSON.stringify({
            meals
        }),
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            if (data.status === 400) return toastr.error(data.message);
            toastr.success('Meal added successfully');
            setInterval(function () {
                window.location.reload();
            }, 2000);
        },
        error: function (err) {
            console.log(err);
        }
    })
}
