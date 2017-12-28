var _ = require('underscore')
var $scope = {}
{

}
$scope.data = {
  'roleList': [
    {
      'roleLevel': 1,
      'roelName': '集团HSE',
      'roelId': 111
    },
    {
      'roleLevel': 2,
      'roelName': '区域A',
      'roelId': 222
    },
    {
      'roleLevel': 3,
      'roelName': '总包01',
      'roelId': 333
    }
  ],
  'fProjectList': [
    {
      'projectLevel': 3,
      'currentId': 334,
      'currentName': '项目A',
      'parentId': '002',
      'parentName': '区域A',
      'roelId': '222',
      'roelName': '区域A'
    },
    {
      'projectLevel': 3,
      'currentId': 335,
      'currentName': '项目B',
      'parentId': '002',
      'parentName': '区域A',
      'roelId': '222',
      'roelName': '区域A'
    },
    {
      'projectLevel': 3,
      'currentId': '336',
      'currentName': '项目B',
      'parentId': '001',
      'parentName': '区域B',
      'roelId': '333',
      'roelName': '总包01'
    },
    {
      'projectLevel': 2,
      'currentId': '336',
      'currentName': '区域C',
      'parentId': '011',
      'parentName': '集团',
      'roelId': '111',
      'roelName': '集团HSE'
    },
    {
      'projectLevel': 2,
      'currentId': '001',
      'currentName': '区域B',
      'parentId': '011',
      'parentName': '集团',
      'roelId': '111',
      'roelName': '集团HSE'
    },
    {
      'projectLevel': 2,
      'currentId': '002',
      'currentName': '区域A',
      'parentId': '011',
      'parentName': '集团',
      'roelId': '111',
      'roelName': '集团HSE'
    }
  ],
  QXList: [
    {
      'authFunctionId': 'change',
      'roelId': 222
    },
    {
      'authFunctionId': 'create',
      'roelId': 111
    },
    {
      'authFunctionId': 'reform',
      'roelId': 333
    }
  ]
}
// 项目筛选
$scope.projectList = []
$scope.areaList = []
$scope.groupList = []
if ($scope.data.fProjectList.length > 0) {
  _.each($scope.data.fProjectList, function (item, index) {
    if (item.projectLevel == 3) {
      $scope.projectList.push(item)
    } else if (item.projectLevel == 2) {
      $scope.areaList.push(item)
    } else {
      $scope.groupList.push(item)
    }
  })
}

// 权限合并
function getAuthRole (roleId) {
  // var deferred = $q.defer();
  $scope.isHaveAuthRole = []
  _.each($scope.data.roleList, function (item2, index2) {
    var even = _.find($scope.data.QXList, function (item) {
      return (item.roelId == item2.roelId && item.authFunctionId == roleId)
    })
    if (even) {
      $scope.isHaveAuthRole.push(even)
    }
  })
}
getAuthRole('create')
console.log($scope.isHaveAuthRole)

// 查看某个项目底下的详情页
function getTheRole (projectId) {
  $scope.allRoles = []
  var evens = _.filter($scope.data.fProjectList, function (item) {
    return item.currentId == projectId
  })
  if (evens.length > 0) {
    _.each(evens, function (item) {
      var even = _.find($scope.data.QXList, function (item2) {
        return (item.roelId == item2.roelId)
      })
      if (even) {
        $scope.allRoles.push(even)
      }
    })
  }
}
getTheRole('336')
console.log($scope.allRoles)
