<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {
    public function index()
	{
        if (isset($this->session->absen_login)){
            //session_destroy();
            $this->load->view('header');
            $this->load->view('home/v_index');
            $this->load->view('footer');
        } else {
            $this->load->view('errors/html/error_404');
        }
	}

    public function loadData(){
        echo "halo";
    }

    public function user(){
        echo "selamat datang";
    }
}
