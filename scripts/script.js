$(document).ready(function() {
    // Password confirmation logic: Check if password and confirm password match
    $('#pass1').on('input', function() {
      let passwordInput = $('#pass1').val();
      let confirmPasswordInput = $('#pass1-confirm').val();
      if (passwordInput && confirmPasswordInput && passwordInput !== confirmPasswordInput) {
        $('#pass1-confirm')[0].setCustomValidity("Passwords do not match");
      } else {
        $('#pass1-confirm')[0].setCustomValidity("");
      }
    });
  
    $('#pass1-confirm').on('input', function() {
      let passwordInput = $('#pass1').val();
      let confirmPasswordInput = $(this).val();
      if (passwordInput !== confirmPasswordInput) {
        this.setCustomValidity("Passwords do not match");
      } else {
        this.setCustomValidity("");
      }
    });
  
    // Toggle password visibility on checkbox change
    $('#show-password-toggle').on('change', function() {
      if ($(this).is(':checked')) {
        $('#pass1, #pass1-confirm').attr('type', 'text');
      } else {
        $('#pass1, #pass1-confirm').attr('type', 'password');
      }
    });
  
    // Handle form submission: prevent default submission and alert user with form data
    $('form').on('submit', function(event) {
      event.preventDefault();
      let userData = {
        firstName: $('#fname1').val(),
        lastName: $('#lname1').val(),
        date: $('#date').val(),
        phone: $('#pnum1').val(),
        creditCardNumber: $('#lnum1').val(),
        username: $('#usern1').val(),
        password: $('#pass1').val()
      };
      alert('Form Submitted Successfully!' + JSON.stringify(userData, null, 2));
    });
  
    // Load and populate form data from a JSON file via AJAX call
    $("#load-data-btn").click(function() {
      $.getJSON("data.json", function(data) {
        $('#fname1').val(data.firstName);
        $('#lname1').val(data.lastName);
        $('#date').val(data.date);
        $('#pnum1').val(data.phone);
        $('#lnum1').val(data.creditCardNumber);
        $('#usern1').val(data.username);
        $('#pass1').val(data.password);
        $('#pass1-confirm').val(data.password);
      }).fail(function() {
        console.log("Error: Failed to load data.");
      });
    });
  
    // Dependent input functionality: Show or hide gear options based on selected underwater activities
    $('input[type="checkbox"][name="underwaterActivity"]').change(function() {
      let checkedActivities = $('input[type="checkbox"][name="underwaterActivity"]:checked').map(function() {
        return this.value;
      }).get();
  
      // Show additional gear options if "Scuba Diving" is selected
      if (checkedActivities.includes('Scuba Diving')) {
        $('#gear-options').show();
      } else {
        $('#gear-options').hide();
      }
    });
  });