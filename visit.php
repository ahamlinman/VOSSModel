<!DOCTYPE html>
<html class="no-js" lang="en-US">

<?php $orb_class = "inactive"; ?>

	<head>
		<title>VOSS Model: Visit</title>
        <?php include('fragments/head.html'); ?>
	</head>
	
    <body>
        <?php include( 'fragments/menu.html'); ?>
	<div id="mainContainer">        
		<div id="wrapper">
				<?php include('fragments/load.html'); ?>
            <section>
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-8 location-info">
                            <h2>Location</h2>
                            <p>The VOSS model can be found along South Martin Jischke Drive at Purdue University's West Lafayette campus. It is located between Terry Memorial House (the Purdue University Police Department building) and the Discovery Learning Research Center.</p>
                        </div>
                        <div class="col-xs-12 col-sm-4 map">
                            <img class="img-responsive img-rounded" src="images/map.jpg" />
                        </div>
						<div class="col-xs-12">
							<h2>Can't Visit?</h2>
							<p>Experience a virtual journey through the model with our fly-through tour!</p>
							<div id="fly-thru-placeholder" data-src="https://purduevoss.makes.org/popcorn/2q52_">
                                <h4>Flash Required</h4>
                                <p>Please visit this site on a computer with Flash installed to experience the virtual tour.</p>
                            </div>						
						</div>
                    </div>
                </div>
            </section>
        </div>
	</div>
   <script src="js/menuFunctions.js"></script>
    </body>
	
</html>