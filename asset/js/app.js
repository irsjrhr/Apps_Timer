


var batas_atas = 9; // x <= 9
var batas_bawah = 0; // x >= 0;

var br = " : ";
let jam, menit, detik; // Harus dalam bentuk integer


// ++++++++++++ Algoritma Timer Countdown Beserta UInya +++++++



function sum_convertDetik( jam, menit, detik ) {
	//Penjumlahan semua waktu dalam format detik
	var result = ( jam * 3600 ) + ( menit * 60 ) + detik;
	return result;
}

function set_digit(selector_digit, new_digit) {
	selector_digit = $(selector_digit);
	selector_digit.attr('data-digit', new_digit);
	selector_digit.text( new_digit );
}
function triger_elTimer( selectorTimerId, data_timer ) {
	selectorTimerId = $( selectorTimerId );
	var digit_puluhan = selectorTimerId.find('.digit_puluhan');
	var digit_satuan = selectorTimerId.find('.digit_satuan');
	set_digit( digit_puluhan, data_timer[0] ); //Digit puluhan
	set_digit( digit_satuan, data_timer[1] ); //Digit satuan
}
function format_digit( nilai ) {
	//Mengubah nilai integer dari variabel jam, menit, detik menjadi suatu karakter string dengan jumlah 2 karakter puluhan angka. 
	//Kemudian angka tersebut akan dikembalikan dan digunakan untuk di implementasikan ke UI 
	var str = nilai.toString();
	if ( str.length < 2 ) {
		str = "0" + str;
	}

	return str;
}
function el_timer_indicator() {
	//Mengubah nilai integer dari variabel jam, menit, detik menjadi suatu karakter string dengan jumlah 2 karakter ( puluhan ) yang kemudian akan di implementasikan ke UI masing masing digit di.time_indicator 

	var jam_new = format_digit(jam)
	var menit_new = format_digit(menit)
	var detik_new = format_digit(detik)
	triger_elTimer('#jam', jam_new.split(''));
	triger_elTimer('#menit', menit_new.split(''));
	triger_elTimer('#detik', detik_new.split(''));
	console.log( 
		jam_new + br + 
		menit_new + br + 
		detik_new
		);
}

function hitung_tinggiGelombang(persenTimer, batasAwal, batasAkhir) {
	// jadi dari persenTimer yang di dapatkan, berapa nilai  yang didapatkan dengan skala antara 
	return batasAwal + ( (persenTimer / 100) * (batasAkhir - batasAwal) );
}

function box_persentaseIndicator( jumlah_detik_awal, jumlah_detik_sisa ) {
	var persentase = ( ( jumlah_detik_awal - jumlah_detik_sisa ) / jumlah_detik_awal ) * 100
	//Error Handling agar penyebutnya tidak nol dan tidak menyebabkan nilai undifined atau tak hingga 
	if (jumlah_detik_awal == 0) {
		//Jika nol, maka jadikan persentase 100% atau selesai
		persentase = 100;
	}

	//Implementasikan ke box indicator timer gelombang animasi
	console.log( persentase + "%", "Timer akan selesai" );
	var tinggiGelombang = hitung_tinggiGelombang( persentase, 500, -550  )
	gsap.to("#gelombangAnimasi", {
		attr: { y: tinggiGelombang },
		duration: 1, // Durasi animasi
		ease: "power2.inOut" // Efek easing smooth
	});

}


function timer_countdown( time_argument = 0, callback_prosess, callback_end ) {


	//Iinisiasi 
	var time = time_argument;
	function timer_start() {
		if ( time < 0 ) {
			callback_end( time );
			return false; //Mengentikan laju fungsi
		}

		//Proses 
		callback_prosess( time );

		//Increment & decrement
		time--;

		// 1 s = 1000ms
		setTimeout(function(e) {
			timer_start();
		}, 1000);
	}
	timer_start();

}

var jumlah_detik_awal = false;
function timer(){

	//Timer countdown ini berjalan berdasarkan nilai yang diambil dari variabel jam, menit, detik dengan tipe data integer  yang di delkarasikan sebelumnya. Kemudian setelah  diambil melalui callback pada prosesnya, diimplemntasikan ke bentuk text UI 2 digit pada setiap element .time_indicator 

	//Simpan jumlah detik awal untuk persentase indicator sebelum memulai timer countdown 
	if ( jumlah_detik_awal == false ) {
		// Simpan nilai awal 
		jumlah_detik_awal = sum_convertDetik( jam, menit, detik );
	}

	timer_countdown( detik, 

		function(time_sisa) {
			// Callback Proses
			detik = time_sisa;


			//UI untuk timer indicator
			el_timer_indicator();

			//UI untuk box persentase indicator
			var jumlah_detik_sisa = sum_convertDetik( jam, menit, detik );
			box_persentaseIndicator(jumlah_detik_awal, jumlah_detik_sisa); 

		}, 
		function(time_sisa) {
			//Callback Selesai 
			console.log('Timer detik selesai!');

			if ( menit !=0 || jam !=0 ) {
				if ( menit != 0  ) {
					//Pengurangan 1 Menit 
					menit--;
					detik = 59;
					console.log("Pengurangan 1 Menit");
				}else if ( jam != 0 ) {
					//Pengurangan 1 Jam 
					jam--;
					menit = 59;
					detik = 59;
					console.log("Pengurangan 1 Jam");
				}
				timer();
			}else{
				console.log("Timer selesai!");
				jumlah_detik_awal = false;
			}

		}  );

}

