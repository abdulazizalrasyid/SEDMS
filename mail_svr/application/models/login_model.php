<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login_model extends CI_Model {

    function __construct()
    {
        parent::__construct();

    }

    function get_uname ($uname){
        
        $this->db->select('tu_pengguna.id,  username,  fullname,  passwd,  type,  id_jabatan,  a.kode_unker,  tu_pengguna.active,  login_terakhir,  login_machine, kode_jabatan, jabatan,a.id_atasan, a.kode_unker');

        $this->db->from('tu_pengguna');

        $this->db->where('tu_pengguna.username',$uname);
        $this->db->where('tu_pengguna.active','1');
        $this->db->where('tu_pengguna.deleted_on',null);
        $this->db->join('tr_jabatan a', 'a.id = tu_pengguna.id_jabatan', 'left');
        //$this->db->join('tr_unker', 'tr_unker.id = tu_pengguna.id_unker', 'left');
        
        $sub = $this->subquery->start_subquery('select');
        $sub->select('b.jabatan AS jabatan_atasan')->from('tr_jabatan b');
        $sub->where('a.id_atasan = b.id');
        $this->subquery->end_subquery();        

        $sub = $this->subquery->start_subquery('select');
        $sub->select('b.kode_jabatan AS kode_jabatan_atasan')->from('tr_jabatan b');
        $sub->where('a.id_atasan = b.id');
        $this->subquery->end_subquery();

        return $this->db->get();
    }    

    function update($id){
    	$ip = getenv('HTTP_CLIENT_IP')?:
            getenv('HTTP_X_FORWARDED_FOR')?:
            getenv('HTTP_X_FORWARDED')?:
            getenv('HTTP_FORWARDED_FOR')?:
            getenv('HTTP_FORWARDED')?:
            getenv('REMOTE_ADDR');
        $data = array(
                       'login_terakhir' => date('Y/m/d h:i:s'),
                       'login_machine' => $ip,
                    );
        $this->db->where('id',$id);
        $this->db->update('tu_pengguna', $data);

    }

    function log($username,$session,$activity){
        //`username`,  `ip`,  `useragent`,  `time`,  LEFT(`activity`, 256) FROM `sedms`.`logs`
        $data = array(
                       'username'=>$username,
                       'session'=>$session['session_id'],
                       'time' => date('Y/m/d h:i:s'),
                       'useragent'=>$session['user_agent'],
                       'ip' => $session['ip_address'],
                       'activity' => $activity
                    );
        //$this->db->where('id',$id);
        $this->db->insert('logs', $data);
    }

    function chpassword($data){
        $this->db->where('id', $data['id']);
        $this->db->update('tu_pengguna', $data); 
        $respon['success'] = true;
        return $respon;
    }

}