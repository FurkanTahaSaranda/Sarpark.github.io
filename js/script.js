
//video slayt

  // Videoların her geçişten sonra sıfırlanmasını sağla
  $('#carouselExampleFade').on('slide.bs.carousel', function (e) {
    var video = $(e.relatedTarget).find('video')[0];
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  });


  