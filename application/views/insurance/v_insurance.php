<div class="page-content">
<div class="modal modal-add fade" id="loginModal" tabindex="-1" aria-labelledby="myModalLabel33" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel33">Add Data</h4>
                    <buton type="button" class="close btn-closed" data-bs-dismiss="modal" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </buton>
                </div>
                <form action="#">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="first-name-column">Code</label>
                                    <input id="txcode" type="text" class="form-control" placeholder="Code"
                                        name="fname-column" maxlength="3">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Name</label>
                                    <input id="txname" type="text" class="form-control" placeholder="Nama"
                                        name="lname-column">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Id Asuransi</label>
                                    <input id="txid" type="text" class="form-control" placeholder="Id Asuransi"
                                        name="lname-column">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="city-column">Jenis Asuransi</label>
                                    <fieldset class="form-group">
                                        <select class="form-select" id="txasuransi">
                                            <option value="" disabled selected>Pilih Asuransi</option>
                                            <option value="Asuransi Jiwa">Asuransi Jiwa</option>
                                            <option value="Asuransi Kesehatan">Asuransi Kesehatan</option>
                                            <option value="Asuransi Pendidikan">Asuransi Pendidikan</option>
                                            <option value="Asuransi Investasi">Asuransi Investasi</option>
                                            <option value="Asuransi Kendaraan">Asuransi Kendaraan</option>
                                            <option value="Asuransi Kecelakaan">Asuransi Kecelakaan</option>
                                            <option value="Asuransi Korporasi">Asuransi Korporasi</option>
                                            <option value=" Asuransi Hari Tua"> Asuransi Hari Tua</option>
                                        </select>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="col-md-3 col-12">
                                <div class="form-group">
                                    <label for="city-column">Potongan Gaji</label>
                                    <fieldset class="form-group">
                                        <select class="form-select" id="txgaji">
                                            <option value="" disabled selected>Pilih Potongan</option>
                                            <option value="0">Tidak</option>
                                            <option value="1">Ya</option>
                                            <option value="2">Sebagian</option>
                                        </select>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="col-md-3 col-12">
                                <div class="form-group">
                                    <label for="country-floating">Total Tagihan</label>
                                    <input id="txtagihan" type="text" class="form-control angka" name="country-floating"
                                        placeholder="Total" maxlength="13" onkeypress="return inputangka(event)">
                                </div>
                            </div>
                            <div class="col-md-3 col-12">
                                <div class="form-group">
                                    <label for="company-column">Ditanggung Perusahaan</label>
                                    <input type="number" class="form-control" name="bpjsCompPercent"
                                        id="insuranceCompPercent" placeholder="Masukkan Berapa Persen" 
                                        onkeyup="onmax(this, 100); onmin(this, 0); changecomp(this)">
                                </div>
                            </div>
                            <div class="col-md-3 col-12">
                                <div class="form-group">
                                    <label for="email-id-column">Ditanggung Karyawan</label>
                                    <input type="number" class="form-control" name="bpjsEmplPercent"
                                        id="insuranceEmplPercent" placeholder="Masukkan Berapa Persen" 
                                        onkeyup="onmax(this, 100); onmin(this, 0); changeemp(this)">
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
                                <span class="d-none d-sm-block udt">Update</span>
                            </button>
                        </div>
                </form>
            </div>
        </div>
    </div>
</div>
    </div>
        <div class="card card-dta">
            <div class="card-header">
                <h5 class="card-title">
                    Form Insurance
                </h5>
                <button class="btn btn-success btn-add" data-bs-toggle="modal" data-bs-target="#loginModal"><i class="bi bi-plus-lg"> </i>Add</button>
                <button class="btn btn-primary" onclick="load_data()" ><i class="bi bi-arrow-clockwise"> </i>Refresh</button>
            </div>
                <div class="card-body">
                <div class="table-responsive datatable-minimal">
                    <table class="table" id="table2">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Total Bill</th>
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