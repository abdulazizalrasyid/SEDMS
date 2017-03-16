<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Unker extends REST_Controller {

	public function __construct(){
		parent:: __construct();
		$this->load->model(array('unker_model'));
		$this->load->library('subquery');
 	}
 	public function daftar_get()
 	{
		$filter = $this->input->get('query', TRUE);
		$start = $this->input->get('start', TRUE);
		$limit = $this->input->get('limit', TRUE);

		$data = $this->unker_model->daftar_unker($filter,$limit,$start);
		
		$this->response($data);
 	}

	public function simpan_post()
	{ 	
		$data = $this->input->post();

		$input['active'] = $data['active'];
		$input['id_atasan'] = $data['id_atasan'];
		$input['jabatan'] = $data['jabatan'];
		$input['kode_jabatan'] = $data['kode_jabatan'];
		$input['created_by'] = $this->session->userdata('username');

		$this->unker_model->simpan($input);
		
		$respon['success'] = true;
		$this->response($respon);
	}
	public function update_post()
	{ 	
		$data = $this->input->post();

		$input['id'] = $data['id'];
		$input['active'] = $data['active'];
		$input['id_atasan'] = $data['id_atasan'];
		$input['jabatan'] = $data['jabatan'];
		$input['kode_jabatan'] = $data['kode_jabatan'];
		$input['edited_by'] = $this->session->userdata('username');
		$input['edited_on'] = date(' Y/m/d h:i:s');

		$this->unker_model->update($input);

		$respon['success'] = true;
		$this->response($respon);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/inmail.php */