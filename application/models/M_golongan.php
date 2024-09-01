<?php
class m_golongan extends CI_Model {
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function insert_golongan($data) {    
        return $this->db->insert('levelgroup', $data);
    }

    public function get_golongan_data() {
        $sql = "SELECT * FROM levelgroup WHERE levelgroupDelete = 0 ORDER BY levelgroupId DESC";
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function delete_data($id) {
        $sql = "UPDATE levelgroup SET levelgroupDelete = 1 WHERE levelgroupId = '$id'";
        return $this->db->query($sql, array($id));
    }

    public function active_data($id) {
        $sql = "UPDATE levelgroup SET levelgroupActive = if(levelgroupActive = 1, 0, 1) WHERE levelgroupId='$id'";
        return $this->db->query($sql);
    }
}
?>