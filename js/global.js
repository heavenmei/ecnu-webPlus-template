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

/**
 * 将 menu ul li 转换为树状数组
 */
function ulToTree($ul, parent) {
  var result = [];

  $ul.children("li").each(function () {
    var $li = $(this);
    var $a = $li.children("a").first();
    var $subUl = $li.children("ul").first();

    var node = {
      name: $a.attr("title"),
      href: $a.attr("href"),
      parent: parent,
      children: $subUl.length > 0 ? ulToTree($subUl, $a.attr("title")) : [],
    };

    result.push(node);
  });

  return result;
}

/**
 * 递归创建 侧边菜单
 */
function createSideMenuItems(menuData, depth, current_column) {
  depth = depth || 1;
  var menuItems = [];

  $.each(menuData, function (index, item) {
    let select = item.name === current_column;
    // 创建当前层级的菜单项
    var $menuItem;
    if (depth === 1) {
      $menuItem = $(
        `<div class="menu-h1 level-${depth}"><a href="${item.href}" alt="${item.alt}">${item.name}</a></div>`
      );
    } else if (depth === 2 || item.parent === current_column || select) {
      $menuItem = $(`
        <dd class="${select ? "cur" : ""} level-${depth}">
        <a href="${item.href}">${item.name} 
        </a>
        </dd>
        `);
    }

    // 如果有子菜单，递归创建
    if (item.children && item.children.length > 0) {
      var $subMenu = $(`<div class="menu-dl level-${depth}"><dl></dl></div>`);
      var $subItems = createSideMenuItems(
        item.children,
        depth + 1,
        current_column
      );
      $subMenu.append($subItems);
      $menuItem.append($subMenu);
    }

    menuItems.push($menuItem);
  });

  return menuItems;
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

    // if (i <= 2) {
    // }
    current_column = $(item).text();
    target_column = $(item).text();
    position_info_list.push($position_item);
  });

  $position_info.append(position_info_list);
  $(`#currentPos`).text(current_column);

  // * menu
  var $menu = $("#menu");
  var columnTitle = $("#column-title-data span").text();
  var menuTree = ulToTree($("#wp_nav_w11").children("ul"));

  const targetMenuTree = menuTree.find((item) => item.name === columnTitle);
  const sideMenuData = createSideMenuItems([targetMenuTree], 1, current_column);
  $menu.append(sideMenuData);
}

/**
 * 递归创建菜单项（桌面端）
 */
function createMenuItems(menuData, depth, maxDepth = 2) {
  depth = depth || 1;
  if (depth > maxDepth) return;
  var menuItems = [];

  $.each(menuData, function (index, item) {
    // 创建当前层级的菜单项
    var $menuItem = $(`<li class="level-${depth}">
      <a href="${item.href}" alt="">${item.name}</a>
    </li>`);

    // 如果有子菜单，递归创建
    if (item.children && item.children.length > 0) {
      var $subMenu = $(`<ul class="list-unstyled sub-level-${depth}"></ul>`);
      var $subItems = createMenuItems(item.children, depth + 1);
      $subMenu.append($subItems);
      $menuItem.append($subMenu);
    }

    menuItems.push($menuItem);
  });

  return menuItems;
}

/**
 * 递归创建移动端菜单项
 */
function createMobileMenuItems(menuData, depth, maxDepth = 2) {
  depth = depth || 1;
  if (depth > maxDepth) return;
  var menuItems = [];

  $.each(menuData, function (index, item) {
    // 创建当前层级的菜单项
    var $menuItem = $(`<li class="level-${depth}">
      <a href="${item.href}" alt="">${item.name}</a>
    </li>`);

    // 如果有子菜单，添加展开按钮并递归创建
    if (item.children && item.children.length > 0) {
      // 只在第一层添加 jiaspan
      if (depth === 1) {
        $menuItem.find("a").after('<span class="jiaspan"></span>');
      }

      var $subMenu = $(`<ul class="list-unstyled sub-level-${depth}"></ul>`);
      var $subItems = createMobileMenuItems(item.children, depth + 1);
      $subMenu.append($subItems);
      $menuItem.append($subMenu);
    }

    menuItems.push($menuItem);
  });

  return menuItems;
}

// * 处理导航菜单
function loadNav() {
  var $navA = $("#wp_nav_w11").children("ul").children("li");
  var $banner = $("#nav");
  var $navMobile = $("#nav-mobile");

  var menuTree = ulToTree($("#wp_nav_w11").children("ul"));
  console.log("🚀 ~ loadMenu ~ menuTree:", menuTree);

  // 使用递归函数创建菜单
  var bannerList = createMenuItems(menuTree, 1);
  var menuMobileList = createMobileMenuItems(menuTree, 1);

  $banner.append(bannerList);
  $navMobile.append(menuMobileList);

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
