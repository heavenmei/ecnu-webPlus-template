// * 滚动头图
function loadSwiper() {
  var $swiper = $("#swiper");
  var $swiper_data = $("#item_id100 .c_pt_12");

  let swiperItmList = [];
  $swiper_data.each(function (i, item) {
    var $pic_a = $(item).find(".c_pic a");
    var $img = $(item).find(".c_pic a img");
    var $swiper_item = $(
      `<li title="${$pic_a.attr("title")}"><img src="${$img
        .attr("src")
        .replace("_s.", ".")}" /></li>`
    );
    swiperItmList.push($swiper_item);
  });

  console.log("=== swiperItmList", swiperItmList);
  $swiper.append(swiperItmList);
}

// * 新闻动态
function loadNews() {
  let $news_img_data = $("tr .data-news-img");
  let $news_left = $("#new_img");
  const COUNT = 2;

  $news_img_data.slice(0, COUNT).each(function (i, item) {
    const text = $(item).find("td").text();
    const index = text.search(/\d{4}-\d{2}-\d{2}/);
    var date = text.substr(index);
    // console.log("=== loadNews ===", $(item).find("a"));

    var $img_item = $(`<li>
      <div class="main1-pic">
        <a
          href="${$(item).find("a:first").attr("href")}"
          target="_blank"
          title="${$(item).find("a:first").attr("title")}"
          class="imgbox_a imgbox_hover"
        >
         <img
            src="${$(item).find("img").attr("src").replace("_s.", ".")}">
        </a>
      </div>
      <div class="main1-con">
        <h1 class="tver">
        <a
          href="${$(item).find("a:first").attr("href")}"
          target="_blank"
          title="${$(item).find("a:first").attr("title")}"
          class="imgbox_a imgbox_hover"
        >
         ${$(item).find("a:first").attr("title")}
        </a>
        </h1>
        <p>${$($(item).find("a")[1]).text()}</p>
      </div>
    </li>`);
    $news_left.append($img_item);
  });

  let $news_con = $("#new_list");
  $news_img_data.slice(COUNT).each(function (i, item) {
    // let date = $(item).find("div").text();
    const text = $(item).find("td").text();
    const index = text.search(/\d{4}-\d{2}-\d{2}/);
    var date = text.substr(index);
    var $news_item = $(`<dd>
                      <h1 class="tver">
                        <a
                          href="${$(item).find("a").attr("href")}"
                          target="_blank"
                          title="${$(item).find("a").attr("title")}"
                          >${$(item).find("a").attr("title")}</a
                        >
                      </h1>
                      <h2>${date}</h2>
                    </dd>`);
    $news_con.append($news_item);
  });

  $("#news-more-a").attr("href", $(".new-data-con .more-link").attr("href"));
}

// * 通知公告
function loadNotices() {
  var $notice_data = $("tr .notice-data");
  var $notice_con = $("#notices_list");
  var notice_list = [];
  $notice_data.each(function (i, item) {
    let date = $(item).find("div").text().split("-");
    let data_a = $(item).find("a");
    notice_list.push({
      date: date,
      data_a: data_a,
    });

    var $not_item = $(`<dd>
                    <div class="main1-2-date fl">
                      <h1>${date[2]}</h1>
                      <h2>${date[0]}-${date[1]}</h2>
                    </div>
                    <div class="main1-2-con ovh">
                      <div class="main1-2-a">
                        <a
                          href="${data_a.attr("href")}"
                          target="_blank"
                          title="${data_a.attr("title")}"
                          >${data_a.attr("title")}</a>
                      </div>
                    </div>
                    </dd>`);
    $notice_con.append($not_item);
  });
  console.log("=== loadNotices ===", notice_list);

  $("#notices-more-a").attr(
    "href",
    $(".notice-data-con .more-link").attr("href")
  );
}

