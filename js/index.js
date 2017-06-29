$.ajaxSetup({ cache: false }); // Otherwise you get the same quote every time

/*---- Using 'getJSON' ----*/
function newQuote() {
  $.getJSON(
    "https://quotesondesign.com/wp-json/posts?filter[posts_per_page]=1&filter[orderby]=rand&callback=",
    function(a) {
      $(".quote").animate({opacity: 0}, 500,
        function() {
          $(this).animate({opacity: 1}, 500);
          $(this).html(a[0].content);
        });
      $(".author").animate({opacity: 0}, 500,
        function() {
          $(this).animate({opacity: 1}, 500);
          $(this).html("- " + a[0].title);
        });
      var html = a[0].content;
      var div = document.createElement("div");
      div.innerHTML = html;
      var quote = div.textContent || div.innerText || "";
      quote = quote.replace(";", "%3B").trim();
      $(".twitter-btn").attr(
        "href",
        'https://twitter.com/intent/tweet?text="' + quote + '" - ' + a[0].title);
    });
}

$(document).ready(function() {
  newQuote();
  $(".new-quote-btn").on("click", newQuote);
});