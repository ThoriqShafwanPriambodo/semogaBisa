<?php
class M_bank extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function insert_bank($data) {
        return $this->db->insert('bank', $data);
    }

    public function get_bank_data() {
        //$query = $this->db->get_where('bank', ['bankDelete'=>0]);
        $sql = "SELECT * FROM bank WHERE bankDelete=0 order by bankId desc";
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function delete_data($id) {
        $sql = "UPDATE bank SET bankDelete = 1 WHERE bankId = '$id'";
        return $this->db->query($sql, array($id));
    }

    public function activate_data($id){
        $sql = "UPDATE bank SET bankActive = if(bankActive = 1, 0, 1) WHERE bankId='$id'";
        return $this->db->query($sql, array($id));
    }
}
?>