// * 学术活动
function loadActivities() {
  var $act_data = $("tr .activity-data");
  var $act_con = $("#activity_list");
  var act_list = [];
  $act_data.each(function (i, item) {
    // 标题 作者 发布时间 浏览次数 简介
    const text = $(item)
      .find("td")
      .text()
      .split("\n")
      .filter((x) => x.trim() !== "");
    act_list.push(text);

    var $act_item = $(`  <div class="item">
                  <a
                    href="${$(item).find("a:first").attr("href")}"
                    target="_blank"
                    title="${$(item).find("a:first").attr("title")}"
                    class="main2-item"
                  >
                    <div class="main2-title tver">${text[0]}</div>
                    <div class="main2-item-con">
                      <div class="main2-pic fl">
                        <div class="imgbox_a">
                          ${
                            $(item).find("img").attr("src")
                              ? `<img
                            src="${$(item)
                              .find("img")
                              .attr("src")
                              .replace("_s.", ".")}"
                            alt=""
                          />`
                              : ""
                          }
                        </div>
                      </div>
                      <div class="main2-dl">
                        <dl>
                        ${
                          text[1]
                            ? `<dd class="dd1 tver">发布时间：${text[1]}</dd>`
                            : ""
                        }
                        ${
                          text[2]
                            ? `<dd class="dd1 tver">浏览次数：${text[2]}</dd>`
                            : ""
                        }
                        ${
                          text[3] ? `<dd class="dd4">简介：${text[3]}</dd>` : ""
                        }
                        </dl>
                      </div>
                      <div class="clear"></div>
                    </div>
                  </a>
                </div>`);
    $act_con.prepend($act_item);
  });
  console.log("=== loadActivities ===", act_list);

  $(".main2-list").owlCarousel({
    margin: 0,
    nav: false,
    dots: false,
    smartSpeed: 500,
    mouseDrag: false,
    autoplay: true,
    autoplayTimeout: 6000,
    // autoplayHoverPause:true,
    loop: false,
    rewind: true,
    responsive: {
      0: {
        items: 1,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 3,
      },
      1500: {
        items: 3,
        margin: 10,
      },
    },
  });

  $("#activity-more-a").attr(
    "href",
    $(".activity-data-con .more-link").attr("href")
  );
}

// * 研究进展 + 资料下载
function loadDownload() {
  let $research_data = $("tr .research-data");
  let $research_cn = $("#research-cn");

  $research_data.each(function (i, item) {
    const text = $(item).find("td").text();
    const index = text.search(/\d{4}-\d{2}-\d{2}/);
    var date = text.substr(index);
    // console.log("=== loadNews ===", $(item).find("a"));

    var $item = $(`<dd>
                      <a
                        href="${$(item).find("a:first").attr("href")}"
                        target="_blank"
                        title="${$(item).find("a:first").attr("title")}"
                        >${$(item).find("a:first").attr("title")}</a
                      ><span class="span_11">${date}</span>
                    </dd>`);
    $research_cn.append($item);
  });
  $("#research-more-a").attr(
    "href",
    $(".research-data-con .more-link").attr("href")
  );

  let $download_data = $("tr .download-data");
  let $download_cn = $("#download-cn");

  $download_data.each(function (i, item) {
    const text = $(item).find("td").text();
    const index = text.search(/\d{4}-\d{2}-\d{2}/);
    var date = text.substr(index);
    // console.log("=== loadNews ===", $(item).find("a"));

    var $item = $(`<dd>
                      <a
                        href="${$(item).find("a:first").attr("href")}"
                        target="_blank"
                        title="${$(item).find("a:first").attr("title")}"
                        >${$(item).find("a:first").attr("title")}</a
                      ><span class="span_11">${date}</span>
                    </dd>`);
    $download_cn.append($item);
  });
  $("#download-more-a").attr(
    "href",
    $(".download-data-con .more-link").attr("href")
  );
}

// * 读取隐藏的数据
function onload() {
  loadSwiper();
  loadNews();
  loadNotices();
  loadActivities();
  loadDownload();
}

$(function () {
  onload();
});
