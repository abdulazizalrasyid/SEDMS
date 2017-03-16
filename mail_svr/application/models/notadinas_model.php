<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Notadinas_model extends CI_Model {

    function __construct()
    {
        parent::__construct();
    }

   function simpan($data){
        
        $save = $this->db->insert('tu_nota_dinas', $data); 
        $respon = array();
        $respon['success'] = $save;
        $respon['id'] = $this->db->insert_id();
        //var_dump($this->db->insert_id());
        //var_dump($respon);
        return $respon;
    }

    function simpan_filesurat($data){
        $this->db->insert('tu_nodinfile', $data); 
    }

}