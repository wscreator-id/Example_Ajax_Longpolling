/**
 * AJAX long-polling
 *
 * 1. sends a request to the server (without a timestamp parameter)
 * 2. waits for an answer from server.php (which can take forever)
 * 3. if server.php responds (whenever), put data_from_file into #response
 * 4. and call the function again
 *
 * @param timestamp
 */
function getContent(timestamp){
    var queryString = {'timestamp' : timestamp};

    $.ajax(
        {
            type: 'GET',
            url: 'server.php',
            data: queryString,
            success: function(data){
                // put result data into "obj"
                var obj = jQuery.parseJSON(data);
                // put the data_from_file into #response
                 $('#response').append('<br /><strong>'+obj.data_from_file.name + "</strong> : " +  obj.data_from_file.message);
                // call the function again, this time with the timestamp we just got from server.php
                getContent(obj.timestamp);
            }
        }
    );
}

// initialize jQuery
$(function() {
    getContent();

    $(document).on('submit', 'form', function(eve){
        eve.preventDefault();
        $.ajax({
                type: 'POST',
                url: 'write.php',
                data: $('form').serialize(),
                success: function(data){                    
                }
            }
        );
    });

    $(document).on('keypress', 'input', function(eve){
      if (eve.which == 13) {
        $('form').submit();
        $(this).val("");
        return false;    
      }
    });    
});
