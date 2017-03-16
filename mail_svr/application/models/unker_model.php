<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Unker_model extends CI_Model {

    function __construct()
    {
        parent::__construct();
    }
	
	function daftar_unker($filter,$limit,$start){
        
        $this->db->select('*');
        $this->db->from('tr_unker');
        $this->db->where('deleted_on',null);
        $this->db->like('unitkerja',$filter,'both');

        $total = $this->db->count_all_results(); 

        //$this->db->select('tu_surat.*,tr_jabatan.kode_jabatan,tr_jabatan.jabatan');
        $this->db->select('*');
        $this->db->from('tr_unker a');
        //$this->db->limit($limit, $start);
        $this->db->where('deleted_on',null);
        $this->db->like('unitkerja',$filter,'both');

 		/*$sub = $this->subquery->start_subquery('select');
        $sub->select('b.jabatan')->from('tr_jabatan b');
        $sub->where('b.id =  a.induk');
        $this->subquery->end_subquery('atasan');*/

        //$this->db->order_by("created_on", "desc");
        $this->db->order_by("a.id", "asc");
       //$this->db->join('tr_jabatan', 'tr_jabatan.id = tu_surat.id_jabatan','left');
        $query = $this->db->get();

        return array('data'=>$query->result(),'total'=>$total);

        
    }

    function simpan($data){
        $this->db->insert('tr_jabatan', $data); 
        $respon['success'] = true;
        return $respon;
    }

    function update($data){
        $this->db->where('id', $data['id']);
        $this->db->update('tr_jabatan', $data); 
        $respon['success'] = true;
        return $respon;
    }
}