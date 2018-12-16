var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate() {
    var password = document.getElementById("password").value;
    if (password == "1234") {
        alert("Login successfully");
        window.location = "home.html"; // Redirecting to landing page.
        return false;
    } else {
        attempt--; // Decrementing by one.
        alert("You have left " + attempt + " attempt;");
        // Disabling fields after 3 attempts.
        if (attempt == 0) {
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
}