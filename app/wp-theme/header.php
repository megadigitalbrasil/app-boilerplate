<!-- Custon fiels wordpress-->

<head>
  <title>
    <?php
    /*
     * Print the <title> tag based on what is being viewed.
     */
    global $page, $paged;

    wp_title( '|', true, 'right' );

    // Add the blog name.
    bloginfo( 'name' );

    // Add description, if is home
    if ( ( is_home() || is_front_page() ) && get_bloginfo( 'description' ) != '' )
        echo ' | ' . get_bloginfo( 'description' );

    // Add a page number if necessary:
    if ( $paged >= 2 || $page >= 2 )
        echo ' | ' . sprintf( __( 'Page %s', 'yiw' ), max( $paged, $page ) );
    ?>
  </title>

<?php wp_head();?>
</head>