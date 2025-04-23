function loadArticle() {
  var $article_data = $(`#article-data`);
  var $article_con = $("#article-content");
  $article_con.append($article_data);

//   console.log("=== loadArticle ===", $article_data);
  $("#article-title").text($("#article-title-data").text());

  $("#view-info .view-item:first").text(
    `发布时间：${$("#release-time-data").text()}`
  );
  $("#view-info .view-item:last").text(
    `浏览次数：${$("#view-times-data").text()}`
  );

  $("#article-content p").each(function (i, item) {
    $(item).css({
      "line-height": "225%",
      "font-size": "12pt",
    });
  });
  var $table = $("#article-content table");
  $table
    .css({
      height: "auto",
      width: "auto",
    })
    .removeAttr("width");

  $("#article-content img").each(function (i, item) {
    $(item).css({
      "max-width": "90%",
      height: "auto",
      margin: "1vw",
    });
  });
}

function onload() {
  loadMenu();
  loadArticle();

  // * pagination
  var $its_page = $(`#wp_paging_w3`);

  var $page_con = $("#page-con");
  $page_con.append($its_page);

  $(`#wp_paging_w3 ul`).css("font-size", "15px");
  $(`#wp_paging_w3 ul .per_page`).css("display", "none");
}

$(function () {
  onload();
});
