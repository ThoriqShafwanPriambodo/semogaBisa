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
                                    <label for="city-column">Departemen</label>
                                    <fieldset class="form-group">
                                        <select class="form-select" id="txdepartment" onchange="load_emp(this.value)">
                                        </select>
                                    </fieldset>
                                </div>
                                <div class="col-md-12 col-12">
                                    <div class="form-group">
                                        <label for="city-column">Atasan</label>
                                        <fieldset class="form-group">
                                            <select class="form-select" id="txatasan">
                                            </select>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="col-md-12 col-12">
                                    <div class="form-group">
                                        <label for="first-name-column">Kode</label>
                                        <input id="txcode" type="text" class="form-control" placeholder="Code"
                                            name="fname-column" maxlength="3">
                                    </div>
                                </div>
                                <div class="col-md-12 col-12">
                                    <div class="form-group">
                                        <label for="last-name-column">Nama</label>
                                        <input id="txname" type="text" class="form-control" placeholder="Nama"
                                            name="lname-column">
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" onclick="btn_close()"
                                    data-bs-dismiss="modal">
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
            Form Employment
        </h5>
        <button class="btn btn-success btn-add" data-bs-toggle="modal" data-bs-target="#loginModal"><i
                class="bi bi-plus-lg"> </i>Add</button>
        <button class="btn btn-primary" onclick="load_data()"><i class="bi bi-arrow-clockwise"> </i>Refresh</button>
    </div>
    <div class="card-body">
        <div class="table-responsive datatable-minimal">
            <table class="table" id="table2">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Department</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Atasan</th>
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