$(document).ready(function (){
    $('.checkAvailableBtn').on('click', function (e) {
        e.preventDefault();
        checkAvailable();
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

    $.ajax({
        url: '/api/reservation/booking',
        type: 'GET',
        data: JSON.stringify({
            fromDate: fromDate,
            toDate: toDate,
            quantity: quantity,
            isChildren: isChildren
        }),
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
}
