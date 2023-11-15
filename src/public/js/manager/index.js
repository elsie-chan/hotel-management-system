$(document).ready(function () {
   $('.createAccountBtn').click(function () {
       $.ajax({
           url: '/api/v1/auth/create',
           type: 'POST',
              data: {
                username: $('#username').val(),
                password: $('#password').val(),
                fullName: $('#fullname').val(),
                role: $('#role').val(),
                email: $('#email').val(),
              },
           success: function (data) {
               console.log(data)
               toastr.success("Create account successfully");
               window.location.href = "/manager/dashboard";
           },
       })
   });
});