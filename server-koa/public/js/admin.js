$(function () {
  function remove (element, url) {
    $(element).click(function (e) {
      var target = $(e.target)
      var id = target.data('id')
      var tr = $('.item-id-' + id)

      $.ajax({
        type: 'DELETE',
        url: url + '?id=' + id
      })
        .done(function (results) {
          if (results.success === 1) {
            if (tr.length > 0) {
              tr.remove()
            }
          }
        })
    })
  }

  remove('.js-message-del', '/admin/message')
  remove('.js-emoji-del', '/admin/emoji')
})
