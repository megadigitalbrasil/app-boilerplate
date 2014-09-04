<?php 
/*
Página de buscas

Função de search
<?php get_search_form(); ?>

*/
get_header();?> <!-- INCLUI O ARQUIVO HEADER.PHP -->

<main class="wrapper">
  <h2 class="search-results">Você está em resultados de pesquisa por : 
    <?php 
      $pesquisa = $_REQUEST['s'];
      echo $pesquisa;
    ?>
  </h2>

  <?php if ( have_posts() ) : ?>    
  <?php while ( have_posts() ) : the_post() ?>
    
  <!-- Post que será repetido -->

  <?php endwhile; else: ?>
  <!-- O que será exibido caso a pesquisa não encontre nada -->
  <?php endif; ?>

</main>

<?php get_footer();?> <!-- INCLUI O ARQUIVO FOOTER.PHP -->