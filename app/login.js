$(document).ready(function () {
    $("#btn_login").click(function () {
      var username = $("#txusername").val();
      var password = $("#txpassword").val();
  
      if (username === "" || password === "") {
        alert("Username dan password harus diisi!");
      } else $.post("login/cek_login",
        {
          username: $("#txusername").val(),
          password: $("#txpassword").val(),
        },
        function (data, status) {
          console.log(data.status);
          if (data.status === 'ERROR') {
            alert("Username dan password tidak terdaftar!");
          } else {
            alert("Berhasil Login");
            window.location.href = "http://localhost/ci_master/home";
          }
        }, 'json');
    });
  });