<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Insurance extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_insurance');
    }

	public function index()
	{
        $data['title'] = 'Insurance';
        $data['insurance'] = $this->m_insurance->get_insurance_data();
        $data['js'] = 'insurance';

		$this->load->view('header', $data);
        $this->load->view('insurance/v_insurance', $data);
        $this->load->view('footer', $data);
	}
    public function load_data(){
        $data['insurance'] = $this->m_insurance->get_insurance_data();
        echo json_encode($data);
    }
    public function create() {
        if ($this->input->post('txcode') != '') {
            
            $code = $this->input->post('txcode');
            $name = $this->input->post('txname');
            $id = $this->input->post('txid');
            $asuransi = $this->input->post('txasuransi');
            $gaji = $this->input->post('txgaji');
            $tagihan = $this->input->post('txtagihan');
            $comp = $this->input->post('insuranceCompPercent');
            $empl = $this->input->post('insuranceEmplPercentPercent');
    
            $query_code = $this->db->query("SELECT COUNT(*) as count FROM insurance WHERE insuranceCode = '{$code}'");
            $result_code = $query_code->row();

            $query_No = $this->db->query("SELECT COUNT(*) as count FROM insurance WHERE insuranceId = '{$id}'");
            $result_email = $query_No->row();
    
            if ($result_code->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Code {$code} sudah terpakai";
            }elseif ($result_email->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Email {$id} sudah terpakai";
            } else {
                $sql = "INSERT INTO insurance (insuranceClientId,insuranceEmployeeId,insuranceCode, insuranceName, insuranceNo, insuranceType, insuranceSalaryCut, insuranceTotalBill, insuranceCompPersen, insuranceEmplPersen, insuranceActive) VALUES 
                (1,0,'{$code}','{$name}', '{$id}' ,'{$asuransi}','{$gaji}' ,'{$tagihan}' ,'{$comp}' ,'{$empl}', 1)";
                $exc = $this->db->query($sql);
    
                if ($exc) {
                    $res['status'] = 'success';
                    $res['msg'] = "Simpan data {$name} berhasil";

                } else {
                    $res['status'] = 'error';
                    $res['msg'] = "Simpan data {$name} gagal";
                }
            }
            echo json_encode($res);
        }
    }
    public function edit_table()
    {
        $id = $this->input->post('id');
        $sql = $this->db->query("SELECT * FROM insurance WHERE insuranceId = ?", array($id));
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
    public function update_table() {
        $id = $this->input->post('id'); 
        $insuranceCode = $this->input->post('insuranceCode');
        $insuranceName = $this->input->post('insuranceName');
        $insuranceNo = $this->input->post('insuranceNo');
        $insuranceType = $this->input->post('insuranceType');
        $insuranceSalaryCut = $this->input->post('insuranceSalaryCut');
        $insuranceTotalBill = $this->input->post('insuranceTotalBill');
        $insuranceCompPersen = $this->input->post('insuranceCompPersen');
        $insuranceEmplPersen = $this->input->post('insuranceEmplPersen');
    
        $this->db->where('insuranceCode', $insuranceCode);
        $this->db->where_not_in('insuranceId', $id);
        $query_code = $this->db->get('insurance');

        $this->db->where('insuranceNo', $insuranceNo);
        $this->db->where_not_in('insuranceId', $id);
        $query_No = $this->db->get('insurance');
    
        if ($query_code->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Code {$insuranceCode} sudah digunakan oleh data lain";
        }elseif ($query_No->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "No {$insuranceNo} sudah digunakan oleh data lain";
        }else {
            $this->db->where('insuranceId', $id);
            $update_data = array(
                'insuranceCode' => $insuranceCode,
                'insuranceName' => $insuranceName,
                'insuranceNo' => $insuranceNo,
                'insuranceType' => $insuranceType,
                'insuranceSalaryCut' => $insuranceSalaryCut,
                'insuranceTotalBill' => $insuranceTotalBill,
                'insuranceCompPersen' => $insuranceCompPersen,
                'insuranceEmplPersen' => $insuranceEmplPersen
            );
    
            if ($this->db->update('insurance', $update_data)) {
                $res['status'] = 'success';
                $res['msg'] = "Data berhasil diperbarui";
            } else {
                $res['status'] = 'error';
                $res['msg'] = "Gagal memperbarui data";
            }
        }
    
        echo json_encode($res);
    }
    
    public function delete_table() {
        $id = $this->input->post("id");
         if($this->m_insurance->delete_table($id)) {
            $res['status'] = 'success';
            $res['msg'] = 'Data Berhasil dihapus';
         } else {
            $res['status'] = 'error';
            $res['msg'] = 'Data Gagagl dihapus';
         }
         echo json_encode($res);
    }

    public function active() {
        $id = $this->input->post("id");
        $status = $this->input->post("status");
        if ($this->m_insurance->active_data($id)) {
            $res["status"] = "success";
            $ket=($status == 1)? "Nonaktif" : "Aktif";
            $res["msg"] = "Data berhasil ". $ket;
        } else {
            $res["status"] = "error";
            $ket=($status == 1)? "Nonaktif" : "Aktif";
            $res["msg"] = "Data Gagal ". $ket;
        }
        echo json_encode($res);
    }
}
