$(document).ready(function () {
    $('#searchInvoiceBtn').click(function () {
       let search = $('.searchInvoice').val();
        console.log(search)

        $.ajax({
            url: '/api/invoice/search?id=' + search,
            method: 'GET',
            success: function (data) {
                console.log(data)
                if (data.status === 500) {
                    template = `
                        <div class="alert alert-danger" role="alert">
                            ${ data.message }
                        </div>
                    `
                    $('.invoiceSearchResult').html(template);
                    return;
                }
                data.forEach(function (invoice) {
                   template = `
                    <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Reservation Id: ${ invoice.reservation._id }</h5>
                                    <div class="row justify-content-between mb-2">
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">Room:
                                                <span
                                                        class="fw-light text-muted">${ invoice.reservation.room.roomNumber }</span>
                                            </h6>
                                        </div>
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">Total: <span
                                                        class="fw-light text-muted">${ invoice.roomTotal }</span>
                                            </h6>
                                        </div>
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">
                                            </h6>
                                        </div>
                                    </div>
                                    <div class="row justify-content-between mb-2">
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">Airport Transfer:
                                                <span
                                                        class="fw-light text-muted">${ (invoice.reservation.transport)? 'Yes': 'No' }</span>
                                            </h6>
                                        </div>
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">Total: <span
                                                        class="fw-light text-muted">${ invoice.transportTotal }</span>
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
                                                <span
                                                        class="fw-light text-muted">${ (invoice.reservation.meal)? 'Yes': 'No' }</span>
                                            </h6>
                                        </div>
                                        <div class="col">
                                            <h6 class="card-subtitle fw-semibold">Total: <span
                                                        class="fw-light text-muted">${ invoice.mealTotal }</span>
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
                                                        class="fw-light text-muted">${ invoice.subTotal }</span></h6>
                                        </div>
                                    </div>
                                    <div class="row mb-2 justify-content-start ">
                                        <div class="col d-flex flex-row">
                                            <h6 class="card-subtitle fw-semibold">Taxes: <span
                                                        class="fw-light text-muted">${ invoice.taxes }</span></h6>
                                        </div>
                                    </div>
                                    <div class="row mb-2 justify-content-start ">
                                        <div class="col d-flex flex-row">
                                            <h6 class="card-subtitle fw-semibold">Total: <span
                                                        class="fw-light ">${ invoice.total }</span></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                   `
                    $('.invoiceSearchResult').html(template);
                });
            },
            error: function (error) {
                console.log(error)
            }
        });
    });
});