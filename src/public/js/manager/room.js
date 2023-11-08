$(document).ready(function () {
    uploadImage();
    $('.addRoomBtn').on('click', function () {
        addRoom();
    });
    $('.update-room').on('click', function () {
        let id = $(this).attr('data-id');
        console.log(id)
        fillData(id);
        editImage();
        $('.saveEditRoomBtn').on('click', function () {
            updateRoom(id);
        });
    });
    $('.delete-room').on('click', function () {
        let id = $(this).attr('data-id');
        console.log(id)
        $.ajax({
            url: '/api/room/delete/' + id,
            type: 'DELETE',
            success: function (data) {
                console.log(data)
                toastr.success(data.message, 'Success', {timeOut: 5000});
                // location.reload();
            },
            error: function (err) {
                console.log(err)
            }
        })
    });
});

function roomTypeupdate(id){
    var select = document.getElementById(id);
    var option = select.options[select.selectedIndex];
    return option.value;
}
function roomCleaningStatus() {
    var select = document.getElementById('room_cleaning-status--add');
    var option = select.options[select.selectedIndex];
    return option.text;
}
function roomStatus(id) {
    var select = document.getElementById(id);
    var option = select.options[select.selectedIndex];
    return option.text;
}
function uploadImage() {
    let imageFile = $('#room_image--add');
    let imagePreview = $('#image_preview');
    let imagePath;
    console.log($('#image_preview').attr('src'))

    imageFile.on('change', function () {
        console.log()
        let image = this.files[0];
        console.log(image)
        imagePath = URL.createObjectURL(image);
        imagePreview.attr('src', imagePath);
    })
}
function editImage() {
    let imageFile = $('#image_upload--edit');
    let imagePreview = $('#edit--image_preview');
    let imagePath;
    console.log($('#edit--image_preview').attr('src'))

    imageFile.on('change', function () {
        console.log()
        let image = this.files[0];
        console.log(image)
        imagePath = URL.createObjectURL(image);
        imagePreview.attr('src', imagePath);
    })
}

function addRoom() {
    let image = $('#room_image--add')[0].files[0];
    let number = $('#room_number--add').val();
    let type = roomTypeupdate('room_type--add');
    let floor = $('#room_floor--add').val();
    let price = $('#room_price--add').val();
    let facilities = $('#room_facilities--add').val().split(',');
    let cleaningStatus = roomCleaningStatus();
    let status = roomStatus('room_status--add');

    console.log(number, type, floor, price, cleaningStatus, status, image);
    // facilities.forEach((item, index) => {
    //     facilities[index] = item.trim();
    //     console.log(facilities[index])
    // });

    let data = new FormData();
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
            console.log(err)
        }
    })
}
function fillData(id) {
    $.ajax({
        url: '/api/room/' + id,
        type: 'GET',
        success: function (data) {
            console.log(data.images)
            $('#edit--room_number').val(data.roomNumber);
            // $('#edit--room_type').val(data.roomType);
            $("#edit--room_type option[value='" + data.roomType +"']").attr("selected", 1);
            $('#edit--room_floor').val(data.roomFloor);
            // $("#edit--cleaning-status option:contains(" + data.status + ")")[0].prop('selected', true);
            // $("#edit--room-status option:contains(" + data.isAvailable + ")").prop('selected', true)[0] = true;
            $('#edit--room-price').val(data.price);
            $('#edit--room-facilities').val(data.facilities);
            $('#edit--image_preview').attr('src', '/uploads/rooms/' + data.images);
        },
        error: function (err) {
            console.log(err)
        }
    })
}
function updateRoom(id) {
    let image = $('#image_upload--edit')[0].files[0];
    console.log($('#room_image--add'))
    let number = $('#edit--room_number').val();
    let type = roomTypeupdate('edit--room_type');
    let floor = $('#edit--room_floor').val();
    let clean = $('#edit--cleaning-status').val();
    let status = $('#edit--room_status').val();
    let price = $('#edit--room-price').val();
    let facilities = $('#edit--room-facilities').val().split(',');

    console.log(number, type, floor, price, clean, status, facilities, image);
    let data = new FormData();
    data.append('image', image)
    data.append('roomNumber', number)
    data.append('roomType', type)
    data.append('roomFloor', floor)
    data.append('price', price)
    data.append('facilities', facilities)
    data.append('status', clean)
    data.append('isAvailable', status)

    for (const value of data.values()) {
        console.log(value);
    }

    $.ajax({
        url: '/api/room/update/' + id,
        type: 'PUT',
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data)
            toastr.success(data.message, 'Success', {timeOut: 5000});
            // location.reload();
        },
        error: function (err) {
            console.log(err)
        }
    })

}