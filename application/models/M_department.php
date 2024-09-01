<?php
class M_department extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function insert_department($data) {
        return $this->db->insert('department', $data);
    }

    public function get_department_data() {
        $sql = "SELECT * FROM department
        JOIN division ON divisionId = departmentDivisionId
        WHERE departmentDelete = 0 ORDER BY departmentId DESC";
        $query = $this->db->query($sql);
        return $query->result();
    }
    public function delete_table($id) {
        $sql = "UPDATE department SET departmentDelete = 1 WHERE departmentId = '$id'";
        return $this->db->query($sql, array($id));
    }
    public function active_data($id) {
        $sql = "UPDATE department SET departmentActive = if(departmentActive = 1, 0, 1) WHERE departmentId='$id'";
        return $this->db->query($sql);
    }
}
?>