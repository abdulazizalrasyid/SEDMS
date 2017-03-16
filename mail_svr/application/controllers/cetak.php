<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Cetak extends CI_Controller {

	public function __construct(){
		parent:: __construct();
		$this->load->library('word');
		$this->load->library('subquery');
		$this->load->helper('date');
 	}
 	public function index()
 	{
		
 	}

	public function pengantar()
	{
		$id_surat = $this->input->get('id_surat');
		$document = $this->word->loadTemplate($this->config->item('template_path').'pengantar.docx');

		$this->db->select('tu_surat.*,tr_jabatan.kode_jabatan,tr_jabatan.jabatan,tu_pengguna.fullname,tr_klasifikasi_arsip.kode');
        $this->db->from('tu_surat');
        $this->db->where('tu_surat.id',$id_surat);
        $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_surat.id_jabatan','left');
        $this->db->join('tu_pengguna', 'tu_pengguna.id = tu_surat.id_pengolah','left');
        $this->db->join('tr_klasifikasi_arsip', 'tr_klasifikasi_arsip.id = tu_surat.id_klasifikasi','left');
        $query = $this->db->get();

        $data = $query->result_array();
		
		$document->setValue('indeks',$data[0]['indeks'] );
		$document->setValue('tgl_terima',mdate('%d-%m-%Y', strtotime($data[0]['tgl_terima'])));
		$document->setValue('kode',substr($data[0]['kode'],0,8) );
		$document->setValue('no_urut',$data[0]['no_urut'] );
		$document->setValue('asal_surat',$data[0]['asal_surat'] );
		$document->setValue('tgl_surat',mdate('%d-%m-%Y', strtotime($data[0]['tgl_surat'])));
		$document->setValue('jabatan',$data[0]['jabatan'] );
		$document->setValue('catatan',$data[0]['catatan'] );
		$document->setValue('nomor_surat',$data[0]['nomor_surat'] );
		$document->setValue('ringkasan',$data[0]['ringkasan'] );
		$document->setValue('fullname',$data[0]['fullname'] );

		$doc_name = $id_surat.'_pengantar.docx';
		$document->save($doc_name);

		//var_dump(SVRURL);

		//download output
		header('Location:../../../'.$doc_name);
		exit;
	}

	public function disposisi()
    {
        $max_dispo=10; //must be accordance to template
        $id_surat = $this->input->get('id_surat');
        
        $document = $this->word->loadTemplate($this->config->item('template_path').'DisposisiTpl.docx');
        //$document = new $this->word;
    
        $id_surat = $this->input->get('id_surat', TRUE);
        $this->db->from('tu_disposisi');
        $this->db->where('id_surat',$id_surat);
        $total = $this->db->count_all_results(); 

        $this->db->select("b.*,a.perihal,a.catatan, a.tgl_surat,a.tgl_terima,a.ringkasan,a.urgensi,a.sifat,a.id_jabatan as tujuan_surat,a.asal_surat as asal_surat,a.nomor_surat AS nomor_surat");

        /*$sub = $this->subquery->start_subquery('select');
        $sub->select('tr_jenis_disposisi.disposisi')->from('tr_jenis_disposisi');
        $sub->where('tr_jenis_disposisi.id = b.jns_disposisi');
        $this->subquery->end_subquery('disposisi');*/

        $sub = $this->subquery->start_subquery('select');
        $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
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
        //$this->db->limit($limit, $start);
        $this->db->order_by("created_on", "asc");
        $this->db->join('tu_surat a', 'a.id = b.id_surat','left');
        $query = $this->db->get();
        
        $data = $query->result_array();

        $datajadi = array();

        $i=0;
        foreach ($data as $value) {

            $jenis[$i] = explode(';',$value['jns_disposisi']);
            
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

            $datajadi[$i]['disposisikepada'] = $value['jabatan'];
            $datajadi[$i]['disposisi'] = $jns_disposisi_long;
            $datajadi[$i]['keterangan'] = $value['isi_disposisi'];
            $datajadi[$i]['no_catatan'] = 'C'.intval($i+1).' :';

            //surat
            $document->setValue('perihal',$value['perihal'] );
            $document->setValue('asal_surat',$value['asal_surat'] );
            $document->setValue('nomor_surat',$value['nomor_surat'] );
            $document->setValue('ringkasan',$value['ringkasan'] );
            $document->setValue('tgl_surat',$value['tgl_surat'] );
            $document->setValue('tgl_terima',$value['tgl_terima'] );
            
            $i=$i+1;

        }

        //var_dump($datajadi);
        if (count($datajadi) > 0){
             for ($i=0; $i < $max_dispo ; $i++) { 
                if (array_key_exists($i, $datajadi) == true){
                    $document->setValue('disposisikepada'.$i,$datajadi[$i]['disposisikepada']);
                    $document->setValue('disposisi'.$i,$datajadi[$i]['disposisi']);
                    $document->setValue('keterangan'.$i,$datajadi[$i]['keterangan']);
                    $document->setValue('no_catatan'.$i,$datajadi[$i]['no_catatan']);
                } else {
                    $document->setValue('disposisikepada'.$i,'');
                    $document->setValue('disposisi'.$i,'');
                    $document->setValue('keterangan'.$i,'');
                    $document->setValue('no_catatan'.$i,'');
                }
                
            }
        }else{

            $this->db->select('a.perihal,a.catatan,a.tgl_surat,a.tgl_terima,a.ringkasan,a.urgensi,a.sifat,a.id_jabatan as tujuan_surat,a.asal_surat as asal_surat,a.nomor_surat AS nomor_surat');
            $this->db->where('id',$id_surat);
            $this->db->from('tu_surat a');
            $query = $this->db->get();
            $data = $query->result_array();

            //var_dump($data);

            $document->setValue('perihal',$data[0]['perihal'] );
            $document->setValue('asal_surat',$data[0]['asal_surat'] );
            $document->setValue('nomor_surat',$data[0]['nomor_surat'] );
            $document->setValue('ringkasan',$data[0]['ringkasan'] );
            $document->setValue('tgl_surat',$data[0]['tgl_surat'] );
            $document->setValue('tgl_terima',$data[0]['tgl_terima'] );

             for ($i=0; $i < $max_dispo; $i++) { 
                $document->setValue('disposisikepada'.$i,'');
                $document->setValue('disposisi'.$i,'');
                $document->setValue('keterangan'.$i,'');
                $document->setValue('no_catatan'.$i,'');
            }
        }

        $doc_name = $id_surat.'_disposisi.docx';
        $document->save($doc_name);

        //download output
        header('Location:../../../'.$doc_name);
        exit;
    }

    public function disposisi2()
	{		
		//$document = $this->word->loadTemplate($this->config->item('template_path').'disposisi.docx');
		$document = new $this->word;
	
		$id_disposisi = $this->input->get('id_disposisi', TRUE);
		$this->db->from('tu_disposisi');
        $this->db->where('id',$id_disposisi);
        $total = $this->db->count_all_results(); 

        $this->db->select('b.*,a.perihal,a.catatan,a.tgl_surat,a.ringkasan,a.urgensi,a.sifat,a.id_jabatan as tujuan_surat,a.asal_surat as asal_surat,a.nomor_surat AS nomor_surat');

        $sub = $this->subquery->start_subquery('select');
        $sub->select('tr_jabatan.kode_jabatan')->from('tr_jabatan');
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
        $this->db->where('b.id',$id_disposisi);
        //$this->db->limit($limit, $start);
        $this->db->order_by("created_on", "desc");
        $this->db->join('tu_surat a', 'a.id = b.id_surat','left');
        $query = $this->db->get();
		
		$data = $query->result_array();

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

		$section = $document->createSection();

		// Add table
		$table = $section->addTable();

        
        $i=0;
        foreach ($datajadi as $value) {
        	// Add row
			$table->addRow();
				$table->addCell(5000)->addText('Dari :'.$datajadi[$i]['pengirim']);
				$table->addCell(10000)->addText($datajadi[$i]['nomor_surat']);

			$table->addRow();
				$table->addCell(5000)->addText('Kepada :'.$datajadi[$i]['jabatan']);
				$table->addCell(10000)->addText('Disposisi :'.$datajadi[$i]['jns_disposisi_long']);
			
			$table->addRow();
				$table->addCell(5000)->addText('Tanggal :'.$datajadi[$i]['created_on']);
				$table->addCell(10000)->addText('Keterangan :'.$datajadi[$i]['isi_disposisi']);

			$table->addRow();
			$table->addCell(5000)->addText(' ');

        	$i=$i+1;
        }
		
		/*$document->setValue('indeks',$data[0]['indeks'] );
		$document->setValue('tgl_terima',mdate('%d-%m-%Y', strtotime($data[0]['tgl_terima'])));
		$document->setValue('kode',substr($data[0]['kode'],0,8) );
		$document->setValue('no_urut',$data[0]['no_urut'] );
		$document->setValue('asal_surat',$data[0]['asal_surat'] );
		$document->setValue('tgl_surat',mdate('%d-%m-%Y', strtotime($data[0]['tgl_surat'])));
		$document->setValue('jabatan',$data[0]['jabatan'] );
		$document->setValue('catatan',$data[0]['catatan'] );
		$document->setValue('nomor_surat',$data[0]['nomor_surat'] );
		$document->setValue('ringkasan',$data[0]['ringkasan'] );
		$document->setValue('fullname',$data[0]['fullname'] );*/

		$doc_name = $id_disposisi.'_disposisi_item.docx';
		/*$document->save($doc_name);*/

		$objWriter = PHPWord_IOFactory::createWriter($document, 'Word2007');
		$objWriter->save($doc_name);

		//var_dump(SVRURL);

		//download output
		header('Location:../../../'.$doc_name);
		exit;
	}

	public function notadinas()
	{
		$id_surat = $this->input->get('id_surat');
		$document = $this->word->loadTemplate($this->config->item('template_path').'MemoTpl.docx');

		/*$this->db->select('tu_surat.*,tr_jabatan.kode_jabatan,tr_jabatan.jabatan,tu_pengguna.fullname,tr_klasifikasi_arsip.kode');
        $this->db->from('tu_surat');
        $this->db->where('tu_surat.id',$id_surat);
        $this->db->join('tr_jabatan', 'tr_jabatan.id = tu_surat.id_jabatan','left');
        $this->db->join('tu_pengguna', 'tu_pengguna.id = tu_surat.id_pengolah','left');
        $this->db->join('tr_klasifikasi_arsip', 'tr_klasifikasi_arsip.id = tu_surat.id_klasifikasi','left');
        $query = $this->db->get();*/


		$this->db->select('a.*');
        $this->db->from('tu_surat a');
        $this->db->where('a.id',$id_surat);

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

        //$this->db->join('tr_jabatan b', 'b.id = a.id_jab_pengirim','left');
        $query = $this->db->get();

        $data = $query->result_array();

        //var_dump($data);
		
		$document->setValue('indeks',$data[0]['indeks'] );
		$document->setValue('nomor_surat',$data[0]['nomor_surat']);
		$document->setValue('jabatan_pengirim',$data[0]['jabatan_pengirim']);
		$document->setValue('jabatan_penerima',$data[0]['jabatan_penerima']);
		$document->setValue('perihal',$data[0]['perihal']);
		$document->setValue('isi_nota',$data[0]['isi_nota']);
		$document->setValue('tgl_surat',mdate('%d-%m-%Y', strtotime($data[0]['tgl_surat'])));

		$doc_name = $id_surat.'_nota_dinas.docx';
		$document->save($doc_name);

		//var_dump(SVRURL);

		//download output
		header('Location:../../../'.$doc_name);
		exit;
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/inmail.php */