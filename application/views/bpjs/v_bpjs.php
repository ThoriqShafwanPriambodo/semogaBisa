<div class="page-content">
    <div class="modal modal-add fade" id="loginModal" tabindex="-1" aria-labelledby="myModalLabel33" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel33">Add Data</h4>
                    <button type="button" class="close btn-closed" data-bs-dismiss="modal" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <form action="#">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="first-name-column">Kode</label>
                                    <input type="text" id="txkode" class="form-control" name="fname-column">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="last-name-column">Nama</label>
                                    <input type="text" id="txnama" class="form-control" name="lname-column">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="city-column">Kelas</label>
                                    <fieldset class="form-group">
                                        <select class="form-select" id="txkelas">
                                            <option value="" disabled selected>Pilih kelas</option>
                                            <option value="Kelas 1">Kelas 1</option>
                                            <option value="Kelas 2">Kelas 2</option>
                                            <option value="Kelas 3">Kelas 3</option>
                                        </select>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="company-column">Total Tagihan</label>
                                    <input type="text" id="txtagihan" class="form-control" name="company-column">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="company-column">Ditanggung Perusahaan</label>
                                    <input type="number" class="form-control" name="bpjsCompPercent"
                                        id="bpjsCompPercent" 
                                        onkeyup="onmax(this, 100); onmin(this, 0); changecomp(this)">
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="email-id-column">Ditanggung Karyawan</label>
                                    <input type="number" class="form-control" name="bpjsEmplPercent"
                                        id="bpjsEmplPercent"
                                        onkeyup="onmax(this, 100); onmin(this, 0); changeemp(this)">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                                    <i class="bx bx-x d-block d-sm-none"></i>
                                    <span class="btn-closed d-none d-sm-block ">Close</span>
                                </button>
                                <button type="button" class="btn btn-primary btn-submit ms-1" onclick="simpen_data()">
                                    <i class="bx bx-check d-block d-sm-none"></i>
                                    <span class="d-none d-sm-block">Submit</span>
                                </button>
                                <button type="button" class="btn btn-warning btn-editen ms-1" onclick="editkuy()">
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
<div class="card card-dta">
    <div class="card-header">
        <h5 class="card-title">
            Form Bpjs
        </h5>
        <button class="btn btn-success btn-add" data-bs-toggle="modal" data-bs-target="#loginModal"><i
                class="bi bi-plus-lg"> </i>Add</button>
        <button class="btn btn-primary" onclick="load_data()"><i class="bi bi-arrow-clockwise"> </i>Refresh</button>

    </div>
    <div class="card-body">
        <div class="table-responsive datatable-minimal">
            <table class="table" id="table4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Kelas</th>
                        <th>Total Tagihan</th>
                        <th>Persen Perusahaan</th>
                        <th>Persen Karyawan</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($bpjs as $bs): ?>

                    <?php endforeach; ?>
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