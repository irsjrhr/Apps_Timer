


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
function format_digit( nilai ) {
	//Mengubah nilai integer dari variabel jam, menit, detik menjadi suatu karakter string dengan jumlah 2 karakter puluhan angka. 
	//Kemudian angka tersebut akan dikembalikan dan digunakan untuk di implementasikan ke UI 
	var str = nilai.toString();
	if ( str.length < 2 ) {
		str = "0" + str;
	}

	return str;
}

function set_digit(selector_digitInput, new_digit) {
	selector_digitInput = $(selector_digitInput);
	selector_digitInput.attr('data-digit', new_digit);
	selector_digitInput.text( new_digit );
}
function set_timerIndicator( selector_timerIndicator, data_timer ) {
	//Penggunaan set_timerIndicator( nilai ))

	data_timer = format_digit( data_timer );
	data_timer =  data_timer.split("");

	selector_timerIndicator = $( selector_timerIndicator );
	var digit_puluhan = selector_timerIndicator.find('.digit_puluhan');
	var digit_satuan = selector_timerIndicator.find('.digit_satuan');
	set_digit( digit_puluhan, data_timer[0] ); //Digit puluhan
	set_digit( digit_satuan, data_timer[1] ); //Digit satuan
}

function setAll_timerIndicator() {
	//Mengubah nilai integer dari variabel jam, menit, detik menjadi suatu karakter string dengan jumlah 2 karakter ( puluhan ) yang kemudian akan di implementasikan ke UI masing masing digit di.time_indicator 

	//Dalam String Format digitnya ke UI
	var jam_new = format_digit(jam);
	var menit_new = format_digit(menit);
	var detik_new = format_digit(detik);
	set_timerIndicator('#jam', jam_new);
	set_timerIndicator('#menit', menit_new);
	set_timerIndicator('#detik', detik_new);
	console.log( 
		jam_new + br + 
		menit_new + br + 
		detik_new
		);
}

function hitung_tinggiGelombang(persenTimer ) {
	var y_dasar = 500;
	var y_tinggi = -500;
	// ja yang di dapatkan, berapa nilai  yang didapatkan dengan skala antara y_dasar dan y_tinggi 
	return y_dasar + ( (persenTimer / 100) * (y_tinggi  - y_dasar) );
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
	var tinggiGelombang = hitung_tinggiGelombang( persentase  )
	gsap.to("#gelombangAnimasi", {
		attr: { y: tinggiGelombang },
		duration: 1, // Durasi animasi
		ease: "power2.inOut" // Efek easing smooth
	});

}

