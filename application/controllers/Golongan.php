<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Golongan extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model(array('m_golongan'));
    }

    public function index()
    {
        $data['title'] = 'Golongan';
        $data['golongan'] = $this->m_golongan->get_golongan_data();
        $data['js'] = 'golongan';

        $this->load->view('header', $data);
        $this->load->view('golongan/v_golongan', $data);
        $this->load->view('footer', $data);
    }
    public function load_data()
    {
        $data['golongan'] = $this->m_golongan->get_golongan_data();
        echo json_encode($data);
    }

    public function create()
    {
        if ($this->input->post('txkode') != '') {

            $kode = $this->input->post('txkode');
            $nama = $this->input->post('txnama');
            $nominal = str_replace(",", "",$this->input->post('txnominal'));
            $total = $this->input->post('txtotal');
            $hari = str_replace(",", "",$this->input->post('txhari'));
            $setengah = $this->input->post('txsetengah');
            $persen = $this->input->post('txpersen');
            $pokok = str_replace(",", "",$this->input->post('txpokok'));


            $query = $this->db->query("SELECT COUNT(*) as count FROM levelgroup WHERE levelgroupCode = '{$kode}'");
            $result = $query->row();

            if ($result->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Kode {$kode} sudah terpakai";
            } else {
                $sql = "INSERT INTO levelgroup (levelgroupCode, levelgroupName, levelgroupAmount, levelgroupDivide, levelgroupNominal, levelgroupHalfDay, levelgroupHalfPercent, levelgroupHalfAmount) 
                VALUES ('{$kode}','{$nama}','{$nominal}','{$total}','{$hari}','{$setengah}','{$persen}','{$pokok}')";
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
        $sql = $this->db->query("SELECT * FROM levelgroup WHERE levelgroupId = ?", array($id));
        $result = $sql->row_array();
        if ($result > 0) {
            $res['status'] = 'ok';
            $res['data'] = $result;
            $res['msg'] = "Data {$id} sudah ada";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "Code tidak ditemukan";
        }
        echo json_encode($res);
    }
    public function update_table()
    {
        $id = $this->input->post('id');
        $levelgroupCode = $this->input->post('levelgroupCode');
        $levelgroupName = $this->input->post('levelgroupName');
        $levelgroupAmount = str_replace(",", "",$this->input->post('levelgroupAmount'));
        $levelgroupDivide = $this->input->post('levelgroupDivide');
        $levelgroupNominal = str_replace(",", "",$this->input->post('levelgroupNominal'));
        $levelgroupHalfDay = $this->input->post('levelgroupHalfDay');
        $levelgroupHalfPercent = $this->input->post('levelgroupHalfPercent');
        $levelgroupHalfAmount = str_replace(",", "",$this->input->post('levelgroupHalfAmount'));

        $this->db->where('levelgroupCode', $levelgroupCode);
        $this->db->where_not_in('levelgroupId', $id);
        $query_code = $this->db->get('levelgroup');


        if ($query_code->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Code {$levelgroupCode} sudah digunakan oleh data lain";
        } else {
            $this->db->where('levelgroupId', $id);
            $update_data = array(
                'levelgroupCode' => $levelgroupCode,
                'levelgroupName' => $levelgroupName,
                'levelgroupAmount' => $levelgroupAmount,
                'levelgroupDivide' => $levelgroupDivide,
                'levelgroupNominal' => $levelgroupNominal,
                'levelgroupHalfDay' => $levelgroupHalfDay,
                'levelgroupHalfPercent' => $levelgroupHalfPercent,
                'levelgroupHalfAmount' => $levelgroupHalfAmount,

            );

            if ($this->db->update('levelgroup', $update_data)) {
                $res['status'] = 'success';
                $res['msg'] = "Data berhasil diperbarui";
            } else {
                $res['status'] = 'error';
                $res['msg'] = "Gagal memperbarui data";
            }
        }

        echo json_encode($res);
    }

    public function delete_table()
    {
        if ($this->m_golongan->delete_data($this->input->post('id'))) {
            $res['status'] = 'success';

            $res['msg'] = "Data berhasil dihapus";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "Gagal menghapus data";
        }
        echo json_encode($res);
    }

    public function active() {
        $id = $this->input->post("id");
        $status = $this->input->post("status");
    
        // Determine the action based on the status
        if ($status == 1) {
            $action = "dinonaktifkan";
        } elseif ($status == 0) {
            $action = "diaktifkan";
        } else {
            $action = "unknown"; // Handle unexpected status values
        }
    
        // Execute the action
        $isSuccess = $this->m_golongan->active_data($id);
    
        // Set response based on the action result
        if ($isSuccess) {
            $res["status"] = "success";
            $res["msg"] = "Data berhasil " . $action;
        } else {
            $res["status"] = "error";
            $res["msg"] = "Data gagal " . $action;
        }
    
        echo json_encode($res);
    }    
}
