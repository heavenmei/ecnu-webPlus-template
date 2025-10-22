function loadList() {
  var $list_item_data = $(`#list-item-data tbody tbody tr`);
  var $list_con = $(`#news_list`);
  let list_list = [];
  const data = [];

  // 只有一个文章时展示全文
  if ($list_item_data.length === 0) {
    // aside显示，文章为空
    $("#article-con").removeClass("hidden");
    $("#article-content").text("暂无内容");
    var $article_data = $(`#list-item-data`);
    $list_con.append($article_data);
    return;
  }

  $list_item_data.each(function (i, item) {
    const tds = $(item).find("td");
    const read = $(tds[2]).find("div").text().split(")")[0].split("(")[1];
    const date = $(tds[3]).find("div").text();
    const title = $(tds[0]).find("a:first");
    const pic = $(tds[1]).find("img");
    const content = $(tds[4]).find("a").text();
    data.push({
      pic,
      title,
      read,
      date,
      content,
    });

    var $img_item = $(`<dd>
                  <div class="news-con">
                    <h1 class="tver">
                      <a
                        href="${title.attr("href")}"
                        target="_blank"
                        title="${title.attr("title")}"
                        >${title.attr("title")}</a                      >
                    </h1>
                    <h2>
                     <span class="news-con-time">时间：${date}</span>
                      <span class="news-con-read">阅读量：${read}</span>
                    </h2>
                    ${content && `<p>${content}</p>`}
                  </div>
                  <div class="clear"></div>
                </dd>`);
    list_list.push($img_item);
  });
  console.log("=== loadList ===", data);
  $list_con.append(list_list);
}

function onload() {
  loadList();
  loadMenu();

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
