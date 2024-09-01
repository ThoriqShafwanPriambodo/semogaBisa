<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Kantor extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_kantor');
    }

    public function index()
    {
        $data['title'] = 'Kantor';
        $data['kantor'] = $this->m_kantor->get_kantor_data();
        $data['js'] = 'Kantor';

        $this->load->view('header', $data);
        $this->load->view('kantor/v_kantor', $data);
        $this->load->view('footer', $data);
    }
    public function load_data()
    {
        $data['kantor'] = $this->m_kantor->get_kantor_data();
        echo json_encode($data);
    }
    public function delete_table()
    {
        if ($this->m_kantor->delete_data($this->input->post('id'))) {
            $res['status'] = 'success';

            $res['msg'] = "Data berhasil dihapus";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "Gagal menghapus data";
        }

        echo json_encode($res);
    }
    public function create()
    {
        if ($this->input->post('txkode') != '') {

            $kode = $this->input->post('txkode');
            $nama = $this->input->post('txnama');
            $email = $this->input->post('txemail');
            $telp = $this->input->post('txtelp');
            $negara = $this->input->post('txnegara');
            $kota = $this->input->post('txkota');
            $alamat = $this->input->post('txalamat');

            $query = $this->db->query("SELECT COUNT(*) as count FROM branch WHERE branchCode = '{$kode}' OR branchEmail='{$email}' OR branchTelp='{$telp}'");
            $result = $query->row();

            if ($result->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Code {$kode}/ Email {$email}/ Telp {$telp} sudah terpakai";
            } else {
                $sql = "INSERT INTO branch (branchClientId, branchManagerEmployeeId, branchIsCenter, branchCode, branchName, branchEmail, branchTelp, branchRegion, branchCity, branchAddress, branchActive) VALUES (1,0,0,'{$kode}','{$nama}', '{$email}' ,'{$telp}','{$negara}' ,'{$kota}' ,'{$alamat}' , 1)";
                $exc = $this->db->query($sql);

                if ($exc) {
                    $res['status'] = 'success';
                    $res['msg'] = "Simpan data {$nama} berhasil";

                } else {
                    $res['status'] = 'error';
                    $res['msg'] = "Simpan data {$nama} gagal";
                }
            }
            echo json_encode($res);
        }
    }
    public function edit_table()
    {
        $id = $this->input->post('id');
        $sql = $this->db->query("SELECT * FROM branch WHERE branchId = ?", array($id));
        $result = $sql->row_array();
        if ($result > 0) {
            $res['status'] = 'ok';
            $res['data'] = $result;
            $res['msg'] = "Data {$id} sudah ada";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "branch tidak ditemukan";
        }
        echo json_encode($res);
    }
    public function update_table()
    {
        $id = $this->input->post('id');
        $branchCode = $this->input->post('branchCode');
        $branchName = $this->input->post('branchName');
        $branchEmail = $this->input->post('branchEmail');
        $branchTelp = $this->input->post('branchTelp');
        $branchRegion = $this->input->post('branchRegion');
        $branchCity = $this->input->post('branchCity');
        $branchAddress = $this->input->post('branchAddress');

        $this->db->where('branchCode', $branchCode);
        $this->db->where('branchDelete', 0);
        $this->db->where_not_in('branchId', $id);
        $query_c = $this->db->get('branch');

        $this->db->where('branchEmail', $branchEmail);
        $this->db->where('branchDelete', 0);
        $this->db->where_not_in('branchId', $id);
        $query_e = $this->db->get('branch');

        $this->db->where('branchTelp', $branchTelp);
        $this->db->where('branchDelete', 0);
        $this->db->where_not_in('branchId', $id);
        $query_t = $this->db->get('branch');

        if ($query_c->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Code sudah digunakan oleh data lain";
        } elseif ($query_e->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Email sudah digunakan oleh data lain";
        } elseif ($query_t->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Telp sudah digunakan oleh data lain";
        } else {
            $this->db->where('branchId', $id);
            $update_data = array(
                'branchCode' => $branchCode,
                'branchName' => $branchName,
                'branchEmail' => $branchEmail,
                'branchTelp' => $branchTelp,
                'branchRegion' => $branchRegion,
                'branchCity' => $branchCity,
                'branchAddress' => $branchAddress
            );

            if ($this->db->update('branch', $update_data)) {
                $res['status'] = 'success';
                $res['msg'] = "Data berhasil diperbarui";
            } else {
                $res['status'] = 'error';
                $res['msg'] = "Gagal memperbarui data";
            }
        }

        echo json_encode($res);
    }
    public function active()
    {
        $id = $this->input->post("id");
        $status = $this->input->post("status");
        if ($this->m_kantor->activate_data($id)) {
            $res["status"] = "success";
            $ket = ($status == 1) ? " Non-Aktif " : " Aktif";
            $res["msg"] = "Data berhasil" . $ket;
        } else {
            $res["status"] = "error";
            $ket = ($status == 0) ? " Non-Aktif" : " Aktif";
            $res["msg"] = "Data Gagal " . $ket;
        }
        echo json_encode($res);
    }

    public function pusat(){
        $id = $this->input->post("id");
        $pusat = $this->input->post("pusat"); 
        if ($this->m_kantor->pusat_data($id)) {
            $res["pusat"] = "success";
            $ket=($pusat == 1)? "Nonaktif" : "Aktif";
            $res["msg"] = "Data berhasil ". $ket;
        } else {
            $res["status"] = "error";
            $res["msg"] = "Data Gagal ";
        }
        echo json_encode($res);
    }

}