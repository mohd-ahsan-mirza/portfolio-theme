<?php get_header(); ?>
		<!-- Header -->
			<!-- <header id="header">
				<div class="logo"><a href="index.html">Road Trip <span>by TEMPLATED</span></a></div>
				<a href="#menu"><span>Menu</span></a>
			</header> -->

		<!-- Nav -->
			<nav id="menu">
				<ul class="links">
					<li><a href="index.html">Home</a></li>
					<li><a href="generic.html">Generic</a></li>
					<li><a href="elements.html">Elements</a></li>
				</ul>
			</nav>

		<!-- Banner -->
		<!--
			Note: To show a background image, set the "data-bg" attribute below
			to the full filename of your image. This is used in each section to set
			the background image.
		-->
			<section id="banner" class="bg-img" data-bg="banner.jpg">
				<div class="inner">
					<header>
						<h1>Working towards being extraordinary</h1>
					</header>
				</div>
				<a href="#one" class="more">Learn More</a>
			</section>

		<!-- One -->
			<section id="one" class="wrapper post bg-img" data-bg="banner2.jpg">
				<div class="inner">
					<article class="box">
						<header>
							<h2>Me In A Nutshell</h2>
							<!--<p>01.01.2017</p>-->
						</header>
						<div class="content">
							<p>Software Engineer by profession because who doesn't like having super powers. Reading on human psychology and random statistics is one of my guilty 
								pleasures. If I could describe myself in three words they would be thinker, dreamer, traveller. That reminds me, I am very passionate about travelling 
								because as Mark Twain once said that travel is fatal to prejudice and narrow-mindedness. I also believe that learning is a life long process and it comes 
								to us in many different forms. Sometimes it comes through travelling, life experiences, people or even through disappointment. If I am not working, 
								I am either working out or I am trying to improve my broken French. Below are some of my blogs on my professional and general life experiences. <br/>
								Subscribe below !! 
							</p>
						</div>
						<footer>
							<!-- <a href="generic.html" class="button alt">Learn More</a> -->
						</footer>
					</article>r
				</div>
				<a href="#two" class="more">Learn More</a>
			</section>

		<!-- Two -->
			<?php
				$post_list = get_posts();
				$bannerIndex = 3;
				foreach ( $post_list as $post ) :
					setup_postdata( $post );
			?>
			<section id="two" class="wrapper post bg-img" data-bg="banner<?php echo $bannerIndex; ?>.jpg">
				<div class="inner">
					<article class="box">
						<header>
							<h2><?php the_title(); ?></h2>
						</header>
						<div class="content">
							<p><?php echo wp_trim_words(get_the_content(),200,'.....'); ?></p>
						</div>
						<footer>
							<a href="generic.html" class="button alt">Learn More</a>
						</footer>
					</article>
				</div>
				<a href="#three" class="more">Learn More</a>
			</section>
			<?php
					$bannerIndex++;
					endforeach;
			?>
<?php get_footer(); ?>