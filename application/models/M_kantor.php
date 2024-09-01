<?php
class M_kantor extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }
    public function insert_branch($data)
    {
        return $this->db->insert('branch', $data);
    }
    public function get_kantor_data()
    {
        $sql = "SELECT * FROM branch WHERE branchDelete=0 ORDER BY branchID DESC";
        $query = $this->db->query($sql);
        return $query->result();
    }
    public function update_data($id, $data)
    {
        $this->db->where('id', $id);
        return $this->db->update('you', $data);
    }
    public function delete_data($id)
    {
        $sql = "UPDATE branch SET branchDelete = 1 WHERE branchId = '$id'";
        return $this->db->query($sql, array($id));
    }
    public function activate_data($id)
    {
        $sql = "UPDATE branch SET branchActive = if(branchActive = 1, 0, 1) WHERE branchId='$id'";
        return $this->db->query($sql);
    }

    public function pusat_data($id) {
        $sql = "UPDATE branch SET branchIsCenter = 0 WHERE branchIsCenter = 1";
        $this->db->query($sql);
        $sql = "UPDATE branch SET branchIsCenter = 1 WHERE branchId = '$id'";
        $this->db->query($sql, array($id));
        return $this->db->query($sql);
    }

}