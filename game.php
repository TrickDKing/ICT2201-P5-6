<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Game</title>
        <script src="/js/game_scripts.js"></script>
        <link rel="stylesheet" href="/css/game_styles.css">
        <script type="text/javascript" src="/js/jquery.js"></script>
    </head>
    <body>
        <!--<div class="circle"></div>-->

        <section class="game">
            <div class="car"></div>
            <?php
            for ($x = 1; $x <= 12; $x++) {

                echo '<div class="card">';
                echo '<a class="back-face"></a>';
                echo '</div>';
            }
            ?>         
            <!--<div class="card">
                <img class="front-face" src="/img/tanker.svg" alt="React" />
                <img class="back-face" src="/img/tanker.svg" alt="JS Badge" />
            </div>-->
        </section>
    </body>
</html>