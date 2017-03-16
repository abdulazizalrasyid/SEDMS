<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Notadinas extends REST_Controller {

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

    public function file_get()
    {
        $uniquecode = $this->input->get('uniquecode', TRUE);
        $this->db->where('uniquecode',$uniquecode);
        $total = $this->db->count_all_results('tu_file'); 

        $this->db->where('uniquecode',$uniquecode);
        $query = $this->db->get('tu_file');
        
        $data = array('data'=>$query->result(),'total'=>$total);

        $this->response($data);
    }

    public function daftar_get()
 	{
		$filter = $this->input->get('query', TRUE);
		$start = $this->input->get('start', TRUE);
		$limit = $this->input->get('limit', TRUE);
        $id_jabatan = $this->input->get('id_jabatan', TRUE);		
		
        switch ($this->input->get('type')) {
            case 'masuk':
                $this->db->from('tu_surat');
                $this->db->like('perihal',$filter,'both');
                $this->db->where('verified','1');
                $this->db->where('tipe_surat','N');
                $this->db->where('id_jabatan',$id_jabatan);
                $total = $this->db->count_all_results(); 

                $this->db->select('a.*');
                $this->db->from('tu_surat a');
                $this->db->like('perihal',$filter,'both');
                $this->db->where('id_jabatan',$id_jabatan);
                //$this->db->where('tujuan_notadinas',$id_jabatan);
                $this->db->where('verified','1');
                $this->db->where('tipe_surat','N');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_klasifikasi_arsip.kode')->from('tr_klasifikasi_arsip');
                $sub->where('tr_klasifikasi_arsip.kode LIKE a.kode_klasifikasi');
                $this->subquery->end_subquery('kode_klasifikasi');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_klasifikasi_arsip.klasifikasi')->from('tr_klasifikasi_arsip');
                $sub->where('tr_klasifikasi_arsip.kode LIKE a.kode_klasifikasi');
                $this->subquery->end_subquery('klasifikasi'); 

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan_asal');
                $this->subquery->end_subquery('jabatan_pengirim');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan_asal');
                $this->subquery->end_subquery('kode_pengirim');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan');
                $this->subquery->end_subquery('kode_penerima');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan');
                $this->subquery->end_subquery('jabatan_penerima');               

                $this->db->limit($limit, $start);
                $this->db->order_by("a.created_at", "desc");
                //$this->db->join('tr_jabatan b', 'b.id = a.id_jab_pengirim','left');
                $query = $this->db->get();

                $data = array('data'=>$query->result(),'total'=>$total);
                break;
            case 'keluar':
                $this->db->from('tu_surat');
                $this->db->like('perihal',$filter,'both');
                $this->db->where('verified','1');
                $this->db->where('tipe_surat','N');
                $this->db->where('id_jabatan_asal',$id_jabatan);
                $total = $this->db->count_all_results(); 

                $this->db->select('a.*');
                $this->db->from('tu_surat a');
                $this->db->like('perihal',$filter,'both');
                $this->db->where('id_jabatan_asal',$id_jabatan);
                $this->db->where('verified','1');
                $this->db->where('tipe_surat','N');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_klasifikasi_arsip.kode')->from('tr_klasifikasi_arsip');
                $sub->where('tr_klasifikasi_arsip.kode LIKE a.kode_klasifikasi');
                $this->subquery->end_subquery('kode_klasifikasi');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_klasifikasi_arsip.klasifikasi')->from('tr_klasifikasi_arsip');
                $sub->where('tr_klasifikasi_arsip.kode LIKE a.kode_klasifikasi');
                $this->subquery->end_subquery('klasifikasi');               

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan_asal');
                $this->subquery->end_subquery('jabatan_pengirim');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan_asal');
                $this->subquery->end_subquery('kode_pengirim');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan');
                $this->subquery->end_subquery('kode_penerima');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan');
                $this->subquery->end_subquery('jabatan_penerima');

                $this->db->limit($limit, $start);
                $this->db->order_by("a.created_at", "desc");
                //$this->db->join('tr_jabatan b', 'b.id = a.id_jab_penerima','left');
                $query = $this->db->get();

                $data = array('data'=>$query->result(),'total'=>$total);
                break;
            case 'verifikasi':
                $this->db->from('tu_surat');
                $this->db->like('perihal',$filter,'both');
                $this->db->where('verified','0');
                $this->db->where('tipe_surat','N');
                $this->db->where('verification_request_id_jab',$id_jabatan);
                $total = $this->db->count_all_results(); 

                $this->db->select('a.*');
                $this->db->from('tu_surat a');
                $this->db->like('perihal',$filter,'both');
                $this->db->where('verification_request_id_jab',$id_jabatan);
                $this->db->where('verified','0');
                $this->db->where('tipe_surat','N');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_klasifikasi_arsip.kode')->from('tr_klasifikasi_arsip');
                $sub->where('tr_klasifikasi_arsip.kode LIKE a.kode_klasifikasi');
                $this->subquery->end_subquery('kode_klasifikasi');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_klasifikasi_arsip.klasifikasi')->from('tr_klasifikasi_arsip');
                $sub->where('tr_klasifikasi_arsip.kode LIKE a.kode_klasifikasi');
                $this->subquery->end_subquery('klasifikasi');               

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan_asal');
                $this->subquery->end_subquery('jabatan_pengirim');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan_asal');
                $this->subquery->end_subquery('kode_pengirim');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan');
                $this->subquery->end_subquery('kode_penerima');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan');
                $this->subquery->end_subquery('jabatan_penerima');

                $this->db->limit($limit, $start);
                $this->db->order_by("a.created_at", "asc");
                //$this->db->join('tr_jabatan b', 'b.id = a.id_jab_penerima','left');
                $query = $this->db->get();

                $data = array('data'=>$query->result(),'total'=>$total);            
                # code...
                break;
            case 'klasifikasi':
                $this->db->from('tu_surat');
                $this->db->like('perihal',$filter,'both');
                //$this->db->where('verified',0);
                $this->db->where('kode_klasifikasi','');
                $this->db->where('tipe_surat','N');
                $total = $this->db->count_all_results(); 

                $this->db->select('a.*');
                $this->db->from('tu_surat a');
                $this->db->like('perihal',$filter,'both');
                $this->db->where('kode_klasifikasi','');
                $this->db->where('tipe_surat','N');
                //$this->db->where('verified',0);

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_klasifikasi_arsip.kode')->from('tr_klasifikasi_arsip');
                $sub->where('tr_klasifikasi_arsip.kode = a.kode_klasifikasi');
                $this->subquery->end_subquery('kode_klasifikasi');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_klasifikasi_arsip.klasifikasi')->from('tr_klasifikasi_arsip');
                $sub->where('tr_klasifikasi_arsip.kode = a.kode_klasifikasi');
                $this->subquery->end_subquery('klasifikasi');               

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan_asal');
                $this->subquery->end_subquery('jabatan_pengirim');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan_asal');
                $this->subquery->end_subquery('kode_pengirim');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan');
                $this->subquery->end_subquery('kode_penerima');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = a.id_jabatan');
                $this->subquery->end_subquery('jabatan_penerima');

                $this->db->limit($limit, $start);
                $this->db->order_by("a.created_at", "asc");
                //$this->db->join('tr_jabatan b', 'b.id = a.id_jab_pengirim','left');
                $query = $this->db->get();

                $data = array('data'=>$query->result(),'total'=>$total);                
                # code...
                break;
        }
        //$data = array('success'=>true);
        $this->response($data);
 	}
    
    public function daftar_pengolah_get(){

        $filter = $this->input->get('query', TRUE);
        $start = $this->input->get('start', TRUE);
        $limit = $this->input->get('limit', TRUE);
        $id_pengguna = $this->input->get('id_pengguna', TRUE);

        $this->db->from('tu_surat');
        $this->db->like('perihal',$filter,'both');
        //$this->db->where('verified',0);
        $this->db->where('id_pengolah',$id_pengguna);
        $this->db->where('tipe_surat','N');
        $total = $this->db->count_all_results(); 

        $this->db->select('a.*');
        $this->db->from('tu_surat a');
        $this->db->like('perihal',$filter,'both');
        $this->db->where('id_pengolah',$id_pengguna);
        $this->db->where('tipe_surat','N');
        //$this->db->where('verified',0);

        $sub = $this->subquery->start_subquery('select');
        $sub->select('tr_klasifikasi_arsip.kode')->from('tr_klasifikasi_arsip');
        $sub->where('tr_klasifikasi_arsip.kode = a.kode_klasifikasi');
        $this->subquery->end_subquery('kode_klasifikasi');

        $sub = $this->subquery->start_subquery('select');
        $sub->select('tr_klasifikasi_arsip.klasifikasi')->from('tr_klasifikasi_arsip');
        $sub->where('tr_klasifikasi_arsip.kode = a.kode_klasifikasi');
        $this->subquery->end_subquery('klasifikasi');               

        $sub = $this->subquery->start_subquery('select');
        $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
        $sub->where('tr_jabatan.id = a.id_jabatan_asal');
        $this->subquery->end_subquery('jabatan_pengirim');

        $sub = $this->subquery->start_subquery('select');
        $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
        $sub->where('tr_jabatan.id = a.id_jabatan_asal');
        $this->subquery->end_subquery('kode_pengirim');

        $sub = $this->subquery->start_subquery('select');
        $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
        $sub->where('tr_jabatan.id = a.id_jabatan');
        $this->subquery->end_subquery('kode_penerima');

        $sub = $this->subquery->start_subquery('select');
        $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
        $sub->where('tr_jabatan.id = a.id_jabatan');
        $this->subquery->end_subquery('jabatan_penerima');

        $this->db->limit($limit, $start);
        $this->db->order_by("a.created_at", "asc");
        //$this->db->join('tr_jabatan b', 'b.id = a.id_jab_pengirim','left');
        $query = $this->db->get();

        $aData = $query->result_array();

        $i=0;
        $data_jadi=[];
        foreach ($aData as $value) {
            # code...
            $data_jadi[$i]['asal_surat'] = $value['asal_surat'];
            $data_jadi[$i]['catatan'] = $value['catatan'];
            $data_jadi[$i]['created_at'] = $value['created_at'];
            $data_jadi[$i]['created_by'] = $value['created_by'];
            $data_jadi[$i]['diarsipkan'] = $value['diarsipkan'];
            $data_jadi[$i]['dibaca'] = $value['dibaca'];
            $data_jadi[$i]['didisposisi'] = $value['didisposisi'];
            $data_jadi[$i]['ditanggapi'] = $value['ditanggapi'];
            $data_jadi[$i]['edited_at'] = $value['edited_at'];
            $data_jadi[$i]['edited_by'] = $value['edited_by'];
            $data_jadi[$i]['id'] = $value['id'];
            $data_jadi[$i]['id_jabatan'] = $value['id_jabatan'];
            $data_jadi[$i]['id_jabatan_asal'] = $value['id_jabatan_asal'];
            $data_jadi[$i]['id_jra'] = $value['id_jra'];
            $data_jadi[$i]['id_klasifikasi'] = $value['id_klasifikasi'];
            $data_jadi[$i]['id_pengolah'] = $value['id_pengolah'];
            $data_jadi[$i]['index'] = $value['index'];
            $data_jadi[$i]['isi_nota'] = $value['isi_nota'];
            $data_jadi[$i]['jabatan_penerima'] = $value['jabatan_penerima'];
            $data_jadi[$i]['jabatan_pengirim'] = $value['jabatan_pengirim'];
            $data_jadi[$i]['jenis'] = $value['jenis'];
            $data_jadi[$i]['klasifikasi'] = $value['klasifikasi'];
            $data_jadi[$i]['kode_jra'] = $value['kode_jra'];
            $data_jadi[$i]['kode_klasifikasi'] = $value['kode_klasifikasi'];
            $data_jadi[$i]['kode_penerima'] = $value['kode_penerima'];
            $data_jadi[$i]['kode_pengirim'] = $value['kode_pengirim'];
            $data_jadi[$i]['no_registrasi_surat'] = $value['no_registrasi_surat'];
            $data_jadi[$i]['nomor_surat'] = $value['nomor_surat'];
            $data_jadi[$i]['prefix_kode_klasifikasi'] = $value['prefix_kode_klasifikasi'];
            $data_jadi[$i]['ringkasan'] = $value['ringkasan'];
            $data_jadi[$i]['sifat'] = $value['sifat'];
            $data_jadi[$i]['perihal'] = $value['perihal'];
            $data_jadi[$i]['tahun'] = $value['tahun'];
            $data_jadi[$i]['tgl_kirim'] = $value['tgl_kirim'];
            $data_jadi[$i]['tgl_surat'] = $value['tgl_surat'];
            $data_jadi[$i]['tgl_terima'] = $value['tgl_terima'];
            $data_jadi[$i]['tingkat_keamanan'] = $value['tingkat_keamanan'];
            $data_jadi[$i]['tipe_surat'] = $value['tipe_surat'];
            $data_jadi[$i]['tujuan_surat'] = $value['tujuan_surat'];
            $data_jadi[$i]['uniquecode'] = $value['uniquecode'];
            $data_jadi[$i]['unit_pemrakarsa'] = $value['unit_pemrakarsa'];
            $data_jadi[$i]['urgensi'] = $value['urgensi'];
            $data_jadi[$i]['verification_request_id_jab'] = $value['verification_request_id_jab'];
            $data_jadi[$i]['verified'] = $value['verified'];
            $data_jadi[$i]['verified_by'] = $value['verified_by'];
            $data_jadi[$i]['verified_on'] = $value['verified_on'];
            $data_jadi[$i]['waktu_aktif'] = $value['waktu_aktif'];
            $data_jadi[$i]['waktu_inaktif'] = $value['waktu_inaktif'];
            $data_jadi[$i]['history'] = $this->daftar_history($value['uniquecode']);

            $i=$i+1;

        }


        $data = array('data'=>$data_jadi,'total'=>$total);
        //$data = array('data'=>$query->result(),'total'=>$total)
        $this->response($data);
    }

    public function nomor_urut($tahun,$unit_pemrakarsa)
    {
        $this->db->select_max('nomor_urut');
        $this->db->where('tahun',$tahun);
        $this->db->where('unit_pemrakarsa',$unit_pemrakarsa);
        $query = $this->db->get('tu_register_nota_dinas');
        $data = $query->result_array();

        if ($data[0]['nomor_urut']==null){
            return 1;
        }else{
            return intval($data[0]['nomor_urut'])+1;
        }
    }


    public function tentative_get()
    {
        $tahun = $this->input->get('tahun');
        $unit_pemrakarsa = $this->input->get('unit_pemrakarsa');  
        $this->response($this->nomor_urut($tahun,$unit_pemrakarsa));
    }

    public function update_post()
    {    

        $datestring = "%Y/%m/%d %h:%i:%a";
        $time = time();
        
        $data = $this->input->post();
        if ($data['type'] == 'updateverifikasi'){
            $input['verified'] = 1;
            $input['verified_by'] = $this->session->userdata('username');
            $input['verified_on'] = mdate($datestring, $time);
            $input['edited_by'] = $this->session->userdata('username');
            $input['edited_at'] = mdate($datestring, $time);

            $this->db->where('id', $data['id']);
            $this->db->update('tu_surat', $input);

            $log_surat['tanggal'] = date('Y/m/d h:i:s');
            $log_surat['uniquecode'] = $data['uniquecode'];
            $log_surat['aksi'] = 'nota dinas diverifikasi oleh '.$this->session->userdata('jabatan');
            $this->db->insert('log_surat', $log_surat);

        } else if ($data['type'] == 'updateklasifikasi'){

            $input['kode_klasifikasi'] = $data['kode_klasifikasi'];
            $input['edited_by'] = $this->session->userdata('username');
            $input['edited_at'] = mdate($datestring, $time);
            
            $this->db->where('id', $data['id']);
            $this->db->update('tu_surat', $input);

            $log_surat['tanggal'] = date('Y/m/d h:i:s');
            $log_surat['uniquecode'] = $data['uniquecode'];
            $log_surat['aksi'] = 'nota dinas diklasifikasi oleh '.$this->session->userdata('jabatan');
            $this->db->insert('log_surat', $log_surat);

        } else if ($data['type'] == 'baca'){

            $input['dibaca'] = 1;
            $input['edited_by'] = $this->session->userdata('username');
            $input['edited_at'] = mdate($datestring, $time);
            
            $this->db->where('id', $data['id']);
            $this->db->update('tu_surat', $input);

            $log_surat['tanggal'] = date('Y/m/d h:i:s');
            $log_surat['uniquecode'] = $data['uniquecode'];
            $log_surat['aksi'] = 'nota dinas dibaca oleh '.$this->session->userdata('jabatan');
            $this->db->insert('log_surat', $log_surat);

        }
        
        
    }

 	public function simpan_post()
 	{
        //$this->response(array('success'=>true));
        $data = $this->input->post();
        $jumlah_insert = count($data['tujuan_notadinas']);
        
        $input['uniquecode'] = random_string('alnum', 6);
        $input['no_urut']=$this->nomor_urut($data['tahun'],$data['unit_pemrakarsa']);
        //$tahun = $data['tahun'];

        $data['tahun'] = date_format(new DateTime($data['tgl_surat']), 'Y');
        $bulan = date_format(new DateTime($data['tgl_surat']), 'm');
        $data['no_registrasi_surat'] = $this->nomor_urut( $this->input->post('tahun'),$data['unit_pemrakarsa']);


        $this->db->select('kode_jabatan');
        $this->db->where('id',$data['id_jabatan_asal']);
        $query = $this->db->get('tr_jabatan');
        $cur_jabatan = $query->result_array();

        for ($i = 0;$i<$jumlah_insert;$i++){
            
            if ($data['verified'] == 1){
                $input['verified_by'] = $this->session->userdata('username');
                $input['verified_on'] = date(' Y/m/d h:i:s');
                
                $log_surat['tanggal'] = date('Y/m/d h:i:s');
                $log_surat['uniquecode'] = $input['uniquecode'];
                $log_surat['aksi'] = 'Nota dinas diregister dan diverifikasi oleh '.$this->session->userdata('nama_lengkap');
                $this->db->insert('log_surat', $log_surat);
            }else{
                $log_surat['tanggal'] = date('Y/m/d h:i:s');
                $log_surat['uniquecode'] = $input['uniquecode'];
                $log_surat['aksi'] = 'Nota dinas diregister oleh '.$this->session->userdata('nama_lengkap');
                $this->db->insert('log_surat', $log_surat);
            }

            $input['verified'] = $data['verified'];
            $input['verification_request_id_jab'] = $data['verification_request_id_jab'];
            $input['created_by'] = $this->session->userdata('username');
            $input['created_at'] = date(' Y/m/d h:i:s');
            $input['id_jabatan_asal'] = $data['id_jabatan_asal'];
            $input['unit_pemrakarsa'] = $data['unit_pemrakarsa'];
            $input['id_jabatan'] = $data['tujuan_notadinas'][$i];
            $input['isi_nota'] = $data['isi_nota'];
            $input['kode_klasifikasi'] = $data['kode_klasifikasi'];
            $input['nomor_surat'] = $data['nomor_surat'];
            $input['tipe_surat'] = $data['tipe_surat'];
            //$input['no_urut'] = $data['no_urut'];
            $input['perihal'] = $data['perihal'];
            $input['tahun'] = $data['tahun'];
            $input['tgl_surat'] = $data['tgl_surat'];
            $input['id_pengolah'] = $this->session->userdata('id');
            //$input['tujuan_notadinas'] = $data['tujuan_notadinas'][$i];

            $result = $this->db->insert('tu_surat', $input); 
            $id = $this->db->insert_id();

            //insert to table "tu_register_nota_dinas"
            $insert['nomor_urut'] = $data['no_registrasi_surat'];
            $insert['penandatangan'] = $cur_jabatan[0]['kode_jabatan'];
            $insert['id_jabatan_asal'] = $data['id_jabatan_asal'];
            $insert['unit_pemrakarsa'] = $data['unit_pemrakarsa'];
            //$insert['klasifikasi'] = $cur_klasifikasi[0]['kode'];
            $insert['bulan'] = $bulan;
            $insert['uniquecode'] = $input['uniquecode'];
            $insert['tahun'] = $data['tahun'];
            $insert['aktif'] = 1;
            $insert['no_surat'] = $data['nomor_surat'];
            $insert['verified'] = 1;
            $insert['created_by'] = $this->session->userdata('username');

            $this->db->insert('tu_register_nota_dinas', $insert);
            //$no_surat = $data['nomor_surat'];
            
            //$segment = explode('/',$no_surat);
            //$jenis= explode('.',$segment[0]);

            $respon['success'] = $result; 
            //$id = $this->db->insert_id();
        }

        $this->response($respon);

 	}
 	
    public function simpan2_post()
    {
            $data = $this->input->post();
            $jumlah_insert = count($data['tujuan_notadinas']);
            
            $input['uniquecode'] = random_string('alnum', 6);
            $input['no_urut']=$this->nomor_urut($data['tahun'],$data['unit_pemrakarsa']);
            //$tahun = $data['tahun'];

            $data['tahun'] = date_format(new DateTime($data['tgl_surat']), 'Y');
            $bulan = date_format(new DateTime($data['tgl_surat']), 'm');
            $data['no_registrasi_surat'] = $this->nomor_urut( $this->input->post('tahun'),$data['unit_pemrakarsa']);


            $this->db->select('kode_jabatan');
            $this->db->where('id',$data['id_jabatan_asal']);
            $query = $this->db->get('tr_jabatan');
            $cur_jabatan = $query->result_array();

            for ($i = 0;$i<$jumlah_insert;$i++){

                if ($data['verified'] == 1){
                    $input['verified_by'] = $this->session->userdata('username');
                    $input['verified_on'] = date(' Y/m/d h:i:s');   
                }


                $input['verified'] = $data['verified'];
                $input['verification_request_id_jab'] = $data['verification_request_id_jab'];
                $input['created_by'] = $this->session->userdata('username');
                $input['created_at'] = date(' Y/m/d h:i:s');
                $input['id_jabatan_asal'] = $data['id_jabatan_asal'];
                $input['unit_pemrakarsa'] = $data['unit_pemrakarsa'];
                $input['id_jabatan'] = $data['tujuan_notadinas'][$i];
                $input['isi_nota'] = $data['isi_nota'];
                $input['kode_klasifikasi'] = $data['kode_klasifikasi'];
                $input['nomor_surat'] = $data['nomor_surat'];
                //$input['no_urut'] = $data['no_urut'];
                $input['perihal'] = $data['perihal'];
                $input['tipe_surat'] = $data['tipe_surat'];
                $input['tahun'] = $data['tahun'];
                $input['tgl_surat'] = $data['tgl_surat'];
                $input['id_pengolah'] = $this->session->userdata('id');
                //$input['tujuan_notadinas'] = $data['tujuan_notadinas'][$i];

                $result = $this->db->insert('tu_surat', $input); 
                $id = $this->db->insert_id();

                //insert to table "tu_register_nota_dinas"
                $insert['nomor_urut'] = $data['no_registrasi_surat'];
                $insert['penandatangan'] = $cur_jabatan[0]['kode_jabatan'];
                $insert['id_jabatan_asal'] = $data['id_jabatan_asal'];
                $insert['unit_pemrakarsa'] = $data['unit_pemrakarsa'];
                //$insert['klasifikasi'] = $cur_klasifikasi[0]['kode'];
                $insert['bulan'] = $bulan;
                $insert['uniquecode'] = $input['uniquecode'];
                $insert['tahun'] = $data['tahun'];
                $insert['aktif'] = 1;
                $insert['no_surat'] = $data['nomor_surat'];
                $insert['verified'] = 1;
                $insert['created_by'] = $this->session->userdata('username');

                $this->db->insert('tu_register_nota_dinas', $insert);
                //$no_surat = $data['nomor_surat'];
                
                //$segment = explode('/',$no_surat);
                //$jenis= explode('.',$segment[0]);

                $respon['success'] = $result; 
                //$id = $this->db->insert_id();
            }

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

                    $NewName = date('Ymdhis').'_ND_'.$input['uniquecode'].'_'.$i.'_'.$_FILES['myfile']['name'][$i];
                    $config['file_name']=$NewName;

                    $this->upload->initialize($config);
                    if ($this->upload->do_upload()){
                        $datafile = $this->upload->data();
                        $simpan['tu_surat_id'] = $id;
                        $simpan['uniquecode'] = $input['uniquecode'];
                        $simpan['created_by'] = $this->session->userdata('username');
                        $simpan['id_pengguna'] = $this->session->userdata('id');
                        $simpan['nama_file'] = $datafile['file_name'];
                        $simpan['created_at'] = date('Y/m/d h:i:s');
                        $this->db->insert('tu_file', $simpan); 
                    }else{
                        
                    }
                    
                    //$this->notadinas_model->simpan_filesurat($save);
                    
                }
                //$funct_response=array('success'=>true,'file'=>$_FILES['myfile']['name'][0]);
                  
            }


            if ($data['verified'] == 1){
                $input['verified_by'] = $this->session->userdata('username');
                $input['verified_on'] = date(' Y/m/d h:i:s');
                $log_surat['tanggal'] = date('Y/m/d h:i:s');
                $log_surat['uniquecode'] = $input['uniquecode'];
                $log_surat['aksi'] = 'Nota dinas diregister dan diverifikasi oleh '.$this->session->userdata('nama_lengkap').' dan menambahkan '.$countFiles.' file lampiran';
                $this->db->insert('log_surat', $log_surat);
            }else{
                $log_surat['tanggal'] = date('Y/m/d h:i:s');
                $log_surat['uniquecode'] = $input['uniquecode'];
                $log_surat['aksi'] = 'Nota dinas diregister oleh '.$this->session->userdata('nama_lengkap').' dan menambahkan '.$countFiles.' file lampiran';
                $this->db->insert('log_surat', $log_surat);
            }
            //simpan metadata ke database
            
            $this->response(array('success'=>true));

        

        $this->response($respon);
    } 	
}

/* End of file welcome.php */
/* Location: ./application/controllers/inmail.php */