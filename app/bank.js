function reset_form() {
  $("#txrekening").val('').focus();
  $("#txbank").val('');
}

// $(document).ready(function () {
//   $(".btn-editen").click(function () {
//     var id = $("#loginModal").data('id');
//     var bankBill = $("#txrekening").val();
//     var bankName = $("#txbank").val();

//     $.post('bank/update_table', { id: id, bankBill: bankBill, bankName: bankName }, function (data) {
//       if (data.status === 'success') {
//         alert(data.msg);
//         location.reload();
//       } else {
//         alert(data.msg);
//       }
//     }, 'json');
//   });
// });

function apalah() {
  var id = $("#loginModal").data('id');
  var bankBill = $("#txrekening").val();
  var bankName = $("#txbank").val();

  if (bankBill === "" || bankName === "") {
    alert("Rekening atau Bank belum dimasukkan");
  } else {
    $.post('bank/update_table', { id: id, bankBill: bankBill, bankName: bankName }, function (data) {
      if (data.status === 'success') {
        alert(data.msg);
        location.reload();
      } else {
        alert(data.msg);
      }
    }, 'json');
  }
}

function alapah(){
  // let rekening = $("#txrekening").val();
  //   let bank = $("#txbank").val();
  //   if (rekening === "" || bank === "") {
  //     alert("Rekening atau Bank belum dimasukkan");
  //   } else {
  //     $.post("bank/create",
  //       {
  //         txrekening: rekening,
  //         txbank: bank
  //       },
  //       function (data, status) {
  //         console.log(data.status)
  //         if (data.status == "error") {
  //           alert(data.msg)
  //         } else {
  //           reset_form()
  //         }
  //         // alert("Data: " + data + "\nStatus: " + status);
  //       }, 'json');
  //   }

  $.confirm({
    title: 'Confirm!',
    content: 'Simple confirm!',
    buttons: {
        confirm: function () {
            $.alert('Confirmed!');
        },
        cancel: function () {
            $.alert('Canceled!');
        },
    }
});

}

function edit_data(id) {
  $.post('bank/edit_table', { id: id }, function (data) {
    if (data.status === 'ok') {
      $("#txrekening").val(data.data.bankBill);
      $("#txbank").val(data.data.bankName);
      $("#loginModal").data('id', id);
      $("#loginModal").modal('show');
      $(".btn-submit").hide();
      $(".btn-editen").show();

    } else {
      alert(data.msg);
    }
  }, 'json');
}

//     function edit_data(id) {
//   $.post('bank/edit_table', { id: id }, function (data) {
//     console.log(data.data.bankBill)
//     console.log(data.data.bankName)
//     console.log(data.data.bankId)
//     //reset_form();
//     $("#txrekening").val(data.data.bankBill);
//     $("#txbank").val(data.data.bankName);
//     $("#loginModal").modal('show');
//     $(".btn-submit").hide();
//     $(".btn-editen").show();
//   }, 'json')
// }    

