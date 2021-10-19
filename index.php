<!DOCTYPE html>
<?php
session_start();
if (isset($_SESSION['username'])) {
    // This session does not exists
    header("Location: index.php");
}
?>

<html lang="en">
    <head>
        <title>Sign In</title>
        <?php
        include "head.inc.php";
        ?>
    </head>

    <body>
        <?php
        if (!isset($_SESSION['username'])) {
            // This session does not exists
            include "nav.inc.php";
        }
        ?>
        <main>
            <div class="container login-container">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-6 login-form">
                        <h3>Login</h3>
                        <form action="process_login.php" method="post"> 
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" required name="email" placeholder="Enter Email">
                            </div>
                            <div class="form-group">
                                <label for="pwd">Password</label>
                                <input type="password" class="form-control" id="pwd" required name="pwd" placeholder="Enter password">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                            <div class="form-group">
                                <a href="forget_password.php" class="ForgetPwd">Forget Password?</a>
                            </div>
                        </form>
                    </div>

                </div>

            </div>


        </main>
    </body>
</html>