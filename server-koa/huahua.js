var projectList = [
  {
    'roleId': 'a6f9624b031e4affb92fbb12f5d9547b',
    'agencyId': '312312312-321378129312-124512412231',
    'agencyName': '中欧国际城',
    'agencyType': '100000002',
    'parentId': '3231d193-1fd8-e411-80c5-005056a61361',
    'parentName': '金茂青岛',
    'level': '4',
    'parentLevel': '3'
  },
  {
    'roleId': '54ea900d77ea4e6da1f27036f39a9852',
    'agencyId': '3231d193-1fd8-e411-80c5-005056a61361',
    'agencyName': '金茂青岛',
    'agencyType': '100000003',
    'parentId': '1e6395a7-376a-e411-80c1-005056a63151',
    'parentName': '金茂北京',
    'level': '3',
    'parentLevel': '2'
  },
  {
    'roleId': '12c6ddb8fd4d492baf8ff3bae92aa4f1',
    'agencyId': '7d3e1bed-1fd8-e411-80c5-005056a61361',
    'agencyName': '青岛金茂湾',
    'agencyType': '100000002',
    'parentId': '3231d193-1fd8-e411-80c5-005056a61361',
    'parentName': '金茂青岛',
    'level': '4',
    'parentLevel': '3'
  },
  {
    'roleId': '5dc98d242723435ebe4d9eab606b30c5',
    'agencyId': 'aae7b20d-3a6a-e411-80c1-005056a63151',
    'agencyName': '广渠金茂府',
    'agencyType': '100000002',
    'parentId': '1e6395a7-376a-e411-80c1-005056a63151',
    'parentName': '金茂北京',
    'level': '4',
    'parentLevel': '2'
  },
  {
    'roleId': 'a6f9624b031e4affb92fbb12f5d9547b',
    'agencyId': 'e66e9021-43bd-e711-80fd-005056ac019c',
    'agencyName': '金茂逸家园',
    'agencyType': '100000002',
    'parentId': '1e6395a7-376a-e411-80c1-005056a63151',
    'parentName': '金茂北京',
    'level': '4',
    'parentLevel': '2'
  }
]

var hash = {}
var dataLevel2 = projectList.reduce(function (project, next) {
  if (!hash[next.parentId] && next.parentLevel === '2') {
    hash[next.parentId] = true
    project.push({
      agencyId: next.parentId,
      agencyName: next.parentName,
      level: next.parentLevel
    })
  }
  return project
}, [])

var getTree = arr => {
  const map = arr.reduce((acc, val) => {
    acc[val.agencyId] = val
    return acc
  }, {})

  const tree = []
  arr.forEach(region => {
    if (region.parentId) {
      const parent = map[region.parentId]
      if (!parent.children) {
        parent.children = [region]
      } else {
        parent.children.push(region)
      }
    } else {
      tree.push(region)
    }
  })

  return { map, tree }
}

console.log(getTree(projectList.concat(dataLevel2)).tree)

// [{
//   agencyId: '',
//   agencyName: '',
//   level: 2,
//   data: [
//     {
//       agencyId: '',
//       agencyName: '',
//       level: 3,
//       data: [
//         {
//           agencyId: '',
//           agencyName: '',
//           level: 4
//         }
//       ]
//     }
//   ]
// }]

// 三层

/* var dataLevel2 = []
var dataLevel3 = []

for (var i = 0; i < projectList.length; i++) {
  var project = projectList[i]
  var hasLevel2Repeat = dataLevel2.some(item => item.agencyId === project.parentId)
  var hasLevel3Repeat = dataLevel3.some(item => item.agencyId === project.parentId)
  var city = {
    agencyId: project.parentId,
    agencyName: project.parentName,
    level: project.parentLevel,
    data: []
  }
  if (!hasLevel2Repeat && project.parentLevel === '2') {
    dataLevel2.push(city)
  }
  if (!hasLevel3Repeat && project.parentLevel === '3') {
    dataLevel3.push(city)
  }
}

function next (data, agencyId, level) {
  for (var i = 0; i < projectList.length; i++) {
    var project = projectList[i]
    var item = {
      agencyId: project.agencyId,
      agencyName: project.agencyName,
      agencyType: project.agencyType,
      level: project.level
    }
    if (project.parentLevel === level && project.parentId === agencyId) { // 如果 agencyId = 2
      data.push(item)
    }
  }
}

for (var j = 0; j < dataLevel2.length; j++) {
  var itemLevel2 = dataLevel2[j]
  next(itemLevel2.data, itemLevel2.agencyId, itemLevel2.level)
}

for (var k = 0; k < dataLevel3.length; k++) {
  var itemLevel3 = dataLevel3[k]
  next(itemLevel3.data, itemLevel3.agencyId, itemLevel3.level)
}

for (var l = 0; l < dataLevel2.length; l++) {
  var data = dataLevel2[l].data
  for (var m = 0; m < data.length; m++) {
    for (var n = 0; n < dataLevel3.length; n++) {
      console.log(data[m].agencyId, dataLevel3[n].agencyId)
      if (data[m].agencyId === dataLevel3[n].agencyId) {
        dataLevel2[l].data[m].data = dataLevel3[n].data
        break
      }
    }
  }
} */

// 两层

// var dataLevel2 = []

// for (var i = 0; i < projectList.length; i++) {
//   var project = projectList[i]
//   var hasLevel2Repeat = dataLevel2.some(item => item.agencyId === project.parentId)
//   var city = {
//     agencyId: project.parentId,
//     agencyName: project.parentName,
//     level: project.parentLevel,
//     data: []
//   }
//   if (!hasLevel2Repeat && project.parentLevel === '2') {
//     dataLevel2.push(city)
//   }
// }

// console.log(dataLevel2)

// function next (data, agencyId, level) {
//   for (var i = 0; i < projectList.length; i++) {
//     var project = projectList[i]
//     var item = {
//       agencyId: project.agencyId,
//       agencyName: project.agencyName,
//       agencyType: project.agencyType,
//       level: project.level
//     }
//     if (project.parentLevel === level && project.parentId === agencyId) { // 如果 agencyId = 2
//       data.push(item)
//     }
//   }
// }

// for (var j = 0; j < dataLevel2.length; j++) {
//   var itemLevel2 = dataLevel2[j]
//   next(itemLevel2.data, itemLevel2.agencyId, itemLevel2.level)
// }

// var hash = {}
// dataLevel2 = projectList.reduce(function (project, next) {
//   if (!hash[next.parentId] && next.parentLevel === '2') {
//     hash[next.parentId] = true
//     project.push({
//       agencyId: next.parentId,
//       agencyName: next.parentName,
//       level: next.parentLevel,
//       data: []
//     })
//   }
//   return project
// }, [])
