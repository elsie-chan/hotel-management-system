$(document).ready(function() {
    $('.fbStatusBtn').click(function() {
        let id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            url: `/api/feedback/` + id,
            method: 'PUT',
            success: function(data) {
                console.log(data);
                setTimeout(function () {
                    location.reload();
                }, 1000);
                toastr.success('Feedback solved!')
            },
            error: function(err) {
                console.log(err);
            }
        })
    });
});