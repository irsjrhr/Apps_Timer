


// +++++++++ METHOD TERKAIT APP LAYER ++++++++++++++++++++++
var animasi_transisi;


function init_app_layer() {
	//Membuat callback delay
	animasi_transisi = $('.container_app_layer').css('transition-duration');
	animasi_transisi = animasi_transisi.split("s");
	animasi_transisi = animasi_transisi[0];
	animasi_transisi = parseFloat( animasi_transisi );
	animasi_transisi = animasi_transisi * 1000; //Karena 1 s = 1000ms
}

// +++++++++++ METHOD BASIC APP LAYER  +++++++++++
function open_app_layer( app_layer_target, content_layer_target = false ) {
	var app_layer_target = $( app_layer_target );
	var container_app_layer = app_layer_target.find('.container_app_layer');	
	//Mematikan overflow parent acuan agar tidak offset pada saat app_layer muncul dan tertutup semua dari segi vertikal dimensi
	var el_parent_acuan = app_layer_target.parent();	
	el_parent_acuan.css('overflow', 'hidden');

	//Hilangkan app_layer yang sedang aktif
	close_app_layer();

	//Munculkan app_layer target 
	app_layer_target.addClass('active');

	//Munculkan container_app_layer pada app layer tersebut 
	open_container_appLayer( container_app_layer );

	//++++++ Munculkan content layer pada content_app_layer
	open_contentLayer( content_layer_target, 'slide' );

}

function close_app_layer() {

	//Hilangkan app_layer yang sedang aktif
	var app_layer_active = $('.app_layer').filter('.active');
	var container_app_layer = app_layer_active.find('.container_app_layer');

	//Membuka overflow parent acuan agar kembali normal
	var el_parent_acuan = app_layer_active.parent();	
	el_parent_acuan.css('overflow', 'auto');

	close_container_appLayer( container_app_layer );
}

function open_container_appLayer( container_app_layer ) {
	//Membuat container_app_layer ada dibawah layar agar posisi tak terlihat yang menjadi posisi awal animasi 
	container_app_layer.css('bottom', '-100%');
	setTimeout(function(e) {
		//Memunculkan container app layer ke posisi vertikal yang terihat 
		container_app_layer.css('bottom', '0');
	}, animasi_transisi)
}
function close_container_appLayer( container_app_layer ) {

	//Kembalikan container_app_layer ke posisi tidak terlihat untuk menjalankan animasi 
	container_app_layer.css('bottom', '-100%');

	//Hilangka app layer yang sedang aktif setelah animasi container app layer selesai 
	var app_layer_active = container_app_layer.parents('.app_layer');
	setTimeout(function(e) {
		app_layer_active.removeClass('active');
	}, animasi_transisi)
	
}

function open_contentLayer( content_layer_target = false,  effect = "none", callback = false) {
	//Fungsi membuka content layer dari app layer yang sedang aktif atau terbuka
	if ( callback == false ) {
		callback = function() {
			return 1;
		}
	}

	//Pilih content layer target dengan logika aman
	if ( content_layer_target != false ) {
		content_layer_target = $(content_layer_target);
	}else{
		var container_app_layer_active = $('.app_layer').filter('.active').find('.container_app_layer');
		//Jika tidak ada content layer yang dipilih, maka pilih di elemen yang pertema content layeer pada app layer tersebbut
		content_layer_target = container_app_layer_active.find('.content_layer').eq(0);
	}
	//Error Handling jika tidak ada element content_layer pada app layer yang sedang dibuka
	if ( content_layer_target.length < 1 ) {
		var msg_err = "Tidak ada element content layer yang dituju atau bisa dibuka pada app layer yang dibuka";
		console.log(msg_err);
		alert(msg_err);
	}

	var content_layer_active = $('.content_layer').filter('.active');


	load_layer( function() {
		//Menghilangkan content layer yang active dan hilangkan tandanya
		content_layer_active.hide();
		content_layer_active.removeClass('active');
		//Mengaktifkan content layer yang dituju dan berikan tandanya
		content_layer_target.show(effect);
		content_layer_target.addClass('active');
	}, 500);

	callback( content_layer_target );
}


function open_loadLayer() {
	var load_layer = $('.load_layer');
	load_layer.show();
}
function close_loadLayer() {
	var load_layer = $('.load_layer');
	load_layer.hide();
}

function load_layer(callback, timer) {
	open_loadLayer();
	setTimeout( function() {
		callback();
		close_loadLayer();
	}, timer );
}

$(document).ready(function(e) {

	// +++++++++++++++  METHOD EVENT UNTUK APP LATER ++++++++++

	init_app_layer();
	$('.app_layer .backdrop').on('click', function(e) {
		close_app_layer();
	});

});



