$(document).ready(function() {
    $('.fbStatusBtn').click(function() {
        let id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            url: `/api/feedback/` + id,
            method: 'PUT',
            success: function(data) {
                console.log(data);
                toastr.success('Feedback solved!')
                setTimeout(function () {
                    location.reload();
                }, 1000);
            },
            error: function(err) {
                console.log(err);
            }
        })
    });
});