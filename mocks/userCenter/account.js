/* eslint-env node */
const Mock = require('mockjs');

module.exports = function (app) {
  app.post('/api/v1/admin/login/pwd', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {
          id: '@guid',
          jwt: '@guid',
          fullName: '@cname',
          loginName: '@cname',
          phoneNum: '111',
          roleType: 'Operator',
          'status|1': ['Enable', 'Disable', 'Frozen']
        }
      })
    );
  });

  app.post('/api/v1/admin/update/pwd', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {}
      })
    );
  });

  app.post('/api/v1/admin/user/resetPwd', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {}
      })
    );
  });
};
