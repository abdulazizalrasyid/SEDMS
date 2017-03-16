<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Jabatan extends REST_Controller {

	public function __construct(){
		parent:: __construct();
		$this->load->model(array('jabatan_model'));
		$this->load->library('subquery');
 	}
 	public function daftar_get()
 	{
		$filter = $this->input->get('query', TRUE);
		$start = $this->input->get('start', TRUE);
		$limit = $this->input->get('limit', TRUE);
		$id_pengguna = $this->input->get('id_pengguna', TRUE);

		$data = $this->jabatan_model->daftar_jabatan($filter,$limit,$start);
		
		$this->response($data);
 	}

	public function simpan_post()
	{ 	
		$data = $this->input->post();

		$input['active'] = $data['active'];
		$input['id_atasan'] = $data['id_atasan'];
		$input['jabatan'] = $data['jabatan'];
		$input['kode_jabatan'] = $data['kode_jabatan'];
		$input['kode_unker'] = $data['kode_unker'];
		$input['created_by'] = $this->session->userdata('username');

		$this->jabatan_model->simpan($input);
		
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
		$input['kode_unker'] = $data['kode_unker'];
		$input['edited_by'] = $this->session->userdata('username');
		$input['edited_on'] = date(' Y/m/d h:i:s');

		$this->jabatan_model->update($input);

		$respon['success'] = true;
		$this->response($respon);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/inmail.php */