// ++++++++ UI INPUT DIGIT SAJA TANPA MEKANISME DATA PROGRAMING +++++++++
function get_digit( timer_indicator_target ) {
	//Mengambil nilai digit dari setiap time_indicator ( jam, menit dan detik )
	var puluhan = timer_indicator_target.find('.digit_puluhan').attr('data-digit');
	var satuan = timer_indicator_target.find('.digit_satuan').attr('data-digit');

	var result = parseInt( puluhan + satuan );
	return result;
}
function set_data() {
	//Menyimpan nilai jam, menit, detik berdasarkan yang di inputkan di UI
	//Dengan mengubah nilai dial di UI ke bentuk nilai data integer untuk jam, menit,dan detik pada sisi programming agar bisa di proses sebagai countdown algoritma
	var timer_indicator = $('.timer_indicator');
	var jam_indicator_digit = get_digit( timer_indicator.filter('#jam') );
	var menit_indicator_digit = get_digit( timer_indicator.filter('#menit') );
	var detik_indicator_digit = get_digit( timer_indicator.filter('#detik') );

	//Simpan ke variabel awal agar bisa digunakan secara progmming dengan tipe data integer 
	jam = parseInt( jam_indicator_digit );
	menit = parseInt( menit_indicator_digit );
	detik = parseInt( detik_indicator_digit );

	console.log("set_data",  
		jam + br + 
		menit + br + 
		detik
		);
}

function set_timerIndicator_active(  timer_indicator_target  ) {
	timer_indicator = $(timer_indicator_target);
	$('.timer_indicator').filter('.active').removeClass('active');
	timer_indicator_target.addClass('active');
}


function init_timerIndicator() {

	var init_waktu = 0;
	jam = init_waktu;
	menit = init_waktu;
	detik = init_waktu;

	init_waktu = init_waktu.toString();
	init_waktu = init_waktu.split("");

	set_digit( $('.digit_puluhan'), init_waktu[0]  );
	set_digit( $('.digit_satuan'), init_waktu[1]  );	

	//Jadikan default di timer indicator detik
	set_timerIndicator_active($('.timer_indicator#detik'));
}
function input_dial( col_dial ) {

	col_dial = $(col_dial);
	var data_dial = col_dial.attr('data-dial'); //New Digit


	//Implemntasi ke timer indicator yang active
	var timer_indicator_active = $('.timer_indicator').filter('.active');
	var timer_id = timer_indicator_active.attr('id');

	var digit_satuan = timer_indicator_active.find('.digit_satuan');
	var digit_puluhan = timer_indicator_active.find('.digit_puluhan');
	var digit_satuan_val = digit_satuan.attr('data-digit');
	var digit_puluhan_val = digit_puluhan.attr('data-digit');

	///Tentukan jenis dial
	if ( data_dial == "del" ) {
		// Hapus Digit
		console.log('+++++++++ Hapus Digit +++++++++');

		if ( digit_puluhan_val != "0" ) {
			//Jadikan digit puluhan jadi 0, dan nilai digit puluhan pindahkan ke digit satuan ( Reverse Logic )
			set_digit( digit_puluhan, "0" );
			set_digit( digit_satuan, digit_puluhan_val);

		}else if ( digit_satuan_val != "0") {
			// Jadikan digit satuan ke nilai 0
			set_digit( digit_satuan, "0" );
		}

		return false;
	}else{
		// Input Digit



		console.log('+++++++++ Input Digit +++++++++');


		if ( digit_satuan_val.length < 1 || digit_satuan_val == "0") {
			// Isi Digit Satuan
			console.log('Digit Satuan');

			set_digit( digit_satuan, data_dial );
		}else if ( digit_puluhan_val.length < 1 || digit_puluhan_val == "0" ) {
			//Pindahin yang nilai digit satuan ke digit puluhan dan digit yang baru itu ke digit satuan
			console.log('Digit Puluhan');
			set_digit( digit_satuan, data_dial);
			set_digit( digit_puluhan, digit_satuan_val);
		}

	}
	
	set_data();
	console.log( data_dial );
}



$(document).ready(function() {


	init_timerIndicator();
	$('.timer_indicator').on('click', function () {
		set_timerIndicator_active( $(this) );
	});
	$('.col_dial').on('click', function() {	
		input_dial( $(this) );
	});
	$('.btn_submit').on('click', function() {
		timer();
	});



});	





