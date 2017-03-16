<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Notifikasi extends REST_Controller {

	public function __construct(){
		parent:: __construct();
		$this->load->library('subquery');
 	}
 	public function daftar_get()
 	{
		$id_jabatan = $this->input->get('id_jabatan', TRUE);

		//get notifikasi surat masuk
		$this->db->from('tu_surat');

        $this->db->where('id_jabatan',$id_jabatan);
        $this->db->where('verified','1');
        $this->db->where('dibaca','0');
        $this->db->where('tipe_surat','M');

        $data['total_surat_masuk'] = $this->db->count_all_results(); 

        //get notifikasi surat verifikasi
    	$this->db->from('tu_surat');
        $this->db->where('verification_request_id_jab',$id_jabatan);
        $this->db->where('verified','0');
        $this->db->where('dibaca','0');
        $this->db->where('tipe_surat','M');

        $data['total_surat_verifikasi'] = $this->db->count_all_results(); 

        //get notifikasi disposisi
		$this->db->from('tu_disposisi');
        $this->db->where('diteruskan',$id_jabatan);
        $this->db->where('dibaca','0');

        $data['total_disposisi'] = $this->db->count_all_results();

        //get notifikasi nota dinas
    	$this->db->from('tu_surat');
        $this->db->where('id_jabatan',$id_jabatan);
        $this->db->where('verified','1');
        $this->db->where('dibaca','0');
        $this->db->where('tipe_surat','N');

        $data['total_nodin'] = $this->db->count_all_results();

		$this->response(array('data'=>$data));
 	}

    public function menu_atasan_get(){

        $id_atasan = $this->input->get('id_atasan', TRUE);

        //get notifikasi surat masuk
        $this->db->from('tu_surat');

        $this->db->where('id_jabatan',$id_atasan);
        $this->db->where('verified','1');
        $this->db->where('dibaca','0');
        $this->db->where('tipe_surat','M');

        $data['total_surat_masuk'] = $this->db->count_all_results(); 

        //get notifikasi surat verifikasi
        $this->db->from('tu_surat');

        $this->db->where('verification_request_id_jab',$id_atasan);
        $this->db->where('verified','0');
        $this->db->where('dibaca','0');
        $this->db->where('tipe_surat','M');

        $data['total_surat_verifikasi'] = $this->db->count_all_results(); 

        //get notifikasi disposisi
                $this->db->from('tu_disposisi');
        $this->db->where('diteruskan',$id_atasan);
        $this->db->where('dibaca','0');

        $data['total_disposisi'] = $this->db->count_all_results();

        //get notifikasi nota dinas
        $this->db->from('tu_surat');
        $this->db->where('id_jabatan',$id_atasan);
        $this->db->where('verified','1');
        $this->db->where('dibaca','0');
        $this->db->where('tipe_surat','N');

        $data['total_nodin'] = $this->db->count_all_results();

        $suratmasuk = intval($data['total_surat_masuk'])+intval($data['total_surat_verifikasi']);

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
            id_jab_verifikator = ".$id_atasan."
            ORDER BY a.created_on DESC
            ");

        $data['total_konsep'] = count($query->result());


        if ($suratmasuk > 0) {
                $aMenu[0]= array('text'=>"Surat (".$suratmasuk.")",'iconCls'=>'icon_inmail_36','tooltip'=>'Surat masuk','references'=>'mnSurat','listeners'=>array('click'=>'atasan_surat'));
        } else {
                $aMenu[0]= array('text'=>"Surat",'iconCls'=>'icon_inmail_36','tooltip'=>'Surat masuk','references'=>'mnSurat','listeners'=>array('click'=>'atasan_surat'));
        }

        if (intval($data['total_nodin']) > 0) {
                $aMenu[1]= array('text'=>"Nota Dinas (".$data['total_nodin'].")",'iconCls'=>'icon_innote_36','tooltip'=>'Nota Dinas','references'=>'mnNodin','listeners'=>array('click'=>'atasan_nodin'));
        }else{
                $aMenu[1]= array('text'=>"Nota Dinas",'iconCls'=>'icon_innote_36','tooltip'=>'Nota Dinas','references'=>'mnNodin','listeners'=>array('click'=>'atasan_nodin'));
        }

        //$aMenu[2]= array('text'=>"Konsep Surat",'iconCls'=>'icon_draft_36','tooltip'=>'Konsep Surat','references'=>'mnKonsep','listeners'=>array('click'=>'atasan_draft'));

        if (intval($data['total_konsep']) > 0) {
                $aMenu[2]= array('text'=>"Konsep Surat (".$data['total_konsep'].")",'iconCls'=>'icon_draft_36','tooltip'=>'Konsep Surat','references'=>'mnKonsep','listeners'=>array('click'=>'atasan_draft'));
        }else{
                $aMenu[2]= array('text'=>"Konsep Surat",'iconCls'=>'icon_draft_36','tooltip'=>'Konsep Surat','references'=>'mnKonsep','listeners'=>array('click'=>'atasan_draft'));  
        }

        if (intval($data['total_disposisi']) > 0) {
                $aMenu[3]= array('text'=>"Disposisi (".$data['total_disposisi'].")",'iconCls'=>'icon_inmail_disposisi_36','tooltip'=>'Disposisi','references'=>'mnDisposisi',"padding"=>'0 0 10px 0','listeners'=>array('click'=>'atasan_disposisi'));
        }else{
                $aMenu[3]= array('text'=>"Disposisi",'iconCls'=>'icon_inmail_disposisi_36','tooltip'=>'Disposisi','references'=>'mnDisposisi',"padding"=>'0 0 10px 0','listeners'=>array('click'=>'atasan_disposisi'));     
        }
        
        $this->response($aMenu);
        } 

    public function menu_get(){

            $id_jabatan = $this->input->get('id_jabatan', TRUE);

            //get notifikasi surat masuk
            $this->db->from('tu_surat');

            $this->db->where('id_jabatan',$id_jabatan);
            $this->db->where('verified','1');
            $this->db->where('dibaca','0');
            $this->db->where('tipe_surat','M');

            $data['total_surat_masuk'] = $this->db->count_all_results(); 

            //get notifikasi surat verifikasi
            $this->db->from('tu_surat');

            $this->db->where('verification_request_id_jab',$id_jabatan);
            $this->db->where('verified','0');
            $this->db->where('dibaca','0');
            $this->db->where('tipe_surat','M');

            $data['total_surat_verifikasi'] = $this->db->count_all_results(); 

            //get notifikasi disposisi
                    $this->db->from('tu_disposisi');
            $this->db->where('diteruskan',$id_jabatan);
            $this->db->where('dibaca','0');

            $data['total_disposisi'] = $this->db->count_all_results();

            //get notifikasi nota dinas
            $this->db->from('tu_surat');
            $this->db->where('id_jabatan',$id_jabatan);
            $this->db->where('verified','1');
            $this->db->where('dibaca','0');
            $this->db->where('tipe_surat','N');

            $unread_nodin = $this->db->count_all_results();

            $this->db->from('tu_surat');
            $this->db->where('verification_request_id_jab',$id_jabatan);
            $this->db->where('verified','0');
            //$this->db->where('dibaca','0');
            $this->db->where('tipe_surat','N');
            $ver_req_nodin = $this->db->count_all_results();

            $data['total_nodin'] = $unread_nodin+$ver_req_nodin;

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

            $data['total_konsep'] = count($query->result());

            $suratmasuk = intval($data['total_surat_verifikasi'])+intval($data['total_surat_masuk']);

            if ($suratmasuk > 0) {
                $aMenu[0]= array('text'=>"Surat (".$suratmasuk.")",'iconCls'=>'icon_inmail_36','tooltip'=>'Surat masuk','references'=>'mnSurat','listeners'=>array('click'=>'on_surat'));
            } else {
                $aMenu[0]= array('text'=>"Surat",'iconCls'=>'icon_inmail_36','tooltip'=>'Surat masuk','references'=>'mnSurat','listeners'=>array('click'=>'on_surat'));
            }

            if (intval($data['total_nodin']) > 0) {
                $aMenu[1]= array('text'=>"Nota Dinas (".$data['total_nodin'].")",'iconCls'=>'icon_innote_36','tooltip'=>'Nota Dinas','references'=>'mnNodin','listeners'=>array('click'=>'on_notadinas'));
            }else{
                $aMenu[1]= array('text'=>"Nota Dinas",'iconCls'=>'icon_innote_36','tooltip'=>'Nota Dinas','references'=>'mnNodin','listeners'=>array('click'=>'on_notadinas'));
            }

            //$aMenu[2]= array('text'=>"Konsep Surat",'iconCls'=>'icon_draft_36','tooltip'=>'Konsep Surat','references'=>'mnKonsep','listeners'=>array('click'=>'on_draft'));

            if (intval($data['total_konsep']) > 0) {
                    $aMenu[2]= array('text'=>"Konsep Surat (".$data['total_konsep'].")",'iconCls'=>'icon_draft_36','tooltip'=>'Konsep Surat','references'=>'mnKonsep','listeners'=>array('click'=>'on_draft'));
            }else{
                    $aMenu[2]= array('text'=>"Konsep Surat",'iconCls'=>'icon_draft_36','tooltip'=>'Konsep Surat','references'=>'mnKonsep','listeners'=>array('click'=>'on_draft'));  
            }

            if (intval($data['total_disposisi']) > 0) {
                    $aMenu[3]= array('text'=>"Disposisi (".$data['total_disposisi'].")",'iconCls'=>'icon_inmail_disposisi_36','tooltip'=>'Disposisi','references'=>'mnDisposisi',"padding"=>'0 0 10px 0','listeners'=>array('click'=>'on_disposisi'));
            }else{
                    $aMenu[3]= array('text'=>"Disposisi",'iconCls'=>'icon_inmail_disposisi_36','tooltip'=>'Disposisi','references'=>'mnDisposisi',"padding"=>'0 0 10px 0','listeners'=>array('click'=>'on_disposisi'));     
            }
            
            $this->response($aMenu);
    }
    public function menu_operator_get(){

        $id_jabatan = $this->input->get('id_jabatan', TRUE);

        //get notifikasi disposisi
        $this->db->from('tu_disposisi');
        $this->db->where('diteruskan',$id_jabatan);
        $this->db->where('dibaca','0');

        $data['total_disposisi'] = $this->db->count_all_results();

        //get notifikasi nota dinas
        $this->db->from('tu_surat');
        $this->db->where('id_jabatan',$id_jabatan);
        $this->db->where('verified','1');
        $this->db->where('dibaca','0');
        $this->db->where('tipe_surat','N');

        $data['total_nodin'] = $this->db->count_all_results();

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

        $data['total_konsep'] = count($query->result());

        $this->db->from('tu_konsep');
        $this->db->where('init_by',$id_jabatan);
        $this->db->where('aksi','final');
        $this->db->where('diproses',null);
        $data['total_final'] = $this->db->count_all_results(); 

        $konsep = intval($data['total_konsep'])+intval($data['total_final']);

        $aMenu[0]= array('text'=>"Registrasi Surat Masuk",'iconCls'=>'icon_inmail_register_36','tooltip'=>'Registrasi surat masuk','listeners'=>array('click'=>'on_register_surat_masuk'));
        $aMenu[1]= array('text'=>"Registrasi Surat Keluar",'iconCls'=>'icon_outmail_register_36','tooltip'=>'Registrasi surat keluar','listeners'=>array('click'=>'on_register_surat_keluar'));
        $aMenu[2]= array('text'=>"Surat yang diolah",'iconCls'=>'icon_inmail_36','tooltip'=>'Surat yang diolah','listeners'=>array('click'=>'on_surat_operator'));
        $aMenu[3]= array('text'=>"Laporan",'iconCls'=>'icon_report_36','tooltip'=>'membuat laporan dalam bentuk file spreadsheet','references'=>'mnKonsep','margin'=>'0 0 10px 0','listeners'=>array('click'=>'on_laporan_operator'));
        
        
        if (intval($data['total_disposisi']) > 0) {
            $aMenu[4]= array('text'=>"Disposisi (".$data['total_disposisi'].")",'iconCls'=>'icon_inmail_disposisi_36','tooltip'=>'Disposisi','references'=>'mnDisposisi','listeners'=>array('click'=>'on_disposisi'));
        }else{
            $aMenu[4]= array('text'=>"Disposisi",'iconCls'=>'icon_inmail_disposisi_36','tooltip'=>'Disposisi','references'=>'mnDisposisi','listeners'=>array('click'=>'on_disposisi'));     
        }

        if (intval($data['total_nodin']) > 0) {
            $aMenu[5]= array('text'=>"Nota Dinas (".$data['total_nodin'].")",'iconCls'=>'icon_innote_36','tooltip'=>'Nota Dinas','references'=>'mnNodin','listeners'=>array('click'=>'on_notadinas'));
        }else{
            $aMenu[5]= array('text'=>"Nota Dinas",'iconCls'=>'icon_innote_36','tooltip'=>'Nota Dinas','references'=>'mnNodin','listeners'=>array('click'=>'on_notadinas'));
        }
        //$aMenu[4]= array('text'=>"Disposisi",'iconCls'=>'icon_inmail_disposisi_36','tooltip'=>'Disposisi','listeners'=>array('click'=>'on_disposisi'));
        //$aMenu[5]= array('text'=>"Nota Dinas",'iconCls'=>'icon_innote_36','tooltip'=>'Nota dinas','listeners'=>array('click'=>'on_nodin'));
        if ($konsep > 0) {
            $aMenu[6]= array('text'=>"Konsep Surat (".$konsep.")",'iconCls'=>'icon_draft_36','tooltip'=>'Konsep Surat','references'=>'mnKonsep','listeners'=>array('click'=>'on_draft'));
        }else{
            $aMenu[6]= array('text'=>"Konsep Surat",'iconCls'=>'icon_draft_36','tooltip'=>'Konsep Surat','references'=>'mnKonsep','listeners'=>array('click'=>'on_draft'));
        }
        //$aMenu[6]= array('text'=>"Konsep Surat",'iconCls'=>'icon_draft_36','tooltip'=>'Konsep Surat','references'=>'mnKonsep','listeners'=>array('click'=>'on_draft'));

        $this->response($aMenu);
    }
    public function menu_staf_get(){

        $id_jabatan = $this->input->get('id_jabatan', TRUE);


        //get notifikasi disposisi
        $this->db->from('tu_disposisi');
        $this->db->where('diteruskan',$id_jabatan);
        $this->db->where('dibaca','0');

        $data['total_disposisi'] = $this->db->count_all_results();

        //get notifikasi nota dinas
        $this->db->from('tu_surat');
        $this->db->where('id_jabatan',$id_jabatan);
        $this->db->where('verified','1');
        $this->db->where('dibaca','0');
        $this->db->where('tipe_surat','N');

        $data['total_nodin'] = $this->db->count_all_results();

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




        $data['total_konsep'] = count($query->result());

        $this->db->from('tu_konsep');
        $this->db->where('init_by',$id_jabatan);
        $this->db->where('aksi','final');
        $this->db->where('diproses',null);
        $data['total_final'] = $this->db->count_all_results(); 

        $konsep = intval($data['total_konsep'])+intval($data['total_final']);


       /* $aMenu[0]= array('text'=>"Registrasi Surat Masuk",'iconCls'=>'icon_inmail_register_36','tooltip'=>'Registrasi surat masuk','listeners'=>array('click'=>'on_register_surat_masuk'));
        $aMenu[1]= array('text'=>"Registrasi Surat Keluar",'iconCls'=>'icon_outmail_register_36','tooltip'=>'Registrasi surat keluar','listeners'=>array('click'=>'on_register_surat_keluar'));
        $aMenu[2]= array('text'=>"Surat yang diolah",'iconCls'=>'icon_inmail_36','tooltip'=>'Surat yang diolah','listeners'=>array('click'=>'on_surat_operator'));
        $aMenu[3]= array('text'=>"Laporan",'iconCls'=>'icon_report_36','tooltip'=>'membuat laporan dalam bentuk file spreadsheet','references'=>'mnKonsep','margin'=>'0 0 10px 0','listeners'=>array('click'=>'on_laporan_operator'));
        */
        
        if (intval($data['total_disposisi']) > 0) {
                $aMenu[0]= array('text'=>"Disposisi (".$data['total_disposisi'].")",'iconCls'=>'icon_inmail_disposisi_36','tooltip'=>'Disposisi','references'=>'mnDisposisi','listeners'=>array('click'=>'on_disposisi'));
        }else{
                $aMenu[0]= array('text'=>"Disposisi",'iconCls'=>'icon_inmail_disposisi_36','tooltip'=>'Disposisi','references'=>'mnDisposisi','listeners'=>array('click'=>'on_disposisi'));     
        }

        if (intval($data['total_nodin']) > 0) {
                $aMenu[1]= array('text'=>"Nota Dinas (".$data['total_nodin'].")",'iconCls'=>'icon_innote_36','tooltip'=>'Nota Dinas','references'=>'mnNodin','listeners'=>array('click'=>'on_notadinas'));
        }else{
                $aMenu[1]= array('text'=>"Nota Dinas",'iconCls'=>'icon_innote_36','tooltip'=>'Nota Dinas','references'=>'mnNodin','listeners'=>array('click'=>'on_notadinas'));
        }
        //$aMenu[4]= array('text'=>"Disposisi",'iconCls'=>'icon_inmail_disposisi_36','tooltip'=>'Disposisi','listeners'=>array('click'=>'on_disposisi'));
        //$aMenu[5]= array('text'=>"Nota Dinas",'iconCls'=>'icon_innote_36','tooltip'=>'Nota dinas','listeners'=>array('click'=>'on_nodin'));
        if ($konsep > 0) {
                $aMenu[2]= array('text'=>"Konsep Surat (".$konsep.")",'iconCls'=>'icon_draft_36','tooltip'=>'Konsep Surat','references'=>'mnKonsep','listeners'=>array('click'=>'on_draft'));
        }else{
                $aMenu[2]= array('text'=>"Konsep Surat",'iconCls'=>'icon_draft_36','tooltip'=>'Konsep Surat','references'=>'mnKonsep','listeners'=>array('click'=>'on_draft'));
        }
        //$aMenu[6]= array('text'=>"Konsep Surat",'iconCls'=>'icon_draft_36','tooltip'=>'Konsep Surat','references'=>'mnKonsep','listeners'=>array('click'=>'on_draft'));

        $this->response($aMenu);
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/inmail.php */