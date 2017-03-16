<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Disposisi extends REST_Controller {

	public function __construct(){
		parent:: __construct();
		//$this->load->model(array('login_model'));
		$this->load->library('session');
		$this->load->library('subquery');
        $this->load->helper('date');
 	}
 	public function daftar_get()
 	{
		$filter = $this->input->get('query', TRUE);
		$start = $this->input->get('start', TRUE);
		$limit = $this->input->get('limit', TRUE);
		$id_surat = $this->input->get('id_surat', TRUE);
		$this->db->from('tu_disposisi');
        $this->db->where('id_surat',$id_surat);
        $total = $this->db->count_all_results(); 

        $this->db->select('b.*,a.perihal,a.catatan,a.tgl_surat,a.ringkasan,a.urgensi,a.sifat,a.id_jabatan as tujuan_surat,a.asal_surat as asal_surat,a.nomor_surat AS nomor_surat');

        $sub = $this->subquery->start_subquery('select');
        $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
        $sub->where('tr_jabatan.id = b.diteruskan');
        $this->subquery->end_subquery('jabatan');

        $sub = $this->subquery->start_subquery('select');
        $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
        $sub->where('b.id_jab_pengirim = tr_jabatan.id');
        $this->subquery->end_subquery('pengirim');

        $sub = $this->subquery->start_subquery('select');
        $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
        $sub->where('a.id_jabatan = tr_jabatan.id');
        $this->subquery->end_subquery('tujuan_surat_lengkap');
        
        $this->db->from('tu_disposisi b');
        $this->db->where('id_surat',$id_surat);
        $this->db->limit($limit, $start);
        $this->db->order_by("created_on", "desc");
        $this->db->join('tu_surat a', 'a.id = b.id_surat','left');
        $query = $this->db->get();

        $data = $query->result_array();

        //var_dump($data);
        $datajadi = array();
        $i=0;
        foreach ($data as $value) {

            $jenis[$i] = explode(';',$value['jns_disposisi']);
            
           // var_dump($jenis[$i]);
            $j=0;
            $jns_disposisi_long = '';
            foreach ($jenis[$i] as $value2) {

                $this->db->select('*');
                $this->db->from('tr_jenis_disposisi');
                $this->db->where('id',$value2);
                $query2 = $this->db->get();

                $jns[$j] = $query2->result_array();

                if (count($jns[$j])>0){
                    //var_dump($jns[$j][0]['disposisi']);
                    if ($jns_disposisi_long==''){
                        $jns_disposisi_long = $jns[$j][0]['disposisi'];
                    }else{
                        $jns_disposisi_long = $jns_disposisi_long.', '.$jns[$j][0]['disposisi'];
                    }
                    
                }
                $j=$j+1;
            }

            $datajadi[$i]['id'] = $value['id'];
            $datajadi[$i]['id_surat'] = $value['id_surat'];
            $datajadi[$i]['uniquecode'] = $value['uniquecode'];
            $datajadi[$i]['id_jab_pengirim'] = $value['id_jab_pengirim'];
            $datajadi[$i]['diteruskan'] = $value['diteruskan'];
            $datajadi[$i]['jns_disposisi'] = $value['jns_disposisi'];
            $datajadi[$i]['isi_disposisi'] = $value['isi_disposisi'];
            $datajadi[$i]['dibaca'] = $value['dibaca'];
            $datajadi[$i]['created_on'] = $value['created_on'];
            $datajadi[$i]['created_by'] = $value['created_by'];
            $datajadi[$i]['edited_on'] = $value['edited_on'];
            $datajadi[$i]['edited_by'] = $value['edited_by'];
            $datajadi[$i]['deleted_on'] = $value['deleted_on'];
            $datajadi[$i]['deleted_by'] = $value['deleted_by'];
            //$datajadi[$i]['kode_jabatan'] = $value['kode_jabatan'];
            $datajadi[$i]['jabatan'] = $value['jabatan'];
            $datajadi[$i]['pengirim'] = $value['pengirim'];

            //surat
            $datajadi[$i]['perihal'] = $value['perihal'];
            $datajadi[$i]['catatan'] = $value['catatan'];
            $datajadi[$i]['ringkasan'] = $value['ringkasan'];
            $datajadi[$i]['asal_surat'] = $value['asal_surat'];
            $datajadi[$i]['tujuan_surat'] = $value['tujuan_surat_lengkap'];
            $datajadi[$i]['nomor_surat'] = $value['nomor_surat'];
            $datajadi[$i]['tgl_surat'] = $value['tgl_surat'];
            $datajadi[$i]['urgensi'] = $value['urgensi'];
            $datajadi[$i]['sifat'] = $value['sifat'];

            $datajadi[$i]['jns_disposisi_long'] = $jns_disposisi_long;
            
            $i=$i+1;

            
        }
        //var_dump($datajadi);
        //return array('data'=>$query->result(),'total'=>$total);
        $data = array('data'=>$datajadi,'total'=>$total);
		
		$this->response($data);
 	}
    public function daftar_2_get(){
        switch ($this->input->get('type')) {
            case 'masuk':
                $filter = $this->input->get('query', TRUE);
                $start = $this->input->get('start', TRUE);
                $limit = $this->input->get('limit', TRUE);
                $id_jabatan = $this->input->get('id_jabatan', TRUE);

                //$data = $this->disposisi_model->daftar($filter,$limit,$start,$id_surat);
                $this->db->from('tu_disposisi');
                $this->db->where('diteruskan',$id_jabatan);
                $total = $this->db->count_all_results(); 

                //$this->db->select('tu_disposisi.*,tr_jabatan.kode_jabatan,tr_jabatan.jabatan,');
                $this->db->select('tu_disposisi.*,tu_surat.perihal,tu_surat.catatan,tu_surat.tgl_surat,tu_surat.ringkasan,tu_surat.urgensi,tu_surat.sifat,tu_surat.id_jabatan as tujuan_surat,tu_surat.asal_surat as asal_surat,tu_surat.nomor_surat AS nomor_surat');
              
                //$this->db->join('tr_jabatan', 'tr_jabatan.id = tu_disposisi.diteruskan','left');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = tu_disposisi.diteruskan');
                $this->subquery->end_subquery('jabatan');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
                $sub->where('tu_disposisi.id_jab_pengirim = tr_jabatan.id');
                $this->subquery->end_subquery('pengirim');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
                $sub->where('tu_surat.id_jabatan = tr_jabatan.id');
                $this->subquery->end_subquery('tujuan_surat_lengkap');
                
                $this->db->from('tu_disposisi');
                $this->db->where('diteruskan',$id_jabatan);
                $this->db->limit($limit, $start);
                $this->db->order_by("created_on", "desc");
                $this->db->join('tu_surat', 'tu_surat.id = tu_disposisi.id_surat','left');
                $query = $this->db->get();

                $data = $query->result_array();

                //var_dump($data);

                $datajadi = array();
                
                $i=0;
                foreach ($data as $value) {

                    $jenis[$i] = explode(';',$value['jns_disposisi']);
                    
                   //var_dump($value['id']);
                    $j=0;
                    $jns_disposisi_long = '';
                    foreach ($jenis[$i] as $value2) {

                        $this->db->select('*');
                        $this->db->from('tr_jenis_disposisi');
                        $this->db->where('id',$value2);
                        $query2 = $this->db->get();

                        $jns[$j] = $query2->result_array();

                        if (count($jns[$j])>0){
                            //var_dump($jns[$j][0]['disposisi']);
                            if ($jns_disposisi_long==''){
                                $jns_disposisi_long = $jns[$j][0]['disposisi'];
                            }else{
                                $jns_disposisi_long = $jns_disposisi_long.', '.$jns[$j][0]['disposisi'];
                            }
                            
                        }
                        $j=$j+1;
                    }

                    $datajadi[$i]['id'] =$value['id'];
                    $datajadi[$i]['id_surat'] = $value['id_surat'];
                    $datajadi[$i]['uniquecode'] = $value['uniquecode'];
                    $datajadi[$i]['id_jab_pengirim'] = $value['id_jab_pengirim'];
                    $datajadi[$i]['diteruskan'] = $value['diteruskan'];
                    $datajadi[$i]['jns_disposisi'] = $value['jns_disposisi'];
                    $datajadi[$i]['isi_disposisi'] = $value['isi_disposisi'];
                    $datajadi[$i]['dibaca'] = $value['dibaca'];
                    $datajadi[$i]['created_on'] = $value['created_on'];
                    $datajadi[$i]['created_by'] = $value['created_by'];
                    $datajadi[$i]['edited_on'] = $value['edited_on'];
                    $datajadi[$i]['edited_by'] = $value['edited_by'];
                    $datajadi[$i]['deleted_on'] = $value['deleted_on'];
                    $datajadi[$i]['deleted_by'] = $value['deleted_by'];
                    //$datajadi[$i]['kode_jabatan'] = $value['kode_jabatan'];
                    $datajadi[$i]['jabatan'] = $value['jabatan'];
                    $datajadi[$i]['pengirim'] = $value['pengirim'];

                    //surat
                    $datajadi[$i]['perihal'] = $value['perihal'];
                    $datajadi[$i]['catatan'] = $value['catatan'];
                    $datajadi[$i]['ringkasan'] = $value['ringkasan'];
                    $datajadi[$i]['asal_surat'] = $value['asal_surat'];
                    $datajadi[$i]['tujuan_surat'] = $value['tujuan_surat_lengkap'];
                    $datajadi[$i]['nomor_surat'] = $value['nomor_surat'];
                    $datajadi[$i]['tgl_surat'] = $value['tgl_surat'];
                    $datajadi[$i]['urgensi'] = $value['urgensi'];
                    $datajadi[$i]['sifat'] = $value['sifat'];

                    $datajadi[$i]['jns_disposisi_long'] = $jns_disposisi_long;
                    
                    $i=$i+1;

                    
                }
                //var_dump($datajadi);
                //return array('data'=>$query->result(),'total'=>$total);
                $data = array('data'=>$datajadi,'total'=>$total);
                
                $this->response($data);
            break;            
            case 'keluar':
                $filter = $this->input->get('query', TRUE);
                $start = $this->input->get('start', TRUE);
                $limit = $this->input->get('limit', TRUE);
                $id_jabatan = $this->input->get('id_jabatan', TRUE);

                //$data = $this->disposisi_model->daftar($filter,$limit,$start,$id_surat);
                $this->db->from('tu_disposisi');
                $this->db->where('id_jab_pengirim',$id_jabatan);
                $total = $this->db->count_all_results(); 

                //$this->db->select('tu_disposisi.*,tr_jabatan.kode_jabatan,tr_jabatan.jabatan,');
                $this->db->select('tu_disposisi.*,tu_surat.perihal,tu_surat.catatan,tu_surat.tgl_surat,tu_surat.ringkasan,tu_surat.urgensi,tu_surat.sifat,tu_surat.id_jabatan as tujuan_surat,tu_surat.asal_surat as asal_surat,tu_surat.nomor_surat AS nomor_surat');
              
                //$this->db->join('tr_jabatan', 'tr_jabatan.id = tu_disposisi.diteruskan','left');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
                $sub->where('tr_jabatan.id = tu_disposisi.diteruskan');
                $this->subquery->end_subquery('jabatan');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
                $sub->where('tu_disposisi.id_jab_pengirim = tr_jabatan.id');
                $this->subquery->end_subquery('pengirim');

                $sub = $this->subquery->start_subquery('select');
                $sub->select('tr_jabatan.jabatan')->from('tr_jabatan');
                $sub->where('tu_surat.id_jabatan = tr_jabatan.id');
                $this->subquery->end_subquery('tujuan_surat_lengkap');
                
                $this->db->from('tu_disposisi');
                $this->db->where('id_jab_pengirim',$id_jabatan);
                $this->db->limit($limit, $start);
                $this->db->order_by("created_on", "desc");
                $this->db->join('tu_surat', 'tu_surat.id = tu_disposisi.id_surat','left');
                $query = $this->db->get();

                $data = $query->result_array();

                //var_dump($data);
                $datajadi = array();
                $i=0;
                foreach ($data as $value) {

                    $jenis[$i] = explode(';',$value['jns_disposisi']);
                    
                   // var_dump($jenis[$i]);
                    $j=0;
                    $jns_disposisi_long = '';
                    foreach ($jenis[$i] as $value2) {

                        $this->db->select('*');
                        $this->db->from('tr_jenis_disposisi');
                        $this->db->where('id',$value2);
                        $query2 = $this->db->get();

                        $jns[$j] = $query2->result_array();

                        if (count($jns[$j])>0){
                            //var_dump($jns[$j][0]['disposisi']);
                            if ($jns_disposisi_long==''){
                                $jns_disposisi_long = $jns[$j][0]['disposisi'];
                            }else{
                                $jns_disposisi_long = $jns_disposisi_long.', '.$jns[$j][0]['disposisi'];
                            }
                            
                        }
                        $j=$j+1;
                    }

                    $datajadi[$i]['id'] =$value['id'];
                    $datajadi[$i]['id_surat'] = $value['id_surat'];
                    $datajadi[$i]['uniquecode'] = $value['uniquecode'];
                    $datajadi[$i]['id_jab_pengirim'] = $value['id_jab_pengirim'];
                    $datajadi[$i]['diteruskan'] = $value['diteruskan'];
                    $datajadi[$i]['jns_disposisi'] = $value['jns_disposisi'];
                    $datajadi[$i]['isi_disposisi'] = $value['isi_disposisi'];
                    $datajadi[$i]['dibaca'] = $value['dibaca'];
                    $datajadi[$i]['created_on'] = $value['created_on'];
                    $datajadi[$i]['created_by'] = $value['created_by'];
                    $datajadi[$i]['edited_on'] = $value['edited_on'];
                    $datajadi[$i]['edited_by'] = $value['edited_by'];
                    $datajadi[$i]['deleted_on'] = $value['deleted_on'];
                    $datajadi[$i]['deleted_by'] = $value['deleted_by'];
                    //$datajadi[$i]['kode_jabatan'] = $value['kode_jabatan'];
                    $datajadi[$i]['jabatan'] = $value['jabatan'];
                    $datajadi[$i]['pengirim'] = $value['pengirim'];

                    $datajadi[$i]['jns_disposisi_long'] = $jns_disposisi_long;

                     //surat
                    $datajadi[$i]['perihal'] = $value['perihal'];
                    $datajadi[$i]['catatan'] = $value['catatan'];
                    $datajadi[$i]['asal_surat'] = $value['asal_surat'];
                    $datajadi[$i]['ringkasan'] = $value['ringkasan'];
                    $datajadi[$i]['tujuan_surat'] = $value['tujuan_surat_lengkap'];
                    $datajadi[$i]['nomor_surat'] = $value['nomor_surat'];
                    $datajadi[$i]['tgl_surat'] = $value['tgl_surat'];
                    $datajadi[$i]['urgensi'] = $value['urgensi'];
                    $datajadi[$i]['sifat'] = $value['sifat'];
                    
                    $i=$i+1;

                    
                }
                //var_dump($datajadi);
                //return array('data'=>$query->result(),'total'=>$total);
                $data = array('data'=>$datajadi,'total'=>$total);
                
                $this->response($data);
            break;
        }
    }
    
    public function update_post(){
        $datestring = "%Y/%m/%d %h:%i:%a";
        $time = time();
        //echo mdate($datestring, $time);

        $data = $this->input->post();
        $id = $this->input->post('id');

        if ($data['dibaca']==1){

            $this->db->select('uniquecode');
            $this->db->where('id',$id);
            $query = $this->db->get('tu_disposisi');
            $cur_surat = $query->result_array();

            $log_surat['tanggal'] = date('Y/m/d h:i:s');
            $log_surat['uniquecode'] = $cur_surat[0]['uniquecode'];
            $log_surat['aksi'] = 'Disposisi dibaca oleh '.$this->session->userdata('jabatan');
            $this->db->insert('log_surat', $log_surat);
        }

        $data['edited_by'] = $this->session->userdata('username');
        $data['edited_on'] = mdate($datestring, $time);
        //$this->surat_model->update_suratmasuk1($data,$id);

        $this->db->where('id', $id);
        //var_dump($data);
        $this->response(array('success'=>$this->db->update('tu_disposisi', $data)));
    }

 	public function simpan_post()
 	{

		$data = $this->input->post();
		$jumlah_insert = count($data['diteruskan']);


        $this->db->select('uniquecode');
        $this->db->where('id',$data['id_surat']);
        $query = $this->db->get(' tu_surat');
        $cur_surat = $query->result_array();		
		//$log_surat['uniquecode'] = $cur_surat[0]['uniquecode'];

		for ($i = 0;$i<$jumlah_insert;$i++){
			$input['jns_disposisi'] = implode(';', $data['jns_disposisi']);
			$input['id_jab_pengirim'] = $data['id_jab_pengirim'];
			$input['uniquecode'] = $cur_surat[0]['uniquecode'];
            $input['isi_disposisi'] = $data['isi_disposisi'];
			//$input['jenis_surat'] = $data['jenis_surat'];
			$input['id_surat'] = $data['id_surat'];
			$input['diteruskan'] = $data['diteruskan'][$i];
			$input['created_by'] = $this->session->userdata('username');
			//var_dump($input);
			//$this->disposisi_model->simpan($input);
			$this->db->insert('tu_disposisi', $input); 

			$this->db->select('jabatan');
	        $this->db->where('id', $data['diteruskan'][$i]);
	        $query = $this->db->get(' tr_jabatan');
			$cur_diteruskan = $query->result_array();

			$log_surat['tanggal'] = date('Y/m/d h:i:s');
	 		$log_surat['uniquecode'] = $cur_surat[0]['uniquecode'];
	 		$log_surat['aksi'] = $this->session->userdata('jabatan').' mendisposisi ke '.$cur_diteruskan[0]['jabatan'];
	 		$this->db->insert('log_surat', $log_surat); 

		}

		$this->db->where('id', $data['id_surat']);
		$this->db->update('tu_surat',array('didisposisi' => 1,'edited_by'=>$this->session->userdata('username'),'edited_at'=>date(' Y/m/d h:i:s'))); 
 		
 		$this->response(array('success'=>true));
 	}
 	 	
}

/* End of file welcome.php */
/* Location: ./application/controllers/inmail.php */