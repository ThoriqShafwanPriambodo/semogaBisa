function reset_form() {
  $("#txkode").val("").focus();
  $("#txnama").val("");
  $("#txnominal").val("");
  $("#txtotal").val("");
  $("#txhari").val("");
  $("#txsetengah").val("");
  $("#txpersen").val("");
  $("#txpokok").val("");
}

function load_data() {
  $.post(
    "golongan/load_data",
    {},
    function (data) {
      console.log(data);
      $("#table2").DataTable().clear().destroy();
      $("#table2 > tbody").html("");
      $.each(data.golongan, function (idx, val) {
        html = "<tr>";
        html += "<td>" + val["levelgroupId"] + "</td>";
        html += "<td>" + val["levelgroupCode"] + "</td>";
        html += "<td>" + val["levelgroupName"] + "</td>";
        html += "<td>" + desimal(val["levelgroupAmount"])+ "</td>";
        html +=
          '<td><span onclick="active_data(' +
          val["levelgroupId"] +
          "," +
          val["levelgroupActive"] +
          ')" class="badge ' +
          (val["levelgroupActive"] == "1" ? "bg-success" : "bg-danger") +
          ' ">' +
          (val["levelgroupActive"] == "1" ? "Active" : "Inactive") +
          "</span></td>";
        html +=
          '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data(' +
          val["levelgroupId"] +
          ')">Edit</button></td>';
        html +=
          '<td><button class="btn btn-danger btn-sm " onclick="hapus_data(' +
          val["levelgroupId"] +
          ')">Hapus</button></td>';
        html += "</tr>";
        $("#table2 > tbody").append(html);
      });

      $("#table2").DataTable({
        responsive: true,
        processing: true,
        pagingType: "first_last_numbers",
        order: [[0, "desc"]],
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
  let kode = $("#txkode").val();
  let nama = $("#txnama").val();
  let nominal = $("#txnominal").val();
  let total = $("#txtotal").val();
  let hari = $("#txhari").val();
  let setengah = $("#txsetengah").val();
  let persen = $("#txpersen").val();
  let pokok = $("#txpokok").val();

  // Validate form fields
  if (
    kode === "" ||
    nama === "" ||
    nominal === "" ||
    total === "" ||
    hari === "" ||
    setengah === "" ||
    (setengah === "1" && (persen === "" || pokok === ""))
  ) {
    Swal.fire({
      title: "Error!",
      text: "Ada Form belum dimasukkan atau tidak lengkap!!!",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  // Proceed with form submission if validation passes
  $.post(
    "golongan/create",
    {
      txkode: kode,
      txnama: nama,
      txnominal: nominal,
      txtotal: total,
      txhari: hari,
      txsetengah: setengah,
      txpersen: persen,
      txpokok: pokok,
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

function update_data() {
  var id = $("#loginModal").data("id");
  let kode = $("#txkode").val();
  let nama = $("#txnama").val();
  let nominal = $("#txnominal").val();
  let total = $("#txtotal").val();
  let hari = $("#txhari").val();
  let setengah = $("#txsetengah").val();
  let persen = $("#txpersen").val();
  let pokok = $("#txpokok").val();

  if (
    kode === "" ||
    nama === "" ||
    nominal === "" ||
    total === "" ||
    hari === "" ||
    setengah === "" ||
    (setengah === "1" && (persen === "" || pokok === ""))
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
      "golongan/update_table",
      {
        id: id,
        levelgroupCode: kode,
        levelgroupName: nama,
        levelgroupAmount: nominal,
        levelgroupDivide: total,
        levelgroupNominal: hari,
        levelgroupHalfDay: setengah,
        levelgroupHalfPercent: persen,
        levelgroupHalfAmount: pokok,
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
            reset_form()
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
    "golongan/edit_table",
    { id: id },
    function (data) {
      $("#txkode").val(data.data.levelgroupCode);
      $("#txnama").val(data.data.levelgroupName);
      $("#txnominal").val(desimal(data.data.levelgroupAmount));
      $("#txtotal").val(data.data.levelgroupDivide);
      $("#txhari").val(desimal(data.data.levelgroupNominal));
      $("#txsetengah").val(data.data.levelgroupHalfDay);
      $("#txpersen").val(data.data.levelgroupHalfPercent);
      $("#txpokok").val(desimal(data.data.levelgroupHalfAmount));

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
        "golongan/delete_table",
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
  // Determine the action text based on status
  const actionText = status == 1 ? "MENONAKTIFKAN" : "MENGAKTIFKAN";
  const confirmButtonText = status == 1 ? "Ya, Nonaktifkan" : "Ya, Aktifkan";

  Swal.fire({
    title: "Konfirmasi",
    text: `Apakah Anda Ingin ${actionText} data ini?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      $.post(
        "golongan/active",
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

function divide() {
  var amt = parseFloat($('[name="levelgroupAmount"]').val().replace(/,/gi, ""));
  var div = parseFloat($('[name="levelgroupDivide"]').val().replace(/,/gi, ""));
  $('[name="levelgroupNominal"]').val("");
  if (amt > 0 && div > 0) {
    nom = parseInt(amt / div);
    $('[name="levelgroupNominal"]').val(desimal(nom));
  }
}

function desimal(input) {
  var output = input;
  if (parseFloat(input)) {
    input = new String(input); // so you can perform string operations
    var parts = input.split("."); // remove the decimal part
    parts[0] = parts[0]
      .split("")
      .reverse()
      .join("")
      .replace(/(\d{3})(?!$)/g, "$1,")
      .split("")
      .reverse()
      .join("");
    output = parts.join(".");
  }
  return output;
}

function inputnumeric(selector) {
  $(selector).keyup(function (event) {
    if (
      (event.which >= 37 && event.which <= 40) ||
      $.inArray(event.which, [46, 8, 9, 27, 13, 110, 190, 107, 189]) !== -1
    )
      return;
    $(this).val(function (index, value) {
      //if (parseFloat(value)) {
      //return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return desimal(value.replace(/[^0-9\.]/g, ""));
      //}
    });
  });
}

function cekIsHalf() {
  console.log($('[name="levelgroupHalfDay"]').val());
  if ($('[name="levelgroupHalfDay"]').val() == "0" || "") {
    $("#txpersen").val("");
    $("#txpokok").val("");
    $('[name="levelgroupHalfPercent"], [name="levelgroupHalfAmount"]').attr(
      "disabled",
      true
    );
  } else {
    $("#txpersen").val("");
    $("#txpokok").val("");
    $('[name="levelgroupHalfPercent"], [name="levelgroupHalfAmount"]').attr(
      "disabled",
      false
    );
  }
}

function pokok() {
  $("#txpersen").on("change", function () {
    var selectedValue = $(this).val();

    // Unbind any existing input event to avoid conflicts
    $("#txpokok").off("input");

    if (selectedValue === "1") {
      $("#txpokok").val("");
      $("#labelPokok").text("Persen Pokok/Hari");
      $("#txpokok").attr("max", 100); // Set maximum value to 100 for percentage
      $("#txpokok").on("input", function () {
        formatWithCommas(this);
        var value = parseFloat($(this).val().replace(/,/g, ""));
        if (value > 100) {
          $(this).val(100);
          formatWithCommas(this);
        }
      });
    } else if (selectedValue === "0") {
      $("#txpokok").val("");
      $("#labelPokok").text("Amount Pokok/Hari");
      var maxAmount = parseFloat($("#txhari").val().replace(/,/g, "")); // Remove commas and parse as a float
      $("#txpokok").attr("max", maxAmount); // Set maximum value to the value of #txhari
      $("#txpokok").on("input", function () {
        formatWithCommas(this);
        var value = parseFloat($(this).val().replace(/,/g, ""));
        if (value > maxAmount) {
          $(this).val(maxAmount);
          formatWithCommas(this);
        }
      });
    }
  });

  function formatWithCommas(input) {
    var value = $(input).val().replace(/,/g, ""); // Remove any existing commas
    $(input).val(value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")); // Add commas for visualization
  }
}

$(document).ready(function () {
  $("body").on("keyup", ".angka.des", function (e) {
    if (this.value != this.value.replace(/[^0-9\.]/g, "")) {
      this.value = this.value.replace(/[^0-9\.]/g, "");
    }
    $(this).val(desimal($(this).val()));
  });

  // ketika input dengan class angka focus, maka aluenya diselect semua
  $("body").on("focus", ".angka", function (e) {
    $(this).select();
  });

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
  $("#refreshButton").click(function () {
    document.getElementById("spinner").style.display = "inline-block";
    document.getElementById("refreshIcon").style.display = "none";
  });
  $(".page-title").html("Golongan");
  $(".tit").html("Golongan");

  load_data();
});