function load_data() {
  $.post("bank/load_data",
    {

    },
    function (data) {
      console.log(data)

      $("#table2 > tbody").html('');
      $.each(data.bank, function (idx, val) {
        html = '<tr>'
        html += '<td>' + val['bankId'] + '</td>'
        html += '<td>' + val['bankClientId'] + '</td>'
        html += '<td>' + val['bankBill'] + '</td>'
        html += '<td>' + val['bankName'] + '</td>'
        html += '<td><span onclick="active_data('+val['bankId']+','+val['bankActive']+')"  class="badge  ' + ((val['bankActive']== '1') ? 'bg-success' : 'bg-danger' ) +' ">' +((val['bankActive']== '1') ? 'Active' : 'Inactive' ) +'</span></td>'
        html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data(' + val['bankId'] + ')">Edit</button></td>'
        html += '<td><button class="btn btn-danger btn-sm " onclick="confirmDelete(' + val['bankId'] + ')">Delete</button></td>'
        html += '</tr>'
        $("#table2 > tbody").append(html);
      });
      $("#table2").DataTable().destroy()
      $("#table2").DataTable({
        responsive: true,
        processing: true,
        pagingType: 'first_last_numbers',
        order: [[0, 'DESC']],
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

// function active_data(id,status){
//   if(status == 1){
//     if (confirm('Apakah Anda Ingin MENONAKTIFKAN data ini?')) {
//       $.post('bank/active', {id:id, status:status}, function (data) {
//         if (data.status === 'success') {
//           alert(data.msg);
//           $("#loginModal").modal('hide');
//           location.reload();
//         } else {
//           alert(data.msg);
//         }
//       }, 'json')  }
//   }else{
//     if (confirm('Apakah Anda Ingin MENGAKTIFKAN data ini?')) {
//       $.post('bank/active', {id:id, status:status}, function (data) {
//         if (data.status === 'success') {
//           alert(data.msg);
//           $("#loginModal").modal('hide');
//           location.reload();
//         } else {
//           alert(data.msg);
//         }
//       }, 'json')  }
//   }

// }

function active_data(id, status) {
  var message = status == 1 ? 'Apakah Anda Ingin MENONAKTIFKAN data ini?' : 'Apakah Anda Ingin MENGAKTIFKAN data ini?';
  $.confirm({
      title: 'Konfirmasi',
      content: message,
      buttons: {
          confirm: function () {
              $.post('bank/active', {id: id, status: status}, function (data) {
                  if (data.status === 'success') {
                      $.dialog('Berhasil');
                      $("#loginModal").modal('hide');
                      location.reload();
                  } else {
                      $.dialog(data.msg);
                  }
              }, 'json');
          },
          cancel: function () {
            $.dialog('Canceled!');
          }
      }
  });
}


function confirmDelete(id) {
  // if (confirm('Apakah Anda yakin menghapus data ini?')) {
  //   $.post('bank/delete_table', {id:id}, function (data) {
  //     if (data.status === 'success') {
  //       alert(data.msg);
  //       $("#loginModal").modal('hide');
  //       location.reload();
  //     } else {
  //       alert(data.msg);
  //     }
  //   }, 'json')  }

  $.confirmDel({
    title: 'Confirm!',
    content: 'Confirm hapus data???',
    buttons: {
        cancel: function () {
            $.dialog('Canceled!');
        },
        confirm: function () {
          $.post('bank/delete_table', {id:id}, function (data) {
            if (data.status === 'success') {
              $.dialog('Berhasil hapus data');
              $("#loginModal").modal('hide');
              location.reload();
            } else {
              $.dialog(data.msg);
            }
          }, 'json')
        },
    }
});

}

$(document).ready(function () {
  $(".tit").html("Bank")
  $(".page-title").html("BANK")
  $(".btn-closed").click(function () {
    reset_form()

  });

  $(".btn-add").click(function () {
    $(".btn-submit").show();
    $(".btn-editen").hide();
  })

  $(".btn-submit").click(function () {
    // let rekening = $("#txrekening").val();
    // let bank = $("#txbank").val();
    // if (rekening === "" || bank === "") {
    //   alert("Rekening atau Bank belum dimasukkan");
    // } else {
    //   $.post("bank/create",
    //     {
    //       txrekening: rekening,
    //       txbank: bank
    //     },
    //     function (data, status) {
    //       console.log(data.status)
    //       if (data.status == "error") {
    //         alert(data.msg)
    //       } else {
    //         reset_form()
    //       }
    //       // alert("Data: " + data + "\nStatus: " + status);
    //     }, 'json');
    // }
  });
  // $(".btn-editen").click(function () {
  //   let rekening = $("#txrekening").val();
  //   let bank = $("#txbank").val();
  //     if(rekening === "bankBill" || bank === "bankName"){
  //       alert("No Rekening sudah ada")
  //     }else{
  //       $.post("bank/update_bank",
  //       {
  //         txrekening: rekening,
  //         txbank: bank
  //       },
  //       function(data,status){
  //         console.log(data.status)
  //         if (data.status == "Error"){
  //         }else {
  //           reset_form()
  //         }
  //         //alert("Data: " + data + "\nStatus: " + status);
  //       },'json');
  //     }
  // }); 

  load_data();
});