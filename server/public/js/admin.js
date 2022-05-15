/* eslint-disable */
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
  remove('.js-user-del', '/admin/user')

  $('.js-message-reply').click(function (e) {
    var meaning = $(this).data('meaning')
    var reply = $('#reply')
    reply.val(reply.val() + '[q:' + meaning + ']')
  })

  $('.js-user-setting').click(function (e) {
    var target = $(e.target)
    var id = target.data('id')
    var tr = $('.item-id-' + id)

    $.ajax({
      type: 'GET',
      url: '/admin/user/setting?id=' + id
    })
      .done(function (result) {
        if (result.success === 1) {
          if (tr.length > 0) {
            tr.find('td.item-id-' + id).text('管理员')
          }
        }
      })
  })
})
