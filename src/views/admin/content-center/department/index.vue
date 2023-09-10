<template>
  <div class="admin-content">
    <div class="flex-between-center mb-15">
      <div class="flex-center">
        <Input
          v-model="pageRequest.keyword"
          placeholder="科目名称"
          style="width: 200px"
          @on-enter="pageChange(1)"
        >
        <template #suffix>
          <i
            class="icon iconfont icon-sousuo"
            @click="pageChange(1)"
          ></i>
        </template>
        </Input>
        <div class="ml-20">
          <span style="margin-right: 8px">状态</span>
          <Select
            style="width: 110px"
            clearable
            @on-change="toChangeStatus"
          >
            <Option
              v-for="item in statusList"
              :value="item.value"
              :key="item.value"
            >{{
              item.label
            }}</Option>
          </Select>
        </div>
        <div class="ml-20 flex-center">
          <span style="margin-right: 8px">更新时间</span>
          <switch-date @changeDateSuccess="changeDateSuccess"></switch-date>
        </div>
      </div>
      <Button
        type="primary"
        @click="toAdd()"
      >新增</Button>
    </div>

    <Table
      :columns="columns"
      :data="list"
      :loading="loading"
    >
      <template #status="{ row }">
        <div v-if="!row.disabled">
          <i class="green-status"></i>
          <span>使用中</span>
        </div>
        <div v-else>
          <i class="red-status"></i>
          <span>已禁用</span>
        </div>
      </template>
      <template #action="{ row }">
        <div class="table-action">
          <a
            class="link"
            @click="toChange(row)"
          >{{!row.disabled?'禁用':'启用'}}</a>
          <a
            class="link"
            @click="toEdit(row)"
          >编辑</a>
          <a
            class="link"
            @click="toDel(row)"
          >删除</a>
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
    <edit-deparment
      v-model="editModal"
      :type="type"
      @close-modal="cancel"
      :selectRow="selectRow"
      @save-success="toUpdate"
    ></edit-deparment>
    <confirm-modal
      v-model="confirmModal"
      :type="type"
      @close-modal="confirmCancel"
      @success="toSure"
    >
      <template
        #confirmTip
        v-if="type === 'delete'"
      > 是否确认将该科目删除? </template>
      <template
        #confirmTip
        v-else
      >{{!able.disabled?'是否确认将该科目禁用?':'是否确认将该科目启用?'}} </template>
    </confirm-modal>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import moment from 'moment';
import {
  getPages,
  postDeleteSubject,
  postDisable,
  postEnsable
} from '@/api/admin/deparment/deparment';
import { type Info, PageSearchRequest } from '@/types/admin/deparment/index.ts';
import { useListAction } from '@/hooks/common/useListActions';
import EditDeparment from './components/addEditDeparment.vue';
import ConfirmModal from './components/confirmModal.vue';
import SwitchDate from './components/SwitchDate.vue';
import { Message, Modal } from 'view-ui-plus';
onMounted(() => {
  getPage();
});

const editModal = ref(false);
const confirmModal = ref(false);
const type = ref('');
const selectRow = ref({});
let pageRequest = ref(new PageSearchRequest());

const { loading, totalCount, pageNum, currentPage, list, getList, pageChange, pageChangeBySize } =
  useListAction<Info>(getPages, pageRequest, true, dataCallBack);

function dataCallBack(list: Info[]) {
  list.forEach((item: Info) => {
    item.updateTime = item.updateTime ? moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss') : '-';
  });
}
async function getPage() {
  pageRequest.value.pageNo = currentPage.value;
  await getList();
}

const columns = ref([
  {
    title: '序号',
    type: 'index',
    width: 80,
    indexMethod: (row: any) => {
      return (
        row._index + 1 + pageRequest.value.pageSize * currentPage.value - pageRequest.value.pageSize
      );
    }
  },
  {
    title: '科目名称',
    key: 'name',
    tooltip: true,
    tooltipTheme: 'light'
  },

  {
    title: '更新时间',
    key: 'updateTime'
  },
  {
    title: '操作人',
    key: 'updaterName'
  },
  {
    title: '状态',
    key: 'disabled',
    slot: 'status'
  },
  {
    title: '操作',
    slot: 'action'
  }
]);

function toEdit(item: any) {
  editModal.value = true;
  type.value = 'edit';
  selectRow.value = item;
}
function cancel(val: boolean) {
  editModal.value = val;
}
const subjectId = ref('');
function toDel(item: any) {
  confirmModal.value = true;
  type.value = 'delete';
  subjectId.value = item.id;
}
function confirmCancel(val: boolean) {
  confirmModal.value = val;
}
function toAdd() {
  type.value = 'add';
  editModal.value = true;
}
const able: any = ref({});
async function toChange(item: any) {
  type.value = '';
  confirmModal.value = true;
  able.value = item;
}
const statusList = ref([
  {
    value: '0',
    label: '使用中'
  },
  {
    value: '1',
    label: '禁用'
  }
]);

async function toSure(item: string) {
  if (item === 'delete') {
    let res = await postDeleteSubject({ id: subjectId.value });
    if (res.code === '0') {
      getList();
      Message.success('删除成功！');
      confirmModal.value = false;
      if (list.value.length === 1 && currentPage.value > 1) {
        currentPage.value = currentPage.value - 1;
      }
    }
  } else {
    if (!able.value.disabled) {
      let res = await postDisable({ id: able.value.id });
      if (res.code === '0') {
        getList();
        Message.success('禁用成功！');
        confirmModal.value = false;
      }
    } else {
      let res = await postEnsable({ id: able.value.id });
      if (res.code === '0') {
        getList();
        Message.success('启用成功！');
        confirmModal.value = false;
      }
    }
  }
}
function changeDateSuccess(item: any) {
  pageRequest.value.begin = item.begin;
  pageRequest.value.end = item.end;
  pageChange(1);
}
function toChangeStatus(item: any) {
  if (item === '0') {
    pageRequest.value.disabled = false;
  } else if (item === '1') {
    pageRequest.value.disabled = true;
  } else {
    pageRequest.value.disabled = null;
  }
  pageChange(1);
}
function toUpdate() {
  getList();
}
</script>
<style lang="scss" scoped>
.admin-content {
  color: #666;
  font-size: 14px;
  padding: 16px 24px;
  .table-action {
    .link {
      margin-right: 16px;
      color: #4182fa;

      &:last-child {
        margin-right: 0;
      }
    }
  }
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

.page-center {
  text-align: center;
}
</style>

