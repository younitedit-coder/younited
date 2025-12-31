$(function () {
  // --- 1. 変数定義（何度も使う要素をキャッシュ） ---
  const $window = $(window);
  const $trigger = $('#menu-trigger');
  const $nav = $('#main-nav');
  const navOffsetTop = $nav.length ? $nav.offset().top : 0; // 要素がない場合のバグ防止

  // --- 2. スクロール・読み込み時の共通処理 ---
  $window.on('scroll load', function () {
    const scroll = $window.scrollTop();
    const windowHeight = $window.height();
    const scrollBottom = scroll + windowHeight - 100; // 発火タイミングの基準点

    // A. ナビゲーションのSticky処理（PCのみ）
    if (window.matchMedia('(min-width: 768px)').matches) {
      if (scroll > (navOffsetTop - 5)) {
        $nav.addClass('sticky');
      } else {
        $nav.removeClass('sticky');
      }
    } else {
      $nav.removeClass('sticky');
    }

    // B. 各種アニメーション要素の表示判定
    // ふわっと出る要素、スライドテキスト
    $('.fade-in-up, .stagger-slide').each(function () {
      if (scrollBottom > $(this).offset().top) {
        $(this).addClass('is-show');
      }
    });

    // 円形アニメーションの開始
    $('.circle-container').each(function () {
      if (scrollBottom > $(this).offset().top) {
        $(this).find('.circle-line').addClass('is-active');
      }
    });
  });

  // --- 3. クリックイベント ---

  // ハンバーガーメニュー開閉
  $trigger.on('click', function () {
    $(this).toggleClass('active');
    $nav.toggleClass('active');
  });

  // メニューリンクをクリックしたら閉じる
  $nav.find('a').on('click', function () {
    $trigger.removeClass('active');
    $nav.removeClass('active');
  });

  // Moreボタン（円形）クリックで中身をスライド表示
  $('.js-lead-slide').on('click', function () {
    // slideToggleを使い、アニメーションの重複を防ぐstop()を追加
    $('.lead-txt-slide').stop().slideToggle();
    $(this).toggleClass('is-open'); // 枠側の管理

    // テキストの切り替え処理を追加
    if ($(this).hasClass('is-open')) {
      $('.circle-text').text('CLOSE'); // もしis-openが付与されたらCLOSEに変更
    } else {
      $('.circle-text').text('MORE');  // is-openが外れたら元のテキスト（例: MORE）に戻す
    }
  });

});