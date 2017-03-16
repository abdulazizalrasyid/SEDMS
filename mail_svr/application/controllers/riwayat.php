<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Riwayat extends REST_Controller {

	public function __construct(){
		parent:: __construct();

 	}
 	public function daftar_get()
 	{
		$uniquecode = $this->input->get('uniquecode', TRUE);
		$limit = $this->input->get('limit', TRUE);
		$start = $this->input->get('start', TRUE);

        $this->db->where('uniquecode',$uniquecode);
        $total = $this->db->count_all_results('log_surat');         

        $this->db->where('uniquecode',$uniquecode);
        $this->db->limit($limit, $start);
        $query = $this->db->get('log_surat');

        $data = array('data'=>$query->result(),'total'=>$total);

		$this->response($data);
 	}

 	
}

/* End of file welcome.php */
/* Location: ./application/controllers/inmail.php */