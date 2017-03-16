<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Surat extends REST_Controller {

	public function __construct(){
		parent:: __construct();
		$this->load->model(array('login_model'));
		$this->load->library('session');
		//$this->load->library( 'nativesession' );
		$this->load->helper('date');
		$this->load->library('subquery');
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

 	public function daftar_get ()
 	{
	 	$query = $this->input->get('query', TRUE);
		$limit = $this->input->get('limit', TRUE);
		$start = $this->input->get('start', TRUE);
		$id_jabatan = $this->input->get('id_jabatan', TRUE);
		$id_pengguna = $this->input->get('id_pengguna', TRUE);

 		switch ($this->input->get('type')) {
		    case 'verifikasi':

				$this->db->from('tu_surat');

		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(tipe_surat = 'M' AND verified = '0' AND verification_request_id_jab = $id_jabatan AND deleted_at IS null)");

		        $total = $this->db->count_all_results(); 

		        $this->db->select('a.*,b.kode_jabatan,b.jabatan');
		        $this->db->from('tu_surat a');

		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(tipe_surat = 'M' AND verified = '0' AND verification_request_id_jab = $id_jabatan AND deleted_at IS null)");

		        $sub = $this->subquery->start_subquery('select');
        		$sub->select('tr_klasifikasi_arsip.kode')->from('tr_klasifikasi_arsip');
        		$sub->where('tr_klasifikasi_arsip.id = a.id_klasifikasi');
        		$this->subquery->end_subquery('kode_klasifikasi');

        		$sub = $this->subquery->start_subquery('select');
        		$sub->select('tr_klasifikasi_arsip.klasifikasi')->from('tr_klasifikasi_arsip');
        		$sub->where('tr_klasifikasi_arsip.id = a.id_klasifikasi');
        		$this->subquery->end_subquery('klasifikasi');        		

		        $this->db->limit($limit, $start);
		        $this->db->order_by("a.created_at", "desc");
		        $this->db->join('tr_jabatan b', 'b.id = a.id_jabatan','left');
		        $query = $this->db->get();

        		$data = array('data'=>$query->result(),'total'=>$total);
		    break;
		    case 'masuk':

				$this->db->from('tu_surat');


		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(tipe_surat = 'M' AND verified = '1' AND diarsipkan = '0' AND id_jabatan = $id_jabatan AND deleted_at IS null)");
		        $total = $this->db->count_all_results(); 

		        $this->db->select('a.*,b.kode_jabatan,b.jabatan');
		        $this->db->from('tu_surat a');
		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(tipe_surat = 'M' AND verified = '1' AND diarsipkan = '0' AND id_jabatan = $id_jabatan AND deleted_at IS null)");

 				$sub = $this->subquery->start_subquery('select');
        		$sub->select('tr_klasifikasi_arsip.kode')->from('tr_klasifikasi_arsip');
        		$sub->where('tr_klasifikasi_arsip.id = a.id_klasifikasi');
        		$this->subquery->end_subquery('kode_klasifikasi');

        		$sub = $this->subquery->start_subquery('select');
        		$sub->select('tr_klasifikasi_arsip.klasifikasi')->from('tr_klasifikasi_arsip');
        		$sub->where('tr_klasifikasi_arsip.id = a.id_klasifikasi');
        		$this->subquery->end_subquery('klasifikasi');

		        $this->db->limit($limit, $start);
		        $this->db->order_by("a.created_at", "desc");
		        $this->db->join('tr_jabatan b', 'b.id = a.id_jabatan','left');
		        $query = $this->db->get();

        		$data = array('data'=>$query->result(),'total'=>$total);
		    break;
		    case 'oprmasuk':

				$this->db->from('tu_surat');

		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(tipe_surat = 'M' AND id_pengolah = $id_pengguna AND deleted_at IS null)");
		        $total = $this->db->count_all_results(); 

		        $this->db->select('a.*');
		        $this->db->from('tu_surat a');
		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(tipe_surat = 'M' AND id_pengolah = $id_pengguna AND deleted_at IS null)");

 				$sub = $this->subquery->start_subquery('select');
        		$sub->select('tr_klasifikasi_arsip.kode')->from('tr_klasifikasi_arsip');
        		$sub->where('tr_klasifikasi_arsip.id = a.id_klasifikasi');
        		$this->subquery->end_subquery('kode_klasifikasi');

        		$sub = $this->subquery->start_subquery('select');
        		$sub->select('tr_klasifikasi_arsip.klasifikasi')->from('tr_klasifikasi_arsip');
        		$sub->where('tr_klasifikasi_arsip.id = a.id_klasifikasi');
        		$this->subquery->end_subquery('klasifikasi');

		        $this->db->limit($limit, $start);
		        $this->db->order_by("a.created_at", "desc");
		        //$this->db->join('tr_jabatan b', 'b.id = a.id_jabatan','left');
		        $query = $this->db->get();

        		$aData = $query->result_array();

		        $i=0;
		        $data_jadi=array();
		        foreach ($aData as $value) {
		        	# code...
		        	$data_jadi[$i]['asal_surat'] = $value['asal_surat'];
		        	$data_jadi[$i]['catatan'] = $value['catatan'];
		        	$data_jadi[$i]['created_at'] = $value['created_at'];
		        	$data_jadi[$i]['deleted_at'] = $value['deleted_at'];
		        	$data_jadi[$i]['deleted_by'] = $value['deleted_by'];
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
		        	$data_jadi[$i]['jenis'] = $value['jenis'];
		        	$data_jadi[$i]['klasifikasi'] = $value['klasifikasi'];
		        	$data_jadi[$i]['kode_jra'] = $value['kode_jra'];
		        	$data_jadi[$i]['kode_klasifikasi'] = $value['kode_klasifikasi'];
		        	$data_jadi[$i]['no_registrasi_surat'] = $value['no_registrasi_surat'];
		        	$data_jadi[$i]['no_urut'] = $value['no_urut'];
		        	$data_jadi[$i]['nomor_surat'] = $value['nomor_surat'];
		        	$data_jadi[$i]['perihal'] = $value['perihal'];
		        	$data_jadi[$i]['prefix_kode_klasifikasi'] = $value['prefix_kode_klasifikasi'];
		        	$data_jadi[$i]['ringkasan'] = $value['ringkasan'];
		        	$data_jadi[$i]['sifat'] = $value['sifat'];
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
		    break;
		    case 'keluar':

				$this->db->from('tu_surat');
		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(tipe_surat = 'K' AND diarsipkan = '0' AND id_jabatan_asal = $id_jabatan AND deleted_at IS null)");

		        $total = $this->db->count_all_results(); 

		        $this->db->select('a.*,b.kode_jabatan,b.jabatan');
		        $this->db->from('tu_surat a');
		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(tipe_surat = 'K'  AND diarsipkan = '0' AND id_jabatan_asal = $id_jabatan AND deleted_at IS null)");
		        //$this->db->where('verified',1);

 				$sub = $this->subquery->start_subquery('select');
        		$sub->select('tr_klasifikasi_arsip.kode')->from('tr_klasifikasi_arsip');
        		$sub->where('tr_klasifikasi_arsip.id = a.id_klasifikasi');
        		$this->subquery->end_subquery('kode_klasifikasi');

        		$sub = $this->subquery->start_subquery('select');
        		$sub->select('tr_klasifikasi_arsip.klasifikasi')->from('tr_klasifikasi_arsip');
        		$sub->where('tr_klasifikasi_arsip.id = a.id_klasifikasi');
        		$this->subquery->end_subquery('klasifikasi');

		        $this->db->limit($limit, $start);
		        $this->db->order_by("a.created_at", "descdesc");
		        $this->db->join('tr_jabatan b', 'b.id = a.id_jabatan_asal','left');
		        $query = $this->db->get();

        		$data = array('data'=>$query->result(),'total'=>$total);
		    break;
		    case 'oprkeluar':
		    
				$this->db->from('tu_surat');
		        
		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(tipe_surat = 'K' AND id_pengolah = $id_pengguna AND deleted_at IS null)");
		        
		        $total = $this->db->count_all_results(); 

		        $this->db->select('a.*,b.kode_jabatan,b.jabatan');
		        $this->db->from('tu_surat a');
		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(tipe_surat = 'K' AND id_pengolah = $id_pengguna AND deleted_at IS null)");

 				$sub = $this->subquery->start_subquery('select');
        		$sub->select('tr_klasifikasi_arsip.kode')->from('tr_klasifikasi_arsip');
        		$sub->where('tr_klasifikasi_arsip.id = a.id_klasifikasi');
        		$this->subquery->end_subquery('kode_klasifikasi');

        		$sub = $this->subquery->start_subquery('select');
        		$sub->select('tr_klasifikasi_arsip.klasifikasi')->from('tr_klasifikasi_arsip');
        		$sub->where('tr_klasifikasi_arsip.id = a.id_klasifikasi');
        		$this->subquery->end_subquery('klasifikasi');

		        $this->db->limit($limit, $start);
		        $this->db->order_by("a.created_at", "desc");
		        $this->db->join('tr_jabatan b', 'b.id = a.id_jabatan_asal','left');
		        $query = $this->db->get();

		        $aData = $query->result_array();

		        $i=0;
		        $data_jadi=array();
		        foreach ($aData as $value) {
		        	# code...
		        	$data_jadi[$i]['asal_surat'] = $value['asal_surat'];
		        	$data_jadi[$i]['catatan'] = $value['catatan'];
		        	$data_jadi[$i]['created_at'] = $value['created_at'];
		        	$data_jadi[$i]['deleted_at'] = $value['deleted_at'];
		        	$data_jadi[$i]['deleted_by'] = $value['deleted_by'];
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
		        	$data_jadi[$i]['jabatan'] = $value['jabatan'];
		        	$data_jadi[$i]['jenis'] = $value['jenis'];
		        	$data_jadi[$i]['klasifikasi'] = $value['klasifikasi'];
		        	$data_jadi[$i]['kode_jabatan'] = $value['kode_jabatan'];
		        	$data_jadi[$i]['kode_jra'] = $value['kode_jra'];
		        	$data_jadi[$i]['kode_klasifikasi'] = $value['kode_klasifikasi'];
		        	$data_jadi[$i]['no_registrasi_surat'] = $value['no_registrasi_surat'];
		        	$data_jadi[$i]['no_urut'] = $value['no_urut'];
		        	$data_jadi[$i]['nomor_surat'] = $value['nomor_surat'];
		        	$data_jadi[$i]['perihal'] = $value['perihal'];
		        	$data_jadi[$i]['prefix_kode_klasifikasi'] = $value['prefix_kode_klasifikasi'];
		        	$data_jadi[$i]['ringkasan'] = $value['ringkasan'];
		        	$data_jadi[$i]['sifat'] = $value['sifat'];
		        	$data_jadi[$i]['tahun'] = $value['tahun'];
		        	$data_jadi[$i]['tgl_kirim'] = $value['tgl_kirim'];
		        	$data_jadi[$i]['tgl_surat'] = $value['tgl_surat'];
		        	$data_jadi[$i]['tgl_terima'] = $value['tgl_terima'];
		        	$data_jadi[$i]['tingkat_keamanan'] = $value['tingkat_keamanan'];
		        	$data_jadi[$i]['tipe_surat'] = $value['tipe_surat'];
		        	$data_jadi[$i]['tujuan_surat'] = $value['tujuan_surat'];
		        	$data_jadi[$i]['uniquecode'] = $value['uniquecode'];
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
		    break;
		    case 'cadangan':
		  	
		    break;		    
		    case 'archived':
		  		$this->db->from('tu_surat');		        
		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(verified = '1' AND diarsipkan = '1' AND deleted_at IS null)");

		  		$total = $this->db->count_all_results(); 

		  		$this->db->from('tu_surat');
		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(verified = '1' AND diarsipkan = '1' AND deleted_at IS null)");
		        $this->db->limit($limit, $start);
		        $this->db->order_by("created_at", "desc");
		  		$query = $this->db->get();
		  		$data = array('data'=>$query->result(),'total'=>$total);

		    break;

		    case 'unarchived':
		  		$this->db->from('tu_surat');
		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(verified = '1' AND diarsipkan = '0' AND dibaca = '1' AND deleted_at IS null)");		  		
		  		$total = $this->db->count_all_results(); 

		  		$this->db->from('tu_surat');
		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(verified = '1' AND diarsipkan = '0' AND dibaca = '1' AND deleted_at IS null)");
		        $this->db->limit($limit, $start);
		        $this->db->order_by("created_at", "desc");
		  		$query = $this->db->get();

		  		$data = array('data'=>$query->result(),'total'=>$total);
		    break;

		    case 'related':
		  		$this->db->from('tu_surat');
		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(verified = '1' AND deleted_at IS null)");		  		
		  		$total = $this->db->count_all_results(); 

		  		$this->db->from('tu_surat');
		        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(verified = '1' AND deleted_at IS null)");
		        $this->db->limit($limit, $start);
		        $this->db->order_by("created_at", "desc");
		  		$query = $this->db->get();

		  		$data = array('data'=>$query->result(),'total'=>$total);
		    break; 

		    case 'related_search':
		    	if ($this->input->get('relationcode', TRUE) == '0'){
		    		$this->db->from('tu_surat');
			        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
			        $this->db->where("(verified = '1' AND deleted_at IS null)");		  				  		
			  		$total = $this->db->count_all_results(); 

			  		$this->db->from('tu_surat');
			        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
			        $this->db->where("(verified = '1' AND deleted_at IS null)");
			        $this->db->limit($limit, $start);
			        $this->db->order_by("created_at", "desc");
			  		$query = $this->db->get();
		    	}else{
		    		$this->db->from('tu_surat');
			        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
			        $this->db->where("(verified = '1' AND deleted_at IS null AND relationcode <> '".$this->input->get('relationcode', TRUE)."')");		  				  		
			  		$total = $this->db->count_all_results(); 

			  		$this->db->from('tu_surat');
			        $this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
			        $this->db->where("(verified = '1' AND deleted_at IS null AND relationcode <> '".$this->input->get('relationcode', TRUE)."')");
			        $this->db->limit($limit, $start);
			        $this->db->order_by("created_at", "desc");
			  		$query = $this->db->get();
		    	}
		  		

		  		$data = array('data'=>$query->result(),'total'=>$total);
		    break;

		    case 'related_list':
		  		$this->db->from('tu_surat');
		        //$this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(relationcode = '".$this->input->get('relationcode', TRUE)."')");		  				  		
		  		$total = $this->db->count_all_results(); 

		  		$this->db->from('tu_surat');
		        //$this->db->where("(ringkasan LIKE '%$query%' OR asal_surat LIKE '%$query%' OR nomor_surat LIKE '%$query%' OR perihal LIKE '%$query%' OR catatan LIKE '%$query%')");
		        $this->db->where("(relationcode = '".$this->input->get('relationcode', TRUE)."')");
		        $this->db->limit($limit, $start);
		        $this->db->order_by("created_at", "desc");
		  		$query = $this->db->get();

		  		$data = array('data'=>$query->result(),'total'=>$total);
		    break;

		    case 'reservasi':
		  		$this->db->from('tu_register_surat_keluar');
		  		$this->db->where('aktif','0');
		  		$total = $this->db->count_all_results(); 

		  		$this->db->select('tu_register_surat_keluar.*');
		  		$this->db->from('tu_register_surat_keluar');
		  		$this->db->where('aktif','0');

				$sub = $this->subquery->start_subquery('select');
        		$sub->select('tr_jenis_dokumen.jenis')->from('tr_jenis_dokumen');
        		$sub->where('tr_jenis_dokumen.kode_jenis = tu_register_surat_keluar.jenis');
        		$this->subquery->end_subquery('jenis_lengkap');

 				$this->db->limit($limit, $start);
 				$this->db->order_by("created_on", "desc");
		  		$query = $this->db->get();
		  		$data = array('data'=>$query->result(),'total'=>$total);
		    break;
		    default:
		    break;
		}

		$this->response($data);
 	}
	
	public function filesurat_get()
	{
		$id_surat = $this->input->get('tu_surat_id', TRUE);
		$this->db->where('tu_surat_id',$id_surat);
        $total = $this->db->count_all_results('tu_file'); 

        $this->db->where('tu_surat_id',$id_surat);
        $query = $this->db->get('tu_file');
        
        $data = array('data'=>$query->result(),'total'=>$total);

		$this->response($data);
	}	

	public function nomor_urut($tahun,$tipe_surat)
    {
        $this->db->select_max('no_urut');
        $this->db->where('tahun',$tahun);
        $this->db->where('tipe_surat',$tipe_surat);
        $query = $this->db->get('tu_surat');

        $data = $query->result_array();

        if ($data[0]['no_urut']==null){
			return 1;
		}else{
			return intval($data[0]['no_urut'])+1;
		}
    }

    public function tentative_get()
    {
    	$tahun = $this->input->get('tahun');
    	$jenis = $this->input->get('jenis');
    	$unit_pemrakarsa = $this->input->get('unit_pemrakarsa');

    	$this->response($this->nomor_surat($tahun,$jenis,$unit_pemrakarsa));
    }

 	public function nomor_surat($tahun,$tipe_surat,$unit_pemrakarsa)
 	{

 		if (($tipe_surat == 'PERJ') or ($tipe_surat == 'SKU') or ($tipe_surat == 'BA') or ($tipe_surat == 'KET') or ($tipe_surat == 'SPN') or ($tipe_surat == 'PENG') or ($tipe_surat == 'LAP')){
	        $this->db->where_in('jenis',array('PERJ','SKU','BA','KET','SPN','PENG','LAP'));
		} else {
	        $this->db->where('jenis',$tipe_surat);
		}

		$this->db->select_max('nomor_urut');
	    $this->db->where('tahun',$tahun);
        $this->db->where('unit_pemrakarsa',$unit_pemrakarsa);
        $query = $this->db->get('tu_register_surat_keluar');
		$data = $query->result_array();

		if ($data[0]['nomor_urut']==null){
			return 1;
		}else{
			return intval($data[0]['nomor_urut'])+1;
		}
 	}

 	public function reserved_get(){
 		$id = $this->input->get('id');
 		$this->db->where('id',$id);

 		$this->db->select('*');

 		$sub = $this->subquery->start_subquery('select');
		$sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
		$sub->where('tr_jabatan.kode_jabatan = tu_register_surat_keluar.penandatangan');
		$this->subquery->end_subquery('penandatangan_lengkap');

        $query = $this->db->get('tu_register_surat_keluar');


		$data = $query->result_array();

		$this->response($data[0]);

 	}

 	//nomor untuk reservasi
 	public function nomor_surat_2($tahun,$tipe_surat,$unit_pemrakarsa)
 	{

 		if (($tipe_surat == 'PERJ') or ($tipe_surat == 'SKU') or ($tipe_surat == 'BA') or ($tipe_surat == 'KET') or ($tipe_surat == 'SPN') or ($tipe_surat == 'PENG') or ($tipe_surat == 'LAP')){
	        $this->db->where_in('jenis',array('PERJ','SKU','BA','KET','SPN','PENG','LAP'));
		} else {
	        $this->db->where('jenis',$tipe_surat);
		}

		$this->db->select_max('nomor_urut');
	    $this->db->where('tahun',$tahun);
        $this->db->where('unit_pemrakarsa',$unit_pemrakarsa);
        $query = $this->db->get('tu_register_surat_keluar');
		$data = $query->result_array();
		

		if ($data[0]['nomor_urut']==null){
			return 1;
		}else{
			return intval($data[0]['nomor_urut'])+1;
		}
 	}

 	public function simpan_reservasi_post(){
 		$data= $this->input->post();
 		$jumlah = $data['jumlah'];
 		$jenis = $data['jenis'];
 		$unker = $data['unker'];

 		$tahun = date_format(new DateTime(), 'Y');
 		$bulan = date_format(new DateTime(), 'm');

 		for ($i=0;$i<$jumlah;$i++){
 			
 			//belum -- set id_jabatan_asal
 			/*$this->db->select('id');
		    $this->db->where('kode',$unker);
	        $query = $this->db->get('tr_unker');
			$data = $query->result_array();*/

 			$insert['jenis'] = $jenis;
	        $insert['nomor_urut'] = $this->nomor_surat_2($tahun,$jenis,$unker);
	        $insert['unit_pemrakarsa'] = $data['unker'];
	        //$insert['id_jabatan_asal'] = $data[0]['id'];
	        $insert['tahun'] = $tahun;
	        $insert['bulan'] = $bulan;
	        $insert['aktif'] = '0';
	        //$insert['no_surat'] = $data['nomor_surat'];
	        $insert['verified'] = '0';
	        $insert['created_by'] = $this->session->userdata('username');

        	$this->db->insert('tu_register_surat_keluar', $insert); 
 		}
		//$this->response($nomor);
 	}

 	public function simpan_1_post(){
 		$data = $this->input->post();
 		$data['created_by'] = $this->session->userdata('username');
 		//$data['tgl_surat'] = $this->session->userdata('tgl_surat');
 		$data['tahun'] = date_format(new DateTime($this->session->userdata('tgl_surat')), 'Y');
 		$data['no_urut'] = $this->nomor_urut( $data['tahun'],'M');
 		$data['uniquecode'] = random_string('alnum', 6);
 		$data['relationcode'] = random_string('alnum', 6);

 		$log_surat['tanggal'] = date('Y/m/d h:i');
 		$log_surat['uniquecode'] = $data['uniquecode'];
 		$log_surat['aksi'] = 'surat diregister oleh '.$this->session->userdata('nama_lengkap');
 		$this->db->insert('log_surat', $log_surat); 

        $this->db->insert('tu_surat', $data); 
        $id = $this->db->insert_id();

 		$this->response(array('success'=>true,'id_surat'=>$id));
 	}

 	//simpan dari form reservasi
 	public function simpan_4_post(){
 		$dataku = $this->input->post();

 		$simpan['unit_pemrakarsa'] = $dataku['unit_pemrakarsa'];
 		
 		$simpan['created_by'] = $this->session->userdata('username');
 		$simpan['no_urut'] = $this->nomor_urut( $this->input->post('tahun'),'K');
 		$simpan['uniquecode'] = random_string('alnum', 6);
 		$simpan['relationcode'] = random_string('alnum', 6);
        
 		$simpan['tahun']=$dataku['tahun'];
		$simpan['tipe_surat']=$dataku['tipe_surat'];
		$simpan['verified_by']=$dataku['verified_by'];
		$simpan['verified_on']=$dataku['verified_on'];
		$simpan['id_pengolah']=$dataku['id_pengolah'];
		$simpan['created_by']=$dataku['created_by'];
		$simpan['verified']=$dataku['verified'];
		$simpan['jenis']=$dataku['jenis'];
		$simpan['tgl_kirim']=$dataku['tgl_kirim'];
		$simpan['id_klasifikasi']=$dataku['id_klasifikasi'];
		$simpan['ringkasan']=$dataku['ringkasan'];
		$simpan['catatan']=$dataku['catatan'];
		$simpan['perihal']=$dataku['perihal'];
		$simpan['asal_surat']=$dataku['asal_surat'];
		$simpan['tujuan_surat']=$dataku['tujuan_surat'];
		$simpan['id_jabatan_asal']=$dataku['id_jabatan_asal'];
		$simpan['no_registrasi_surat']=$dataku['no_registrasi_surat'];
		$simpan['tgl_surat']=$dataku['tgl_surat'];
		$simpan['nomor_surat']=$dataku['nomor_surat'];
		$simpan['urgensi']=$dataku['urgensi'];
		$simpan['sifat']=$dataku['sifat'];
		


		//get kode klasifikasi
		$this->db->select('kode');
        $this->db->where('id',$dataku['id_klasifikasi']);
        $query = $this->db->get('tr_klasifikasi_arsip');
		$cur_klasifikasi = $query->result_array();
		$simpan['kode_klasifikasi'] = $cur_klasifikasi[0]['kode'];

        $this->db->insert('tu_surat', $simpan); 

        $id = $this->db->insert_id();
        
        $no_surat = $dataku['nomor_surat'];

        $insert['klasifikasi'] = $cur_klasifikasi[0]['kode'];
        $insert['aktif'] = 1;
        $insert['penandatangan'] = $dataku['penandatangan'];
        $insert['id_jabatan_asal'] = $simpan['id_jabatan_asal'];
        $insert['no_surat'] = $no_surat;
        $insert['uniquecode'] = $simpan['uniquecode'] ;
		$this->db->where('id', $dataku['id_register']);
        $this->db->update('tu_register_surat_keluar', $insert); 

 		$log_surat['tanggal'] = date('Y/m/d h:i');
 		$log_surat['uniquecode'] = $simpan['uniquecode'];
 		$log_surat['aksi'] = 'surat diregister oleh '.$this->session->userdata('nama_lengkap');
 		$this->db->insert('log_surat', $log_surat); 

 		/*$this->db->insert('tu_surat', $data); 
        $id = $this->db->insert_id();*/
 		
 		$this->response(array('success'=>true,'id_surat'=>$id));
 	}

 	public function simpan_3_post(){
 		$data = $this->input->post();
 		
 		$data['created_by'] = $this->session->userdata('username');
 		$data['no_registrasi_surat'] = $this->nomor_surat( $this->input->post('tahun'),$data['jenis'],$data['unit_pemrakarsa']);
 		$data['no_urut'] = $this->nomor_urut( $this->input->post('tahun'),'K');
 		$data['uniquecode'] = random_string('alnum', 6);
 		$data['relationcode'] = random_string('alnum', 6);
        
		//get kode klasifikasi
		$this->db->select('kode');
        $this->db->where('id',$data['id_klasifikasi']);
        $query = $this->db->get('tr_klasifikasi_arsip');
		$cur_klasifikasi = $query->result_array();

		//get kode jabatan
		$this->db->select('kode_jabatan');
        $this->db->where('id',$data['id_jabatan_asal']);
        $query = $this->db->get('tr_jabatan');
		$cur_jabatan = $query->result_array();

		$data['tahun'] = date_format(new DateTime($data['tgl_surat']), 'Y');
		$bulan = date_format(new DateTime($data['tgl_surat']), 'm');

        if ($data['jenis'] == 'KEP'){
        	$data['nomor_surat'] = $data['no_registrasi_surat'].' Tahun '.$data['tahun'];
        } else if ($data['jenis'] == 'PED'){
        	$data['nomor_surat'] = $data['no_registrasi_surat'].' Tahun '.$data['tahun'];
        } else if ($data['jenis'] == 'TUG'){
        	//nomor+'/'+unit_pemrakarsa+'/'+bulan+'/'+tahun;
        	$data['nomor_surat'] = $data['no_registrasi_surat'].'/'.$data['unit_pemrakarsa'].'/'.$bulan.'/'.$data['tahun'];
        } else if ($data['jenis'] == 'SDK'){
        	if (($data['sifat']=='rahasia') or ($data['sifat']=='sangatrahasia'))
        	{
        		$data['nomor_surat'] = 'R-'.$data['no_registrasi_surat'].'/K.LSN/'.$cur_klasifikasi[0]['kode'].'/'.$bulan.'/'.$data['tahun'];
        	}else{
        		$data['nomor_surat'] = $data['no_registrasi_surat'].'/K.LSN/'.$cur_klasifikasi[0]['kode'].'/'.$bulan.'/'.$data['tahun'];
        	}
        } else if ($data['jenis'] == 'SDP'){
        	//$data['nomor_surat'] = $data['no_registrasi_surat'].'/LSN/'.$cur_jabatan[0]['kode_jabatan'].'/'.$cur_klasifikasi[0]['kode'].'/'.$bulan.'/'.$data['tahun'];
        	$data['nomor_surat'] = $data['no_registrasi_surat'].'/LSN/'.$data['unit_pemrakarsa'].'/'.$cur_klasifikasi[0]['kode'].'/'.$bulan.'/'.$data['tahun'];
        } else if ($data['jenis'] == 'ND'){
        	$data['nomor_surat'] = $data['no_registrasi_surat'].'/'.$data['unit_pemrakarsa'].'/'.$cur_klasifikasi[0]['kode'].'/'.$bulan.'/'.$data['tahun'];
        } else if ($data['jenis'] == 'PERJ'){
        	$data['nomor_surat'] = $data['jenis'].'.'.$data['no_registrasi_surat'].'/'.$data['unit_pemrakarsa'].'/'.$cur_klasifikasi[0]['kode'].'/'.$bulan.'/'.$data['tahun'];
        } else if ($data['jenis'] == 'SKU'){
        	$data['nomor_surat'] = $data['jenis'].'.'.$data['no_registrasi_surat'].'/'.$data['unit_pemrakarsa'].'/'.$cur_klasifikasi[0]['kode'].'/'.$bulan.'/'.$data['tahun'];
        } else if ($data['jenis'] == 'BA'){
        	$data['nomor_surat'] = $data['jenis'].'.'.$data['no_registrasi_surat'].'/'.$data['unit_pemrakarsa'].'/'.$cur_klasifikasi[0]['kode'].'/'.$bulan.'/'.$data['tahun'];
        } else if ($data['jenis'] == 'KET'){
        	$data['nomor_surat'] = $data['jenis'].'.'.$data['no_registrasi_surat'].'/'.$data['unit_pemrakarsa'].'/'.$cur_klasifikasi[0]['kode'].'/'.$bulan.'/'.$data['tahun'];
        } else if ($data['jenis'] == 'SPN'){
        	$data['nomor_surat'] = $data['jenis'].'.'.$data['no_registrasi_surat'].'/'.$data['unit_pemrakarsa'].'/'.$cur_klasifikasi[0]['kode'].'/'.$bulan.'/'.$data['tahun'];
        } else if ($data['jenis'] == 'PENG'){
        	$data['nomor_surat'] = $data['jenis'].'.'.$data['no_registrasi_surat'].'/'.$data['unit_pemrakarsa'].'/'.$cur_klasifikasi[0]['kode'].'/'.$bulan.'/'.$data['tahun'];
        } else if ($data['jenis'] == 'LAP'){
        	$data['nomor_surat'] = $data['jenis'].'.'.$data['no_registrasi_surat'].'/'.$data['unit_pemrakarsa'].'/'.$cur_klasifikasi[0]['kode'].'/'.$bulan.'/'.$data['tahun'];
        } else if ($data['jenis'] == 'PER'){
        	$data['nomor_surat'] = $data['no_registrasi_surat'].' Tahun '.$data['tahun'];
        } else if ($data['jenis'] == 'INS'){
        	$data['nomor_surat'] = $data['no_registrasi_surat'].' Tahun '.$data['tahun'];
        } else if ($data['jenis'] == 'JUK'){
        	$data['nomor_surat'] = $data['no_registrasi_surat'].' Tahun '.$data['tahun'];
        } else {
        	$data['nomor_surat'] = '';
        }

        $this->db->insert('tu_surat', $data); 

        $id = $this->db->insert_id();
        $no_surat = $data['nomor_surat'];
        
        //$segment = explode('/',$no_surat);
        //$jenis= explode('.',$segment[0]);
        $insert['jenis'] = $data['jenis'];
        $insert['nomor_urut'] = $data['no_registrasi_surat'];
        $insert['penandatangan'] = $cur_jabatan[0]['kode_jabatan'];
        $insert['id_jabatan_asal'] = $data['id_jabatan_asal'];
        $insert['unit_pemrakarsa'] = $data['unit_pemrakarsa'];
        $insert['klasifikasi'] = $cur_klasifikasi[0]['kode'];
        $insert['bulan'] = $bulan;
        $insert['uniquecode'] = $data['uniquecode'];
        $insert['tahun'] = $data['tahun'];
        $insert['aktif'] = 1;
        $insert['no_surat'] = $data['nomor_surat'];
        $insert['verified'] = '1';
        $insert['created_by'] = $this->session->userdata('username');

        $this->db->insert('tu_register_surat_keluar', $insert); 

 		$log_surat['tanggal'] = date('Y/m/d h:i');
 		$log_surat['uniquecode'] = $data['uniquecode'];
 		$log_surat['aksi'] = 'surat diregister oleh '.$this->session->userdata('nama_lengkap');
 		$this->db->insert('log_surat', $log_surat); 

 		/*$this->db->insert('tu_surat', $data); 
        $id = $this->db->insert_id();*/
 		
 		$this->response(array('success'=>true,'id_surat'=>$id));
 	}

 	public function arsip_post(){
 		$datestring = "%Y/%m/%d %h:%i:%a";
		$time = time();
		//echo mdate($datestring, $time);

 		$data = $this->input->post();
 		$id = $this->input->post('id');

		$log_surat['tanggal'] = date('Y/m/d h:i');
 		$log_surat['uniquecode'] = $data['uniquecode'];
 		$log_surat['aksi'] = 'surat diarsip oleh '.$this->session->userdata('jabatan');
 		$this->db->insert('log_surat', $log_surat);
 		$data['diarsipkan'] = 1;

 		$data['archived_by'] = $this->session->userdata('username');
 		$data['archived_at'] = mdate($datestring, $time);
		//$this->surat_model->update_suratmasuk1($data,$id);

		$this->db->where('id', $id);
		//var_dump($data);
 		$this->response(array('success'=>$this->db->update('tu_surat', $data)));
 	}

 	public function update_post(){
 		$datestring = "%Y/%m/%d %h:%i";
		$time = time();
		//echo mdate($datestring, $time);

 		$data = $this->input->post();
 		$id = $this->input->post('id');

 		if ($data['verified']=='1'){
 			$this->db->select('uniquecode');
	        $this->db->where('id',$id);
	        $query = $this->db->get(' tu_surat');
			$cur_surat = $query->result_array();

 			$log_surat['tanggal'] = date('Y/m/d h:i');
	 		$log_surat['uniquecode'] = $cur_surat[0]['uniquecode'];
	 		$log_surat['aksi'] = 'surat diverifikasi oleh '.$this->session->userdata('jabatan');
	 		$this->db->insert('log_surat', $log_surat);
 		}
 		
 		if ($data['dibaca']=='1'){

 			$this->db->select('uniquecode');
	        $this->db->where('id',$id);
	        $query = $this->db->get(' tu_surat');
			$cur_surat = $query->result_array();

 			//$log_surat['tanggal'] = date('Y/m/d h:i');
 			$log_surat['tanggal'] = date('Y/m/d h:i');
	 		$log_surat['uniquecode'] = $cur_surat[0]['uniquecode'];
	 		$log_surat['aksi'] = 'surat dibaca oleh '.$this->session->userdata('jabatan');
	 		$this->db->insert('log_surat', $log_surat);
 		}

 		$data['edited_by'] = $this->session->userdata('username');
 		$data['edited_at'] = mdate($datestring, $time);
		//$this->surat_model->update_suratmasuk1($data,$id);

		$this->db->where('id', $id);
		//var_dump($data);
 		$this->response(array('success'=>$this->db->update('tu_surat', $data)));
 	}
 	
 	//simpan file 
 	public function simpan_2_post(){
 		$tu_surat_id = $this->input->post('tu_surat_id');

		$this->db->select('uniquecode');
        $this->db->where('id',$tu_surat_id);
        $query = $this->db->get(' tu_surat');
		$cur_surat = $query->result_array();

 		$config['upload_path'] = $this->config->item('upload_path');
		$config['allowed_types'] = $this->config->item('allowed_types');
		$config['max_size']	= $this->config->item('max_size');

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

				$NewName = date('Ymdhis').'_S_'.$tu_surat_id.'_'.$_FILES['myfile']['name'][$i];
				$config['file_name']=$NewName;

				$this->upload->initialize($config);

				//$this->upload->do_upload();
				
				if ($this->upload->do_upload()){
					$datafile = $this->upload->data();
					$save['tu_surat_id'] = $tu_surat_id;
					$save['uniquecode'] = $cur_surat[0]['uniquecode'];
					$save['id_pengguna'] = $this->session->userdata('id');
					$save['created_by'] = $this->session->userdata('username');
					$save['nama_file'] = $datafile['file_name'];
					$this->db->insert('tu_file', $save);
					$data=array('success'=>true,'file'=>$datafile['file_name']); 
				}else{
					$data=array('success'=>false,'error'=>$this->upload->display_errors()); 
				}
			}

			 	$log_surat['tanggal'] = date('Y/m/d h:i');
		 		$log_surat['uniquecode'] = $cur_surat[0]['uniquecode'];
		 		$log_surat['aksi'] = $this->session->userdata('nama_lengkap').' menambahkan '.$countFiles.' file lampiran';
		 		$this->db->insert('log_surat', $log_surat); 

			//$data=array('success'=>true,'file'=>$_FILES['myfile']['name'][0]);
		} 
		
		//simpan metadata ke database
	
		$this->response($data);
 	}

 	public function update_rel_get(){
 		$id = $this->input->get('id');
 		$data['relationcode'] = $this->input->get('relationcode');

 		$this->db->where('id', $id);
 		$this->response(array('success'=>$this->db->update('tu_surat', $data)));
 	}

 	public function checknumber_get(){

 		$this->db->from('tu_surat');
        $this->db->where("(nomor_surat = '".$this->input->get('nomor_surat', TRUE)."')");		  				  		
        $this->db->where("(deleted_at is NULL)");		  				  		
  		$total = $this->db->count_all_results();

  		$this->response($total);
 	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/inmail.php */