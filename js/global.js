var columnDataMap = [];
var current_column = "";
var target_column = "";

function genColumnObj(columnName, href) {
  return {
    name: columnName,
    href: href,
    children: [],
    hasChildren() {
      return this.children.length > 0;
    },
  };
}

function getLastColumn() {
  if (columnDataMap.length === 0) {
    return undefined;
  }
  return columnDataMap[columnDataMap.length - 1];
}

function appendSubColumn(columnName, href) {
  getLastColumn().children.push(genColumnObj(columnName, href));
}

// * 处理侧边菜单
function loadMenu() {
  // * position
  var $position_data = $("#position-data .Column_Position a");
  var $position_info = $(`#position-info`);
  let position_info_list = [];

  $position_data.each(function (i, item) {
    var $position_item = $(
      `<dd>
      <a class="positon-item" href="${$(item).attr("href")}">${$(
        item
      ).text()}</a>
      </dd>`
    );

    if (i <= 2) {
      current_column = $(item).text();
    }
    target_column = $(item).text();
    position_info_list.push($position_item);
  });

  $position_info.append(position_info_list);
  $(`#currentPos`).text(current_column);

  // * menu
  var $menu = $("#menu");

  var $column_list_data = $("#column-list-data a[title]");
  console.log("===", $column_list_data.length);

  //  大标题
  var columnTitle = $("#column-title-data span").text();
  var $menu_item = $(`<div class="menu-h1">${columnTitle}</div>`);
  $menu.append($menu_item);

  // 二级标题不为空
  if ($column_list_data.length > 1) {
    var $column_list = $(`#column-list-data td`);
    var $menu_dl = $(`<div class="menu-dl"><dl></dl></div>`);

    let asideItemList = [];
    $column_list.each(function (i, item) {
      if ($(item).hasClass("maincolumn-xx")) {
        let text = $(item).find("a[title]").attr("title");
        let href = $(item).find("a[title]").attr("href");
        columnDataMap.push(genColumnObj(text, href));
      } else if ($(item).hasClass("subcolumn-xx")) {
        let text = $(item).find("a[title]").attr("title");
        let href = $(item).find("a[title]").attr("href");
        appendSubColumn(text, href);
      }
    });
    console.log("=== columnDataMap", current_column, columnDataMap);

    for (let mainColumn of columnDataMap) {
      var $aside_item;
      let select = mainColumn.name === current_column;

      $aside_item = $(`
        <dd class="${select ? "cur" : ""}">
            <a href="${mainColumn.href}">${mainColumn.name} 
            </a>
        </dd>
        `);

      if (mainColumn.hasChildren()) {
        let subList = mainColumn.children.map((subColumn) => {
          return $(`<li class="${
            subColumn.name === target_column ? "cur" : ""
          }">
                <a href="${subColumn.href}">${subColumn.name}</a>
            </li>`);
        });

        $child_item = $(`<ul class="list-unstyled"></ul>`);
        $child_item.append(subList);
        $aside_item.append($child_item);
      }
      asideItemList.push($aside_item);
    }
    $menu_dl.find("dl").append(asideItemList);
  }
  $menu.append($menu_dl);
}

// * 处理导航菜单
function loadNav() {
  var $navA = $("#menu1tab a");
  var $navSub = $("#menuSubTab a");
  var $banner = $("#nav");
  var $navMobile = $("#nav-mobile");
  let menuMobileList = [];
  let bannerList = [];

  $navA.each(function (index, item) {
    var $bannerItem = $(`<li>
                    <a href="${$(item).attr("href")}"  alt="${$(item).attr(
      "alt"
    )}">${$(item).text()}</a></li>`);

    let $navMobileItem = $(`<li>
        <a href="${$(item).attr("href")}" alt="${$(item).attr("alt")}">${$(
      item
    ).text()}</a>
        <span class="jiaspan"></span>
        </li>`);

    if ($(item).text() === "资料下载") {
      $subWrap = $(`<ul class="list-unstyled"></ul>`);
      $subMobileWrap = $(`<ul class="list-unstyled"></ul>`);
      $navSub.each((_, sub) => {
        var $subItem = $(
          `<li><a href="${$(sub).attr("href")}"  alt="${$(sub).attr(
            "alt"
          )}">${$(sub).text()}</a></li>`
        );
        var $subItem2 = $(
          `<li><a href="${$(sub).attr("href")}"  alt="${$(sub).attr(
            "alt"
          )}">${$(sub).text()}</a></li>`
        );

        $subWrap.append($subItem);
        $subMobileWrap.append($subItem2);
      });

      $bannerItem.append($subWrap);
      $navMobileItem.append($subMobileWrap);
    }

    bannerList.push($bannerItem);
    menuMobileList.push($navMobileItem);
  });

  $banner.append(bannerList);
  $navMobile.append(menuMobileList);
  console.log("=== navList ===", bannerList);

  $(".nav>ul>li").hover(
    function () {
      $(this).find("ul").stop(false, true).slideDown();
    },
    function () {
      $(this).find("ul").stop(false, true).hide();
    }
  );

  $("#sanlan").click(function () {
    $("#nav-2-heidi").fadeToggle();
    $(".nav-2").slideToggle();
    $(".nav-2>ul>li>ul").slideUp();
    $(".jiaspan").removeClass("cur");
  });
  $("#nav-2-heidi").click(function () {
    $(this).fadeOut();
    $(".nav-2>ul>li>ul").slideUp();
    $(".nav-2").slideUp();
  });
  $(".jiaspan").click(function () {
    if ($(this).hasClass("cur2")) {
      $(this).removeClass("cur2");
      $(".nav-2>ul>li>ul").stop().slideUp();
    } else {
      $(".jiaspan").removeClass("cur2");
      $(this).addClass("cur2");
      $(".nav-2>ul>li>ul").stop().slideUp();
      $(this).next(".nav-2>ul>li>ul").stop().slideDown();
    }
  });
}

function onload_global() {
  // 应对新版网站群优化了后，无法修改导航菜单
  if (location.href.indexOf("_p=") !== -1) {
    $(".half-hidden").removeClass("half-hidden");
  }

  loadNav();
}

$(function () {
  onload_global();
});
