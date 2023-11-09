$(document).ready(function () {
    $('.addMealBtn').click(function () {
        addMeal();
    });
    $('.edit-meal').click(function () {
        let id = $(this).attr('data-id');
        console.log(id)
        fillData(id);
        $('.editMealBtn').click(function (e) {
            e.preventDefault();
            editMeal(id);
        });
    });
    $('.delete-meal').click(function () {
        let id = $(this).attr('data-id');
        console.log(id)
        $.ajax({
            url: '/api/meal/' + id,
            type: 'DELETE',
            success: function (data) {
                console.log(data)
                if (data.status === 200) {
                    window.location.reload();
                    setTimeout(function () {
                        toastr.success(data.message, 'Deleted', {timeOut: 3000});
                    }, 1000);
                } else {
                    toastr.error(data.message, 'Error', {timeOut: 5000});
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
    });
});

function addMeal() {
    let name = $('#meal_name--add').val();
    let price = $('#meal_price--add').val();
    let type = $('#meal_type--add').val();
    let ingredients = $('#meal_ingredients--add').val();

    console.log(name, price, type, ingredients);

    $.ajax({
        url: '/api/meal/add',
        method: 'POST',
        data: JSON.stringify({
            name,
            price,
            type,
            ingredients
        }),
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            window.location.reload();
            setTimeout(function () {
                toastr.success(data.message, 'Success', {timeOut: 3000});
            }, 1000);

        },
        error: function (error) {
            console.log(error);
            toastr.error(error.responseJSON.message, 'Error', {timeOut: 3000});
        }
    });
}

function fillData(id) {
    $.ajax({
        url: `/api/meal/` + id,
        method: 'GET',
        success: function (data) {
            console.log(data);
            $('#meal_name--edit').val(data.name);
            $('#meal_price--edit').val(data.price);
            $('#meal_type--edit').val(data.type);
            $('#meal_ingredients--edit').val(data.ingredients);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function editMeal(id) {
    let name = $('#meal_name--edit').val();
    let price = $('#meal_price--edit').val();
    let type = $('#meal_type--edit').val();
    let ingredients = $('#meal_ingredients--edit').val();

    console.log(name, price, type, ingredients);

    $.ajax({
        url: '/api/meal/' + id,
        method: 'PUT',
        data: JSON.stringify({
            name,
            price,
            type,
            ingredients
        }),
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            window.location.reload();
            setTimeout(function () {
                toastr.success(data.message, 'Success', {timeOut: 3000});
            }, 1000);
        },
        error: function (error) {
            console.log(error);
            toastr.error(error.responseJSON.message, 'Error', {timeOut: 3000});
        }
    });
}