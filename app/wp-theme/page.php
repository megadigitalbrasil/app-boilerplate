<?php 
/*
Page.php
*/
get_header();?> <!-- INCLUI O ARQUIVO HEADER.PHP -->

<main class="wrapper">
  <?php if ( have_posts() ): while( have_posts() ) : the_post();?>
  
  <!-- Post que será repetido -->

  <?php endwhile; else: ?>
  <?php endif; ?>

</main>

<?php get_footer();?> <!-- INCLUI O ARQUIVO FOOTER.PHP -->