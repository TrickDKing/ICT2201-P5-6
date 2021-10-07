<!DOCTYPE html>

<html lang="en">
    <head>

        <title>Login</title>

        <!-- Latest compiled and minified JavaScript -->
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" 
      integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<!-- Optional theme -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css"
      integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ"
      crossorigin="anonymous">
<!--Materials io CSS-->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
<!--Font Awesome CSS-->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
<!--jQuery-->

<!--Bootstrap JS-->
<script defer
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js" 
        integrity="sha384-LtrjvnR4Twt/qOuYxE721u19sVFLVSA4hf/rRt6PrZTmiPltdZcI7q7PXQBYTKyf" 
        crossorigin="anonymous"></script>

            <script type="text/javascript" src="js/bootstrap-pincode-input.js"></script> 
<link href="/css/bootstrap-pincode-input.css" rel="stylesheet"> 
        <?php
        include "head.inc.php";
        ?>
       
        <script>
            $(document).ready(function () {

                $('#pincode-input').pincodeInput({hidedigits: true, inputs: 4, placeholders: "0 0 0 1", change: function (input, value, inputnumber) {
                        $("#pincode-callback2").html("onchange from input number " + inputnumber + ", current value: " + value);
                    }
                });
                $('#pincode-input5').pincodeInput({hidedigits: true, inputs: 4, placeholders: "0 0 0 1", change: function (input, value, inputnumber) {
                        $("#pincode-callback2").html("onchange from input number " + inputnumber + ", current value: " + value);
                    }
                });
            });
        </script> 
    </head>
    <body>
        <?php
        include "nav.inc.php";
        include "login.nav.inc.php";
        ?>
        <h4>4 hidden digits example with placeholders and onchange for every input</h4>
        <br/>
        <div style="width:300px">
            <input type="text" id="pincode-input"  >
        </div>
        <span id="pincode-callback2"></span>
        <br/>
        <br/>
    </body>
</html>
