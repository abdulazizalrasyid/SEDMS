<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Pengguna extends REST_Controller {

	public function __construct(){
		parent:: __construct();
		//$this->load->model(array('login_model'));
		$this->load->library('session');
		$this->load->library('subquery');
 	}


 	public function daftar_admin_get()
 	{
 		$filter = $this->input->get('query', TRUE);
		$start = $this->input->get('start', TRUE);
		$limit = $this->input->get('limit', TRUE);

		//$data = $this->pengguna_model->daftar($filter,$limit,$start);
		$this->db->select('*');
        $this->db->from('tu_pengguna');
        $this->db->where('deleted_on',null);

        $total = $this->db->count_all_results(); 

        $this->db->select('*');
        $this->db->from('tu_pengguna a');
        $this->db->limit($limit, $start);
        $this->db->where('deleted_on',null);

 		$sub = $this->subquery->start_subquery('select');
        $sub->select('b.jabatan')->from('tr_jabatan b');
        $sub->where('b.id =  a.id_jabatan');
        $this->subquery->end_subquery('jabatan');

        $this->db->order_by("login_terakhir", "desc");

        $query = $this->db->get();

        $data = array('data'=>$query->result(),'total'=>$total);
		
		$this->response($data);
 	}

	public function simpan_admin_post()
	{ 	
		$data = $this->input->post();

		$input['active'] = $data['active'];
		$input['username'] = $data['username'];
		$input['fullname'] = $data['fullname'];
		$input['type'] = $data['type'];
		
		if (!$data['id_jabatan']==''){
			$input['id_jabatan'] = $data['id_jabatan'];
		}

		if (! $data['passwd']==''){
			$input['passwd'] = $data['passwd'];
		}
		$input['passwd'] = $data['passwd'];
		$input['created_by'] = $this->session->userdata('username');
		$this->db->insert('tu_pengguna', $input); 

		
		$respon['success'] = true;
		$this->response($respon);
	}
	
	public function update_admin_post()
	{ 	
		$data = $this->input->post();

		$input['id'] = $data['id'];
		$input['active'] = $data['active'];
		$input['username'] = $data['username'];
		$input['fullname'] = $data['fullname'];
		$input['type'] = $data['type'];
		
		if (!$data['id_jabatan']==''){
			$input['id_jabatan'] = $data['id_jabatan'];
		}else if ($data['id_jabatan']==''){
			$input['id_jabatan'] = NULL;
		}

		if (! $data['passwd']==''){
			$input['passwd'] = $data['passwd'];
		}

		$input['edited_by'] = $this->session->userdata('username');
		$input['edited_on'] = date(' Y/m/d h:i:s');


		$this->db->where('id', $input['id']);
        $this->db->update('tu_pengguna', $input); 

		$respon['success'] = true;
		$this->response($respon);
	}

 	public function daftar_get()
 	{
		switch ($this->input->get('tipe_request')) {
		    case 'all':
		        $request = $this->input->get('query', TRUE);
				$start = $this->input->get('start', TRUE);
				$limit = $this->input->get('limit', TRUE);      

		        $this->db->select('tu_pengguna.*, tr_jabatan.id, tr_jabatan.kode_unker, tr_jabatan.jabatan, tr_jabatan.kode_jabatan, tr_jabatan.id_atasan');
		        $this->db->like('tr_jabatan.jabatan',$request,'both');
		        $this->db->where('kode_jabatan !=','OP');
		        $this->db->where('tu_pengguna.deleted_on',null);

		        $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_pengguna.id_jabatan', 'both');
		        $query = $this->db->get('tu_pengguna');
		        $aData = $query->result_array();

				$i=0;
				$data_jadi = array();
	            foreach ($aData as $value) {
	            	$data_jadi[$i]['active'] = $value['active'];
	            	$data_jadi[$i]['created_by'] = $value['created_by'];
	            	$data_jadi[$i]['created_on'] = $value['created_on'];
	            	$data_jadi[$i]['deleted_by'] = $value['deleted_by'];
	            	$data_jadi[$i]['deleted_on'] = $value['deleted_on'];
	            	$data_jadi[$i]['edited_by'] = $value['edited_by'];
	            	$data_jadi[$i]['edited_on'] = $value['edited_on'];
	            	$data_jadi[$i]['fullname'] = $value['fullname'];
	            	$data_jadi[$i]['fullname_plus_jab'] = $value['fullname']." (".$value['kode_jabatan'].")";
	            	$data_jadi[$i]['id'] = $value['id'];
	            	$data_jadi[$i]['id_atasan'] = $value['id_atasan'];
	            	$data_jadi[$i]['id_jabatan'] = $value['id_jabatan'];
	            	$data_jadi[$i]['jabatan'] = $value['jabatan'];
	            	$data_jadi[$i]['kode_jabatan'] = $value['kode_jabatan'];
	            	$data_jadi[$i]['kode_unker'] = $value['kode_unker'];
	            	$data_jadi[$i]['login_machine'] = $value['login_machine'];
	            	$data_jadi[$i]['login_terakhir'] = $value['login_terakhir'];
	            	$data_jadi[$i]['type'] = $value['type'];
	            	$data_jadi[$i]['username'] = $value['username'];

	            	$i=$i+1;
				}
				$this->response(array('data' => $data_jadi ));
		        break;

		    case 'penandatangan':
		       	$request = $this->input->get('query', TRUE);
				$start = $this->input->get('start', TRUE);
				$limit = $this->input->get('limit', TRUE);      

		        $this->db->select('tu_pengguna.*, tr_jabatan.id, tr_jabatan.kode_unker, tr_jabatan.jabatan, tr_jabatan.kode_jabatan, tr_jabatan.id_atasan');
		        $this->db->like('tr_jabatan.jabatan',$request,'both');
		        $this->db->where('kode_jabatan !=','OP');
		        $this->db->where('eselon <=','2');
		        $this->db->where('tu_pengguna.deleted_on',null);

		        $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_pengguna.id_jabatan', 'both');
		        $query = $this->db->get('tu_pengguna');

		        $data = array('data'=>$query->result());
				
				$this->response($data);
		        break;

		    
		    case 'bawahan':
		        
		        $start = $this->input->get('start', TRUE);
				$limit = $this->input->get('limit', TRUE);
				$request = $this->input->get('query', TRUE);
				$id_jabatan = $this->input->get('id_jabatan', TRUE);
    
		        $this->db->select('tu_pengguna.*, tr_jabatan.id, tr_jabatan.kode_unker, tr_jabatan.jabatan, tr_jabatan.kode_jabatan, tr_jabatan.id_atasan');
		        $this->db->like('tr_jabatan.jabatan',$request,'both');
		        //$this->db->where('kode_jabatan !=','staff');
		        $this->db->where('tr_jabatan.id_atasan',$id_jabatan);
		        $this->db->where('tu_pengguna.deleted_on',null);
		        $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_pengguna.id_jabatan', 'both');
		        $query = $this->db->get('tu_pengguna');

		        // $data = array('data'=>$query->result(),'total'=>$total);
		        $data = array('data'=>$query->result());
				$this->response($data);
		        break;
		   
		    case 'atasan':
			    $daftar_jabatan = array();
		        //$id_atasan = $this->input->get('id_jabatan', TRUE);
		        $id_atasan = $this->session->userdata('id_jabatan');
		        //var_dump($id_atasan);

		        $i=0;
		        while (! $id_atasan == 0 ):
		            
		            $this->db->select('tu_pengguna.*,  tr_jabatan.kode_unker, tr_jabatan.id AS id_jabatan, tr_jabatan.jabatan, tr_jabatan.kode_jabatan, tr_jabatan.id_atasan');
		            $this->db->where('tr_jabatan.id',$id_atasan);
		            $this->db->where('tu_pengguna.deleted_on',null);
		            $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_pengguna.id_jabatan', 'both');
		            $query = $this->db->get('tu_pengguna')->result_array();

		            //var_dump($query);

		            $id_atasan =  $query[0]['id_atasan'];

		            $daftar_jabatan[$i]['id']=$query[0]['id'];
		            $daftar_jabatan[$i]['kode_jabatan']=$query[0]['kode_jabatan'];
		            $daftar_jabatan[$i]['jabatan']=$query[0]['jabatan'];
		            $daftar_jabatan[$i]['id_atasan']=$query[0]['id_atasan'];
		            $daftar_jabatan[$i]['id_jabatan']=$query[0]['id_jabatan'];
		            $daftar_jabatan[$i]['kode_unker']=$query[0]['kode_unker'];

		            $i=$i+1;

		        endwhile;
		        $this->response($daftar_jabatan);
			    $data['success'] = true;
		        break;
		    //atasan untuk nota dinas
		    
		    /*-----------------------------------------
				daftar bawahan untuk tujuan nota dinas 
		    -------------------------------------------*/
		    case 'bawahan_2':
			    $daftar_jabatan = array();

		        //$id_atasan = $this->session->userdata('id_atasan');
		       	//$id_jabatan = $this->session->userdata('id_jabatan');
		        $id_jabatan = $this->input->get('id_jabatan', TRUE);
		        //$id_atasan = $this->input->get('id_atasan', TRUE);

		        //get_atasan

				$query = $this->db->query('SELECT kode_jabatan,id_atasan FROM tr_jabatan WHERE id='.$id_jabatan);
				foreach ($query->result_array() as $row)
				{
				   $id_atasan = $row['id_atasan'];
				   $kode_jabatan = $row['kode_jabatan'];
				}

				//var_dump($kode_jabatan);

				
		        $this->db->select('tu_pengguna.fullname, tr_jabatan.id, tr_jabatan.kode_unker, tr_jabatan.jabatan, tr_jabatan.kode_jabatan,tr_jabatan.id_atasan');
	            //$this->db->where('tr_jabatan.id_atasan',$id_atasan);
	            $this->db->where('tr_jabatan.id',$id_atasan);
	            //$this->db->where('tu_pengguna.type','pengguna');
	            $this->db->where('tu_pengguna.deleted_on',null);
	            $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_pengguna.id_jabatan', 'both');
	            $query = $this->db->get('tu_pengguna')->result_array();

	            $i=0;
	            foreach ($query as $value) {
		            $daftar_jabatan[$i]['id']=$value['id'];
		            $daftar_jabatan[$i]['kode_jabatan']=$value['kode_jabatan'];
		            $daftar_jabatan[$i]['fullname']=$value['fullname'];
		            $daftar_jabatan[$i]['jabatan']=$value['jabatan'];
		            $daftar_jabatan[$i]['jabatan_nama']=$value['fullname']." (".$value['kode_jabatan'].")";
		            $daftar_jabatan[$i]['id_atasan']=$value['id_atasan'];
		            $daftar_jabatan[$i]['kode_unker']=$value['kode_unker'];
		            $i=$i+1;
	        	}

	            $this->db->select('tu_pengguna.fullname, tr_jabatan.id, tr_jabatan.kode_unker, tr_jabatan.jabatan, tr_jabatan.kode_jabatan,tr_jabatan.id_atasan');
	            //$this->db->where('tr_jabatan.id_atasan',$id_atasan);
	            if ($kode_jabatan == 'SU' || $kode_jabatan == 'D1' || $kode_jabatan == 'D2' || $kode_jabatan == 'D3'){
	            	$this->db->where('tr_jabatan.id_atasan',$id_atasan);
	            }else{
	            	$this->db->where('left(tr_jabatan.kode_jabatan,1) =',substr($kode_jabatan,0,1));
	            	//var_dump($kode_jabatan);
	            	$this->db->where('length(tr_jabatan.kode_jabatan) =',strlen($kode_jabatan));
	            }
	            $this->db->where('tr_jabatan.id !=',$id_jabatan);
	            //$this->db->where('tu_pengguna.type','pengguna');
	            $this->db->where('tu_pengguna.deleted_on',null);
	            $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_pengguna.id_jabatan', 'both');
	            $query = $this->db->get('tu_pengguna')->result_array();

	            foreach ($query as $value) {
	            	$daftar_jabatan[$i]['id']=$value['id'];
		            $daftar_jabatan[$i]['kode_jabatan']=$value['kode_jabatan'];
		            $daftar_jabatan[$i]['fullname']=$value['fullname'];
		            $daftar_jabatan[$i]['jabatan']=$value['jabatan'];
		            $daftar_jabatan[$i]['jabatan_nama']=$value['fullname']." (".$value['kode_jabatan'].")";
		            $daftar_jabatan[$i]['id_atasan']=$value['id_atasan'];
		            $daftar_jabatan[$i]['kode_unker']=$value['kode_unker'];
		            $i=$i+1;
				}
	            
	            $this->db->select('tu_pengguna.fullname, tr_jabatan.id, tr_jabatan.kode_unker, tr_jabatan.jabatan, tr_jabatan.kode_jabatan,tr_jabatan.id_atasan');
	            $this->db->where('tr_jabatan.id_atasan',$id_jabatan);
	            //$this->db->where('tu_pengguna.type','pengguna');
	            $this->db->where('tu_pengguna.deleted_on',null);
	            $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_pengguna.id_jabatan', 'both');
	            $query = $this->db->get('tu_pengguna')->result_array();

	           	foreach ($query as $value) {
	            	$daftar_jabatan[$i]['id']=$value['id'];
		            $daftar_jabatan[$i]['kode_jabatan']=$value['kode_jabatan'];
		            $daftar_jabatan[$i]['fullname']=$value['fullname'];
		            $daftar_jabatan[$i]['jabatan']=$value['jabatan'];
		            $daftar_jabatan[$i]['jabatan_nama']=$value['fullname']." (".$value['kode_jabatan'].")";
		            $daftar_jabatan[$i]['id_atasan']=$value['id_atasan'];
		            $daftar_jabatan[$i]['kode_unker']=$value['kode_unker'];
		            $i=$i+1;
				}

		        $this->response($daftar_jabatan);
			    $data['success'] = true;
		        break;
		        /*---------------------------------------
		        daftar rekan kerja untuk tujuan disposisi
				-----------------------------------------*/
		        case 'bawahan_3':
			    
			    $daftar_jabatan = array();
	            $i=0;

		        $id_atasan = $this->session->userdata('id_atasan');
		        $id_jabatan = $this->session->userdata('id_jabatan');

		        if ($id_jabatan=='93'){
		        	/*rule khusus untuk Karo Umum*/
		        	$this->db->select('tu_pengguna.fullname, tr_jabatan.id, tr_jabatan.kode_unker, tr_jabatan.jabatan, tr_jabatan.kode_jabatan,tr_jabatan.id_atasan');
		            $this->db->where('tr_jabatan.id_atasan',$id_atasan);
		            $this->db->where('tr_jabatan.id !=',$id_jabatan);
		            //$this->db->where('tu_pengguna.type','pengguna');
		            $this->db->where('tu_pengguna.deleted_on',null);
		            $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_pengguna.id_jabatan', 'both');
		            $query = $this->db->get('tu_pengguna')->result_array();

		            
		            foreach ($query as $value) {
		            	$daftar_jabatan[$i]['id']=$value['id'];
			            $daftar_jabatan[$i]['kode_jabatan']=$value['kode_jabatan'];
			            $daftar_jabatan[$i]['fullname']=$value['fullname'];
			            $daftar_jabatan[$i]['jabatan']=$value['jabatan'];
			            $daftar_jabatan[$i]['jabatan_nama']=$value['fullname']." (".$value['kode_jabatan'].")";
			            $daftar_jabatan[$i]['id_atasan']=$value['id_atasan'];
			            $daftar_jabatan[$i]['kode_unker']=$value['kode_unker'];
			            $i=$i+1;
					}
		            
		            $this->db->select('tu_pengguna.fullname, tr_jabatan.id,tr_jabatan.kode_unker, tr_jabatan.jabatan, tr_jabatan.kode_jabatan,tr_jabatan.id_atasan');
		            $this->db->where('tr_jabatan.id_atasan',$id_jabatan);
		            //$this->db->where('tu_pengguna.type','pengguna');
		            $this->db->where('tu_pengguna.deleted_on',null);
		            $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_pengguna.id_jabatan', 'both');
		            $query = $this->db->get('tu_pengguna')->result_array();

		           	foreach ($query as $value) {
		            	$daftar_jabatan[$i]['id']=$value['id'];
			            $daftar_jabatan[$i]['kode_jabatan']=$value['kode_jabatan'];
			            $daftar_jabatan[$i]['fullname']=$value['fullname'];
			            $daftar_jabatan[$i]['jabatan']=$value['jabatan'];
			            $daftar_jabatan[$i]['jabatan_nama']=$value['fullname']." (".$value['kode_jabatan'].")";
			            $daftar_jabatan[$i]['id_atasan']=$value['id_atasan'];
			            $daftar_jabatan[$i]['kode_unker']=$value['kode_unker'];
			            $i=$i+1;
					}

					$this->db->select('tu_pengguna.fullname, tr_jabatan.id,tr_jabatan.kode_unker, tr_jabatan.jabatan, tr_jabatan.kode_jabatan,tr_jabatan.id_atasan');
		            $this->db->where('tr_jabatan.id_atasan','1');
		            //$this->db->where('tu_pengguna.type','pengguna');
		            $this->db->where('tu_pengguna.deleted_on',null);
		            $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_pengguna.id_jabatan', 'both');
		            $query = $this->db->get('tu_pengguna')->result_array();

		           	foreach ($query as $value) {
		            	$daftar_jabatan[$i]['id']=$value['id'];
			            $daftar_jabatan[$i]['kode_jabatan']=$value['kode_jabatan'];
			            $daftar_jabatan[$i]['fullname']=$value['fullname'];
			            $daftar_jabatan[$i]['jabatan']=$value['jabatan'];
			            $daftar_jabatan[$i]['jabatan_nama']=$value['fullname']." (".$value['kode_jabatan'].")";
			            $daftar_jabatan[$i]['id_atasan']=$value['id_atasan'];
			            $daftar_jabatan[$i]['kode_unker']=$value['kode_unker'];
			            $i=$i+1;
					}

		        }else{
			        $this->db->select('tu_pengguna.fullname, tr_jabatan.id, tr_jabatan.kode_unker, tr_jabatan.jabatan, tr_jabatan.kode_jabatan,tr_jabatan.id_atasan');
		            $this->db->where('tr_jabatan.id_atasan',$id_atasan);
		            $this->db->where('tr_jabatan.id !=',$id_jabatan);

		            $this->db->where('tu_pengguna.deleted_on',null);
		            $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_pengguna.id_jabatan', 'both');
		            $query = $this->db->get('tu_pengguna')->result_array();

		            
		            foreach ($query as $value) {
		            	$daftar_jabatan[$i]['id']=$value['id'];
			            $daftar_jabatan[$i]['kode_jabatan']=$value['kode_jabatan'];
			            $daftar_jabatan[$i]['fullname']=$value['fullname'];
			            $daftar_jabatan[$i]['jabatan']=$value['jabatan'];
			            $daftar_jabatan[$i]['jabatan_nama']=$value['fullname']." (".$value['kode_jabatan'].")";
			            $daftar_jabatan[$i]['id_atasan']=$value['id_atasan'];
			            $daftar_jabatan[$i]['kode_unker']=$value['kode_unker'];
			            $i=$i+1;
					}
		            
		            $this->db->select('tu_pengguna.fullname, tr_jabatan.id,tr_jabatan.kode_unker, tr_jabatan.jabatan, tr_jabatan.kode_jabatan,tr_jabatan.id_atasan');
		            $this->db->where('tr_jabatan.id_atasan',$id_jabatan);

		            $this->db->where('tu_pengguna.deleted_on',null);
		            $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_pengguna.id_jabatan', 'both');
		            $query = $this->db->get('tu_pengguna')->result_array();

		           	foreach ($query as $value) {
		            	$daftar_jabatan[$i]['id']=$value['id'];
			            $daftar_jabatan[$i]['kode_jabatan']=$value['kode_jabatan'];
			            $daftar_jabatan[$i]['fullname']=$value['fullname'];
			            $daftar_jabatan[$i]['jabatan']=$value['jabatan'];
			            $daftar_jabatan[$i]['jabatan_nama']=$value['fullname']." (".$value['kode_jabatan'].")";
			            $daftar_jabatan[$i]['id_atasan']=$value['id_atasan'];
			            $daftar_jabatan[$i]['kode_unker']=$value['kode_unker'];
			            $i=$i+1;
					}
		        }


		        $this->response($daftar_jabatan);
			    $data['success'] = true;
		        break;

		        /*---------------------------------------
		        daftar rekan kerja untuk pejabat verifikasi
				-----------------------------------------*/
		        case 'tujuan_verifikasi':
			    $daftar_jabatan = array();
	            $i=0;

		        $id_atasan = intval($this->session->userdata('id_atasan'));
		        $id_jabatan = intval($this->session->userdata('id_jabatan'));

		        //var_dump($this->session_commit());

		        
				$this->db->select('tu_pengguna.fullname, tr_jabatan.id, tr_jabatan.kode_unker, tr_jabatan.jabatan, tr_jabatan.kode_jabatan,tr_jabatan.id_atasan');
	            //$this->db->where('tr_jabatan.id_atasan',$id_atasan);
	            //$this->db->where('tr_jabatan.id',$id_jabatan);
	            //$this->db->where('tu_pengguna.type','pengguna');
	            $this->db->where('tu_pengguna.deleted_on',null);
	            $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_pengguna.id_jabatan', 'both');
	            $query = $this->db->get('tu_pengguna')->result_array();
				//var_dump($query);
	            
	            foreach ($query as $value) {
	            	$daftar_jabatan[$i]['id']=$value['id'];
		            $daftar_jabatan[$i]['kode_jabatan']=$value['kode_jabatan'];
		            $daftar_jabatan[$i]['fullname']=$value['fullname'];
		            $daftar_jabatan[$i]['jabatan']=$value['jabatan'];
		            $daftar_jabatan[$i]['jabatan_nama']=$value['fullname']." (".$value['kode_jabatan'].")";
		            $daftar_jabatan[$i]['id_atasan']=$value['id_atasan'];
		            $daftar_jabatan[$i]['kode_unker']=$value['kode_unker'];

		            $i=$i+1;
				}

				while ($id_atasan > 0) {
					
					//var_dump($id_atasan);
					
					$this->db->select('tu_pengguna.fullname, tr_jabatan.id, tr_jabatan.kode_unker, tr_jabatan.jabatan, tr_jabatan.kode_jabatan,tr_jabatan.id_atasan');
		            //$this->db->where('tr_jabatan.id_atasan',$id_atasan);
		            $this->db->where('tr_jabatan.id',$id_atasan);
		            //$this->db->where('tu_pengguna.type','pengguna');
		            $this->db->where('tu_pengguna.deleted_on',null);
		            $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_pengguna.id_jabatan', 'both');
		            $query = $this->db->get('tu_pengguna')->result_array();
					//var_dump($query);
		            
		            foreach ($query as $value) {
		            	$daftar_jabatan[$i]['id']=$value['id'];
			            $daftar_jabatan[$i]['kode_jabatan']=$value['kode_jabatan'];
			            $daftar_jabatan[$i]['fullname']=$value['fullname'];
			            $daftar_jabatan[$i]['jabatan']=$value['jabatan'];
			            $daftar_jabatan[$i]['jabatan_nama']=$value['fullname']." (".$value['kode_jabatan'].")";
			            $daftar_jabatan[$i]['id_atasan']=$value['id_atasan'];
			            $daftar_jabatan[$i]['kode_unker']=$value['kode_unker'];

			            $i=$i+1;
					}

					$id_atasan = $query[0]['id_atasan'];
					$id_jabatan = $query[0]['id'];

				}				
	            


		        $this->response($daftar_jabatan);
			    $data['success'] = true;
		        break;
		}
 	}
 	 	
}

/* End of file welcome.php */
/* Location: ./application/controllers/inmail.php */