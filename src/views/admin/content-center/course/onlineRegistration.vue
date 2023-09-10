<template>
  <div class="admin-content-online">
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
        <span class="search-label">支付状态</span>
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
          <span style="margin-right: 8px">支付时间</span>
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
        <span>{{ row.status }}</span>
      </template>
      <template #action="{ row }">
        <div class="table-action">
          <a
            class="link"
            @click="toDetail(row)"
          >订单详情</a>

        </div>
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
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import moment from 'moment';
import SwitchDate from '@/views/admin/content-center/department/components/SwitchDate.vue';

import { getCourseStudentPages, postExport } from '@/api/admin/deparment/deparment';
import { PageSearchStudentRequest } from '@/types/admin/deparment/index.ts';
import { useListAction } from '@/hooks/common/useListActions';
import { useRoute } from 'vue-router';

const route = useRoute();

const accountStatus = ref([
  {
    value: 'UnVisit',
    label: '支付成功'
  },
  {
    value: 'Invalid',
    label: '支付延迟'
  },
  {
    value: 'Unpaid',
    label: '支付失败'
  },
  {
    value: 'Paid',
    label: '放弃支付'
  },
  {
    value: 'Unreachable',
    label: '待支付'
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
    title: '订单编号',
    key: 'name',
    tooltip: true,
    tooltipTheme: 'light'
  },
  {
    title: '支付流水',
    key: 'name',
    tooltip: true,
    tooltipTheme: 'light'
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
    title: '支付时间',
    key: 'createTime',
    tooltip: true,
    tooltipTheme: 'light'
  },
  {
    title: '支付状态',
    key: 'visitResult',
    slot: 'status'
  },

  {
    title: '操作',
    slot: 'action'
  }
]);

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

function toDetail(item: any) {
  //
}
</script>
<style lang="scss" scoped>
.table-action {
  .link {
    margin-right: 16px;
    color: #4182fa;

    &:last-child {
      margin-right: 0;
    }
  }
}
.admin-page {
  margin-top: 26px;
  text-align: center;
}
.green-status {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #00cb84;
  border-radius: 50%;
  margin-right: 8px;
}
.red-status {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #ff2f3e;
  border-radius: 50%;
  margin-right: 8px;
}
.blue-status {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #4182fa;
  border-radius: 50%;
  margin-right: 8px;
}
.grey-status {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #e5e5e5;
  border-radius: 50%;
  margin-right: 8px;
}
</style>
