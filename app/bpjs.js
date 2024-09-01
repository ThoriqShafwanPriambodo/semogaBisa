function reset_form() {
    $("#txkode").val('').focus();
    $("#txnama").val('');
    $("#txkelas").val('');
    $("#txtagihan").val('');
    $("#bpjsCompPercent").val('');
    $("#bpjsEmplPercent").val('');
  }
  
  function active_data(id, status) {
    $.confirm({
      title: 'Ubah status',
      content: 'Yakin ingin mengubah status?',
      theme: 'dark',
      buttons: {
        Ubah: function () {
          if (status === 1) {
            $.post('bpjs/active', { id: id, status: status }, function (data) {
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
              $.post('bpjs/active', { id: id, status: status }, function (data) {
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
  
  function simpen_data() {
    let kode = $("#txkode").val();
    let nama = $("#txnama").val();
    let kelas = $("#txkelas").val();
    let tagihan = $("#txtagihan").val();
    let perusahaan = $("#bpjsCompPercent").val();
    let karyawan = $("#bpjsEmplPercent").val();
  
    if (kode === "" || nama === "" || kelas === null || tagihan === "" || perusahaan === "" || karyawan === "") {
      alert("Pastikan form diisi dengan benar!");
    } else {
      $.post("bpjs/create", {
        txkode: kode,
        txnama: nama,
        txkelas: kelas,
        txtagihan: tagihan,
        bpjsCompPercent: perusahaan,
        bpjsEmplPercent: karyawan
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
    $.post('bpjs/edit_table', { id: id }, function (data) {
      if (data.status === 'ok') {
        $("#txkode").val(data.data.bpjsCode);
        $("#txnama").val(data.data.bpjsName);
        $("#txkelas").val(data.data.bpjsClass);
        $("#txtagihan").val(data.data.bpjsTotalBill);
        $("#bpjsCompPercent").val(data.data.bpjsCompPercent);
        $("#bpjsEmplPercent").val(data.data.bpjsEmplPercent);
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
    let bpjsCode = $("#txkode").val();
    let bpjsName = $("#txnama").val();
    let bpjsClass = $("#txkelas").val();
    let bpjsTotalBill = $("#txtagihan").val();
    let bpjsCompPercent = $("#bpjsCompPercent").val();
    let bpjsEmplPercent = $("#bpjsEmplPercent").val();
  
    if (bpjsCode === "" || bpjsName === "" || bpjsClass === "" || bpjsTotalBill === "" || bpjsCompPercent === "" || bpjsEmplPercent === "") {
        $.alert({
            title: 'Alert!',
            content: 'Error!',
        });
    } else {
      $.post('bpjs/update_table', { id: id, bpjsCode: bpjsCode, bpjsName: bpjsName, bpjsClass: bpjsClass, bpjsTotalBill: bpjsTotalBill, bpjsCompPercent: bpjsCompPercent, bpjsEmplPercent: bpjsEmplPercent, }, function (data) {
        if (data.status === 'success') {
          alert(data.msg);
          location.reload();
        } else {
          alert(data.msg);
  
        }
      }, 'json');
    }
  }
  
  function load_data() {
    $.post("bpjs/load_data",
      {
  
      },
      function (data) {
        console.log(data)
  
        $("#table4 > tbody").html('');
        $.each(data.bpjs, function (idx, val) {
          html = '<tr>'
          html += '<td>' + val['bpjsId'] + '</td>'
          html += '<td>' + val['bpjsCode'] + '</td>'
          html += '<td>' + val['bpjsName'] + '</td>'
          html += '<td>' + val['bpjsClass'] + '</td>'
          html += '<td>' + val['bpjsTotalBill'] + '</td>'
          html += '<td>' + val['bpjsCompPercent'] + '</td>'
          html += '<td>' + val['bpjsEmplPercent'] + '</td>'
          html += '<td><span onclick="active_data(' + val['bpjsId'] + ',' + val['bpjsActive'] + ')"  class="badge  ' + ((val['bpjsActive'] == '1') ? 'bg-success' : 'bg-danger') + ' ">' + ((val['bpjsActive'] == '1') ? 'Active' : 'Inactive') + '</span></td>'
          html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_data(' + val['bpjsId'] + ')">Edit</button></td>'
          html += '<td><button class="btn btn-danger btn-sm" onClick="confirmDelete(' + val['bpjsId'] + ')">Delete</button></td>'
          html += '</tr>'
          $("#table4 > tbody").append(html);
        });
        $("#table4").DataTable().destroy()
        $("#table4").DataTable({
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
          $.post('bpjs/delete_table', { id: id }, function (data) {
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

  function onmax(input, max){
    if(input.value > max ){
        input.value = max;
    }
}
function onmin(input, min) {
    if(input.value < min ){
        input.value = min;
    }
}

function changecomp(){
  const companyPercent = parseFloat($('#bpjsCompPercent').val()) || 0;
  const employeePercent = 100 - companyPercent;
  $('#bpjsEmplPercent').val(employeePercent)
} 
function changeemp(){
  const employeePercent = parseFloat($('#bpjsEmplPercent').val()) || 0;
  const companyPercent = 100 - employeePercent;
  $('#bpjsCompPercent').val(companyPercent)  
}
  
  $(document).ready(function () {
    $(".tittle").html("Bpjs")
    $(".page-title").html("BPJS")
    $(".tit").html("Bpjs")
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