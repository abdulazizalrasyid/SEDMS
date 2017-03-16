<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Referensi extends REST_Controller {

	public function __construct(){
		parent:: __construct();
		//$this->load->model(array('login_model'));
		$this->load->library('session');
		//$this->load->library('subquery');
 	}
 	public function jenis_get()
 	{
		$start = $this->input->get('start', TRUE);
		$limit = $this->input->get('limit', TRUE);
		$request = $this->input->get('query', TRUE);

		$this->db->like('jenis',$request,'both');
        $this->db->where('active',1);
        $this->db->where('deleted_on',null);
        $total = $this->db->count_all_results('tr_jenis_dokumen');         

        $this->db->like('jenis',$request,'both');
        $this->db->where('active',1);
        $this->db->where('deleted_on',null);
        $query = $this->db->get('tr_jenis_dokumen');

        $data = array('data'=>$query->result(),'total'=>$total);

		$this->response($data);
 	}
 	public function jra_get()
    {
        $start = $this->input->get('start', TRUE);
        $limit = $this->input->get('limit', TRUE);
        $request = $this->input->get('query', TRUE);
        $primer = $this->input->get('primer', TRUE);
        
        $this->db->where("(kode LIKE '%$primer%')");
        $this->db->where("(klasifikasi LIKE '%$request%' OR kode LIKE '%$request%')");
        $this->db->where('(active = 1 AND deleted_on IS null)');
        $total = $this->db->count_all_results('tr_jra');         

        //$this->db->select("id, SUBSTRING(\"kode\",1,8) AS kode, klasifikasi",FALSE);
        $this->db->select("id, kode, klasifikasi");
        $this->db->where("(kode LIKE '%$primer%')");
        $this->db->where("(klasifikasi LIKE '%$request%' OR kode LIKE '%$request%')");
        $this->db->where('(active = 1 AND deleted_on IS null)');
        $this->db->order_by("kode", "asc"); 
        $query = $this->db->get('tr_jra');
        $aData = $query->result_array();
        //var_dump($query->result());
        $i=0;
        $data_jadi=array();

        foreach ($aData as $value) {
            $data_jadi[$i]['id'] = $value['id'];
            $data_jadi[$i]['kode'] = substr($value['kode'], 0, 8);
            $data_jadi[$i]['klasifikasi'] = $value['klasifikasi'];
            $i=$i+1;
        }

        $data = array('data'=>$data_jadi,'total'=>$total);

        $this->response($data);
    }
    public function klasifikasi_get()
    {
        $start = $this->input->get('start', TRUE);
        $limit = $this->input->get('limit', TRUE);
        $request = $this->input->get('query', TRUE);
        $primer = $this->input->get('primer', TRUE);
        
        $this->db->where("(kode LIKE '%$primer%')");
        $this->db->where("(klasifikasi LIKE '%$request%' OR kode LIKE '%$request%')");
        $this->db->where('(active = 1 AND deleted_on IS null)');
        $total = $this->db->count_all_results('tr_klasifikasi_arsip');         

        //$this->db->select("id, SUBSTRING(\"kode\",1,8) AS kode, klasifikasi",FALSE);
        $this->db->select("id, kode, klasifikasi");
        $this->db->where("(kode LIKE '%$primer%')");
        $this->db->where("(klasifikasi LIKE '%$request%' OR kode LIKE '%$request%')");
        $this->db->where('(active = 1 AND deleted_on IS null)');
        $this->db->order_by("kode", "asc"); 
        $query = $this->db->get('tr_klasifikasi_arsip');
        $aData = $query->result_array();
        //var_dump($query->result());
        $i=0;
        $data_jadi=array();

        foreach ($aData as $value) {
            $data_jadi[$i]['id'] = $value['id'];
            $data_jadi[$i]['kode'] = substr($value['kode'], 0, 8);
            $data_jadi[$i]['klasifikasi'] = $value['klasifikasi'];
            $i=$i+1;
        }

        $data = array('data'=>$data_jadi,'total'=>$total);

        $this->response($data);
    }
    public function klasifikasi_short_get()
 	{
		$start = $this->input->get('start', TRUE);
		$limit = $this->input->get('limit', TRUE);
		$request = $this->input->get('query', TRUE);
        
        $this->db->where("(klasifikasi LIKE '%$request%' OR kode LIKE '%$request%')");
        $this->db->where('(CHAR_LENGTH(kode) = 2 AND active = 1 AND deleted_on IS null)');
        $total = $this->db->count_all_results('tr_klasifikasi_arsip');         

        $this->db->where("(klasifikasi LIKE '%$request%' OR kode LIKE '%$request%')");
        $this->db->where('(CHAR_LENGTH(kode) = 2 AND active = 1 AND deleted_on IS null)');
        $query = $this->db->get('tr_klasifikasi_arsip');

        $data = array('data'=>$query->result(),'total'=>$total);

		$this->response($data);
 	}

    public function nourutrequest_get()
    {

        $tahun = $this->input->get('tahun', TRUE);
        $tipe_surat = $this->input->get('tipe_surat', TRUE);

        $this->db->select_max('no_urut');
        $this->db->where('tahun',$tahun);
        $this->db->where('tipe_surat',$tipe_surat);
        $query = $this->db->get('tu_surat ');

        $data = $query->result_array();

        $this->response($data[0]);
    }

    public function nosurat_get()
    {
        $tahun = $this->input->get('tahun', TRUE);
        $jenis = $this->input->get('jenis', TRUE);
        $penandatangan = $this->input->get('id_jabatan_asal', TRUE);

        $this->db->select_max('nomor_urut');
        $this->db->where('tahun',$tahun);
        $this->db->where('jenis',$jenis);
        $this->db->where('id_jabatan_asal',$penandatangan);
        $query = $this->db->get('tu_register_surat_keluar ');

        $data = $query->result_array();

        $parse = $data[0]['nomor_urut']+1;
        $this->response($parse);
    }

    public function jnsdisposisi_get()
    {
        $start = $this->input->get('start', TRUE);
        $limit = $this->input->get('limit', TRUE);
        //$request = $this->input->get('query', TRUE);
        //$id_jabatan = $this->input->get('id_jabatan', TRUE);
        //$data = $this->reference_model->get_jnsdisposisi($limit,$start);

        $query = $this->db->get(' tr_jenis_disposisi ');
        $this->db->limit($limit, $start);
        $data = $query->result_array();
        
        $this->response($data);
    }

    public function jabatan_get()
    {
        $start = $this->input->get('start', TRUE);
        $limit = $this->input->get('limit', TRUE);
        $request = $this->input->get('query', TRUE);
        //$data = $this->reference_model->get_jabatan($start,$limit,$request);

        $this->db->select('*');
        $this->db->like('tr_jabatan.jabatan',$request,'both');
        $this->db->where('tr_jabatan.deleted_on',null);
        $total = $this->db->count_all_results('tr_jabatan');         

        $this->db->select('*');
        $this->db->like('tr_jabatan.jabatan',$request,'both');
        $this->db->where('tr_jabatan.deleted_on',null);
        $query = $this->db->get('tr_jabatan');

        $data = array('data'=>$query->result(),'total'=>$total);

        $this->response($data);

    }
    /*jabatan untuk pendaftaran pengguna*/
    public function jabatan2_get()
    {
        $start = $this->input->get('start', TRUE);
        $limit = $this->input->get('limit', TRUE);
        $request = $this->input->get('query', TRUE);
        $current_jabatan = $this->input->get('current_jabatan', TRUE);   

        $this->db->select('tr_jabatan.*');
        $this->db->like('tr_jabatan.jabatan',$request,'both');
        $this->db->where('tr_jabatan.deleted_on',null);
        $this->db->where('tu_pengguna.id_jabatan',null);
        $this->db->where('tr_jabatan.active',1);
        $this->db->join('tu_pengguna', 'tu_pengguna.id_jabatan = tr_jabatan.id','left');

        $query = $this->db->get('tr_jabatan')->result_array();

        $i=0;
        $daftar_jabatan = array();
        foreach ($query as $value) {
            $daftar_jabatan[$i]['id']=$value['id'];
            $daftar_jabatan[$i]['kode_jabatan']=$value['kode_jabatan'];
            $daftar_jabatan[$i]['jabatan']=$value['jabatan'];
            $daftar_jabatan[$i]['kode_unker']=$value['kode_unker'];
            $i=$i+1;
        }

        $this->db->select('tr_jabatan.*');
        $this->db->like('tr_jabatan.jabatan',$request,'both');
        $this->db->where('tr_jabatan.deleted_on',null);
        //$this->db->where('tu_pengguna.id_jabatan',$current_jabatan);
        $this->db->where('tu_pengguna.id_jabatan',null);
        $this->db->join('tu_pengguna', 'tu_pengguna.id_jabatan = tr_jabatan.id','left');

        $query = $this->db->get('tr_jabatan')->result_array();
                
        foreach ($query as $value) {
            $daftar_jabatan[$i]['id']=$value['id'];
            $daftar_jabatan[$i]['kode_jabatan']=$value['kode_jabatan'];
            $daftar_jabatan[$i]['jabatan']=$value['jabatan'];
            $daftar_jabatan[$i]['kode_unker']=$value['kode_unker'];
            $i=$i+1;
        }
        //$data = array('data'=>$query->result());
        if ($daftar_jabatan == array()) {
            $daftar_jabatan[0]['id']='';
            $daftar_jabatan[0]['jabatan']='Data tidak ditemukan';
            $data = array('data' => $daftar_jabatan );
        } else {
             $data = array('data'=>$daftar_jabatan);
        }
       

        $this->response($data);

    }/*jabatan untuk pendaftaran pengguna dengan jabatan kosong*/
    public function jabatan3_get()
    {
        $start = $this->input->get('start', TRUE);
        $limit = $this->input->get('limit', TRUE);
        $request = $this->input->get('query', TRUE);

        $this->db->select('tr_jabatan.*');
        $this->db->like('tr_jabatan.jabatan',$request,'both');
        $this->db->where('tr_jabatan.deleted_on',null);
        $this->db->where('tu_pengguna.id_jabatan',null);
        $this->db->where('tr_jabatan.active',1);
        $this->db->join('tu_pengguna', 'tu_pengguna.id_jabatan = tr_jabatan.id','left');

        $query = $this->db->get('tr_jabatan')->result_array();

        $i=0;
        $daftar_jabatan = array();
        foreach ($query as $value) {
            $daftar_jabatan[$i]['id']=$value['id'];
            $daftar_jabatan[$i]['kode_jabatan']=$value['kode_jabatan'];
            $daftar_jabatan[$i]['jabatan']=$value['jabatan'];
            $daftar_jabatan[$i]['kode_unker']=$value['kode_unker'];
            $i=$i+1;
        }

        //$data = array('data'=>$query->result());
        if ($daftar_jabatan == array()) {
            $daftar_jabatan[0]['id']='';
            $daftar_jabatan[0]['jabatan']='Data tidak ditemukan';
            $data = array('data' => $daftar_jabatan );
        } else {
             $data = array('data'=>$daftar_jabatan);
        }

        $this->response($data);

    }	 	
}

/* End of file welcome.php */
/* Location: ./application/controllers/inmail.php */