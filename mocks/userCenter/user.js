/* eslint-env node */
const Mock = require('mockjs');

module.exports = function (app) {
  app.get('/api/v1/admin/user/page', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {
          total: 110,
          pages: 11,
          'records|10': [
            {
              id: '@guid',
              createTime: '@date("yyyy-MM-dd")',
              creatorName: '@cname',
              fullName: '@cname',
              loginName: '@cname',
              phoneNum: '111',
              role: 'admin',
              'status|1': ['Enable', 'Disable', 'Frozen']
            }
          ]
        }
      })
    );
  });

  app.get('/api/v1/admin/user/edit', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {
          id: '@guid',
          fullName: '@cname',
          loginName: '@cname',
          phoneNum: '111',
          roleType: 'Operator'
        }
      })
    );
  });

  app.post('/api/v1/admin/user/add', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {}
      })
    );
  });

  app.post('/api/v1/admin/user/update', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {}
      })
    );
  });

  app.post('/api/v1/admin/user/delete', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {}
      })
    );
  });

  app.post('/api/v1/admin/user/disable', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {}
      })
    );
  });

  app.post('/api/v1/admin/user/enable', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {}
      })
    );
  });

  app.get('/api/v1/admin/subject/page', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {
          total: 110,
          pages: 11,
          'records|10': [
            {
              id: '@guid',
              updateTime: '@date("yyyy-MM-dd")',
              name: '@cname',
              updaterName: '@cname',
              disabled: '@boolean'
            }
          ]
        }
      })
    );
  });
  app.post('/api/v1/admin/subject/update', function (req, res) {
    res.json(
      Mock.mock({
        code: '0'
      })
    );
  });
  app.post('/api/v1/admin/subject/add', function (req, res) {
    res.json(
      Mock.mock({
        code: '0'
      })
    );
  });
  app.get('/api/v1/admin/subject/edit', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {
          id: '@guid',
          name: '@cname',
          disabled: '@boolean'
        }
      })
    );
  });
  app.post('/api/v1/admin/subject/delete', function (req, res) {
    res.json(
      Mock.mock({
        code: '0'
      })
    );
  });
  app.get('/api/v1/admin/lecturer/page', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {
          total: 110,
          pages: 11,
          'records|10': [
            {
              id: '@guid',
              updateTime: '@date("yyyy-MM-dd")',
              name: '@cname',
              updaterName: '@cname',
              disabled: '@boolean',
              description: '@cname',
              hospital: '@cname',
              hospitalId: '@guid',
              proTitle: '@cname',
              proTitleId: '@guid',
              subject: '@cname',
              subjectId: '@guid'
            }
          ]
        }
      })
    );
  });
  app.get('/api/v1/admin/lecturer/edit', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {
          id: '@guid',
          updateTime: '@date("yyyy-MM-dd")',
          name: '@cname',
          updaterName: '@cname',
          disabled: '@boolean',
          description: '@cname',
          hospital: '@cname',
          hospitalId: '@guid',
          proTitle: '@cname',
          proTitleId: '@guid',
          subject: '@cname',
          subjectId: '@guid'
        }
      })
    );
  });
  app.post('/api/v1/admin/lecturer/update', function (req, res) {
    res.json(
      Mock.mock({
        code: '0'
      })
    );
  });
  app.post('/api/v1/admin/lecturer/add', function (req, res) {
    res.json(
      Mock.mock({
        code: '0'
      })
    );
  });
  app.get('/api/v1/common/hospital/list', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: [
          {
            id: '@guid',
            name: '@cname',
            disabled: '@boolean'
          }
        ]
      })
    );
  });
  app.get('/api/v1/common/subject/list', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: [
          {
            id: '@guid',
            name: '@cname',
            disabled: '@boolean'
          }
        ]
      })
    );
  });
  app.get('/api/v1/common/protitle/list', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: [
          {
            id: '@guid',
            name: '@cname',
            disabled: '@boolean'
          }
        ]
      })
    );
  });
  app.get('/api/v1/common/lecturer/list', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: [
          {
            id: '@guid',
            name: '@cname',
            disabled: '@boolean'
          }
        ]
      })
    );
  });
  app.post('/api/v1/admin/subject/disable', function (req, res) {
    res.json(
      Mock.mock({
        code: '1'
      })
    );
  });
  app.get('/api/v1/admin/course/page', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {
          total: 110,
          pages: 11,
          'records|10': [
            {
              id: '@guid',
              updateTime: '@date("yyyy-MM-dd")',
              name: '@cname',
              updaterName: '@cname',
              chapter: '@integer(1,30)',
              verse: '@integer(1,30)',
              type: '@cname',
              lecturer: '@cname',
              code: '@guid',
              subject: '@cname',
              qrCode: '@image(180x180)',
              'status|1': ['BeforeEnroll', 'Enrolling', 'Enrolled', 'Teaching', 'Completed']
            }
          ]
        }
      })
    );
  });
  app.get('/api/v1/common/coursetype/list', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: [
          {
            id: '@guid',
            name: '@cname'
          },
          {
            id: '@guid',
            name: '@cname'
          }
        ]
      })
    );
  });
  app.get('/api/v1/admin/coursestudent/page', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {
          total: 110,
          pages: 11,
          'records|10': [
            {
              code: '@guid',
              createTime: '@date("yyyy-MM-dd")',
              visitTime: '@date("yyyy-MM-dd")',
              name: '@cname',
              department: '@cname',
              hospital: '@cname',
              paymentVoucher: '@cname',
              proTitle: '@cname',
              phoneNum: '@integer(11,11)',
              verse: '@integer(1,30)',
              type: '@cname',
              lecturer: '@cname',
              courseId: '@guid',
              studentId: '@guid',
              subject: '@cname',
              'paymentMethod|1': ['Unpaid', 'QrCode', 'Offline', 'Gift'],
              'visitResult|1': ['UnVisit', 'Invalid', 'Unpaid', 'Paid', 'Unreachable']
            }
          ]
        }
      })
    );
  });
  app.post('/api/v1/admin/coursestudent/update', function (req, res) {
    res.json(
      Mock.mock({
        code: '0'
      })
    );
  });
  app.get('/api/v1/admin/course/edit', (req, res) => {
    res.json(
      Mock.mock({
        code: '0',
        data: {
          name: '@cname',
          code: '@guid',
          'discountType|1': ['NoDiscount', 'Stackable', 'Half'],
          id: '@guid',
          addressCodes: ['11', '110', '110101'],
          'catalogs|3': [
            {
              children: [
                {
                  duration: '',
                  id: '@guid',
                  name: '@cname',
                  reviewUrl: '@cname'
                }
              ],
              duration: '',
              id: '@guid',
              name: '@cname',
              reviewUrl: '@cname'
            }
          ],
          city: '@cname',
          district: '@cname',
          description: '@cname',
          detailAddress: '@cname',
          discountedPrice: '@integer(11,11)',
          province: '@cname',
          enrollBase: '@integer(11,11)',
          enrollBegin: '@date("yyyy-MM-dd")',
          enrollEnd: '@date("yyyy-MM-dd")',
          lecturerId: '@guid',
          originalPrice: '@integer(11,11)',
          reportBegin: '@date("yyyy-MM-dd")',
          reportEnd: '@date("yyyy-MM-dd")',
          reviewUrl: '@cname',
          serviceBegin: '@date("yyyy-MM-dd")',
          serviceEnd: '@date("yyyy-MM-dd")',
          studentCount: '@integer(11,11)',
          subjectId: '@guid',
          thumbnail: '@image(100x100)',
          trainingBegin: '@date("yyyy-MM-dd")',
          trainingEnd: '@date("yyyy-MM-dd")',
          typeId: '@guid'
        }
      })
    );
  });
  app.post('/api/v1/admin/course/add', function (req, res) {
    res.json(
      Mock.mock({
        code: '0'
      })
    );
  });
  app.post('/api/v1/admin/course/update', function (req, res) {
    res.json(
      Mock.mock({
        code: '0'
      })
    );
  });
};
