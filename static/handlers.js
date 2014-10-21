var init = function() {
  showStaffPicks();

  $(".contrajd-suggestion").unbind();
  $(".contrajd-suggestion").click(function() {
    var $this = this;
    $(".contrajd-input-box").val($this.innerText);
  });

  $("#contrajd-picks, #contrajd-top").click(function(event) {
    event.preventDefault();
    var $this = $(this);

    if($this.is("contrajd-current")) {
      return;
    } else {
      if($this.attr("id") === "contrajd-picks") {
        $this.addClass("contrajd-current");
        $("#contrajd-top").removeClass("contrajd-current");

        clearPicks();
        showStaffPicks();
      }
      else if($this.attr("id") === "contrajd-top") {
        $this.addClass("contrajd-current");
        $("#contrajd-picks").removeClass("contrajd-current");

        clearPicks();
        showTopPicks();
      }

      $(".contrajd-suggestion").unbind();
      $(".contrajd-suggestion").click(function() {
        var $this = this;
        $(".contrajd-input-box").val($this.innerText);
      });
    }
  });
};