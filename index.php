<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>
		Apps Timer
	</title>
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.14.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="asset/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="asset/css/app_layer.css">
	<link rel="stylesheet" type="text/css" href="asset/css/style.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />


	
</head>
<body>


	<div class="container-fluid">
		<div class="row justify-content-center" style="height: 100%;">
			<div class="col-sm col_indicator" style="display: none;">
				<div class="box_indicatorTimer">

					<svg  width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" overflow="auto" shape-rendering="auto" fill="#ffffff">
						<defs>
							<path id="wavepath" d="M 0 2000 0 500 Q 62.5 315 125 500 t 125 0 125 0 125 0 125 0 125 0 125 0 125 0 125 0 125 0 125 0  v1000 z" />
							<path id="motionpath" d="M -250 0 0 0" /> 
						</defs>
						<g >
							<use id="gelombangAnimasi" xlink:href="#wavepath" y="500" fill="#29B6F6">
								<animateMotion dur="5s" repeatCount="indefinite">
									<mpath xlink:href="#motionpath" />
								</animateMotion>
							</use>
						</g>
					</svg>

				</div>

			</div>
			<!-- Col App -->
			<div class="col-sm col_app" style="position: relative;">
				<!-- Container App -->
				<div class="container_app" style="position: absolute;width: 100%;height: 600px;">
					<!-- Box Detail -->
					<div class="box_detail">

						<div class="header">
							<div class="container-fluid">
								<div class="row">
									<div class="col-12 col_header">
										<h3> <i class="fas fa-clock"></i> TIMER APPS <i class="fas fa-clock"> </i>  </h3>
									</div>
								</div>
							</div>
						</div>

						<div class="body">
							<div class="card_box">
								<div class="container-fluid">

									<div class="row row_input">
										<div class="col-12" style="padding: 0;">

											<p> INPUT TIMER </p>

											<div class="timer_input">
												<div class="timer_indicator" id="jam">
													<p class="digit_input digit_puluhan" data-digit="">0</p>
													<p class="digit_input digit_satuan" data-digit="">0</p>
												</div>

												<span>
													:
												</span>

												<div class="timer_indicator" id="menit">
													<p class="digit_input digit_puluhan" data-digit="">0</p>
													<p class="digit_input digit_satuan" data-digit="">0</p>
												</div>

												<span>
													:
												</span>

												<div class="timer_indicator" id="detik">
													<p class="digit_input digit_puluhan" data-digit="">0</p>
													<p class="digit_input digit_satuan" data-digit="">0</p>
												</div>
											</div>


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
								<div class="col col_dial" data-dial="0">
									0
								</div>

								<div class="col-4 col_dial" data-dial="del">
									<i class="fas fa-backspace"></i>
								</div>
							</div>

							<div class="row">
								<div class="col-7">
									<button class="btn btn-default btn_submit" data-submit="start"> START </button>
								</div>
								<div class="col">
									<button class="btn btn-secondary btn_submit" data-submit="stop"> STOP </button>
								</div>
								<div class="col">
									<button class="btn btn-danger btn_submit" data-submit="reset"> RESET </button>
								</div>
							</div>
						</div>


					</div>
					<!-- End Of Box Dial -->



					<!--+++++++++  Layer Dimension Fly App ++++++++++-->
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
										<h3 class="mt-2"> TIMER POP UP  </h3>	
									</div>
								</div>
							</div>
							<!-- End Of Header Layer -->
							<!-- body Layer -->
							<div class="body_layer">
								<div class="content_layer" id="layer_timer">

								</div>
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
			</div>
			<!-- End OF Col App -->


		</div>
	</div>



	<script type="text/javascript" src="asset/js/jquery.min.js"></script>
	<script src="https://code.jquery.com/ui/1.14.1/jquery-ui.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

	<script type="text/javascript" src="asset/js/app_layer.js"></script>
	<script type="text/javascript" src="asset/js/app.js"></script>
</body>
</html>