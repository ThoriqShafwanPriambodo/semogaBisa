function reset_form() {
  $("#txkode").val('').focus();
  $("#txnama").val('');
  $("#txemail").val('');
  $("#txtelp").val('');
  $("#txnegara").val('');
  $("#txkota").val('');
  $("#txalamat").val('');
}

function active_data(id, status) {
  $.confirm({
    title: 'Ubah status',
    content: 'Yakin ingin mengubah status?',
    theme: 'dark',
    buttons: {
      Ubah: function () {
        if (status === 1) {
          $.post('kantor/active', { id: id, status: status }, function (data) {
            if (data.status === 'success') {
              $.dialog({
                title: 'Status Diubah!',
                content: 'status berhasil di non-aktifkan',
                theme: 'dark',
              });
              $("#loginModal").modal('hide');
            } else {
              alert(data.msg);
            }
            location.reload();
          }, 'json')
        } else {
          if (status === 0) {
            $.post('kantor/active', { id: id, status: status }, function (data) {
              if (data.status === 'success') {
                $.dialog({
                  title: 'Status Diubah!',
                  content: 'status berhasil di aktifkan',
                  theme: 'dark',
                });
                $("#loginModal").modal('hide');
              } else {
                alert(data.msg);
              }
              location.reload();
            }, 'json')
          }
        }
      },
      Batal: function () {
        $.alert('Batal mengubah status');
      }
    }
  }
  )
};

function simpan_data() {
  let code = $("#txkode").val();
  let name = $("#txnama").val();
  let email = $("#txemail").val();
  let telp = $("#txtelp").val();
  let region = $("#txnegara").val();
  let city = $("#txkota").val();
  let address = $("#txalamat").val();

  if (code === "" || name === "" || email === "" || telp === "" || region === "" || city === "" || address === "") {
    alert("Pastikan form diisi dengan benar!");
  } else {
    $.post("kantor/create", {
      txkode: code,
      txnama: name,
      txemail: email,
      txtelp: telp,
      txnegara: region,
      txkota: city,
      txalamat: address
    },
      function (data) {
        console.log(data.status);
        if (data.status === "error") {
          alert(data.msg)
        } else {
          alert(data.msg)
          location.reload();
          reset_form(); // Reset the form after successful save
        }
      }, 'json');
  }
}

function edit_data(id) {
  $.post('kantor/edit_table', { id: id }, function (data) {
    if (data.status === 'ok') {
      $("#txkode").val(data.data.branchCode);
      $("#txnama").val(data.data.branchName);
      $("#txemail").val(data.data.branchEmail);
      $("#txtelp").val(data.data.branchTelp);
      $("#txnegara").val(data.data.branchRegion);
      $("#txkota").val(data.data.branchCity);
      $("#txalamat").val(data.data.branchAddress);
      $("#loginModal").data('id', id);
      $("#loginModal").modal('show');
      $(".btn-submit").hide();
      $(".btn-editen").show();

    } else {
      alert(data.msg);
    }
  }, 'json');
}

function editkuy() {
  var id = $("#loginModal").data('id');
  let branchCode = $("#txkode").val();
  let branchName = $("#txnama").val();
  let branchEmail = $("#txemail").val();
  let branchTelp = $("#txtelp").val();
  let branchRegion = $("#txnegara").val();
  let branchCity = $("#txkota").val();
  let branchAddress = $("#txalamat").val();

  if (branchCode === "" || branchName === "" || branchEmail === "" || branchTelp === "" || branchRegion === "" || branchCity === "" || branchAddress === "") {
    $.alert({
      title: 'Alert!',
      content: 'Error',
  });
  } else {
    $.post('kantor/update_table', { id: id, branchCode: branchCode, branchName: branchName, branchEmail: branchEmail, branchTelp: branchTelp, branchRegion: branchRegion, branchCity: branchCity, branchAddress: branchAddress, }, function (data) {
      if (data.status === 'success') {
        alert(data.msg);
        location.reload();
      } else {
        alert(data.msg);

      }
    }, 'json');
  }
}

function inputangka(evt) {
  var charCode = (evt.which) ? evt.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
  return true;
}