var jumlah_detik_awal, time, param_timer_run = false;
function timer_countdown( time_argument = 0, callback_prosess, callback_end ) {

	//Aturannya ketika suatu timer_start() dijalankan, maka selama timer countdown itu belum selesai atau diberhentikan dengan benar, maka timer_countodown atau dalam hal ini timer_start tidak bisa dijalankan lagi secara bersamaan.
	/*Timer countdown bisa berhenti dengan benar jika beberapa kondisi terpenuhi :
	- waktu time sudah kurang dari nol
	- param_timer_run nilainya false 
	*/ 
	//Inisiasi 
	time = time_argument;
	param_timer_run = true;
	function timer_start() {

		//Pengkondisian ( Negasi )
		if ( time < 0 || param_timer_run == false ) {
			param_timer_run = false;
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
function timer(){
	//Timer countdown ini berjalan berdasarkan nilai yang diambil dari variabel jam, menit, detik dengan tipe data integer  yang di delkarasikan sebelumnya. Kemudian setelah  diambil melalui callback pada prosesnya, diimplemntasikan ke bentuk text UI 2 digit pada setiap element .time_indicator 

	//Eror handling, untuk mencegah adanya timer() yang berjalan bersamaan 
	if ( param_timer_run != false ) {	
		console.log('Timer sebelumnya belum berhenti!');
		// alert('Timer sebelumnya belum berhenti!');
		return false; //Menghentikan laju fungsi
	}

	//Simpan nilai awal yaitu total jumlah detik awal (  dari kalkulasi jam, menit, detik ) untuk persentase indicator sebelum memulai timer countdown
	jumlah_detik_awal = sum_convertDetik( jam, menit, detik ); 
	timer_countdown( detik, 

		// Callback Proses
		function(time_sisa) {
			detik = time_sisa;

			//UI untuk semua timer indicator berdasarkan variabel jam, menit, detik
			setAll_timerIndicator();

			//UI untuk box persentase indicator
			var jumlah_detik_sisa = sum_convertDetik( jam, menit, detik );
			box_persentaseIndicator(jumlah_detik_awal, jumlah_detik_sisa); 

		}, 
		//Callback Selesai 
		function(time_sisa) {
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
			}

		}  );

}

// ++++++++ UI INPUT DIGIT SAJA TANPA MEKANISME DATA PROGRAMING +++++++++


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

	set_digit( $('.digit_puluhan'), init_waktu );
	set_digit( $('.digit_satuan'), init_waktu );	


	//Jadikan default di timer indicator detik
	set_timerIndicator_active($('.timer_indicator#detik'));
}

function kalkulasi_data() {	
	// Jadi ketika menit atau detik itu diinputkan waktu >= 60, maka 60nya itu akan dianggap penambahan 1 waktu baik dari detik ke menit maupun menit ke jam.
	//Konsepnya batas_kalkulasi hanya untuk detik dan menit dengan hitungan 60 menit untuk 1 jam, dan 60 detik untuk 1 menit dengan jika ada sisanya itu akan di tinggal ditempat
	console.log('++kalkulasi_data++');
	var batas_kalkulasi = 60;
	var sisa_waktu = 0;

	// Validasi detik
	if ( detik >= batas_kalkulasi ) {
		console.log('++kalkulasi_detik++');
		sisa_waktu = detik - batas_kalkulasi;
		// Set sisa detik di detik 
		detik = sisa_waktu;
		//Nambah 1 menit setelah di kalkulasi
		menit++;
	}

	// Validasi menit
	if ( menit >= batas_kalkulasi ) {
		console.log('++kalkulasi_menit++');

		sisa_waktu = menit - batas_kalkulasi;
		// Set sisa menit di menit 
		menit = sisa_waktu;
		//Nambah 1 jam setelah di kalkulasi
		jam++;
	}


	//Implementasikan ke UI
	var timer_indicator = $('.timer_indicator');
	var jam_indicator = timer_indicator.filter('#jam');
	var menit_indicator = timer_indicator.filter('#menit');
	var detik_indicator = timer_indicator.filter('#detik');

	set_timerIndicator( jam_indicator, jam );
	set_timerIndicator( menit_indicator, menit );
	set_timerIndicator( detik_indicator, detik );


}
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

	kalkulasi_data();
}
function input_dial( col_dial ) {

	//Error Handling : Tidak boleh memasukkan input dial saat timer sedang berjalan
	if ( param_timer_run != false  ) {
		console.log('Tidak bisa input dial saat ada timer sedang berjalan!');
		return false;// Menghentikan laju fungsi
	}

	//Berjalan Ketika col_dial di pencet

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
			//nilai digit puluhan pindahkan ke digit satuan 
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
	
	set_data(); //Memindahkan nilai pada UI time_indicator ke variabel jam, menit, dan detik
	console.log( data_dial );
}

// +++++++++++ Controlling ++++++++++++++

function start() {
	timer();
	$('.col_indicator').show();
	console.log("Timer dijalankan");
}
function stop() {
	param_timer_run = false;
	$('.col_indicator').hide();
	console.log("Timer distop");
}
function reset() {
	stop();
	init_timerIndicator();
	box_persentaseIndicator( 1, 1 );
	console.log("Timer di reset");
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

		var btn_submit = $(this);
		var data_submit = btn_submit.attr('data-submit');
		switch( data_submit ){
			case 'start' :
			start();
			break;
			case 'stop' :
			stop();
			break;
			case 'reset' :
			reset();
			break;

		}

	});



});	





