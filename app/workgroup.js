function reset_form() {
    $("#txnama").val("").focus();
  }
  
  function load_data() {
    $.post(
      "workgroup/load_data",
      {},
      function (data) {
        console.log(data);
        $("#table2").DataTable().clear().destroy();
        $("#table2 > tbody").html("");
        $.each(data.workgroup, function (idx, val) {
          html = "<tr>";
          html += "<td>" + val["workgroupId"] + "</td>";
          html += "<td>" + val["workgroupName"] + "</td>";
          html +=
            '<td><span onclick="active_data(' +
            val["workgroupId"] +
            "," +
            val["workgroupActive"] +
            ')" class="badge ' +
            (val["workgroupActive"] == "1" ? "bg-success" : "bg-danger") +
            ' ">' +
            (val["workgroupActive"] == "1" ? "Active" : "Inactive") +
            "</span></td>";
          html +=
            '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data(' +
            val["workgroupId"] +
            ')">Edit</button></td>';
          html +=
            '<td><button class="btn btn-danger btn-sm " onclick="hapus_data(' +
            val["workgroupId"] +
            ')">Hapus</button></td>';
          html += "</tr>";
          $("#table2 > tbody").append(html);
        });
  
        $("#table2").DataTable({
          responsive: true,
          processing: true,
          pagingType: "first_last_numbers",
          order: [[0, 'desc']],
          dom:
            "<'row'<'col-3'l><'col-9'f>>" +
            "<'row dt-row'<'col-sm-12'tr>>" +
            "<'row'<'col-4'i><'col-8'p>>",
          language: {
            info: "Page _PAGE_ of _PAGES_",
            lengthMenu: "_MENU_",
            search: "",
            searchPlaceholder: "Search..",
          },
        });
      },
      "json"
    );
  }
  
  function simpan_data() {
    let nama = $("#txnama").val();
  
    if (
      nama === ""
    ) {
      Swal.fire({
        title: "Error!",
        text: "Ada Form belum dimasukkan!!!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      $.post(
        "workgroup/create",
        {
          txnama: nama,
        },
        function (data) {
          console.log(data.status);
          if (data.status === "error") {
            Swal.fire({
              title: "Error!",
              text: data.msg,
              icon: "error",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              title: "Success!",
              text: data.msg,
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              $("#loginModal").modal("hide");
              load_data()
            });
          }
        },
        "json"
      );
    }
  }
  
  function update_data() {
    var id = $("#loginModal").data("id");
    let nama = $("#txnama").val();
  
    if (
      nama === ""
    ) {
      Swal.fire({
        title: "Error!",
        text: "Ada Form belum dimasukkan atau tidak lengkap!!!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    } else {
      $.post(
        "workgroup/update_table",
        {
          id: id,
          workgroupName: nama,
        },
        function (data) {
          if (data.status === "success") {
            Swal.fire({
              title: "Success!",
              text: data.msg,
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              $("#loginModal").modal("hide");
              load_data()
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: data.msg,
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        },
        "json"
      );
    }
  }
  
  function edit_data(id) {
    $.post(
      "workgroup/edit_table",
      { id: id },
      function (data) {
        $("#txnama").val(data.data.workgroupName);
  
        $("#loginModal").data("id", id);
        $("#loginModal").modal("show");
        $(".btn-submit").hide();
        $(".btn-editen").show();
      },
      "json"
    );
  }
  
  function hapus_data(id) {
    Swal.fire({
      title: "Apakah kamu ingin menghapus data?",
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: "No",
      confirmButtonText: "Yes",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        $.post(
          "workgroup/delete_table",
          { id: id },
          function (data) {
            if (data.status === "success") {
              Swal.fire({
                title: "Succes!",
                text: data.msg,
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                load_data();
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: data.msg,
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          },
          "json"
        );
      } else if (result.isDenied) {
        Swal.fire("Perubahan tidak tersimpan", "", "info");
      }
    });
  }
  
  function active_data(id, status) {
    const actionText = status == 1 ? "MENONAKTIFKAN" : "MENGAKTIFKAN";
    const confirmButtonText = status == 1 ? "Ya, Nonaktifkan" : "Ya, Aktifkan";
  
    Swal.fire({
      title: "Konfirmasi",
      text: `Apakah Anda Ingin ${ actionText } data ini ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: "Batal",
    }).then((result) => {
        if (result.isConfirmed) {
          $.post(
            "workgroup/active",
            { id: id, status: status }, // Send the status in the request
            function (data) {
              if (data.status === "success") {
                Swal.fire({
                  title: "Sukses!",
                  text: data.msg,
                  icon: "success",
                  confirmButtonText: "OK",
                }).then(() => {
                  $("#loginModal").modal("hide");
                  load_data();
                });
              } else {
                Swal.fire({
                  title: "Gagal!",
                  text: data.msg,
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }
            },
            "json"
          );
        }
      });
  }
  
  $(document).ready(function () {
  
    $(".btn-closed").click(function () {
      reset_form();
    });
  
    $(".btn-add").click(function () {
      reset_form();
      $(".btn-submit").show();
      $(".btn-editen").hide();
    });
    $(".btn-add").click(function () {
      $(".btn-submit").show();
      $(".btn-editen").hide();
    });
    $(".page-title").html("Work Group");
    $(".tit").html("Work Group");
  
    load_data();
  });