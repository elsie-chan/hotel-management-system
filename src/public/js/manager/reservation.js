
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
    $('.seeInvoice').click(function (e) {
       e.preventDefault();
         let id = $(this).attr('data-id');
            console.log(id)
            $.ajax({
                url: '/api/invoice/search?id=' + id,
                type: 'GET',
                contentType: 'application/json',
                success: function (data) {
                    console.log(data)
                    const days = daysDifference(data[0].reservation.checkIn, data[0].reservation.checkOut);
                    const invoice = `
                        <div class="card-body">
                                    <h5 class="card-title">Reservation: ${data[0].reservation._id}</h5>
                                    <div class="row justify-content-between mb-2">
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">From:
                                                <span
                                                        class="fw-light text-muted">${formatDate(data[0].reservation.checkIn)}</span>
                                            </h6>
                                        </div>
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">To:
                                                <span
                                                        class="fw-light text-muted">${formatDate(data[0].reservation.checkOut)}</span>
                                            </h6>
                                        </div>
                                        <div class="col">
                                            
                                        </div>
                                    </div>
                                    <div class="row justify-content-between mb-2">
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">Room:
                                                <span
                                                        class="fw-light text-muted">${data[0].reservation.room.roomNumber}</span>
                                            </h6>
                                        </div>
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">Days:
                                                <span
                                                        class="fw-light text-muted">${days}</span>
                                            </h6>
                                        </div>
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">Total: <span
                                                        class="fw-light text-muted">${data[0].roomTotal}</span>
                                            </h6>
                                        </div>
                                    </div>
                                    <div class="row justify-content-between mb-2">
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">Airport Transfer:
                                                <span class="fw-light text-muted">
                                                    ${data[0].reservation.transport ? 'Used' : 'No'}
</span>
                                            </h6>
                                        </div>
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">Total: <span
                                                        class="fw-light text-muted">${data[0].transportTotal}</span>
                                            </h6>
                                        </div>
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">
                                            </h6>
                                        </div>
                                    </div>
                                    <div class="row justify-content-between mb-2">
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">Meal:
                                                
                                                ${data[0].reservation.meals.map(meal => {
                        return `<span class="fw-light text-muted">${meal.quantity + " " + meal.meal_id.name}</span>`
                    }).join(",")
                    }
                                            </h6>
                                        </div>
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">Total: <span
                                                        class="fw-light text-muted">${data[0].mealTotal}</span>
                                            </h6>
                                        </div>
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">
                                            </h6>
                                        </div>
                                    </div>
                                    <div class="row mb-2 justify-content-start ">
                                        <div class="col d-flex flex-row">
                                            <h6 class="card-subtitle fw-semibold">Subtotal: <span
                                                        class="fw-light text-muted">${data[0].subTotal}</span></h6>
                                        </div>
                                    </div>
                                    <div class="row mb-2 justify-content-start ">
                                        <div class="col d-flex flex-row">
                                            <h6 class="card-subtitle fw-semibold">Taxes: <span
                                                        class="fw-light text-muted">${data[0].taxes}</span></h6>
                                        </div>
                                    </div>
                                    
                                    <div class="row mb-2 justify-content-start ">
                                        <div class="col d-flex flex-row">
                                            <h6 class="card-subtitle fw-semibold">Total: <span
                                                        class="fw-light ">${data[0].total}</span></h6>
                                        </div>
                                    </div>
                                </div>
                    `
                    $('#invoice').html(invoice);
                }
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
            if (data.transport !== null) {
                // console.log(data.transport.vehicle);
                $("#reservation_vehicle--edit option[value='" + data.transport.vehicle +"']").attr("selected", 1);
            }
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
function daysDifference(d0, d1) {
    // console.log(d0, d1)
    var startDate = new Date(d0);
    var endDate = new Date(d1);
    var differenceInMilliseconds = endDate - startDate;

    var differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return differenceInDays;
}
function formatDate(dateString) {

// Create a new Date object
    var date = new Date(dateString);

// Extract the day, month, and year
    var day = String(date.getUTCDate()).padStart(2, '0');
    var month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    var year = date.getUTCFullYear();

// Combine into the desired format
    var formattedDate = day + '/' + month + '/' + year;

    console.log(formattedDate);
    return formattedDate;
}
