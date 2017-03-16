<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Jdisposisi extends REST_Controller {

	public function __construct(){
		parent:: __construct();
		$this->load->model(array('jdisposisi_model'));
		$this->load->library('subquery');
 	}
 	public function daftar_get()
 	{
		$filter = $this->input->get('query', TRUE);
		$start = $this->input->get('start', TRUE);
		$limit = $this->input->get('limit', TRUE);

		$data = $this->jdisposisi_model->daftar_jdisposisi($filter,$limit,$start);
		
		$this->response($data);
 	}

	public function simpan_post()
	{ 	
		$data = $this->input->post();
//`id`,  `disposisi`,  `active`,  `created_by`,  `created_on`,  `deleted_by`,  `deleted_on`
		$input['active'] = $data['active'];
		$input['disposisi'] = $data['disposisi'];
		$input['created_by'] = $this->session->userdata('username');

		$this->jdisposisi_model->simpan($input);
		
		$respon['success'] = true;
		$this->response($respon);
	}
	public function update_post()
	{ 	
		$data = $this->input->post();

		$input['id'] = $data['id'];
		$input['active'] = $data['active'];
		$input['disposisi'] = $data['disposisi'];
		$input['edited_by'] = $this->session->userdata('username');
		$input['edited_on'] = date(' Y/m/d h:i:s');

		$this->jdisposisi_model->update($input);

		$respon['success'] = true;
		$this->response($respon);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/inmail.php */