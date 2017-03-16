<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Login extends REST_Controller {

	public function __construct(){
		parent:: __construct();
		$this->load->model(array('login_model'));
		$this->load->library('session');
		$this->load->library('subquery');
 	}
 	public function index_get()
 	{
		$user = array(
			'id'=>$this->session->userdata('id'),
			'username'=>$this->session->userdata('username'),
			'nama_lengkap'=>$this->session->userdata('nama_lengkap'),
			'type'=>$this->session->userdata('role'),
			'kode_jabatan'=>$this->session->userdata('kode_jabatan'),
			'jabatan'=>$this->session->userdata('jabatan'),
			'id_jabatan'=>$this->session->userdata('id_jabatan'),
			'jabatan_atasan'=>$this->session->userdata('jabatan_atasan'),
			'kode_jabatan_atasan'=>$this->session->userdata('kode_jabatan_atasan'),
			'id_atasan'=>$this->session->userdata('id_atasan'),
			//'id_unker'=>$this->session->userdata('id_unker'),
			'kode_unker'=>$this->session->userdata('kode_unker')
			);


		if ($this->session->userdata('username') == false){
			$data = array('success' => false);
		}else{
			$data = array('success' => true, 'user'=>$user);
		}
		//var_dump($data);
		$this->response($data);

 	}
 	public function index_post()
 	{
		
 		$uname = $this->input->post('username');
 		$passwd = $this->input->post('passwd');
		$user = $this->login_model->get_uname($uname);
		//$id_user = 
	 	$aUser = $user->result_array();
	 	//var_dump($aUser);
 		if (count($aUser) > 0){
 			$user = $this->login_model->get_uname($uname);
	 		$aUser = $user->result_array();
	 		//var_dump($aUser);
	 		$dbuname = $aUser[0]['username'];
	 		$dbpasswd = $aUser[0]['passwd'];

	 		if ($dbpasswd === $passwd){
				
				$this->session->set_userdata('id', $aUser[0]['id']);
				$this->session->set_userdata('username', $aUser[0]['username']);
				$this->session->set_userdata('nama_lengkap', $aUser[0]['fullname']);
				$this->session->set_userdata('role', $aUser[0]['type']);
				$this->session->set_userdata('kode_jabatan', $aUser[0]['kode_jabatan']);
				$this->session->set_userdata('jabatan', $aUser[0]['jabatan']);
				$this->session->set_userdata('jabatan_atasan', $aUser[0]['jabatan_atasan']);
				$this->session->set_userdata('kode_jabatan_atasan', $aUser[0]['kode_jabatan_atasan']);
				$this->session->set_userdata('id_jabatan', $aUser[0]['id_jabatan']);
				$this->session->set_userdata('id_atasan', $aUser[0]['id_atasan']);
				//$this->session->set_userdata('id_unker', $aUser[0]['id_unker']);
				$this->session->set_userdata('kode_unker', $aUser[0]['kode_unker']);

				$this->login_model->update($aUser[0]['id']);
				$this->login_model->log($aUser[0]['username'],$this->session->all_userdata(),'Login success');

				$this->index_get();

				//$data = array('success' => true);
	 		}else{
				$data = array('success' => false);
	 		}
 		}else{
 			$data = array('success' => false);
 		}
 		//var_dump($data);
		$this->response($data);
 	}
 	
 	/*public function check_post()
 	{
 		$data = array('success' => true);
 		$this->response($data);
 	}*/

 	public function logout_get(){
 		$this->login_model->log($this->session->userdata('username'),$this->session->all_userdata(),'Logout');
 		$this->session->sess_destroy();
 		$this->response(array('success' => true));
 	}

 	public function chpassword_post(){
 		/*oldpass:
		newpass:
		newpass2:*/
		$user = $this->login_model->get_uname($this->session->userdata('username'));
	 	$aUser = $user->result_array();
	 	if ($aUser[0]['passwd'] === $this->input->post('oldpass')){
	 		
			$data = $this->input->post();

			$input['id'] = $aUser[0]['id'];
			$input['passwd'] = $this->input->post('newpass');
			$input['edited_by'] = $this->session->userdata('username');
			$input['edited_on'] = date(' Y/m/d h:i:s');

			$this->login_model->chpassword($input);

			$this->response(array('success' => true));

	 	}else{
			$this->response(array('success' => false,'error'=>'Password lama tidak sama'));
	 	}

 		//$this->response(array('success' => true));
 	}

	
}

/* End of file welcome.php */
/* Location: ./application/controllers/inmail.php */