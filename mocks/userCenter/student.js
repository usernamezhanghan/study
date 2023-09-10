/* eslint-env node */
const { Random } = require('mockjs');
const Mock = require('mockjs');

module.exports = function (app) {
  app.get('/api/v1/admin/student/page', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {
          total: 110,
          pages: 11,
          'records|10': [
            {
              id: '@guid',
              courseType: '实训课',
              name: '@cname',
              phoneNum: '151',
              wxAvatar: Random.image(),
              wxId: '@guid',
              wxOpenId: '@guid',
              wxName: '@cname',
              createTime: '@date("yyyy-MM-dd")'
            }
          ]
        }
      })
    );
  });

  app.get('/api/v1/common/courseType/list', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        'data|3': [
          {
            id: '@guid',
            name: '@cname'
          }
        ]
      })
    );
  });

  app.get('/api/v1/admin/student/detail', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {
          id: '@guid',
          courseType: '实训课',
          'courses|2': [
            {
              courseId: '@guid',
              courseName: '@ctitle',
              createTime: '@date("yyyy-MM-dd")'
            }
          ],
          name: '@cname',
          phoneNum: '151',
          proTitle: '@ctitle',
          department: '@ctitle',
          hospital: '@ctitle',
          wxAvatar: Random.image(),
          wxId: '@guid',
          wxOpenId: '@guid',
          wxName: '@cname'
        }
      })
    );
  });
};
