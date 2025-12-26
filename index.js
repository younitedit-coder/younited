$(function() {
  const $trigger = $('#menu-trigger');
  const $nav = $('#main-nav');
  
  // 1. スティッキーを開始する位置を取得
  const navOffsetTop = $nav.offset().top;

  // 2. スクロールイベント
  $(window).on('scroll', function() {
    // 画面幅が768px以上（PC）の場合のみ判定
    if (window.matchMedia('(min-width: 768px)').matches) {
      // ターゲット位置（初期位置より20px手前）に来たら固定
      if ($(window).scrollTop() > (navOffsetTop - 5)) {
        $nav.addClass('sticky');
      } else {
        $nav.removeClass('sticky');
      }
    } else {
      // スマホサイズになったらstickyクラスを強制解除
      $nav.removeClass('sticky');
    }
  });

  // --- メニュー開閉挙動（スマホ用） ---

  // ハンバーガーボタンクリック
  $trigger.on('click', function() {
    $(this).toggleClass('active');
    $nav.toggleClass('active');
  });

  // リンクをクリックしたら閉じる
  $nav.find('a').on('click', function() {
    $trigger.removeClass('active');
    $nav.removeClass('active');
  });
});