function load_data() {
  $.post("kantor/load_data",
    {

    },
    function (data) {
      console.log(data)

      $("#table3 > tbody").html('');
      $.each(data.kantor, function (idx, val) {
        html = '<tr>'
        html += '<td>' + val['branchId'] + '</td>'
        html += '<td>' + val['branchCode'] + '</td>'
        html += '<td>' + val['branchName'] + '</td>'
        html += '<td>' + val['branchEmail'] + '</td>'
        html += '<td>' + val['branchTelp'] + '</td>'
        html += '<td>' + val['branchRegion'] + '</td>'
        html += '<td>' + val['branchCity'] + '</td>'
        html += '<td>' + val['branchAddress'] + '</td>'
        html += '<td><span onclick="pusat_data('+val['branchId']+','+val['branchIsCenter']+')" class="badge ' + ((val['branchIsCenter']== '1') ? 'bg-success' : 'bg-secondary' ) +' ">' +((val['branchIsCenter']== '1') ? 'Pusat' : 'Nonpusat' ) +'</span></td>'
        html += '<td><span onclick="active_data(' + val['branchId'] + ',' + val['branchActive'] + ')"  class="badge  ' + ((val['branchActive'] == '1') ? 'bg-success' : 'bg-danger') + ' ">' + ((val['branchActive'] == '1') ? 'Active' : 'Inactive') + '</span></td>'
        html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data(' + val['branchId'] + ')">Edit</button></td>'
        html += '<td><button class="btn btn-danger btn-sm" onClick="confirmDelete(' + val['branchId'] + ')">Delete</button></td>'
        html += '</tr>'
        $("#table3 > tbody").append(html);
      });
      $("#table3").DataTable().destroy()
      $("#table3").DataTable({
        responsive: true,
        processing: true,
        pagingType: 'first_last_numbers',
        order: [[0, 'desc']],
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

function confirmDelete(id) {
  $.confirm({
    title: 'Konfirmasi!',
    content: 'Yakin ingin menghapus data?',
    theme: 'dark',
    buttons: {
      ya: function () {
        $.post('kantor/delete_table', { id: id }, function (data) {
          if (data.status === 'success') {
            $.dialog({
              title: 'Data dihapus!',
              content: 'data berhasil dihapus',
              theme: 'dark',
            });
            $("#loginModal").modal('hide');
          } else {
            // alert(data.msg);
          }
          location.reload();
        }, 'json')
      },
      batal: function () {
        $.alert('Batal menghapus!');
      }
    }
  })
};

function pusat_data(id, pusat) {
  if (pusat == 0) {
    $.confirm({
      title: 'Konfirmasi',
      content: 'Apakah Anda Ingin Menjadikan Pusat data ini?',
      buttons: {
        ya: {
          text: 'Ya, Jadikan Pusat',
          btnClass: 'btn-blue',
          action: function () {
            $.post('kantor/pusat', { id: id }, function(data) {
              if (data.pusat === 'success') {
                $.confirm({
                  title: 'Success!',
                  content: data.msg,
                  buttons: {
                    ok: {
                      text: 'OK',
                      action: function () {
                        $("#loginModal").modal('hide');
                        location.reload();
                      }
                    }
                  }
                });
              } else {
                $.confirm({
                  title: 'Berhasil!',
                  content: data.msg,
                  buttons: {
                    ok: {
                      text: 'OK'
                    }
                  }
                });
              }
            }, 'json');
          }
        },
        batal: {
          text: 'Batal',
          action: function () {
          }
        }
      }
    });
  } else {
    $.confirm({
      title: 'Gagal!',
      content: data.msg,
      buttons: {
        ok: {
          text: 'OK'
        }
      }
    });
  }
}


$(document).ready(function () {
  $(".tittle").html("Absensi-Kantor")
  $(".page-title").html("KANTOR")
  $(".tit").html("Kantor")
  $(".btn-add").click(function () {
    $(".btn-submit").show();
    $(".btn-editen").hide();
    reset_form()
  })
  $(".btn-closed").click(function () {
    reset_form()
  });
  load_data();
})