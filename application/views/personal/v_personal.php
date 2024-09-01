<div class="page-content">
    <div class="modal fade" id="importModal" tabindex="-1" aria-labelledby="importModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel33">Import</h4>
                    <button type="button" class="close btn-closed" data-bs-dismiss="modal" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="form form-horizontal">
                        <div class="form-body">
                            <div class="row">
                            <div class="col-md-8 col-12">
                                                        <div class="form-group">
                                                            <label for="formFile">Import</label>
                                                            <input class="form-control" type="file" id="tximport">
                                                        </div>
                                                    </div>
                                <div class="col-12 d-flex justify-content-end">
                                    <button type="button" class="btn btn-danger me-1 mb-1" data-bs-dismiss="modal">
                                        <i class="bx bx-check d-block d-sm-none"></i>
                                        <span class="d-none d-sm-block">Batal</span>
                                    </button>
                                    <button type="button" class="btn btn-warning me-1 mb-1" style="color: #fff;" onclick="import_excel1()">Import
                                        CSV</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal modal-add fade" id="loginModal" tabindex="-1" aria-labelledby="myModalLabel33" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel33">Add Data</h4>
                    <button type="button" class="close btn-closed" data-bs-dismiss="modal" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 col-12">
                            <div class="card">
                                <div class="card-body">
                                    <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home"
                                                role="tab" aria-controls="home" aria-selected="true">Informasi</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="alamat-tab" data-bs-toggle="tab" href="#alamat"
                                                role="tab" aria-controls="alamat" aria-selected="false">Alamat</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="asuransi-tab" data-bs-toggle="tab" href="#asuransi"
                                                role="tab" aria-controls="asuransi" aria-selected="false">Asuransi</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="kontak-tab" data-bs-toggle="tab" href="#kontak"
                                                role="tab" aria-controls="kontak" aria-selected="false">Kontak</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="pendidikan-tab" data-bs-toggle="tab"
                                                href="#pendidikan" role="tab" aria-controls="pendidikan"
                                                aria-selected="false">Pendidikan</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="home" role="tabpanel"
                                            aria-labelledby="home-tab">
                                            <form action="#">
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="city-column">Cabang</label>
                                                            <fieldset class="form-group">
                                                                <select class="form-select" id="txcabang"></select>


                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="city-column">Bank</label>
                                                            <fieldset class="form-group">
                                                                <select class="form-select" id="txbank">

                                                                </select>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Nama</label>
                                                            <input id="txnama" type="text" class="form-control"
                                                                placeholder="Nama" name="lname-column"
                                                                onblur="cek_alamat(this.value,1)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Nama Lengkap</label>
                                                            <input id="txnamalkp" type="text" class="form-control"
                                                                placeholder="Nama Lengkap" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Kode</label>
                                                            <input id="txkode" type="text" class="form-control"
                                                                placeholder="Kode" name="lname-column"
                                                                onblur="cek_alamat(this.value,2)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Email</label>
                                                            <input id="txemail" type="text" class="form-control"
                                                                placeholder="Email" name="lname-column"
                                                                onblur="cek_alamat(this.value,3)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">KTP</label>
                                                            <input id="txktp" type="text" class="form-control"
                                                                placeholder="KTP" name="lname-column"
                                                                onblur="cek_alamat(this.value,4)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="city-column">Jenis Kelamin</label>
                                                            <fieldset class="form-group">
                                                                <select class="form-select" id="txgender">
                                                                    <option value="" disabled selected>Pilih Jenis
                                                                        Kelamin
                                                                    </option>
                                                                    <option value="P">Perempuan</option>
                                                                    <option value="L">Laki Laki</option>
                                                                </select>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Golongan Darah</label>
                                                            <input id="txgolongan" type="text" class="form-control"
                                                                placeholder="Golongan Darah" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Nama Ibu</label>
                                                            <input id="txnamaibu" type="text" class="form-control"
                                                                placeholder="Nama Ibu" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Agama</label>
                                                            <input id="txagama" type="text" class="form-control"
                                                                placeholder="Agama" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Kebangsaan</label>
                                                            <input id="txkebangsaan" type="text" class="form-control"
                                                                placeholder="Kebangsaan" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">No Rekening</label>
                                                            <input id="txrekening" type="text" class="form-control"
                                                                placeholder="No Rekening" name="lname-column"
                                                                onblur="cek_alamat(this.value,5)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="city-column">Tipe Gaji</label>
                                                            <fieldset class="form-group">
                                                                <select class="form-select" id="txgaji">
                                                                    <option value="" disabled selected>Pilih Tipe Gaji
                                                                    </option>
                                                                    <option value="Harian">Harian</option>
                                                                    <option value="Minggunan">Minggunan</option>
                                                                    <option value="Bulanan">Bulanan</option>
                                                                </select>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="city-column">BPJS</label>
                                                            <fieldset class="form-group">
                                                                <select class="form-select" id="txbpjs">
                                                                </select>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-8 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">No BPJS</label>
                                                            <input id="txnobpjs" type="text" class="form-control"
                                                                placeholder="No BPJS" name="lname-column"
                                                                onblur="cek_alamat(this.value,6)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">NPWP</label>
                                                            <input id="txnpwp" type="text" class="form-control"
                                                                placeholder="NPWP" name="lname-column"
                                                                onblur="cek_alamat(this.value,7)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-8 col-12">
                                                        <div class="form-group">
                                                            <label for="formFile">Foto</label>
                                                            <input class="form-control" type="file" id="txfoto">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Tanggal Masuk</label>
                                                            <input id="txtglmasuk" type="date" class="form-control"
                                                                placeholder="Tanggal Masuk" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Tanggal Aktif</label>
                                                            <input id="txtglaktif" type="date" class="form-control"
                                                                placeholder="Tanggal Aktif" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Tanggal Keluar</label>
                                                            <input id="txtglkeluar" type="date" class="form-control"
                                                                placeholder="Tanggal Keluar" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <button type="button" class="btn btn-danger ms-1"
                                                                id="warning" onclick="reset_form()">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block btncntct">Reset</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="tab-pane fade" id="alamat" role="tabpanel"
                                            aria-labelledby="alamat-tab">
                                            <form action="#">
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Jalan</label>
                                                            <input id="txjalan" type="text"
                                                                class="form-control input_alamat" placeholder="Jalan"
                                                                name="fname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Kelurahan</label>
                                                            <input id="txkelurahan" type="text"
                                                                class="form-control input_alamat"
                                                                placeholder="Kelurahan" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Kecamatan</label>
                                                            <input id="txkecamatan" type="text"
                                                                class="form-control input_alamat"
                                                                placeholder="Kecamatan" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Kota</label>
                                                            <input id="txkota" type="text"
                                                                class="form-control input_alamat" placeholder="Kota"
                                                                name="fname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Provinsi</label>
                                                            <input id="txprovinsi" type="text"
                                                                class="form-control input_alamat" placeholder="Provinsi"
                                                                name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Phone</label>
                                                            <input id="txphone" type="type"
                                                                class="form-control input_alamat angka"
                                                                placeholder="Phone" name="lname-column" maxlength="15">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <button type="button" class="btn btn-success ms-1"
                                                                id="tmbhalmt"
                                                                onclick="(alamatId == null) ? tambah_alamat() : update_alamat();">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block btnalmt">Tambah</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <button type="button" class="btn btn-danger ms-1"
                                                                id="warning" onclick="reset_form()">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block btncntct">Reset</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="table-responsive datatable-minimal">
                                                <table class="table" id="table_alamat">
                                                    <thead>
                                                        <tr>
                                                            <th>Jalan</th>
                                                            <th>Kelurahan</th>
                                                            <th>Kecamatan</th>
                                                            <th>Kota</th>
                                                            <th>Provinsi</th>
                                                            <th>Phone</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="asuransi" role="tabpanel"
                                            aria-labelledby="asuransi-tab">
                                            <form action="#">
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="city-column">Asuransi</label>
                                                            <fieldset class="form-group">
                                                                <select class="form-select input_asuransi"
                                                                    id="txasuransi">
                                                                </select>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">No Asuransi</label>
                                                            <input id="txasuransino" type="text"
                                                                class="form-control input_asuransi angka"
                                                                placeholder="No Asuransi" name="lname-column">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <button type="button" class="btn btn-success ms-1"
                                                                id="tmbhasnr"
                                                                onclick="(asuransiId == null) ? tambah_asuransi() : update_asuransi();">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block btnasnr">Tambah</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <button type="button" class="btn btn-danger ms-1"
                                                                id="warning" onclick="reset_form()">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block btncntct">Reset</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="table-responsive datatable-minimal">
                                                <table class="table" id="table_asuransi">
                                                    <thead>
                                                        <tr>
                                                            <th>Asuransi Id</th>
                                                            <th>No Asuransi</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="kontak" role="tabpanel"
                                            aria-labelledby="kontak-tab">
                                            <form action="#">
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="first-name-column">Nama</label>
                                                            <input id="txnama1" type="text"
                                                                class="form-control input_kontak" placeholder="Nama"
                                                                name="fname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Alamat</label>
                                                            <input id="txalamat1" type="text"
                                                                class="form-control input_kontak" placeholder="Alamat"
                                                                name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="first-name-column">Profesi</label>
                                                            <input id="txprofesi" type="text"
                                                                class="form-control input_kontak" placeholder="Profesi"
                                                                name="fname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Hubungan</label>
                                                            <input id="txhubungan" type="text"
                                                                class="form-control input_kontak" placeholder="Hubungan"
                                                                name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Phone</label>
                                                            <input id="txphone1" type="text"
                                                                class="form-control input_kontak angka"
                                                                placeholder="Phone" name="lname-column">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <button type="button" class="btn btn-success ms-1"
                                                                id="tmbhcntc"
                                                                onclick="(kontakId == null) ? tambah_contact() : update_contact();">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block btncntc">Tambah</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <button type="button" class="btn btn-danger ms-1"
                                                                id="warning" onclick="reset_form()">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block btncntct">Reset</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="table-responsive datatable-minimal">
                                                <table class="table" id="table_kontak">
                                                    <thead>
                                                        <tr>
                                                            <th>Nama</th>
                                                            <th>Alamat</th>
                                                            <th>Provesi</th>
                                                            <th>Hubungan</th>
                                                            <th>Phone</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>


                                        <div class="tab-pane fade" id="pendidikan" role="tabpanel"
                                            aria-labelledby="pendidikan-tab">
                                            <form action="#">
                                                <div class="row">
                                                    <div class="col-md-3 col-12">
                                                        <div class="form-group">
                                                            <label for="first-name-column">Jenjang</label>
                                                            <input id="txjenjang" type="text"
                                                                class="form-control input_pendididikan"
                                                                placeholder="Jenjang" name="fname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Instansi</label>
                                                            <input id="txinstansi" type="text"
                                                                class="form-control input_pendididikan"
                                                                placeholder="Instansi" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Jurusan</label>
                                                            <input id="txjurusan" type="text"
                                                                class="form-control input_pendididikan"
                                                                placeholder="Jurusan" name="lname-column">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3 col-12">
                                                        <div class="form-group">
                                                            <label for="last-name-column">Tahun Lulus</label>
                                                            <input id="txlulus" type="text"
                                                                class="form-control input_pendididikan"
                                                                placeholder="Tahun Lulus" name="lname-column">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <button type="button" class="btn btn-success ms-1"
                                                                id="tmbhpen"
                                                                onclick="(pendidikanId == null) ? tambah_pendidikan() : update_pendidikan();">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block btnpen">Tambah</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group">
                                                            <button type="button" class="btn btn-danger ms-1"
                                                                id="warning" onclick="reset_form()">
                                                                <i class="bx bx-check d-block d-sm-none"></i>
                                                                <span class="d-none d-sm-block btncntct">Reset</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </form>
                                            <div class="table-responsive datatable-minimal">
                                                <table class="table" id="table_pendidikan">
                                                    <thead>
                                                        <tr>
                                                            <th>Jenjang</th>
                                                            <th>Instansi</th>
                                                            <th>Jurusan</th>
                                                            <th>Tahun Lulus</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" onclick="btn_close()" data-bs-dismiss="modal">
                            <i class="bx bx-x d-block d-sm-none"></i>
                            <span class="btn-closed d-none d-sm-block ">Close</span>
                        </button>
                        <button type="button" class="btn btn-primary btn-submit ms-1" onclick="simpan_data()">
                            <i class="bx bx-check d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Submit</span>
                        </button>
                        <button type="button" class="btn btn-warning btn-editen ms-1" onclick="update_data()">
                            <i class="bx bx-check d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Update</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
<div class="card card-dta">
    <div class="card-header">
        <h5 class="card-title">
            Form Personal
        </h5>
        <button class="btn btn-success btn-add" onclick="openModal()" type="button"><i class="bi bi-plus-lg">
            </i>Add</button>
        <button class="btn btn-primary" id="refreshButton" onclick="load_data()">
            <i id="refreshIcon" class="bi bi-arrow-clockwise"></i>
            <span id="spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                style="display: none;"></span>
            Refresh
        </button>
        <button class="btn btn-warning" onclick="import_excel()">
            <i class="bi bi-download"></i>Import</button>
            <a class="btn btn-success" href="personal/exportExcel"><i class="fas fa-file-excel"></i> Export</a>
    </div>
    <div class="card-body">
        <div class="table-responsive datatable-minimal">
            <table class="table" id="table2">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Profile</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>
</section>
</div>
</div>
</section>
</div>
</section>
</div>
</div>


</body>

</html>