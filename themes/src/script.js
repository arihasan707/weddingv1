// custom
$(document).ready(function () {
  var start = 5;

  comment();
  function comment() {
    let form = "#weddingWishForm";
    let submitButton = $(form).find("button.submit");
    let url = "https://admin.annisaari-theanswerisari.my.id";
    // console.log(page);

    $.ajax({
      url: `${url}/api/commentar`,
      dataType: "json",
      success: function (response) {
        $(".comment-wrap").html("");

        if (response.data.data.length > 4) {
          $(".more-comment-wrap").css("display", "block");
          $(".more-comment-wrap").attr("data-aos", "fade-up");
          $(".more-comment-wrap").attr("data-aos-duration", 1200);
        }

        $.each(response.data.data, function (index, value) {
          $(".comment-wrap").append(
            '<div class="comment-item" data-aos="fade-up" data-aos-duration="1200">\
                              <div class="comment-head">\
                                  <h3 class="comment-name">' +
              value.nama +
              '</h3>\
                                  <small class="comment-date">' +
              value.dibuat +
              " WIB" +
              '</small>\
                              </div>\
                              <div class="comment-body">\
                                  <p class="comment-caption">' +
              value.text +
              "</p>\
                              </div>\
                          </div>"
          );
        });
        $("#moreComment").html("Show more comments");
        $("#moreComment").attr("disabled", false);
        $(submitButton).html("Send");
        $(form).find("input, select, textarea, button").prop("disabled", false);
      },
    });
  }

  $("#weddingWishForm").submit(function (e) {
    e.preventDefault();
    $.saniteze = function (input) {
      /*
		var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
					 replace(/<[\/\!]*?[^<>]*?>/gi, '').
					 replace(/<style[^>]*?>.*?<\/style>/gi, '').
					 replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
	    return output;
        */
      return input.replace(
        /<(|\/|[^>\/bi]|\/[^>bi]|[^\/>][^>]+|\/[^>][^>]+)>/g,
        ""
      );
    };

    let name = $("#name").val();
    let text = $("#text").val();

    let data = {
      nama: $.saniteze(name),
      text: $.saniteze(text),
    };

    if (data.nama && data.text != "") {
      $(this).find("input, select, textarea, button").prop("disabled", true);
      $(this)
        .find("button.submit")
        .html('Sending... <i class="fas fa-spinner fa-spin"></i>');
    }

    $.ajax({
      type: "post",
      url: `${url}/api/commentar/add`,
      data: data,
      dataType: "json",
      success: function (response) {
        start = 5;
        comment();
      },
    });
  });

  $("#moreComment").on("click", function (e) {
    e.preventDefault();

    console.log(start);

    $.ajax({
      type: "get",
      url: `${url}/api/commentar/load`,
      dataType: "json",
      data: {
        start: start,
      },
      beforeSend: function (param) {
        $("#moreComment").html('<i class="fas fa-spinner fa-spin"></i>');
        $("#moreComment").attr("disabled", true);
      },
      success: function (response) {
        if (response.data.length > 0) {
          $.each(response.data, function (index, value) {
            $(".comment-wrap").append(
              '<div class="comment-item" data-aos="fade-up" data-aos-duration="1200">\
                                    <div class="comment-head">\
                                        <h3 class="comment-name">' +
                value.nama +
                '</h3>\
                                        <small class="comment-date">' +
                value.dibuat +
                '</small>\
                                    </div>\
                                    <div class="comment-body">\
                                        <p class="comment-caption">' +
                value.text +
                "</p>\
                                    </div>\
                                </div>"
            );
          });
          start = response.next;
          $("#moreComment").html("Load More");
          $("#moreComment").attr("disabled", false);
        } else {
          $("#moreComment").html("No more comment available");
          $("#moreComment").attr("disabled", true);
        }
      },
    });
  });

  function makeTimer() {
    //		var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");
    var endTime = new Date("21 Juni 2025 10:00:00 GMT+7");
    endTime = Date.parse(endTime) / 1000;

    var now = new Date();
    now = Date.parse(now) / 1000;

    var timeLeft = endTime - now;

    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - days * 86400) / 3600);
    var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
    var seconds = Math.floor(
      timeLeft - days * 86400 - hours * 3600 - minutes * 60
    );

    if (hours < "10") {
      hours = "0" + hours;
    }
    if (minutes < "10") {
      minutes = "0" + minutes;
    }
    if (seconds < "10") {
      seconds = "0" + seconds;
    }

    $(".count-day").html(days);
    $(".count-hour").html(hours);
    $(".count-minute").html(minutes);
    $(".count-second").html(seconds);

    if (timeLeft == -1) {
      clearTimeout(tes);
    }
  }

  var tes = setInterval(function () {
    makeTimer();
  }, 1000);

  var queryString = new URL(window.location.href).searchParams.get("to");
  if (queryString) {
    $(".to").html("Kepada Yth<br />" + queryString);
  }
});
