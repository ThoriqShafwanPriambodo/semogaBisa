<?php
class M_bpjs extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }
    public function insert_bpjs($data)
    {
        return $this->db->insert('bpjs', $data);
    }
    public function get_bpjs_data()
    {
        $sql = "SELECT * FROM bpjs WHERE bpjsDelete=0 ORDER BY bpjsID DESC";
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
        $sql = "UPDATE bpjs SET bpjsDelete = 1 WHERE bpjsId = '$id'";
        return $this->db->query($sql, array($id));
    }
    public function activate_data($id)
    {
        $sql = "UPDATE bpjs SET bpjsActive = if(bpjsActive = 1, 0, 1) WHERE bpjsId='$id'";
        return $this->db->query($sql);
    }

}