<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Bpjs extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_bpjs');
    }

    public function index()
    {
        $data['title'] = 'Bpjs';
        $data['bpjs'] = $this->m_bpjs->get_bpjs_data();
        $data['js'] = 'Bpjs';

        $this->load->view('header', $data);
        $this->load->view('bpjs/v_bpjs', $data);
        $this->load->view('footer', $data);
    }

    public function load_data()
    {
        $data['bpjs'] = $this->m_bpjs->get_bpjs_data();
        echo json_encode($data);
    }

    public function delete_table()
    {
        if ($this->m_bpjs->delete_data($this->input->post('id'))) {
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
            $kelas = $this->input->post('txkelas');
            $tagihan = $this->input->post('txtagihan');
            $perusahaan = $this->input->post('bpjsCompPercent');
            $karyawan = $this->input->post('bpjsEmplPercent');

            $query = $this->db->query("SELECT COUNT(*) as count FROM bpjs WHERE bpjsCode = '{$kode}'");
            $result = $query->row();

            if ($result->count > 0) {
                $res['status'] = 'error';
                $res['msg'] = "Code {$kode} sudah terpakai";
            } else {
                $sql = "INSERT INTO bpjs (bpjsClientId, bpjsCode, bpjsName, bpjsClass, bpjsTotalBill, bpjsCompPercent, bpjsEmplPercent, bpjsActive) VALUES (1,'{$kode}','{$nama}', '{$kelas}' ,'{$tagihan}','{$perusahaan}' ,'{$karyawan}', 1)";
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
        $sql = $this->db->query("SELECT * FROM bpjs WHERE bpjsId = ?", array($id));
        $result = $sql->row_array();
        if ($result > 0) {
            $res['status'] = 'ok';
            $res['data'] = $result;
            $res['msg'] = "Data {$id} sudah ada";
        } else {
            $res['status'] = 'error';
            $res['msg'] = "bpjs tidak ditemukan";
        }
        echo json_encode($res);
    }
    public function update_table()
    {
        $id = $this->input->post('id');
        $bpjsCode = $this->input->post('bpjsCode');
        $bpjsName = $this->input->post('bpjsName');
        $bpjsClass = $this->input->post('bpjsClass');
        $bpjsTotalBill = $this->input->post('bpjsTotalBill');
        $bpjsCompPercent = $this->input->post('bpjsCompPercent');
        $bpjsEmplPercent = $this->input->post('bpjsEmplPercent');

        $this->db->where('bpjsCode', $bpjsCode);
        $this->db->where('bpjsDelete', 0);
        $this->db->where_not_in('bpjsId', $id);
        $query_c = $this->db->get('bpjs');

        if ($query_c->num_rows() > 0) {
            $res['status'] = 'error';
            $res['msg'] = "Code sudah digunakan oleh data lain";
        } else {
            $this->db->where('bpjsId', $id);
            $update_data = array(
                'bpjsCode' => $bpjsCode,
                'bpjsName' => $bpjsName,
                'bpjsClass' => $bpjsClass,
                'bpjsTotalBill' => $bpjsTotalBill,
                'bpjsCompPercent' => $bpjsCompPercent,
                'bpjsEmplPercent' => $bpjsEmplPercent,
            );

            if ($this->db->update('bpjs', $update_data)) {
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
        if ($this->m_bpjs->activate_data($id)) {
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

}