$(document).ready(function () {
  $("#btn_login").click(function () {
    var username = $("#txtusername").val();
    var password = $("#txtpassword").val();

    if (username === "" || password === "") {
      Swal.fire({
        title: "Error!",
        text: "Username dan password belum dimasukkan",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      $.post(
        "login/check_login",
        {
          username: username,
          password: password,
        },
        function (data, status) {
          if (data.status === "Error") {
            Swal.fire({
              title: "Error!",
              text: "Username atau password belum terdaftar",
              icon: "error",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              title: "Success!",
              text: "Berhasil",
              icon: "success",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "http://localhost/ci_master/home";
              }
            });
          }
        },
        "json"
      ).fail(function (jqXHR, textStatus, errorThrown) {
        Swal.fire({
          title: "Error!",
          text: "An error occurred while processing your request.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.log("Request failed: " + textStatus + ", " + errorThrown);
      });
    }
  });
});
