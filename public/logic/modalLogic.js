$(window).on("show.bs.modal", function(event) {
  var button = $(event.relatedTarget);
  var oldShort = button.attr("data-prev");
  $("#editURL").attr("placeholder", oldShort);
  $("#urlEdited").val(oldShort);
});

$(document).ready(function() {
  $("p.copyToClipboard").click(function() {
    var id = $(this).attr("id");
    copyToClipboard(id);
  });
  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });
});

function copyToClipboard(url) {
  const domain = window.location.href;
  const copied = domain + url;
  $("#hiddenInput").val(copied);
  $("#hiddenInput").attr("type", "text");
  var copyText = document.getElementById("hiddenInput");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  $("#hiddenInput").attr("type", "hidden");
}
