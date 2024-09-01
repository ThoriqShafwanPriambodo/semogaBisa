<?php
class M_insurance extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function insert_bank($data) {
        return $this->db->insert('insurance', $data);
    }

    public function get_insurance_data() {
        //$query = $this->db->get_WHERE('bank',['bankDelete' => 0]);
        $sql = "SELECT * FROM insurance WHERE insuranceDelete = 0 order by insuranceId desc; ";
        $query = $this->db->query($sql);
        
        return $query->result();
    }
    public function delete_table($id) {
        $sql = "UPDATE insurance SET insuranceDelete = 1 WHERE insuranceId = '$id'";
        return $this->db->query($sql, array($id));
    }
    public function active_data($id) {
        $sql = "UPDATE insurance SET insuranceActive = if(insuranceActive = 1, 0, 1) WHERE insuranceId='$id'";
        return $this->db->query($sql);
    }
}
?>