<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';
require APPPATH.'/libraries/PHPExcel.php';


class Laporan extends CI_Controller {

	public function __construct(){
		parent:: __construct();
		//$this->load->library('PHPExcel');
		$this->load->library('subquery');
		$this->load->helper('date');
 	}

	public function operator()
	{

		$doc_name = 'doc_rendered/LaporanSEDMS.xlsx';

		$pengirim = $this->input->get('pengirim',TRUE);
        $penerima = $this->input->get('penerima',TRUE);
        $perihal = $this->input->get('perihal',TRUE);
        $index = $this->input->get('index',TRUE);
        //$id_jenis = $this->input->get('id_jenis',TRUE);
        //$id_klasifikasi = $this->input->get('id_klasifikasi',TRUE);
        $dari = $this->input->get('dari',TRUE);
        $sampai = $this->input->get('sampai',TRUE);

        $this->db->select("a.*,c.nama_file");
        $this->db->where("(a.verified = '1' AND a.deleted_at IS null AND id_pengolah = ".$this->session->userdata('id').")");
        
        if ($pengirim == "" || $penerima == "" || $perihal == "" || $index == "") {
        	$this->db->where("(a.asal_surat like '%$pengirim%' AND a.tujuan_surat like'%$penerima%' AND a.perihal like '%$perihal%' AND a.index like '%$index%')");
        }
        
        if ((! $dari == null) && (! $dari == null)) {
        	$this->db->where("tgl_surat BETWEEN '$dari' AND '$sampai' ");
        }

      	$sub = $this->subquery->start_subquery('select');
		$sub->select('tr_klasifikasi_arsip.kode')->from('tr_klasifikasi_arsip');
		$sub->where('tr_klasifikasi_arsip.id = a.id_klasifikasi');
		$this->subquery->end_subquery('kode_klasifikasi');   

		$sub = $this->subquery->start_subquery('select');
		$sub->select('tu_pengguna.fullname')->from('tu_pengguna');
		$sub->where('tu_pengguna.id = a.id_pengolah');
		$this->subquery->end_subquery('pengolah');     		

        $this->db->order_by("a.created_at", "asc");
        $this->db->join('tr_jabatan b', 'b.id = a.id_jabatan','left');
        $this->db->join('tu_file c', 'c.uniquecode = a.uniquecode','left');
        $this->db->from('tu_surat a');
        $query = $this->db->get();

		$data = $query->result_array();

		$objPHPExcel = new PHPExcel();

		$objPHPExcel->getProperties()->setCreator("SEDMS Software")
									 ->setLastModifiedBy("SEDMS Software")
									 ->setTitle("Laporan SEDMS")
									 ->setSubject("Laporan SEDMS")
									 ->setDescription("Laporan SEDMS")
									 ->setKeywords("laporan SEDMS");
		
		$objPHPExcel->setActiveSheetIndex(0)
					->setCellValue('A1', 'Data Surat yang Diolah')
		            ->setCellValue('A2', 'Filter Data')
		            ->setCellValue('A3', 'Pengirim:')
		            ->setCellValue('A4', 'Penerima:')
		            ->setCellValue('A5', 'Perihal:')
		            ->setCellValue('A6', 'Index:')
		            ->setCellValue('A7', 'Tanggal:')		            
		            ->setCellValue('B3', $pengirim)
		            ->setCellValue('B4', $penerima)
		            ->setCellValue('B5', $perihal)
		            ->setCellValue('B6', $index)
		            ->setCellValue('B7', "dari tgl ".mdate('%d-%m-%Y', strtotime($dari))." sampai tgl ".mdate('%d-%m-%Y', strtotime($sampai)))
		            ->setCellValue('A8', 'Pengolah')
		            ->setCellValue('B8', $this->session->userdata('nama_lengkap'))
		            ->setCellValue('A9', 'No')
		            ->setCellValue('B9', 'Kode Klasifikasi')
		            ->setCellValue('C9', 'Nomor Berkas')
		            ->setCellValue('D9', 'Tanggal Berkas')
		            ->setCellValue('E9', 'Index Berkas')
		            ->setCellValue('F9', 'Lokasi Arsip')
		            ->setCellValue('G9', 'Pengirim')
		            ->setCellValue('H9', 'Penerima')
		            ->setCellValue('I9', 'Isi Ringkas')
		            ->setCellValue('J9', 'Nama File')
		            ->setCellValue('K9', 'Pengolah')
		            ->setCellValue('L9', 'Masuk/Keluar');

		$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(10);
		$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(15);
		$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(15);
		$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(15);
		$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(20);
		$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(20);
		$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(20);
		$objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(20);
		$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(50);
		$objPHPExcel->getActiveSheet()->getColumnDimension('J')->setWidth(40);
		$objPHPExcel->getActiveSheet()->getColumnDimension('K')->setWidth(15);
		$objPHPExcel->getActiveSheet()->getColumnDimension('L')->setWidth(15);

		$styleArray = array(
			'font' => array(
				'bold' => true
			)
		);

		$styleBorderArray = array(
		  'borders' => array(
		    'allborders' => array(
		      'style' => PHPExcel_Style_Border::BORDER_THIN
		    )
		  )
		);

		$objPHPExcel->setActiveSheetIndex(0)->mergeCells('A1:L1');
		$objPHPExcel->getActiveSheet()->getStyle('A1:L1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER); 
		$objPHPExcel->getActiveSheet()->getStyle('A9:L9')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER); 
		$objPHPExcel->getActiveSheet()->getStyle('A2')->applyFromArray($styleArray);
		$objPHPExcel->getActiveSheet()->getStyle('A1:L1')->applyFromArray($styleArray);
		$objPHPExcel->getActiveSheet()->getStyle('A9:L9')->applyFromArray($styleArray);


		$i=10;
        foreach ($data as $value) {
        	$data_num = $i-9;
        	$objPHPExcel->getActiveSheet()->setCellValue('A' . $i, "$data_num")
        				->setCellValue('B' . $i, $value['kode_klasifikasi'])
        				->setCellValue('C' . $i, $value['nomor_surat'])
        				->setCellValue('D' . $i, mdate('%d-%m-%Y', strtotime($value['tgl_surat'])))
        				->setCellValue('E' . $i, $value['index'])
        				->setCellValue('F' . $i, $value['lokasi_arsip'])
        				->setCellValue('G' . $i, $value['asal_surat'])
        				->setCellValue('H' . $i, $value['tujuan_surat'])
        				->setCellValue('I' . $i, $value['ringkasan'])
        				->setCellValue('J' . $i, $value['nama_file'])
        				->setCellValue('K' . $i, $value['pengolah'])
        				->setCellValue('L' . $i, $value['tipe_surat']);
        	$i=$i+1;
        }
        $objPHPExcel->getActiveSheet()->setCellValue('A' . $i, "Tanggal dibuat : ".date('d-m-Y') );

        $batas = $i-1;
        $objPHPExcel->getActiveSheet()->getStyle('A9:L'.$batas)->applyFromArray($styleBorderArray);

		$objPHPExcel->getActiveSheet()->setTitle('Laporan');
		$objPHPExcel->setActiveSheetIndex(0);

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$objWriter->save($doc_name);

		header ('Location:../../'.$doc_name);
		exit;
	}
	public function rekapoperator(){
		//$bulan = $this->input->get('bulan',TRUE);
		//var_dump($bulan);
		$tahun = $input['edited_on'] = date(' Y');
		$id_pengguna = $this->session->userdata('id');

		$doc_name = "doc_rendered/RekapSEDMS-".$tahun.".xlsx";
		

		$objPHPExcel = new PHPExcel();

		$objPHPExcel->getProperties()->setCreator("SEDMS Software")
									 ->setLastModifiedBy("SEDMS Software")
									 ->setTitle("Laporan Rekapitulasi SEDMS")
									 ->setSubject("Laporan Rekapitulasi SEDMS")
									 ->setDescription("Laporan Rekapitulasi SEDMS")
									 ->setKeywords("laporan Rekapitulasi SEDMS");
		
		$objPHPExcel->setActiveSheetIndex(0)
		            ->setCellValue('A1', 'Rekapitulasi Data Surat')
		            ->setCellValue('A2', 'Tahun:')
		            ->setCellValue('A3', 'Operator:')
		            ->setCellValue('B2', $tahun)
		            ->setCellValue('B3', $this->session->userdata('nama_lengkap'))
		            ->setCellValue('A4', 'No')
		            ->setCellValue('B4', 'Bulan')
		            ->setCellValue('C4', 'Surat Masuk')
		            ->setCellValue('D4', 'Surat Keluar')
		            ->setCellValue('E4', 'Total');

		$objPHPExcel->setActiveSheetIndex(0)->mergeCells('A1:E1');
		$styleArray = array(
			'font' => array(
				'bold' => true
			)
		);

		$styleBorderArray = array(
		  'borders' => array(
		    'allborders' => array(
		      'style' => PHPExcel_Style_Border::BORDER_THIN
		    )
		  )
		);
 		$objPHPExcel->getActiveSheet()->getStyle('A1:E1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

 		$objPHPExcel->getActiveSheet()->getStyle('A4:E4')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
 		$objPHPExcel->getActiveSheet()->getStyle('A4:E16')->applyFromArray($styleBorderArray);
 		$objPHPExcel->getActiveSheet()->getStyle('A1:E1')->applyFromArray($styleArray);
 		$objPHPExcel->getActiveSheet()->getStyle('A4:E4')->applyFromArray($styleArray);
 		
		$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(10);
		$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(15);
		$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(15);
		$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(15);
		$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(15);

		for ($i = 1; $i <= 12; $i++) {
			$row_inset = $i+4;
	        $this->db->where("(tipe_surat = 'M' AND id_pengolah = ".$id_pengguna." AND deleted_at IS null)");
	        $this->db->where("YEAR(tgl_surat) = ".$tahun." AND MONTH(tgl_surat) = ".$i);
	        $this->db->from('tu_surat');
	        $total_masuk[$i] = $this->db->count_all_results(); 

	        $this->db->where("(tipe_surat = 'K' AND id_pengolah = ".$id_pengguna." AND deleted_at IS null)");
	        $this->db->from('tu_surat');
	        $this->db->where("YEAR(tgl_surat) = ".$tahun." AND MONTH(tgl_surat) = ".$i);
	        $total_keluar[$i] = $this->db->count_all_results(); 

	        switch ($i) {
	        	case 1:
	        		$bulan = 'Januari';
	        		break;
	        	case 2:
	        		$bulan = 'Februari';
	        		break;
	        	case 3:
	        		$bulan = 'Maret';
	        		break;
	        	case 4:
	        		$bulan = 'April';
	        		break;
	        	case 5:
	        		$bulan = 'Mei';
	        		break;
	        	case 6:
	        		$bulan = 'Juni';
	        		break;
	        	case 7:
	        		$bulan = 'Juli';
	        		break;
	        	case 8:
	        		$bulan = 'Agustus';
	        		break;
	        	case 9:
	        		$bulan = 'September';
	        		break;
	        	case 10:
	        		$bulan = 'Oktober';
	        		break;
	        	case 11:
	        		$bulan = 'Nopember';
	        		break;
	        	case 12:
	        		$bulan = 'Desember';
	        		break;
	        	
	        }

	        $objPHPExcel->getActiveSheet()->setCellValue('A' . $row_inset, $i)
        				->setCellValue('B' . $row_inset, $bulan)
        				->setCellValue('C' . $row_inset, $total_masuk[$i])
        				->setCellValue('D' . $row_inset, $total_keluar[$i])
        				->setCellValue('E' . $row_inset, $total_keluar[$i]+$total_masuk[$i]);
		}

		$objPHPExcel->getActiveSheet()->setCellValue('A16', "Tanggal dibuat : ".date('d-m-Y') );

		$objPHPExcel->getActiveSheet()->setTitle('Laporan');
		$objPHPExcel->setActiveSheetIndex(0);

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$objWriter->save($doc_name);

		header ('Location:../../'.$doc_name);
		exit;
	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/inmail.php */