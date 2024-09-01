function reset_form() {
  $("#txcode").val('').focus();
  $("#txname").val('');
  $("#txid").val('');
  $("#txasuransi").val('');
  $("#txgaji").val('');
  $("#txtagihan").val('');
  $("#insuranceCompPercent").val('');
  $("#insuranceEmplPercent").val('');
}

function onmax(input, max) {
  if (input.value > max) {
      input.value = max;
  }
}
function onmin(input, min) {
  if (input.value < min) {
      input.value = min;
  }
}
function changecomp() {
  const companyPercent = parseFloat($('#insuranceCompPercent').val()) || 0;
  const employeePercent = 100 - companyPercent;
  $('#insuranceEmplPercent').val(employeePercent)
}
function changeemp() {
  const employeePercent = parseFloat($('#insuranceEmplPercent').val()) || 0;
  const companyPercent = 100 - employeePercent;
  $('#insuranceCompPercent').val(companyPercent)
}

function load_data() {
  $.post("insurance/load_data",
      {

      },
      function (data) {
          console.log(data)
          $("#table2").DataTable().clear().destroy()
          $("#table2 > tbody").html('');
          $.each(data.insurance, function (idx, val) {
              html = '<tr>'
              html += '<td>' + val['insuranceCode'] + '</td>'
              html += '<td>' + val['insuranceName'] + '</td>'
              html += '<td>' + val['insuranceTotalBill'] + '</td>'
              html += '<td><span onclick="active_data(' + val['insuranceId'] + ',' + val['insuranceActive'] + ')" class="badge ' + ((val['insuranceActive'] == '1') ? 'bg-success' : 'bg-danger') + ' ">' + ((val['insuranceActive'] == '1') ? 'Active' : 'Inactive') + '</span></td>'
              html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data(' + val['insuranceId'] + ')">Edit</button></td>'
              html += '<td><button class="btn btn-danger btn-sm " onclick="hapus_data(' + val['insuranceId'] + ')">Hapus</button></td>'
              html += '</tr>'
              $("#table2 > tbody").append(html);
          });
          
          $("#table2").DataTable({
              responsive: true,
              processing: true,
              pagingType: 'first_last_numbers',
              // order: [[0, 'asc']],
              dom:
                  "<'row'<'col-3'l><'col-9'f>>" +
                  "<'row dt-row'<'col-sm-12'tr>>" +
                  "<'row'<'col-4'i><'col-8'p>>",
              "language": {
                  "info": "Page _PAGE_ of _PAGES_",
                  "lengthMenu": "_MENU_",
                  "search": "",
                  "searchPlaceholder": "Search.."
              }
          });

      }, 'json');
}
function simpan_data() {
  let code = $("#txcode").val();
  let name = $("#txname").val();
  let id = $("#txid").val();
  let asuransi = $("#txasuransi").val();
  let gaji = $("#txgaji").val();
  let tagihan = $("#txtagihan").val();
  let comp = $("#insuranceCompPercent").val();
  let empl = $("#insuranceEmplPercent").val();
  if (code === "" || name === ""|| id === "" || asuransi === null || gaji === null || tagihan === "" || comp === "" || empl === "") {
      Swal.fire({
          title: 'Error!',
          text: "Ada Form belum dimasukkan!!!",
          icon: 'error',
          confirmButtonText: 'OK'
      });
  } else {
      $.post("insurance/create", {
          txcode: code,
          txname: name,
          txid: id,
          txasuransi: asuransi,
          txgaji: gaji,
          txtagihan: tagihan,
          insuranceCompPercent: comp,
          insuranceEmplPercent: empl,
      },
          function (data) {
              console.log(data.status);
              if (data.status === "error") {
                  Swal.fire({
                      title: 'Error!',
                      text: data.msg,
                      icon: 'error',
                      confirmButtonText: 'OK'
                  });
              } else {
                  Swal.fire({
                      title: 'Success!',
                      text: data.msg,
                      icon: 'success',
                      confirmButtonText: 'OK'
                  });
                  reset_form();
              }
          }, 'json');
  }
}
function update_data()
{
var id = $("#loginModal").data('id');
let insuranceCode = $("#txcode").val();
let insuranceName = $("#txname").val();
let insuranceNo = $("#txid").val();
let insuranceType = $("#txasuransi").val();
let insuranceSalaryCut = $("#txgaji").val();
let insuranceTotalBill = $("#txtagihan").val();
let insuranceCompPersen = $("#insuranceCompPercent").val();
let insuranceEmplPersen = $("#insuranceEmplPercent").val();

if (insuranceCode === "" || insuranceName === ""|| insuranceNo === ""||insuranceType === ""|| insuranceSalaryCut === ""|| insuranceTotalBill === ""|| insuranceCompPersen === ""|| insuranceEmplPersen === ""){
  Swal.fire({
    title: 'Error!',
    text: data.msg,
    icon: 'error',
    confirmButtonText: 'OK'
  })
}else{
  $.post('insurance/update_table', { id: id, insuranceCode: insuranceCode, insuranceName: insuranceName, insuranceNo: insuranceNo, insuranceType: insuranceType, insuranceSalaryCut: insuranceSalaryCut, insuranceTotalBill: insuranceTotalBill, insuranceCompPersen: insuranceCompPersen, insuranceEmplPersen: insuranceEmplPersen}, function(data) {
    if (data.status === 'success') {
      Swal.fire({
        title: 'Success!',
        text: data.msg,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        load_data();
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: data.msg,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
}, 'json');
}}
function edit_data(id) {
  $.post('insurance/edit_table', { id: id }, function (data) {
      if (data.status === 'ok') {
        $("#txcode").val(data.data.insuranceCode);
        $("#txname").val(data.data.insuranceName);
        $("#txid").val(data.data.insuranceNo);
        $("#txasuransi").val(data.data.insuranceType);
        $("#txgaji").val(data.data.insuranceSalaryCut);
        $("#txtagihan").val(data.data.insuranceTotalBill);
        $("#insuranceCompPercent").val(data.data.insuranceCompPersen);
        $("#insuranceEmplPercent").val(data.data.insuranceEmplPersen);
          $("#loginModal").data('id', id); 
          $("#loginModal").modal('show');
          $(".btn-submit").hide();
          $(".btn-editen").show();

      } else {
        Swal.fire({
          title: 'Error!',
          text: data.msg,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
  }, 'json');
}

function hapus_data(id) {
  Swal.fire({
      title: 'Apakah kamu ingin menghapus data?',
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: 'No',
      confirmButtonText: 'Yes',
      customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
      },
  }).then((result) => {
      if (result.isConfirmed) {
          $.post('insurance/delete_table', { id: id }, function (data) {
              if (data.status === 'success') {
                  Swal.fire({
                      title: 'Succes!',
                      text: data.msg,
                      icon: 'success',
                      confirmButtonText: 'OK'
                  }).then(() => {
                      load_data();
                  });
              } else {
                  Swal.fire({
                      title: 'Error!',
                      text: data.msg,
                      icon: 'error',
                      confirmButtonText: 'OK'
                  })
              }
          }, 'json');
      } else if (result.isDenied) {
          Swal.fire('Perubahan tidak tersimpan', '', 'info')
      }
  })
}
function active_data(id, status) {
  if (status == 1) {
    Swal.fire({
      title: 'Konfirmasi',
      text: 'Apakah Anda Ingin MENONAKTIFKAN data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Nonaktifkan',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        $.post('insurance/active', { id: id }, function(data) {
          if (data.status === 'success') {
            Swal.fire({
              title: 'Success!',
              text: data.msg,
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              $("#loginModal").modal('hide');
              load_data();
            });
          } else {
            Swal.fire({
              title: 'Gagal!',
              text: data.msg,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        }, 'json');
      }
    });
  } else {
    Swal.fire({
      title: 'Konfirmasi',
      text: 'Apakah Anda Ingin MENGAKTIFKAN data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Aktifkan',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        $.post('insurance/active', { id: id }, function(data) {
          if (data.status === 'success') {
            Swal.fire({
              title: 'Sukses!',
              text: data.msg,
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              $("#loginModal").modal('hide');
              load_data();
            });
          } else {
            Swal.fire({
              title: 'Gagal!',
              text: data.msg,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        }, 'json');
      }
    });
  }
}

$(document).ready(function () {
  $(".btn-closed").click(function () {
      reset_form()
  });

  $(".btn-add").click(function () {
      reset_form();
      $(".btn-submit").show();
      $(".btn-editen").hide();
  })
  $(".btn-add").click(function () {
      $(".btn-submit").show();
      $(".btn-editen").hide();
  })
  $(".page-title").html("Insurance")
  $(".tit").html("Insurance")

  load_data();
}); js