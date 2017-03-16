<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Jra extends REST_Controller {

	public function __construct(){
		parent:: __construct();
		$this->load->model(array('Jra_model'));
		$this->load->library('subquery');
 	}
 	public function daftar_get()
 	{
		$filter = $this->input->get('query', TRUE);
		$start = $this->input->get('start', TRUE);
		$limit = $this->input->get('limit', TRUE);

		$data = $this->Jra_model->daftar($filter,$limit,$start);
		
		$this->response($data);
 	}

 	public function klasifikasi_get()
 	{
 		$id_klasifikasi = $this->input->get('id_klasifikasi', TRUE);

 		$this->db->where('id',$id_klasifikasi);
        $query = $this->db->get('tr_jra');
        $result=$query->result();
		$this->response($result[0]);

 	}

	public function simpan_post()
	{ 	
		$data = $this->input->post();

            // `id`,  `kode`,  `klasifikasi`,  `active`,  `waktu_aktif`,  `waktu_inaktif`,  
            //LEFT(`keterangan`, 256),  `created_on`,  `created_by`,  `edited_on`,  `edited_by`,  `deleted_on`,  `deleted_by`

		$input['active'] = $data['active'];
		$input['kode'] = $data['kode'];
		$input['klasifikasi'] = $data['klasifikasi'];
		$input['waktu_aktif'] = $data['waktu_aktif'];
		$input['waktu_inaktif'] = $data['waktu_inaktif'];
		$input['keterangan'] = $data['keterangan'];
		$input['created_by'] = $this->session->userdata('username');

		$this->Jra_model->simpan($input);
		
		$respon['success'] = true;
		$this->response($respon);
	}
	public function update_post()
	{ 	
		$data = $this->input->post();

		$input['id'] = $data['id'];
		$input['active'] = $data['active'];
		$input['kode'] = $data['kode'];
		$input['klasifikasi'] = $data['klasifikasi'];
		$input['waktu_aktif'] = $data['waktu_aktif'];
		$input['waktu_inaktif'] = $data['waktu_inaktif'];
		$input['keterangan'] = $data['keterangan'];
		$input['edited_by'] = $this->session->userdata('username');
		$input['edited_on'] = date(' Y/m/d h:i:s');

		$this->Jra_model->update($input);

		$respon['success'] = true;
		$this->response($respon);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/inmail.php */