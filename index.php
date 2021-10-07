<!DOCTYPE html>

<html lang="en">
    <head>
        <title>Login</title>
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
