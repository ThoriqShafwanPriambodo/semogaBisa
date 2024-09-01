var arrAlamat = []
var arrAsuransi = []
var arrKontak = []
var arrPendidikan = []
var alamatId = null
var kontakId = null
var asuransiId = null
var pendidikanId = null

function update_data() {
    var id = $("#loginModal").data('id');
    var empladdress = JSON.stringify(arrAlamat);
    var emplinsuranse = JSON.stringify(arrAsuransi);
    var emplcontact = JSON.stringify(arrKontak);
    var empledu = JSON.stringify(arrPendidikan);

    let employeeData = {
        id: id,
        employeeBranchId: $("#txcabang").val(),
        employeeBankId: $("#txbank").val(),
        employeeName: $("#txnama").val(),
    };
    let employeeTable = {
        employeeFullname: $("#txnamalkp").val(),
        employeeCode: $("#txkode").val(),
        employeeEmail: $("#txemail").val(),
        employeeKtp: $("#txktp").val(),
        employeeGender: $("#txgender").val(),
        employeeBlood: $("#txgolongan").val(),
        employeeMother: $("#txnamaibu").val(),
        employeeReligion: $("#txagama").val(),
        employeeNation: $("#txkebangsaan").val(),
        employeeBill: $("#txrekening").val(),
        employeeSalaryType: $("#txgaji").val(),
        employeeBpjsId: $("#txbpjs").val(),
        employeeBpjsNo: $("#txnobpjs").val(),
        employeeNpwp: $("#txnpwp").val(),
        employeeInDate: $("#txtglmasuk").val(),
        employeeActiveDate: $("#txtglaktif").val(),
        employeeOutDate: $("#txtglkeluar").val(),
        empladdress: empladdress,
        emplinsuranse: emplinsuranse,
        emplcontact: emplcontact,
        empledu: empledu,
    }
    
    var combinedSettings = Object.assign({},employeeData,employeeTable);
    if (Object.values(employeeData).some(val => val === "")) {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill out all fields',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        $.post('personal/update_table', combinedSettings, function (data) {
            if (data.status === 'success') {
                Swal.fire({
                    title: 'Success!',
                    text: data.msg,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    $("#loginModal").modal('hide');
                    
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: data.msg,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
            load_data();
        }, 'json');
    }
}


function tambah_alamat() {
  console.log(alamatId);
    if (alamatId == null ){
    arrAlamat.push
        ({
            'empladdressEmployeeId': 0,
            'empladdressJalan': $('#txjalan').val(),
            'empladdressKelurahan': $('#txkelurahan').val(),
            'empladdressKecamatan': $('#txkecamatan').val(),
            'empladdressKota': $('#txkota').val(),
            'empladdressProvinsi': $('#txprovinsi').val(),
            'empladdressPhone': $('#txphone').val()
        })
        tampilAlamat()
    }
}

  function tampilAlamat() {
    $("#table_alamat").DataTable().clear().destroy()
    $("#table_alamat > tbody").html('');
    $.each(arrAlamat, function (idx, val) {
        html = '<tr>'
        html += '<td>' + val['empladdressJalan'] + '</td>'
        html += '<td>' + val['empladdressKelurahan'] + '</td>'
        html += '<td>' + val['empladdressKecamatan'] + '</td>'
        html += '<td>' + val['empladdressKota'] + '</td>'
        html += '<td>' + val['empladdressProvinsi'] + '</td>'
        html += '<td>' + val['empladdressPhone'] + '</td>'
        html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_alamat(' + idx + ')">Edit</button></td>'
        html += '<td><button class="btn btn-danger btn-sm " onclick="hapus_alamat(' + idx + ')">Hapus</button></td>'
        html += '</tr>'
        $("#table_alamat > tbody").append(html);
        $(".input_alamat").val('');
    });
    $("#table_alamat").DataTable({
        responsive: true,
        processing: true,
        pagingType: 'first_last_numbers',
        // order: [[0, 'asc']],
        dom:
            "<'row'<'col-3'l><'col-9'f>>" +
            "<'row dt-row'<'col-sm-12'tr>>" +
            "<'row'<'col-4'i><'col-8'p>>",
        "language": {
            "info": "Page PAGE of PAGES",
            "lengthMenu": "MENU",
            "search": "",
            "searchPlaceholder": "Search.."
        }
    });
    console.log(arrAlamat)
}

function edit_alamat(idx) {
    var alamat = arrAlamat[idx];
    alamatId = idx;
    console.log(alamatId);
    $("#txjalan").val(alamat.empladdressJalan);
    $("#txkelurahan").val(alamat.empladdressKelurahan);
    $("#txkecamatan").val(alamat.empladdressKecamatan);
    $("#txkota").val(alamat.empladdressKota);
    $("#txprovinsi").val(alamat.empladdressProvinsi);
    $("#txphone").val(alamat.empladdressPhone);
    $("#tmbhalmt").removeClass('btn-success').addClass('btn-warning');
    $("#tmbhalmt").html('Update');

}

function update_alamat() {

    var alamat = arrAlamat[alamatId]; 

    let empladdressJalan = $("#txjalan").val();
    let empladdressKelurahan = $("#txkelurahan").val();
    let empladdressKecamatan = $("#txkecamatan").val();
    let empladdressKota = $("#txkota").val();
    let empladdressProvinsi = $("#txprovinsi").val();
    let empladdressPhone = $("#txphone").val();
    
    if (empladdressJalan === "" || empladdressKelurahan === "" || empladdressKecamatan === "" || empladdressKota === "" || empladdressProvinsi === "" || empladdressPhone === "") {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all fields.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        if (alamat) {
            alamat.empladdressJalan = empladdressJalan;
            alamat.empladdressKelurahan = empladdressKelurahan;
            alamat.empladdressKecamatan = empladdressKecamatan;
            alamat.empladdressKota = empladdressKota;
            alamat.empladdressProvinsi = empladdressProvinsi;
            alamat.empladdressPhone = empladdressPhone;
            Swal.fire({
                title: 'Success!',
                text: 'Address updated success',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            console.log(arrAlamat)
            tampilAlamat();
            alamatId = null
            $("#tmbhalmt").show();
            $("#updtalmt").hide();
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Address data not found',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
    alamatId = null;
  $("#tmbhalmt").html('Tambah')
}

function hapus_alamat(id) {
    alamatId = id
    arrAlamat.splice(id,1)
    tampilAlamat()
    alamatId = null
}

function openModal() {
    reset_form()
    arrAlamat = [];
    arrAsuransi = []
    arrKontak = [];
    arrPendidikan = [];
    alamatId = null;
    asuransiId = null;
    kontakId = null;
    pendidikanId = null;
    tampilAlamat()
    tampilAsuransi()
    tampilPendidikan()
    tampil_contact()
    load_cabang()
    $("#loginModal").modal('show')
}



function tambah_asuransi() {

    let namaAsuransi = $("#txasuransi").val()
    let nomorAsuransi = $("#txasuransino").val()

    if (namaAsuransi === "" || nomorAsuransi === "") {
        alert("Masukan Data terlebih dahulu")
    } else {

    if(asuransiId == null) {
    arrAsuransi.push
        ({
            'emplinsuranceEmployeeId': 0,
            'emplinsuranceBpjsId': $("#txasuransi").val(),
            'emplinsuranceNo': $("#txasuransino").val(),
        })
        tampilAsuransi()
    } 
}
}
    function tampilAsuransi() {
    $("#table_asuransi").DataTable().clear().destroy()
    $("#table_asuransi > tbody").html('');
    $.each(arrAsuransi, function (idx, val) {
        html = '<tr>'
        html += '<td>' + val['emplinsuranceBpjsId'] + '</td>'
        html += '<td>' + val['emplinsuranceNo'] + '</td>'
        html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="editAsuransi(' + idx + ')">Edit</button></td>'
        html += '<td><button class="btn btn-danger btn-sm " onclick="hapusAsuransi(' + idx + ')">Hapus</button></td>'
        html += '</tr>'
        $("#table_asuransi > tbody").append(html);
        $(".input_asuransi").val('');
    });
    $("#table_asuransi").DataTable({
        responsive: true,
        processing: true,
        pagingType: 'first_last_numbers',
        // order: [[0, 'asc']],
        dom:
            "<'row'<'col-3'l><'col-9'f>>" +
            "<'row dt-row'<'col-sm-12'tr>>" +
            "<'row'<'col-4'i><'col-8'p>>",
        "language": {
            "info": "Page PAGE of PAGES",
            "lengthMenu": "MENU",
            "search": "",
            "searchPlaceholder": "Search.."
        }
    });
    console.log(arrAsuransi)
}

function editAsuransi(idx) {
    var asuransi = arrAsuransi[idx];
    asuransiId = idx;
    $("#txasuransi").val(asuransi.emplinsuranceBpjsId);
    $("#txasuransino").val(asuransi.emplinsuranceNo);
    $("#tmbhasnr").removeClass('btn-success').addClass('btn-warning');
    $("#tmbhasnr").html('Update');
 }

 function update_asuransi() {
    var asuransi = arrAsuransi[asuransiId];

    let emplinsuranceBpjsId = $("#txasuransi").val();
    let emplinsuranceNo = $("#txasuransino").val();
    
    if (emplinsuranceBpjsId === "" || emplinsuranceNo === "" ) {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all fields.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        if (asuransi) {
            asuransi.emplinsuranceBpjsId = emplinsuranceBpjsId;
            asuransi.emplinsuranceNo = emplinsuranceNo;
            Swal.fire({
                title: 'Success!',
                text: 'Address updated success',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            console.log(asuransiId)
            tampilAsuransi();
            asuransiId = null
            $("#tmbhasnr").show();
            $("#updtsr").hide();
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Address data not found',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
    asuransiId = null;
  $("#tmbhasnr").html('Tambah')
 }

 function hapusAsuransi(id) {
    asuransiId = id
    arrAsuransi.splice(id,1)
    tampilAsuransi()
    asuransiId = null
 }


 function tambah_contact() {

    console.log(arrKontak)

    if (kontakId == null) {
        let emplcontactName = $('#txnama1').val();
        let emplcontactAddress = $('#txalamat1').val();
        let emplcontactProfesion = $('#txprofesi').val();
        let emplcontactHubungan = $('#txhubungan').val();
        let empladdressPhone = $('#txphone1').val();

        if (emplcontactName === "" || emplcontactAddress === "" || emplcontactProfesion === "" || emplcontactHubungan === "" || empladdressPhone === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all fields.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } else {
            arrKontak.push
                ({
                    'emplcontactEmployeeId': 0,
                    'emplcontactName': $('#txnama1').val(),
                    'emplcontactAddress': $('#txalamat1').val(),
                    'emplcontactProfesion': $('#txprofesi').val(),
                    'emplcontactHubungan': $('#txhubungan').val(),
                    'emplcontactPhone': $('#txphone1').val(),
                })
                tampil_contact()
        }

        console.log(arrKontak)
    }
}    

function tampil_contact(){
    $("#table_kontak").DataTable().clear().destroy()
    $("#table_kontak > tbody").html('');
    $.each(arrKontak, function (idx, val) {
        html = '<tr>'
        html += '<td>' + val['emplcontactName'] + '</td>'
        html += '<td>' + val['emplcontactAddress'] + '</td>'
        html += '<td>' + val['emplcontactProfesion'] + '</td>'
        html += '<td>' + val['emplcontactHubungan'] + '</td>'
        html += '<td>' + val['emplcontactPhone'] + '</td>'
        html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_contact(' + idx + ')">Edit</button></td>'
        html += '<td><button class="btn btn-danger btn-sm " onclick="hapus_contact(' + idx + ')">Hapus</button></td>'
        html += '</tr>'
        $("#table_kontak > tbody").append(html);
        $(".input_kontak").val('');
    });
    $("#table_kontak").DataTable({
        responsive: true,
        processing: true,
        pagingType: 'first_last_numbers',
        // order: [[0, 'asc']],
        dom:
            "<'row'<'col-3'l><'col-9'f>>" +
            "<'row dt-row'<'col-sm-12'tr>>" +
            "<'row'<'col-4'i><'col-8'p>>",
        "language": {
            "info": "Page PAGE of PAGES",
            "lengthMenu": "MENU",
            "search": "",
            "searchPlaceholder": "Search.."
        }
    });
}

function edit_contact(idx) {
    var kontak = arrKontak[idx];
    kontakId = idx
    $("#txnama1").val(kontak.emplcontactName);
    $("#txalamat1").val(kontak.emplcontactAddress);
    $("#txprofesi").val(kontak.emplcontactProfesion);
    $("#txhubungan").val(kontak.emplcontactHubungan);
    $("#txphone1").val(kontak.emplcontactPhone);
    $("#tmbhcntc").removeClass('btn-success').addClass('btn-warning')
    $(".btncntc").html('Update')
}

function update_contact() {
    var kontak = arrKontak[kontakId];

    let emplcontactName = $("#txnama1").val();
    let emplcontactAddress = $("#txalamat1").val();
    let emplcontactProfesion = $("#txprofesi").val();
    let emplcontactHubungan = $("#txhubungan").val();
    let emplcontactPhone = $("#txphone1").val();

    if (emplcontactName === "" || emplcontactAddress === "" || emplcontactProfesion === "" || emplcontactHubungan === "" || emplcontactPhone === "") {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all fields.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        if (kontak) {
            kontak.emplcontactName = emplcontactName;
            kontak.emplcontactAddress = emplcontactAddress;
            kontak.emplcontactProfesion = emplcontactProfesion;
            kontak.emplcontactHubungan = emplcontactHubungan;
            kontak.emplcontactPhone = emplcontactPhone;
            Swal.fire({
                title: 'Success!',
                text: 'Address updated success',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            console.log(arrKontak)
            tampil_contact();
            kontakId = null
            $("#tmbhcntc").addClass('btn-success').removeClass('btn-warning')
            $(".btncntc").html('Tambah')
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Address data not found',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}

function hapus_contact(id) {
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
            kontakId = id
            arrKontak.splice(id, 1)
            tampil_contact()
            kontakId = null
        } else if (result.isDenied) {
            Swal.fire('Perubahan tidak tersimpan', '', 'info')
        }
    })
}


function tambah_pendidikan() {
    if (pendidikanId == null) {
        let empleduJenjang = $("#txjenjang").val();
        let empleduInstansi = $("#txinstansi").val();
        let empleduJurusan = $("#txjurusan").val();
        let empleduTahunlulus = $("#txlulus").val();

        if (empleduJenjang === "" || empleduInstansi === "" || empleduJurusan === "" || empleduTahunlulus === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all fields.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } else {
            arrPendidikan.push
                ({
                    'empleduEmployeeId': 0,
                    'empleduJenjang': $('#txjenjang').val(),
                    'empleduInstansi': $('#txinstansi').val(),
                    'empleduJurusan': $('#txjurusan').val(),
                    'empleduTahunlulus': $('#txlulus').val(),
                })
                tampilPendidikan()
        }
    }
    
}

function tampilPendidikan() {
    $("#table_pendidikan").DataTable().clear().destroy()
    $("#table_pendidikan > tbody").html('');
    $.each(arrPendidikan, function (idx, val) {
        html = '<tr>'
        html += '<td>' + val['empleduJenjang'] + '</td>'
        html += '<td>' + val['empleduInstansi'] + '</td>'
        html += '<td>' + val['empleduJurusan'] + '</td>'
        html += '<td>' + val['empleduTahunlulus'] + '</td>'
        html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_pendidikan(' + idx + ')">Edit</button></td>'
        html += '<td><button class="btn btn-danger btn-sm " onclick="hapus_pendidikan(' + idx + ')">Hapus</button></td>'
        html += '</tr>'
        $("#table_pendidikan > tbody").append(html);
        $(".input_pendididikan").val('');
    });
    $("#table_pendidikan").DataTable({
        responsive: true,
        processing: true,
        pagingType: 'first_last_numbers',
        // order: [[0, 'asc']],
        dom:
            "<'row'<'col-3'l><'col-9'f>>" +
            "<'row dt-row'<'col-sm-12'tr>>" +
            "<'row'<'col-4'i><'col-8'p>>",
        "language": {
            "info": "Page PAGE of PAGES",
            "lengthMenu": "MENU",
            "search": "",
            "searchPlaceholder": "Search.."
        }
    });
}

function edit_pendidikan(idx) {
    var pendidikan = arrPendidikan[idx];
    pendidikanId = idx
    $("#txnama1").val(pendidikan.empleduJenjang);
    $("#txalamat1").val(pendidikan.empleduInstansi);
    $("#txprofesi").val(pendidikan.empleduJurusan);
    $("#txhubungan").val(pendidikan.empleduTahunlulus);
    $("#tmbhpen").removeClass('btn-success').addClass('btn-warning')
    $(".btnpen").html('Update')
}

function update_pendidikan() {
    var pendidikan = arrPendidikan[pendidikanId];
    let empleduJenjang = $("#txnama1").val();
    let empleduInstansi = $("#txalamat1").val();
    let empleduJurusan = $("#txprofesi").val();
    let empleduTahunlulus = $("#txhubungan").val();

    if (empleduJenjang === "" || empleduInstansi === "" || empleduJurusan === "" || empleduTahunlulus === "") {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all fields.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        if (pendidikan) {
            pendidikan.empleduJenjang = empleduJenjang;
            pendidikan.empleduInstansi = empleduInstansi;
            pendidikan.empleduJurusan = empleduJurusan;
            pendidikan.empleduTahunlulus = empleduTahunlulus;
            Swal.fire({
                title: 'Success!',
                text: 'Address updated success',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            console.log(arrPendidikan)
            tambah_contact();
            pendidikanId = null
            $("#tmbhpen").addClass('btn-success').removeClass('btn-warning')
            $(".btnpen").html('Tambah')
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Address data not found',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}

function hapus_pendidikan(id) {
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
            pendidikanId = id
            arrPendidikan.splice(id, 1)
            tampilPendidikan()
            pendidikanId = null
        } else if (result.isDenied) {
            Swal.fire('Perubahan tidak tersimpan', '', 'info')
        }
    })
}

function cek_alamat(val, x) {
    console.log(val)
    $.post("personal/cek_valid", {val:val, x:x}, function(res){
      if (res.status == 'error') {
        alert(res.msg)
      }
      if( x == 1 ){
        $('#txnama').val('').focus()
      }
     else if (x == 2) {
        $('#txkode').val('').focus()
      }
      else if (x == 3) {
        $('#txemail').val('').focus()
      }
      else if (x  == 4) {
        $('#txktp').val('').focus()
      }
      else if (x == 5) {
        $('#txrek').val('').focus()
      }
      else if (x == 6) {
        $('#txbpjs').val('').focus()
      }
       else if (x == 7) {
        $('#txnpwp').val('').focus()
      }
  
    },'json')
  }

function load_data() {
    $.post("personal/load_data",
        {

        },
        function (data) {
            console.log(data)
            $("#table2").DataTable().clear().destroy()
            $("#table2 > tbody").html('');
            $.each(data.employee, function (idx, val) {
                html = '<tr>'
                html += '<td>' + val['employeeCode'] + '</td>'
                html += '<td>' + val['employeeName'] + '</td>'
                html += '<td><img src="'+ base_url + val['employeePhoto'] + '" width="120px"></td>'
                html += '<td><span onclick="active_data(' + val['employeeId'] + ',' + val['employeeActive'] + ')" class="badge ' + ((val['employeeActive'] == '1') ? 'bg-success' : 'bg-danger') + ' ">' + ((val['employeeActive'] == '1') ? 'Active' : 'Inactive') + '</span></td>'
                html += '<td><button class="btn btn-warning btn-sm btn-edit"  onclick="edit_table(' + val['employeeId'] + ')">Edit</button></td>'
                html += '<td><button class="btn btn-danger btn-sm " onclick="delete_table(' + val['employeeId'] + ')">Delete</button></td>'
                html += '</tr>'
                $("#table2 > tbody").append(html);
            });
            $("#table2").DataTable({
                responsive: true,
                processing: true,
                pagingType: 'first_last_numbers',
                order:[[0, 'desc']],
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
            document.getElementById('spinner').style.display = 'none';
            document.getElementById('refreshIcon').style.display = 'inline-block';
        }, 'json');
}

function delete_table(id) {
    $.confirm({
        title: 'Hapus Data',
        content: 'Delete atau Cancel',
        buttons: {
            hapus: {
                text: 'Delete',
                btnClass: 'btn-red',
                action: function () {
                    $.post('personal/delete_table', { id: id }, function (data) {
                        if (data.status === 'succsess') {
                            alert(data.msg);
                            $("#loginModal").modal('hide');
                            load_data()
                            console.log(data.msg)
                        } else {
                            alert(data.msg);
                        }
                    }, 'json');
                }
            },
            cancel: {
                text: 'Cancel',
                btnClass : 'btn-green',
                action: function () {
                    $.alert('Canceled!');
                }
            },
        }
    });
}

function import_excel1(){
    var formData = new FormData();
    formData.append('file', $('#tximport')[0].files[0])

    $.ajax({
        url: 'personal/import_excel',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        type: 'POST',
        success: function (data) {
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
      }
});
}

function import_excel(){
    $("#importModal").modal('show');
}   

$(document).ready(function () {

    $(".angka").keydown(function (e) {

        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 107, 189]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode == 67 && e.ctrlKey === true) ||
            (e.keyCode == 88 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    $(".btn-closed").click(function () {
        // reset_form()
    });

    $(".btn-add").click(function () {
        // reset_form();
        $(".btn-submit").show();
        $(".btn-editen").hide();
        $("#tmbhalmt").show();
        $("#updtalmt").hide();
        $("#tmbhasr").show();
        $("#updtasr").hide();
        $("#tmbhcon").show();
        $("#updtcon").hide();
        $("#tmbhpen").show();
        $("#updtpen").hide();
    });
    $(".btn-add").click(function () {
        $(".btn-submit").show();
        $(".btn-editen").hide();
    });
    $("#refreshButton").click(function () {
        document.getElementById('spinner').style.display = 'inline-block';
        document.getElementById('refreshIcon').style.display = 'none';
    });

    $(".page-title").html("BANK")
    load_data();
    load_cabang()
    
});



function simpan_data(){
    load_cabang()
    console.log($('#txfoto')[0].files[0], JSON.stringify(arrAlamat))
    var formData = new FormData();
    formData.append('cabang', $('#txcabang').val() )
    formData.append('bank', $('#txbank').val() )
    formData.append('nama', $('#txnama').val() )
    formData.append('namalengkap',$('#txnamalkp').val() )
    formData.append('foto', $('#txfoto')[0].files[0] ) // foto
    formData.append('kode',$('#txkode').val() )
    formData.append('email',$('#txemail').val() )
    formData.append('ktp',$('#txktp').val() )
    formData.append('gender',$('#txgender').val() )
    formData.append('golongan',$('#txgolongan').val() )
    formData.append('namaIbu',$('#txnamaibu').val() )
    formData.append('agama',$('#txagama').val() )
    formData.append('negara',$('#txkebangsaan').val() )
    formData.append('rekening',$('#txrekening').val() )
    formData.append('gaji',$('#txgaji').val() )
    formData.append('bpjs',$('#txbpjs').val() )
    formData.append('noBpjs',$('#txnobpjs').val() )
    formData.append('npwp',$('#txnpwp').val() )
    formData.append('tanggalMasuk',$('#txtglmasuk').val() )
    formData.append('tanggalAktif',$('#txtglaktif').val() )
    formData.append('tanggalKeluar',$('#txtglkeluar').val() )
    formData.append('alamat', JSON.stringify(arrAlamat) )
    formData.append('asuransi', JSON.stringify(arrAsuransi) )
    formData.append('kontak', JSON.stringify(arrKontak) )
    formData.append('pendidikan', JSON.stringify(arrPendidikan) )

    $.ajax({
        url: 'personal/create',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        type: 'POST',
        success: function (data) {
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
      }
});

}

function reset_form() {
    let reset = $(".form-control").val('');
    $(".form-select").val('');
    alamatId = null;
    $("#tmbhalmt").removeClass('btn-warning').addClass('btn-success');
    $("#tmbhalmt").html('Tambah');

    asuransiId = null;
    $("#tmbhasnr").removeClass('btn-warning').addClass('btn-success');
    $("#tmbhasnr").html('Tambah');

    kontakId = null;
    $("#tmbhcntc").removeClass('btn-warning').addClass('btn-success');
    $("#tmbhcntc").html('Tambah');

    pendidikanId = null;
    $("#tmbhpen").removeClass('btn-warning').addClass('btn-success');
    $("#tmbhpen").html('Tambah');


    //kontak
    let nama1 = $("#txnama1").val('');   
    let alamat1 = $("#txalamat1").val('');  
    let profesi = $("#txprofesi").val('');   
    let hubungan = $("#txhubungan").val('');
    let phone1 = $("#txphone1").val('');

    //asuransi
    let asuransi = $("#txasuransi").val('');
    let noAsuransi = $("#txasuransino").val('');

    //alamat
    let phone = $("#txphone").val('');
    let jalan = $("#txjalan").val('');
    let kelurahan = $("#txkelurahan").val('');
    let kecamatan = $("#txkecamatan").val('');
    let kota = $("#txkota").val('');
    let provinsi = $("#txprovinsi").val('');

    //pendidikan
    let jenjang = $("#txjenjang").val('');
    let instansi = $("#txinstansi").val('');
    let jurusan = $("#txjurusan").val('');
    let lulus = $("#txlulus").val('');

}

function load_cabang(){
    $.post('personal/loadCabang', function( res ){
        $("#txcabang, #txbank, #txasuransi, #txbpjs").empty()

        $("#txcabang").append('<option value = "">Pilih Cabang</option>')
        $("#txbank").append('<option value = ""> Pilih Bank</option>')
        $("#txasuransi").append('<option value = "">Pilih Asuransi</option>')
        $("#txbpjs").append('<option value = "">Pilih Bpjs</option>')

        $.each( res.data_kantor , function ( i, v) {
            $("#txcabang").append('<option value = "'+ v.branchId+'">'+ v.branchName+'</option>')             
        }
        ) 
        $.each( res.data_bank , function ( i, v) {            
            $("#txbank").append('<option value = "'+ v.bankId+'">'+ v.bankName+'</option>')                   
        }
        ) 
        $.each( res.data_bpjs , function ( i, v) {            
            $("#txbpjs").append('<option value = "'+ v.bpjsId+'">'+ v.bpjsName+'</option>')                   
        }
        ) 
        $.each( res.data_asuransi , function ( i, v) {            
            $("#txasuransi").append('<option value = "'+ v.insuranceId+'">'+ v.insuranceName+'</option>')                   
        }
        ) 
    }, 'json');
}

function edit_table(id) {
 
    $.post('personal/edit_table', { id: id }, function (data) {
        if (data.status === 'ok') {
          $("#txcabang").val(data.data.employee.employeeBranchId);
          $("#txbank").val(data.data.employee.employeeBankId);
          $("#txnama").val(data.data.employee.employeeName);
          $("#txnamalkp").val(data.data.employee.employeeFullname);
          $("#txkode").val(data.data.employee.employeeCode);
          $("#txemail").val(data.data.employee.employeeEmail);
          $("#txktp").val(data.data.employee.employeeKtp);
          $("#txgender").val(data.data.employee.employeeGender);
          $("#txgolongan").val(data.data.employee.employeeBlood);
          $("#txnamaibu").val(data.data.employee.employeeMother);
          $("#txagama").val(data.data.employee.employeeReligion);
          $("#txkebangsaan").val(data.data.employee.employeeNation);
          $("#txrekening").val(data.data.employee.employeeBill);
          $("#txgaji").val(data.data.employee.employeeSalaryType);
          $("#txbpjs").val(data.data.employee.employeeBpjsId);
          $("#txnobpjs").val(data.data.employee.employeeBpjsNo);
          $("#txnpwp").val(data.data.employee.employeeNpwp);
          $("#txtglmasuk").val(data.data.employee.employeeInDate);
          $("#txtglaktif").val(data.data.employee.employeeActiveDate);
          $("#txtglkeluar").val(data.data.employee.employeeOutDate);
          $("#table_alamat").val(data.data.employee.empladdress);
          $("#table_asuransi").val(data.data.employee.emplinsuranse);
          $("#table_kontak").val(data.data.employee.emplcontact);
          $("#table_pendidikan").val(data.data.employee.empledu);

          arrAlamat = data.data.address
          tampilAlamat()

          arrAsuransi = data.data.insurance
          tampilAsuransi()

          arrKontak = data.data.contact
          tampil_contact()
          
          arrPendidikan = data.data.education
          tampilPendidikan()

            $("#loginModal").data('id', id); 
            $("#loginModal").modal('show');
            $(".btn-submit").hide();
            $(".btn-editen").show();
            $("#txbank").trigger('change');

        } else {
          Swal.fire({
            title: 'Error!',
            text: data.msg,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
},'json');


}