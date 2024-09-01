<div class="page-content">
    <div class="modal modal-add fade" id="loginModal" tabindex="-1" aria-labelledby="myModalLabel33" aria-hidden="true">
        <div class="modal-dialog modal-m">
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
                            <div class="col-md-12 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Kode</label>
                                    <input type="text" id="txkode" class="form-control" placeholder="Kode" name="lname-column">
                                </div>
                            </div>
                            <div class="col-md-12 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Nama</label>
                                    <input type="text" id="txnama" class="form-control" placeholder="Nama" name="lname-column">
                                </div>
                            </div>
                            <div class="col-md-12 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Nominal</label>
                                    <input type="text" class="form-control inputnumeric angka des" name="levelgroupAmount" onkeyup="divide()" placeholder="Nominal" id="txnominal">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Total Hari Dibayar</label>
                                    <input type="text" class="form-control inputnumeric" name="levelgroupDivide" onkeyup="divide()" placeholder="Total Hari Dibayar" id="txtotal">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Nominal/Hari</label>
                                    <input type="text" class="form-control inputnumeric" name="levelgroupNominal" readonly id="txhari">
                                </div>
                            </div>
                            <div class="col-md col-12">
                                <div class="form-group">
                                    <label for="city-column">Setengah Hari</label>
                                    <fieldset class="form-group">
                                        <select class="form-select" id="txsetengah" name="levelgroupHalfDay" onchange="cekIsHalf()">
                                            <option value="" disabled selected>
                                            </option>
                                            <option value="1">Digaji</option>
                                            <option value="0">Tidak Digaji</option>
                                        </select>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="col-md col-12">
                                <div class="form-group">
                                    <label for="city-column">Persen/Amount</label>
                                    <fieldset class="form-group">
                                        <select class="form-select" id="txpersen" name="levelgroupHalfPercent" onchange="pokok()">
                                            <option value="" disabled selected>
                                            </option>
                                            <option value="1">Persen</option>
                                            <option value="0">Amount</option>
                                        </select>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="col-md-5 col-12">
                                <div class="form-group">
                                    <label for="last-name-column" id="labelPokok"> Pokok/Hari</label>
                                    <input type="text" id="txpokok" class="form-control" name="levelgroupHalfAmount">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                                    <i class="bx bx-x d-block d-sm-none"></i>
                                    <span class="btn-closed d-none d-sm-block ">Close</span>
                                </button>
                                <button type="button" onclick="simpan_data()" class="btn btn-primary btn-submit ms-1">
                                    <i class="bx bx-check d-block d-sm-none"></i>
                                    <span class="d-none d-sm-block">Simpan</span>
                                </button>
                                <button type="button" onclick="update_data()" class="btn btn-primary btn-editen ms-1">
                                    <i class="bx bx-check d-block d-sm-none"></i>
                                    <span class="d-none d-sm-block">Update</span>
                                </button>
                            </div>
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
            Form Golongan
        </h5>
        <button class="btn btn-success btn-add" data-bs-toggle="modal" data-bs-target="#loginModal"><i
                class="bi bi-plus-lg"> </i>Add</button>
        <button class="btn btn-primary" id="refreshButton" onclick="load_data()">
            <i id="refreshIcon" class="bi bi-arrow-clockwise"></i>
            <span id="spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                style="display: none;"></span>
            Refresh
        </button>
    </div>
    <div class="card-body">
        <div class="table-responsive datatable-minimal">
            <table class="table" id="table2">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Nominal</th>
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