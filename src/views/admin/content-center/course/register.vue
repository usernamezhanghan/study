<template>
  <div class="admin-content admin-container">
    <div class="flex-between-center admin-container-top">
      <div
        @click="router.back()"
        style="cursor: pointer;"
      >
        <span class="icon iconfont icon-fanhui"></span>
        <span>返回</span>
      </div>
      <div class="title-ellipsis">{{ route.query.name }}</div>
      <div></div>
    </div>
    <Tabs class="admin-tab">
      <TabPane label="线上报名列表">
        <online-registration></online-registration>
      </TabPane>

      <TabPane label="线下报名列表">
        <div class="admin-search space-between">
          <div class="flex-center">
            <Input
              v-model="pageRequest.keyword"
              @on-enter="pageChange(1)"
              placeholder="姓名"
              style="width: 200px"
            >
            <template #suffix>
              <i
                class="icon iconfont icon-sousuo"
                @click="pageChange(1)"
              ></i>
            </template>
            </Input>
            <span class="search-label">回访记录</span>
            <Select
              v-model="pageRequest.visitResult"
              @on-change="pageChange(1)"
              clearable
              transfer
              style="width: 110px"
            >
              <Option
                v-for="(item, index) in accountStatus"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </Option>
            </Select>

            <div class="ml-20 flex-center">
              <span style="margin-right: 8px">报名时间</span>
              <switch-date @changeDateSuccess="changeDateSuccess"></switch-date>
            </div>

          </div>

          <Button
            type="primary"
            @click.stop="toExport"
          >
            导出
          </Button>
        </div>

        <Table
          :columns="columns"
          :data="list"
          :loading="loading"
        >
          <template #status="{ row }">
            <select-index
              :info="row"
              @changeValue="toUpdateResult"
              @clearValue="toUpdateResult"
            ></select-index>
          </template>
          <template #visitTime="{ row }">
            <DatePicker
              v-model="row.visitTime"
              type="date"
              placement="bottom-end"
              class="date-picker"
              placeholder="请选择"
              @on-change="toUpdateVisit(row)"
              style="width: 120px"
              transfer
            ></DatePicker>
          </template>
          <template #pay="{ row }">
            <select-pay
              :info="row"
              @changeValue="toUpdatePay"
              @clearValue="toUpdatePay"
            ></select-pay>
          </template>
          <template #action="{ row }">
            <upload-image
              :info="row"
              :importUrl="formImportImg"
              :defaultFile="row.paymentVoucher"
              @upload="uploadPicture"
            ></upload-image>
          </template>
        </Table>

        <Page
          v-if="pageNum > 1"
          class-name="admin-page"
          :total="totalCount"
          :page-size="pageRequest.pageSize"
          :model-value="currentPage"
          @on-change="pageChange"
          show-elevator
        ></Page>
      </TabPane>
    </Tabs>

  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import moment from 'moment';
import SwitchDate from '@/views/admin/content-center/department/components/SwitchDate.vue';

import {
  getCourseStudentPages,
  postUpdateCourseStudent,
  postExport
} from '@/api/admin/deparment/deparment';
import { PageSearchStudentRequest } from '@/types/admin/deparment/index.ts';
import { useListAction } from '@/hooks/common/useListActions';
import { useRouter, useRoute } from 'vue-router';
import UploadImage from './components/uploadImage.vue';
import SelectIndex from './components/selectIndex.vue';
import SelectPay from './components/selectPay.vue';
import OnlineRegistration from './onlineRegistration.vue';

const router = useRouter();
const route = useRoute();

const accountStatus = ref([
  {
    value: 'UnVisit',
    label: '暂未回访'
  },
  {
    value: 'Invalid',
    label: '确认不参加'
  },
  {
    value: 'Unpaid',
    label: '确认参加，未缴费'
  },
  {
    value: 'Paid',
    label: '确认参加，已缴费'
  },
  {
    value: 'Unreachable',
    label: '无法取得联系'
  }
]);
const columns = ref([
  {
    title: '序号',
    type: 'index',
    maxWidth: 80,
    indexMethod: (row: any) => {
      return (
        row._index + 1 + pageRequest.value.pageSize * currentPage.value - pageRequest.value.pageSize
      );
    }
  },
  {
    title: '姓名',
    key: 'name',
    tooltip: true,
    tooltipTheme: 'light'
  },
  {
    title: '手机号',
    key: 'phoneNum',
    tooltip: true,
    tooltipTheme: 'light'
  },
  {
    title: '单位',
    key: 'hospital',
    tooltip: true,
    tooltipTheme: 'light'
  },
  {
    title: '科室',
    key: 'department',
    tooltip: true,
    tooltipTheme: 'light'
  },
  {
    title: '职称',
    key: 'proTitle',
    tooltip: true,
    tooltipTheme: 'light'
  },
  {
    title: '报名时间',
    key: 'createTime',
    tooltip: true,
    tooltipTheme: 'light'
  },
  {
    title: '回访记录',
    key: 'visitResult',
    slot: 'status',
    width: 120
  },
  {
    title: '回访时间',
    key: 'visitTime',
    width: 140,
    slot: 'visitTime'
  },
  {
    title: '缴费方式',
    key: 'paymentMethod',
    width: 120,
    slot: 'pay'
  },
  {
    title: '缴费凭证',
    key: 'paymentVoucher',
    slot: 'action',
    width: 150
  }
]);
const formImportImg = ref({
  url: '/api/v1/admin/coursestudent/voucher/upload',
  header: {
    Authorization: JSON.parse(localStorage.getItem('userInfo') as any).jwt
  },
  format: ['jpg', 'jpeg', 'png']
});
let pageRequest: any = ref(new PageSearchStudentRequest());
const { loading, totalCount, pageNum, currentPage, list, getList, pageChange, pageChangeBySize } =
  useListAction<any>(getCourseStudentPages, pageRequest, true, dataCallBack);

