layui.define(['admin', 'table', 'util'], (exports) => {
  let $ = layui.$,
    admin = layui.admin,
    table = layui.table,
    element = layui.element,
    DISABLED = 'layui-btn-disabled',
    // 区分各选项卡中的表格
    tabs = {
      all: {
        text: '全部消息',
        id: 'LAY-app-message-all',
      },
      notice: {
        text: '通知',
        id: 'LAY-app-message-notice',
      },
      direct: {
        text: '私信',
        id: 'LAY-app-message-direct',
      },
    }
  // 全部消息
  table.render({
    elem: '#LAY-app-message-all',
    url: '/iframe/json/message/all.json',
    cols: [
      [
        { type: 'checkbox', fixed: 'left' },
        {
          field: 'title',
          title: '标题内容',
          minWidth: 300,
          templet: '#titleTpl',
        },
        {
          field: 'time',
          title: '时间',
          width: 170,
          templet: '<div>{{ layui.util.timeAgo(d.time) }}</div>',
        },
      ],
    ],
    page: true,
    skin: 'line',
  })
  // 通知
  table.render({
    elem: '#LAY-app-message-notice',
    url: '/iframe/json/message/notice.json',
    cols: [
      [
        { type: 'checkbox', fixed: 'left' },
        {
          field: 'title',
          title: '标题内容',
          minWidth: 300,
          templet: '#titleTpl',
        },
        {
          field: 'time',
          title: '时间',
          width: 170,
          templet: '<div>{{ layui.util.timeAgo(d.time) }}</div>',
        },
      ],
    ],
    page: true,
    skin: 'line',
  })
  // 私信
  table.render({
    elem: '#LAY-app-message-direct',
    url: '/iframe/json/message/direct.json',
    cols: [
      [
        { type: 'checkbox', fixed: 'left' },
        {
          field: 'title',
          title: '标题内容',
          minWidth: 300,
          templet: '#titleTpl',
        },
        {
          field: 'time',
          title: '时间',
          width: 170,
          templet: '<div>{{ layui.util.timeAgo(d.time) }}</div>',
        },
      ],
    ],
    page: true,
    skin: 'line',
  })

  // 事件处理
  let event = {
    del(othis, type) {
      let thisTabs = tabs[type],
        checkStatus = table.checkStatus(thisTabs.id),
        checkData = checkStatus.data
      if (checkData.length === 0) return layer.msg('未选中行')
      layer.confirm('确定删除选中的数据吗？', (index) => {
        // 请求接口
        // admin.req({})
        layer.msg('删除成功', { icon: 1 })
        table.reload(thisTabs.id)
      })
    },
    read(othis, type) {
      let thisTabs = tabs[type],
        checkStatus = table.checkStatus(thisTabs.id),
        checkData = checkStatus.data
      if (checkData.length === 0) return layer.msg('未选中行')

      // 此处只是演示
      layer.msg('标记已读成功', { icon: 1 })
      table.reload(thisTabs.id)
    },
    readAll(othis, type) {
      let thisTabs = tabs[type]
      layer.msg(thisTabs.text + '：全部已读', { icon: 1 })
    },
  }

  $('.layui-btn-container .layui-btn').on('click', function () {
    let thisEvent = $(this).data('event'),
      type = $(this).data('type'),
      othis = $(this)
    event[thisEvent] && event[thisEvent].call(this, othis, type)
  })
  exports('message', {})
})
