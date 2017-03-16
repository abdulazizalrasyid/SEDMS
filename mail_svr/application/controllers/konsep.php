<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Konsep extends REST_Controller {

	public function __construct(){
		parent:: __construct();
		$this->load->library('session');
        $this->load->library('subquery');
        $this->load->helper('date');
 	}
 	
    private function daftar_history($uniquecode){
        $this->db->from('log_surat');
        $this->db->where('uniquecode',$uniquecode);
        $this->db->order_by("tanggal", "asc");
        $query = $this->db->get();
        $aData = $query->result_array();

        $response = '';
        foreach ($aData as $value) {

            $response = $response.mdate('%d-%m-%Y %H:%i', strtotime($value['tanggal'])).' : '.$value['aksi'].'<br />';
        }

        return $response;

    }
    
    public function arsip_post(){
        $datestring = "%Y/%m/%d %h:%i:%a";
        $time = time();
        //echo mdate($datestring, $time);

        $data = $this->input->post();
        $id = $this->input->post('id');

        $log_surat['tanggal'] = date('Y/m/d h:i:s');
        $log_surat['uniquecode'] = $data['uniquecode'];
        $log_surat['aksi'] = 'surat diarsip oleh '.$this->session->userdata('jabatan');
        $this->db->insert('log_surat', $log_surat);
        
        if ($this->input->post('archived') == true) {
            $data['archived'] = 1;
            $data['archived_by'] = $this->session->userdata('username');
            $data['archived_at'] = mdate($datestring, $time);
        }else{
            $data['archived'] = null;
            $data['archived_by'] = null;
            $data['archived_at'] = null;
        }
        

        
        //$this->surat_model->update_suratmasuk1($data,$id);

        $this->db->where('id', $id);
        //var_dump($data);
        $this->response(array('success'=>$this->db->update('tu_konsep', $data)));
    }

    public function daftar_arsip_get()
    {
        $query = $this->input->get('query', TRUE);
        $limit = $this->input->get('limit', TRUE);
        $start = $this->input->get('start', TRUE);

        switch ($this->input->get('type', TRUE)) {
            case 'unarchived':
                $this->db->select('a.*');
                $this->db->from('tu_konsep a');
                $this->db->where('final',1);
                $this->db->where("(a.perihal LIKE '%$query%' OR a.pengantar LIKE '%$query%')");
                $this->db->where('a.archived',null);
                //$this->db->join('tr_jabatan b', 'b.id = a.penandatangan','left');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.init_by');
                $this->subquery->end_subquery('pembuat');                

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jab_pembuat');
                $this->subquery->end_subquery('pemfinal');                

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.penandatangan');
                $this->subquery->end_subquery('penandatangan');

                $this->db->order_by("a.created_on", "desc");
                $this->db->limit($limit, $start);

                $query = $this->db->get();
                $aData = $query->result();
                break;
            
            case 'archived':
                $this->db->select('a.*');
                $this->db->from('tu_konsep a');
                $this->db->where('final',1);
                $this->db->where("(a.perihal LIKE '%$query%' OR a.pengantar LIKE '%$query%')");
                $this->db->where('a.archived',1);
                //$this->db->join('tr_jabatan b', 'b.id = a.penandatangan','left');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.init_by');
                $this->subquery->end_subquery('pembuat');                

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jab_pembuat');
                $this->subquery->end_subquery('pemfinal');                

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.penandatangan');
                $this->subquery->end_subquery('penandatangan');

                $this->db->order_by("a.created_on", "desc");
                $this->db->limit($limit, $start);

                $query = $this->db->get();
                $aData = $query->result();
                break;
        }

        $this->response($aData);
    }


    
    public function daftar_get()
    {
        $filter = $this->input->get('query', TRUE);
        $start = $this->input->get('start', TRUE);
        $limit = $this->input->get('limit', TRUE);
        $id_jabatan = $this->input->get('id_jabatan', TRUE);        
        
        switch ($this->input->get('type')) {
            case 'masuk':
                $filter = $this->input->get('query', TRUE);
                $start = $this->input->get('start', TRUE);
                $limit = $this->input->get('limit', TRUE);
                $id_jab_pengguna = $this->input->get('id_jabatan', TRUE);

                $query = $this->db->query("SELECT a.*,b.fullname AS pembuat,
                    c.kode_jabatan AS kode_jab_pembuat,
                    c.jabatan AS jab_pembuat,d.nama_file 
                    FROM tu_konsep a
                    
                    LEFT JOIN tu_pengguna b ON b.username = a.created_by 
                    LEFT JOIN tr_jabatan c ON c.id = a.id_jab_pembuat 
                    LEFT JOIN tu_konsepfile d ON d.tu_surat_id = a.id 
                    WHERE a.id 
                    in (select max(tu_konsep.id) 
                        from tu_konsep group by uniquecode
                        ) and 
                    id_jab_verifikator = ".$id_jabatan."
                    ORDER BY a.created_on DESC
                    ");

                $total = count($query->result());

                $aData = $query->result_array();
                $i=0;
                $data_jadi=array();
                foreach ($aData as $value) {
                    $data_jadi[$i]['aksi'] = $value['aksi'];
                    $data_jadi[$i]['created_by'] = $value['created_by'];
                    $data_jadi[$i]['created_on'] = $value['created_on'];
                    $data_jadi[$i]['deleted_by'] = $value['deleted_by'];
                    $data_jadi[$i]['diproses'] = $value['diproses'];
                    $data_jadi[$i]['final'] = $value['final'];
                    $data_jadi[$i]['id'] = $value['id'];
                    $data_jadi[$i]['id_jab_pembuat'] = $value['id_jab_pembuat'];
                    $data_jadi[$i]['id_jab_verifikator'] = $value['id_jab_verifikator'];
                    $data_jadi[$i]['init_by'] = $value['init_by'];
                    $data_jadi[$i]['jab_pembuat'] = $value['jab_pembuat'];
                    //$data_jadi[$i]['jab_penandatangan'] = $value['jab_penandatangan'];
                    $data_jadi[$i]['pembuat'] = $value['pembuat'];
                    $data_jadi[$i]['pembuat_plus_jab'] = $value['pembuat']." (".$value['jab_pembuat'].")";
                    $data_jadi[$i]['penandatangan'] = $value['penandatangan'];
                    $data_jadi[$i]['pengantar'] = $value['pengantar'];
                    $data_jadi[$i]['perihal'] = $value['perihal'];
                    $data_jadi[$i]['selanjutnya'] = $value['selanjutnya'];
                    $data_jadi[$i]['uniquecode'] = $value['uniquecode'];
                    $data_jadi[$i]['updated_by'] = $value['updated_by'];
                    $data_jadi[$i]['updated_on'] = $value['updated_on'];
                    
                    $data_jadi[$i]['history'] = $this->daftar_history($value['uniquecode']);

                    $i=$i+1;
                }

                $data = array('data'=>$data_jadi,'total'=>$total);
                
                $this->response($data);
                break;

            case 'final':
                $filter = $this->input->get('query', TRUE);
                $start = $this->input->get('start', TRUE);
                $limit = $this->input->get('limit', TRUE);
                $id_jab_pengguna = $this->input->get('id_jabatan', TRUE);

                $this->db->from('tu_konsep');
                $this->db->where('init_by',$id_jab_pengguna);
                $this->db->where('aksi','final');
                $this->db->where('archived',null);
                $total = $this->db->count_all_results(); 

                $this->db->select('*');
                $this->db->from('tu_konsep');
                $this->db->where('init_by',$id_jab_pengguna);

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tu_pengguna.fullname')->from('tu_pengguna');
                $sub->where('tu_konsep.created_by = tu_pengguna.username');
                $this->subquery->end_subquery('pembuat');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tu_konsep.id_jab_pembuat = tr_jabatan.id');
                $this->subquery->end_subquery('jab_pembuat');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tu_konsep.penandatangan = tr_jabatan.id');
                $this->subquery->end_subquery('jab_penandatangan');

                $this->db->where('aksi','final');
                $this->db->where('archived',null);
                $this->db->limit($limit, $start);
                $this->db->order_by("created_on", "desc");
                $query = $this->db->get();

                $aData = $query->result_array();

                $i=0;
                $data_jadi=array();
                foreach ($aData as $value) {
                    # code...
                    $data_jadi[$i]['aksi'] = $value['aksi'];
                    $data_jadi[$i]['created_by'] = $value['created_by'];
                    $data_jadi[$i]['created_on'] = $value['created_on'];
                    $data_jadi[$i]['deleted_by'] = $value['deleted_by'];
                    $data_jadi[$i]['diproses'] = $value['diproses'];
                    $data_jadi[$i]['final'] = $value['final'];
                    $data_jadi[$i]['id'] = $value['id'];
                    $data_jadi[$i]['id_jab_pembuat'] = $value['id_jab_pembuat'];
                    $data_jadi[$i]['id_jab_verifikator'] = $value['id_jab_verifikator'];
                    $data_jadi[$i]['init_by'] = $value['init_by'];
                    $data_jadi[$i]['jab_pembuat'] = $value['jab_pembuat'];
                    $data_jadi[$i]['jab_penandatangan'] = $value['jab_penandatangan'];
                    $data_jadi[$i]['pembuat'] = $value['pembuat'];
                    $data_jadi[$i]['pembuat_plus_jab'] = $value['pembuat']." (".$value['jab_pembuat'].")";
                    $data_jadi[$i]['penandatangan'] = $value['penandatangan'];
                    $data_jadi[$i]['pengantar'] = $value['pengantar'];
                    $data_jadi[$i]['perihal'] = $value['perihal'];
                    $data_jadi[$i]['selanjutnya'] = $value['selanjutnya'];
                    $data_jadi[$i]['uniquecode'] = $value['uniquecode'];
                    $data_jadi[$i]['updated_by'] = $value['updated_by'];
                    $data_jadi[$i]['updated_on'] = $value['updated_on'];
                    
                    $data_jadi[$i]['history'] = $this->daftar_history($value['uniquecode']);

                    $i=$i+1;

                }

                $data = array('data'=>$data_jadi,'total'=>$total);

                $this->response($data);
                break;
        }
        //$data = array('success'=>true);
        //$this->response($data);
    }
    
    public function update_post()
    {
        $datestring = "%Y/%m/%d %h:%i:%a";
        $time = time();

        $input['id'] = $this->input->post('id', TRUE);
        $input['diproses'] = $id = $this->input->post('diproses', TRUE);
        $input['updated_by'] = $this->session->userdata('username');
        $input['updated_on'] = mdate($datestring, $time);
        
        $this->db->where('id', $input['id']);
        $this->db->update('tu_konsep', $input);

        $log_surat['tanggal'] = date('Y/m/d h:i:s');
        $log_surat['uniquecode'] = $this->input->post('uniquecode', TRUE);
        $log_surat['aksi'] = 'konsep diproses oleh '.$this->session->userdata('jabatan');
        $this->db->insert('log_surat', $log_surat);

        $data = array('success'=>true);
        $this->response($data);
    }

    public function daftarfile_get()
    {
        $filter = $this->input->get('query', TRUE);
        $start = $this->input->get('start', TRUE);
        $limit = $this->input->get('limit', TRUE);
        $tu_draft_id = $this->input->get('tu_draft_id', TRUE);

        $this->db->from('tu_konsepfile');
        //$this->db->where('tipe_surat','M');
        $this->db->where('tu_surat_id',$tu_draft_id);
        $total = $this->db->count_all_results(); 

        $this->db->select('*');
        $this->db->from('tu_konsepfile');
        //$this->db->where('tipe_surat','M');
        $this->db->where('tu_surat_id',$tu_draft_id);
        $this->db->limit($limit, $start);
        $this->db->order_by("created_at", "desc");
        $query = $this->db->get();

        $data = array('data'=>$query->result(),'total'=>$total);
        
        $this->response($data);
    }

    public function daftar_file_history_get()
    {
        $filter = $this->input->get('query', TRUE);
        $start = $this->input->get('start', TRUE);
        $limit = $this->input->get('limit', TRUE);
        $uniquecode = $this->input->get('uniquecode', TRUE);

        //$this->db->distinct();
        $this->db->select('nama_file');
        $this->db->from('tu_konsepfile a');
        //$this->db->where('tipe_surat','M');
        $this->db->where('a.uniquecode',$uniquecode);
        $total = $this->db->count_all_results(); 

        //$this->db->distinct();
        $this->db->select('a.nama_file,b.created_on');
        $this->db->from('tu_konsepfile a');

        $sub = $this->subquery->start_subquery('select');
        $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
        $sub->where('b.id_jab_pembuat = tr_jabatan.id');
        $this->subquery->end_subquery('jab_pembuat');

        //$this->db->where('tipe_surat','M');
        $this->db->join('tu_konsep b', 'b.id = a.tu_surat_id','left');
        $this->db->where('a.uniquecode',$uniquecode);
        $this->db->limit($limit, $start);
        $this->db->order_by("created_at", "desc");
        $query = $this->db->get();

        $data = array('data'=>$query->result(),'total'=>$total);
        
        $this->response($data);
    }

    public function daftar_file_history_distinc_get()
    {
        $filter = $this->input->get('query', TRUE);
        $start = $this->input->get('start', TRUE);
        $limit = $this->input->get('limit', TRUE);
        $uniquecode = $this->input->get('uniquecode', TRUE);

        $this->db->distinct();
        $this->db->select('nama_file');
        $this->db->from('tu_konsepfile a');
        //$this->db->where('tipe_surat','M');
        $this->db->where('a.uniquecode',$uniquecode);
        $total = $this->db->count_all_results(); 

        $this->db->distinct();
        $this->db->select('a.nama_file,b.created_on');
        $this->db->from('tu_konsepfile a');

        $sub = $this->subquery->start_subquery('select');
        $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
        $sub->where('b.id_jab_pembuat = tr_jabatan.id');
        $this->subquery->end_subquery('jab_pembuat');

        //$this->db->where('tipe_surat','M');
        $this->db->join('tu_konsep b', 'b.id = a.tu_surat_id','left');
        $this->db->where('a.uniquecode',$uniquecode);
        $this->db->limit($limit, $start);
        $this->db->order_by("created_at", "desc");
        $query = $this->db->get();

        $data = array('data'=>$query->result(),'total'=>$total);
        
        $this->response($data);
    }

    public function simpan_post()
    {
        //$this->response(array('success'=>true));
        $data = $this->input->post();
        //$jumlah_insert = count($data['tujuan_notadinas']);
        $data['uniquecode'] = random_string('alnum', 6);

        $respon = array("success"=>$this->db->insert('tu_konsep', $data)); 

        $id = $this->db->insert_id();

        $config['upload_path'] = $this->config->item('upload_path');
        $config['allowed_types'] = $this->config->item('allowed_types');
        $config['max_size'] = $this->config->item('max_size');

        $this->load->library('upload', $config);

        $countFiles=count($_FILES['myfile']['name']);

        if ( $_FILES['myfile']['name'][0] == '') {
            $data=array('success'=>true,'error'=>'tidak ada file yg diupload');
        } else {
            for ($i=0;$i<$countFiles;$i++){
                
                $_FILES['userfile']['name'] = $_FILES['myfile']['name'][$i];
                $_FILES['userfile']['type'] = $_FILES['myfile']['type'][$i];
                $_FILES['userfile']['tmp_name'] = $_FILES['myfile']['tmp_name'][$i];
                $_FILES['userfile']['error'] = $_FILES['myfile']['error'][$i];
                $_FILES['userfile']['size'] = $_FILES['myfile']['size'][$i];

                $NewName = date('Ymdhis').'_KNS_'.$data['uniquecode'].'_'.$i.'_'.$_FILES['myfile']['name'][$i];
                $config['file_name']=$NewName;

                $this->upload->initialize($config);
                if ($this->upload->do_upload()){
                    $datafile = $this->upload->data();
                    $simpan['tu_surat_id'] = $id;
                    $simpan['uniquecode'] = $data['uniquecode'];
                    $simpan['created_by'] = $this->session->userdata('username');
                    $simpan['nama_file'] = $datafile['file_name'];
                    $simpan['created_at'] = date('Y/m/d h:i:s');
                    $this->db->insert('tu_konsepfile', $simpan); 
                    //$respon=array_push('success'=>true,'file'=>$datafile['file_name']); 
                }else{
                    //$respon=array_push('success'=>false,'error'=>$this->upload->display_errors());
                }
            }
            $log_surat['tanggal'] = date('Y/m/d h:i:s');
            $log_surat['uniquecode'] = $data['uniquecode'];
            $log_surat['aksi'] ='Konsep diregister oleh '. $this->session->userdata('nama_lengkap').' menambahkan '.$countFiles.' file lampiran';
            $this->db->insert('log_surat', $log_surat); 
              
        }
        $this->response($respon);
    }

    public function simpan_use_selectedfile_post()
    { 
        $file = $this->input->post('file');
        $aFile = explode( ';', $file );

        $data['uniquecode'] = $this->input->post('uniquecode');
        $data['id_jab_pembuat'] = $this->input->post('id_jab_pembuat');
        $data['created_by'] = $this->input->post('created_by');
        $data['id_jab_verifikator'] = $this->input->post('id_jab_verifikator');
        $data['id_jab_verifikator'] = $this->input->post('id_jab_verifikator');
        $data['pengantar'] = $this->input->post('pengantar');
        $data['perihal'] = $this->input->post('perihal');
        $data['aksi'] = $this->input->post('aksi');
        $data['perihal'] = $this->input->post('perihal');
        $data['init_by'] = $this->input->post('init_by');

        $this->db->insert('tu_konsep', $data); 
        $id = $this->db->insert_id();

        //$id = $this->draft_model->simpan($data);
        //var_dump($id);

        $this->db->select('*');
        $this->db->from('tu_konsepfile');
        //$this->db->where('tipe_surat','M');
        $this->db->where('tu_surat_id',$this->input->post('last_id'));
        $this->db->order_by("created_at", "desc");
        $query = $this->db->get();

        $files = array('data'=>$query->result_array());

        //$files = $this->draft_model->daftar_filedraft2($this->input->post('last_id'));
        $countFiles =count($aFile); 

        for ($i=0;$i<$countFiles;$i++){
            $save['tu_surat_id'] = $id;
            $save['nama_file'] = $aFile[$i];
            $save['uniquecode'] = $data['uniquecode']; 
            $save['created_by'] = $this->session->userdata('username');
            $save['created_at'] = date('Y/m/d h:i:s');
            $this->db->insert('tu_konsepfile', $save); 
            //$this->draft_model->simpan_filedraft($save);
        }
        
        $log_surat['tanggal'] = date('Y/m/d h:i:s');
        $log_surat['uniquecode'] = $data['uniquecode'];
        $log_surat['aksi'] ='Konsep diproses oleh '. $this->session->userdata('nama_lengkap').' mempergunakan file yang terpilih';
        $this->db->insert('log_surat', $log_surat);

        $data=array('success'=>true);
        $this->response($data);
    }
    
    public function simpan_use_lastfile_post()
    { 
        $data['uniquecode'] = $this->input->post('uniquecode');
        $data['id_jab_pembuat'] = $this->input->post('id_jab_pembuat');
        $data['created_by'] = $this->input->post('created_by');
        $data['id_jab_verifikator'] = $this->input->post('id_jab_verifikator');
        $data['id_jab_verifikator'] = $this->input->post('id_jab_verifikator');
        $data['pengantar'] = $this->input->post('pengantar');
        $data['perihal'] = $this->input->post('perihal');
        $data['aksi'] = $this->input->post('aksi');
        $data['perihal'] = $this->input->post('perihal');
        $data['init_by'] = $this->input->post('init_by');

        $this->db->insert('tu_konsep', $data); 
        $id = $this->db->insert_id();

        //$id = $this->draft_model->simpan($data);
        //var_dump($id);

        $this->db->select('*');
        $this->db->from('tu_konsepfile');
        //$this->db->where('tipe_surat','M');
        $this->db->where('tu_surat_id',$this->input->post('last_id'));
        $this->db->order_by("created_at", "desc");
        $query = $this->db->get();

        $files = array('data'=>$query->result_array());

        //$files = $this->draft_model->daftar_filedraft2($this->input->post('last_id'));
        $countFiles =count($files['data']); 
        for ($i=0;$i<$countFiles;$i++){
            $save['tu_surat_id'] = $id;
            $save['nama_file'] = $files['data'][$i]['nama_file'];
            $save['uniquecode'] = $data['uniquecode']; 
            $save['created_by'] = $this->session->userdata('username');
            $save['created_at'] = date('Y/m/d h:i:s');
            $this->db->insert('tu_konsepfile', $save); 
            //$this->draft_model->simpan_filedraft($save);
        }
        
        $log_surat['tanggal'] = date('Y/m/d h:i:s');
        $log_surat['uniquecode'] = $data['uniquecode'];
        $log_surat['aksi'] ='Konsep diproses oleh '. $this->session->userdata('nama_lengkap').' mempergunakan file lampiran sebelumnya';
        $this->db->insert('log_surat', $log_surat);

        $data=array('success'=>true);
        $this->response($data);
    }

    public function simpan_newfile_post()
    { 
        $data['uniquecode'] = $this->input->post('uniquecode');
        $data['id_jab_pembuat'] = $this->input->post('id_jab_pembuat');
        $data['created_by'] = $this->input->post('created_by');
        $data['id_jab_verifikator'] = $this->input->post('id_jab_verifikator');
        $data['pengantar'] = $this->input->post('pengantar');
        $data['perihal'] = $this->input->post('perihal');
        $data['aksi'] = $this->input->post('aksi');
        $data['perihal'] = $this->input->post('perihal');
        $data['init_by'] = $this->input->post('init_by');

        $this->db->insert('tu_konsep', $data); 
        $id = $this->db->insert_id();

        $config['upload_path'] = $this->config->item('upload_path');
        $config['allowed_types'] = $this->config->item('allowed_types');
        $config['max_size'] = $this->config->item('max_size');

        $this->load->library('upload', $config);

        $countFiles=count($_FILES['myfile']['name']);
        if ( $_FILES['myfile']['name'][0] == '') {
            $data=array('success'=>true,'error'=>'tidak ada file yg diupload');
        } else {
            for ($i=0;$i<$countFiles;$i++){
                
                $_FILES['userfile']['name'] = $_FILES['myfile']['name'][$i];
                $_FILES['userfile']['type'] = $_FILES['myfile']['type'][$i];
                $_FILES['userfile']['tmp_name'] = $_FILES['myfile']['tmp_name'][$i];
                $_FILES['userfile']['error'] = $_FILES['myfile']['error'][$i];
                $_FILES['userfile']['size'] = $_FILES['myfile']['size'][$i];

                // $NewName = date('Ymdhis').'_KNS_'.$data['uniquecode'].'_'.$i;
                $NewName = date('Ymdhis').'_KNS_'.$data['uniquecode'].'_'.$i.'_'.$_FILES['myfile']['name'][$i];
                $config['file_name']=$NewName;

                $this->upload->initialize($config);
                if ($this->upload->do_upload()){
                    $datafile = $this->upload->data();
                    $simpan['tu_surat_id'] = $id;
                    $simpan['uniquecode'] = $data['uniquecode'];
                    $simpan['created_by'] = $this->session->userdata('username');
                    $simpan['nama_file'] = $datafile['file_name'];
                    $simpan['created_at'] = date('Y/m/d h:i:s');
                    $this->db->insert('tu_konsepfile', $simpan); 
                }
               
                
            }
            $log_surat['tanggal'] = date('Y/m/d h:i:s');
            $log_surat['uniquecode'] = $data['uniquecode'];
            $log_surat['aksi'] ='Konsep diproses oleh '. $this->session->userdata('nama_lengkap').' menambahkan '.$countFiles.' file lampiran';
            $this->db->insert('log_surat', $log_surat); 
              
        }
        $data=array('success'=>true);
        $this->response($data);
    }

    public function simpan_use_selectedfile_final_post()
    {
        

        $file = $this->input->post('file');
        $aFile = explode( ';', $file );

        $data['uniquecode'] = $this->input->post('uniquecode');
        $data['id_jab_pembuat'] = $this->input->post('id_jab_pembuat');
        $data['created_by'] = $this->input->post('created_by');
        $data['id_jab_verifikator'] = $this->input->post('id_jab_verifikator');
        $data['id_jab_verifikator'] = $this->input->post('id_jab_verifikator');
        $data['pengantar'] = $this->input->post('pengantar');
        $data['perihal'] = $this->input->post('perihal');
        $data['penandatangan'] = $this->input->post('penandatangan');
        $data['final'] = 1;
        $data['selanjutnya'] = $this->input->post('selanjutnya');
        $data['aksi'] = 'final';
        $data['perihal'] = $this->input->post('perihal');
        $data['init_by'] = $this->input->post('init_by');

        $this->db->insert('tu_konsep', $data); 
        $id = $this->db->insert_id();

        $this->db->select('*');
        $this->db->from('tu_konsepfile');
        //$this->db->where('tipe_surat','M');
        $this->db->where('tu_surat_id',$this->input->post('last_id'));
        $this->db->order_by("created_at", "desc");
        $query = $this->db->get();

        $files = array('data'=>$query->result_array());

        $countFiles =count($aFile); 

        for ($i=0;$i<$countFiles;$i++){
            $save['tu_surat_id'] = $id;
            $save['nama_file'] = $aFile[$i];
            $save['uniquecode'] = $data['uniquecode']; 
            $save['created_by'] = $this->session->userdata('username');
            $save['created_at'] = date('Y/m/d h:i:s');
            $this->db->insert('tu_konsepfile', $save); 
            //$this->draft_model->simpan_filedraft($save);
        }
        
        $log_surat['tanggal'] = date('Y/m/d h:i:s');
        $log_surat['uniquecode'] = $data['uniquecode'];
        $log_surat['aksi'] ='Konsep difinalisasi oleh '. $this->session->userdata('nama_lengkap').' mempergunakan file terpilih';
        $this->db->insert('log_surat', $log_surat);

        $data=array('success'=>true);
        $this->response($data);
    }
    public function simpan_use_lastfile_final_post()
    {
        

        //var_dump($this->input->post('file'));
        $data['uniquecode'] = $this->input->post('uniquecode');
        $data['id_jab_pembuat'] = $this->input->post('id_jab_pembuat');
        $data['created_by'] = $this->input->post('created_by');
        $data['id_jab_verifikator'] = $this->input->post('id_jab_verifikator');
        $data['id_jab_verifikator'] = $this->input->post('id_jab_verifikator');
        $data['pengantar'] = $this->input->post('pengantar');
        $data['perihal'] = $this->input->post('perihal');
        $data['penandatangan'] = $this->input->post('penandatangan');
        $data['final'] = 1;
        $data['selanjutnya'] = $this->input->post('selanjutnya');
        $data['aksi'] = 'final';
        $data['perihal'] = $this->input->post('perihal');
        $data['init_by'] = $this->input->post('init_by');

        $this->db->insert('tu_konsep', $data); 
        $id = $this->db->insert_id();

        $this->db->select('*');
        $this->db->from('tu_konsepfile');
        //$this->db->where('tipe_surat','M');
        $this->db->where('tu_surat_id',$this->input->post('last_id'));
        $this->db->order_by("created_at", "desc");
        $query = $this->db->get();

        $files = array('data'=>$query->result_array());

        $countFiles =count($files['data']); 
        for ($i=0;$i<$countFiles;$i++){
            $save['tu_surat_id'] = $id;
            $save['nama_file'] = $files['data'][$i]['nama_file'];
            $save['uniquecode'] = $data['uniquecode']; 
            $save['created_by'] = $this->session->userdata('username');
            $save['created_at'] = date('Y/m/d h:i:s');
            $this->db->insert('tu_konsepfile', $save); 
            //$this->draft_model->simpan_filedraft($save);
        }
        
        $log_surat['tanggal'] = date('Y/m/d h:i:s');
        $log_surat['uniquecode'] = $data['uniquecode'];
        $log_surat['aksi'] ='Konsep difinalisasi oleh '. $this->session->userdata('nama_lengkap').' mempergunakan file lampiran sebelumnya';
        $this->db->insert('log_surat', $log_surat);

        $data=array('success'=>true);
        $this->response($data);
    }
 	
    public function simpan_newfile_final_post()
    { 

        $data['uniquecode'] = $this->input->post('uniquecode');
        $data['id_jab_pembuat'] = $this->input->post('id_jab_pembuat');
        $data['created_by'] = $this->input->post('created_by');
        $data['id_jab_verifikator'] = $this->input->post('id_jab_verifikator');
        $data['id_jab_verifikator'] = $this->input->post('id_jab_verifikator');
        $data['pengantar'] = $this->input->post('pengantar');
        $data['perihal'] = $this->input->post('perihal');
        $data['penandatangan'] = $this->input->post('penandatangan');
        $data['final'] = 1;
        $data['selanjutnya'] = $this->input->post('selanjutnya');
        $data['aksi'] = $this->input->post('aksi');
        $data['perihal'] = $this->input->post('perihal');
        $data['init_by'] = $this->input->post('init_by');

        $this->db->insert('tu_konsep', $data); 
        $id = $this->db->insert_id();

        $config['upload_path'] = $this->config->item('upload_path');
        $config['allowed_types'] = $this->config->item('allowed_types');
        $config['max_size'] = $this->config->item('max_size');

        $this->load->library('upload', $config);

        $countFiles=count($_FILES['myfile']['name']);
        if ( $_FILES['myfile']['name'][0] == '') {
            $data=array('success'=>true,'error'=>'tidak ada file yg diupload');
        } else {
            for ($i=0;$i<$countFiles;$i++){
                
                $_FILES['userfile']['name'] = $_FILES['myfile']['name'][$i];
                $_FILES['userfile']['type'] = $_FILES['myfile']['type'][$i];
                $_FILES['userfile']['tmp_name'] = $_FILES['myfile']['tmp_name'][$i];
                $_FILES['userfile']['error'] = $_FILES['myfile']['error'][$i];
                $_FILES['userfile']['size'] = $_FILES['myfile']['size'][$i];

                $NewName = date('Ymdhis').'_KNS_'.$data['uniquecode'].'_'.$i;
                $config['file_name']=$NewName;

                $this->upload->initialize($config);
                if ($this->upload->do_upload()){
                    $datafile = $this->upload->data();
                    $simpan['tu_surat_id'] = $id;
                    $simpan['uniquecode'] = $data['uniquecode'];
                    $simpan['created_by'] = $this->session->userdata('username');
                    $simpan['nama_file'] = $datafile['file_name'];
                    $simpan['created_at'] = date('Y/m/d h:i:s');
                    $this->db->insert('tu_konsepfile', $simpan); 
                }else{

                }
            }
            $log_surat['tanggal'] = date('Y/m/d h:i:s');
            $log_surat['uniquecode'] = $data['uniquecode'];
            $log_surat['aksi'] ='Konsep diproses oleh '. $this->session->userdata('nama_lengkap').' menambahkan '.$countFiles.' file lampiran';
            $this->db->insert('log_surat', $log_surat); 
              
        }
        $data=array('success'=>true);
        $this->response($data);
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/inmail.php */