function dataCallBack(list: any[]) {
  list.forEach((item: any) => {
    item.updateTime = item.updateTime ? moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss') : '-';
  });
}

async function getPage() {
  pageRequest.value.courseId = route.query.id;
  pageRequest.value.pageNo = currentPage.value;
  await getList();
}
const url = ref('');
async function toExport() {
  let res = await postExport({ courseId: route.query.id });
  url.value = res.data;
  const link: any = document.createElement('a');
  link.style.display = 'none';
  link.href = url.value;
  link.setAttribute('download', `报名信息.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

onMounted(() => {
  getPage();
});

function changeDateSuccess(item: any) {
  pageRequest.value.begin = item.begin;
  pageRequest.value.end = item.end;
  pageChange(1);
}

async function toUpdateResult(item: any, info: any) {
  let params = {
    id: info.id,
    paymentMethod: info.paymentMethod,
    paymentVoucher: info.paymentVoucher,
    visitResult: item,
    visitTime: info.visitTime ? moment(info.visitTime).format('YYYY-MM-DD HH:mm:ss') : null
  };
  try {
    let res = await postUpdateCourseStudent(params);
    if (res.code === '0') {
      getPage();
    }
  } catch (error) {
    console.log(error);
  }
}

function toUpdateVisit(item: any) {
  toUpdate(item);
}

async function toUpdatePay(item: any, info: any) {
  let params = {
    id: info.id,
    paymentMethod: item,
    paymentVoucher: info.paymentVoucher,
    visitResult: info.visitResult,
    visitTime: info.visitTime ? moment(info.visitTime).format('YYYY-MM-DD HH:mm:ss') : null
  };
  try {
    let res = await postUpdateCourseStudent(params);
    if (res.code === '0') {
      getPage();
    }
  } catch (error) {
    console.log(error);
  }
}

async function toUpdate(item: any) {
  let params = {
    id: item.id,
    paymentMethod: item.paymentMethod,
    paymentVoucher: item.paymentVoucher,
    visitResult: item.visitResult,
    visitTime: item.visitTime ? moment(item.visitTime).format('YYYY-MM-DD HH:mm:ss') : null
  };
  try {
    let res = await postUpdateCourseStudent(params);
    if (res.code === '0') {
      getPage();
    }
  } catch (error) {
    console.log(error);
  }
}

async function uploadPicture(data: any, item: any) {
  let params = {
    id: item.id,
    paymentVoucher: data.data,
    visitResult: item.visitResult,
    visitTime: item.visitTime ? moment(item.visitTime).format('YYYY-MM-DD HH:mm:ss') : null,
    paymentMethod: item.paymentMethod
  };
  try {
    let res = await postUpdateCourseStudent(params);
    if (res.code === '0') {
      getPage();
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
<style lang="scss" scoped>
.admin-container {
  width: 1212px;
  min-height: 819px;
  background: #fff;
  box-shadow: 0px 6px 12px 0px rgba(194, 194, 194, 0.12);
  border-radius: 4px;
  margin: 0 auto;
  padding: 0 24px;
  .admin-container-top {
    height: 64px;
    line-height: 64px;
  }
  .admin-search {
    margin-top: 16px;
    margin-bottom: 16px;
  }
  .search-label {
    margin-right: 8px;
    margin-left: 20px;
    color: #666;
  }
  .admin-page {
    margin-top: 26px;
    text-align: center;
  }

  .title-ellipsis {
    display: block;
    overflow: hidden;
    max-width: 400px;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
<style lang="scss">
.admin-tab {
  .ivu-tabs-bar {
    border: 0;
  }
  .ivu-tabs-nav .ivu-tabs-tab-active {
    color: #333;
    font-size: 14px;
  }
  .ivu-tabs-tab-focused {
    font-weight: 600;
  }
  .ivu-tabs-ink-bar {
    width: 24px !important;
    left: 30px;
  }
  .ivu-tabs-nav .ivu-tabs-tab {
    padding-left: 0;
  }
}
</style>