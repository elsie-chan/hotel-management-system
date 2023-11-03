$(document).ready(function () {
    $('.addRoomBtn').on('click', function () {
        addRoom();
    });

});

function roomTypeupdate(){
    var select = document.getElementById('room_type--add');
    var option = select.options[select.selectedIndex];
    return option.value;
}
function roomCleaningStatus() {
    var select = document.getElementById('room_cleaning-status--add');
    var option = select.options[select.selectedIndex];
    return option.text;
}
function roomStatus() {
    var select = document.getElementById('room_status--add');
    var option = select.options[select.selectedIndex];
    return option.text;
}

function addRoom() {
    let image = $('#room_image--add')[0].files[0];
    console.log($('#room_image--add'))
    let number = $('#room_number--add').val();
    let type = roomTypeupdate();
    let floor = $('#room_floor--add').val();
    let price = $('#room_price--add').val();
    let facilities = $('#room_facilities--add').val().split(',');
    let cleaningStatus = roomCleaningStatus();
    let status = roomStatus();

    console.log(number, type, floor, price, cleaningStatus, status);
    facilities.forEach((item, index) => {
        facilities[index] = item.trim();
        console.log(facilities[index])
    });

    let data = new FormData()
    data.append('image', image)
    data.append('roomNumber', number)
    data.append('roomType', type)
    data.append('roomFloor', floor)
    data.append('price', price)
    data.append('facilities', facilities)
    data.append('status', cleaningStatus)
    data.append('isAvailable', status)
    for (var pair of data.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    $.ajax({
        url: '/api/room/add',
        type: 'POST',
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data)
            location.href = '/manager/room'
        },
        error: function (err) {
            console.log("err")
        }
    })
}
