<?php
class m_personal extends CI_Model {
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function insert_personal($data) {    
        return $this->db->insert('employee', $data);
    }

    public function get_personal_data() {
        $sql = "SELECT * FROM employee WHERE employeeActive = 1 ORDER BY employeeId DESC";
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function delete_data($id) {
        $sql = "UPDATE employee SET employeeDelete = 1 WHERE employeeId = '$id'";
        return $this->db->query($sql, array($id));
    }
}
?>