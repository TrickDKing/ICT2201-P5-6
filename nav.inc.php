<?php
session_start();
?>
<nav class="navbar navbar-expand-sm navbar-light bg-light">
    <a class="navbar-brand" href="index.php">
        crap
        <!--<img src="images/Logo.png" alt="logo" title="Game Logo"/>-->
    </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
            aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <?php
            if (isset($_SESSION['username'])) {
                ?>
                <li class="nav-item"><a class="nav-link" href="all_products.php">Store</a></li>
                <li class="nav-item"><a class="nav-link" href="aboutUs.php">About Us</a></li>
            <?php } ?>
        </ul>

        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class='nav-item'>
                <a class='nav-link' href='userprofile.php'></a>
            </li>
            <?php
            if (isset($_SESSION['username'])) {
                ?>
                <li class='nav-item'>
                    <a class='nav-link' href='login.php'><i class='material-icons'>account_circle</i></a>
                </li>
                <li class = 'nav-item'>
                    <a class = 'nav-link' href = 'cart.php'>
                        <i class = 'material-icons'>shopping_cart</i>
                    </a>
                </li>
                <li class = 'nav-item'>
                    <a class = 'nav-link' href = 'logout.php'>Logout</a>
                </li>
            <?php } ?>
        </ul>
    </div>
</nav>