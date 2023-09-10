<template>
  <div class="admin-content">
    <div class="admin-search space-between">
      <div class="flex-center">
        <Input
          v-model="pageRequest.keyword"
          @on-enter="pageChange(1)"
          placeholder="课程名称/课程ID"
          style="width: 200px"
        >
        <template #suffix>
          <i
            class="icon iconfont icon-sousuo"
            @click="pageChange(1)"
          ></i>
        </template>
        </Input>
        <span class="search-label">课程状态</span>
        <Select
          v-model="pageRequest.status"
          @on-change="pageChange(1)"
          clearable
          style="width: 110px"
        >
          <Option
            v-for="(item, index) in accountStatus"
            :key="index"
            :value="item.label"
          >
            {{ item.value }}
          </Option>
        </Select>
        <span class="search-label">课程类型</span>
        <Select
          v-model="pageRequest.typeId"
          @on-change="pageChange(1)"
          clearable
          style="width: 110px"
        >
          <Option
            v-for="(item, index) in accountType"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </Option>
        </Select>
        <div class="ml-20 flex-center">
          <span style="margin-right: 8px">更新时间</span>
          <switch-date @changeDateSuccess="changeDateSuccess"></switch-date>
        </div>

      </div>

      <Button
        type="primary"
        @click="toAdd"
      >新增</Button>
    </div>

    <Table
      :columns="columns"
      :data="list"
      :loading="loading"
    >
      <template #status="{ row }">
        <div v-if="row.status === 'BeforeEnroll'">
          <i class="grey-status"></i>
          <span>报名未开始</span>
        </div>
        <div v-else-if="row.status === 'Enrolling'">
          <i class="green-status"></i>
          <span>报名进行中</span>
        </div>
        <div v-else-if="row.status === 'Enrolled'">
          <i class="red-status"></i>
          <span>报名已截止</span>
        </div>
        <div v-else-if="row.status === 'Teaching'">
          <i class="green-status"></i>
          <span>课程进行中</span>
        </div>
        <div v-else>
          <i class="red-status"></i>
          <span>课程已结束</span>
        </div>
      </template>

      <template #action="{ row }">
        <div class="flex-center">
          <div class="table-action">
            <a
              class="link"
              @click="toCode(row)"
            >课程二维码</a>
            <a
              class="link"
              @click="toApply(row)"
              :class="{'disabled':row.status === 'BeforeEnroll'}"
            >报名列表</a>
          </div>
          <Dropdown
            style="margin-left:15px"
            transfer
          >
            <span class="icon iconfont icon-gengduo"></span>
            <template #list>
              <DropdownMenu>
                <DropdownItem @click="toEdit(row)">编辑</DropdownItem>
                <DropdownItem @click="toDelete(row)">删除</DropdownItem>
              </DropdownMenu>
            </template>
          </Dropdown>
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
    <qr-code
      v-model="codeModal"
      :info="info"
      @close-modal="cancel"
    ></qr-code>
    <edit-course
      v-model="editModal"
      :type="type"
      @close-modal="cancelModal"
      :selectRow="selectRow"
      @save-success="toUpdate"
    ></edit-course>

    <confirm-modal
      v-model="confirmModal"
      :type="type"
      @close-modal="confirmCancel"
      @success="toSure"
    >
      <template
        #confirmTip
        v-if="type === 'delete'"
      > 是否确认将该课程删除? </template>

    </confirm-modal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import moment from 'moment';
import SwitchDate from '@/views/admin/content-center/department/components/SwitchDate.vue';
import ConfirmModal from '@/views/admin/content-center/department/components/confirmModal.vue';
import {
  getCoursePages,
  getCourseTypeList,
  postDeleteStudent
} from '@/api/admin/deparment/deparment';
import { PageSearchCourseRequest } from '@/types/admin/deparment/index.ts';
import { useListAction } from '@/hooks/common/useListActions';
import { DropdownMenu, DropdownItem, Message } from 'view-ui-plus';
import QrCode from './components/qrcode.vue';
import { useRouter } from 'vue-router';
import { AdminNames } from '@/router/routerNames';
import EditCourse from './components/addEditCourse.vue';

const type = ref('delete');
const router = useRouter();
const accountStatus: any = ref([
  {
    label: 'BeforeEnroll',
    value: '报名未开始'
  },
  {
    label: 'Enrolling',
    value: '报名进行中'
  },
  {
    label: 'Enrolled',
    value: '报名已截止'
  },
  {
    label: 'Teaching',
    value: '课程进行中'
  },
  {
    label: 'Completed',
    value: '课程已结束'
  }
]);
const accountType: any = ref([]);
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
    title: '课程名称',
    key: 'name',
    tooltip: true,
    tooltipTheme: 'light'
  },
  {
    title: '课程ID',
    key: 'code',
    tooltip: true,
    tooltipTheme: 'light'
  },
  {
    title: '科目',
    key: 'subject',
    tooltip: true,
    tooltipTheme: 'light'
  },
  {
    title: '讲师',
    key: 'lecturerName',
    tooltip: true,
    tooltipTheme: 'light'
  },
  {
    title: '课程类型',
    key: 'type',
    tooltip: true,
    tooltipTheme: 'light'
  },
  {
    title: '章',
    maxWidth: 80,
    key: 'chapter'
  },
  {
    title: '节',
    maxWidth: 80,
    key: 'verse'
  },
  {
    title: '课程状态',
    slot: 'status'
  },
  {
    title: '更新时间',
    key: 'updateTime'
  },
  {
    title: '操作人',
    maxWidth: 100,
    key: 'updaterName'
  },
  {
    title: '操作',
    slot: 'action'
  }
]);
const codeModal: any = ref(false);
const confirmModal: any = ref(false);
const editModal: any = ref(false);
const selectRow: any = ref({});

let pageRequest = ref(new PageSearchCourseRequest());
const { loading, totalCount, pageNum, currentPage, list, getList, pageChange, pageChangeBySize } =
  useListAction<any>(getCoursePages, pageRequest, true, dataCallBack);

function dataCallBack(list: any[]) {
  list.forEach((item: any) => {
    item.updateTime = item.updateTime ? moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss') : '-';
  });
}

async function getPage() {
  pageRequest.value.pageNo = currentPage.value;
  await getList();
}
async function getTypeList() {
  let res = await getCourseTypeList();
  accountType.value = res.data;
}
function toAdd() {
  type.value = 'add';
  editModal.value = true;
}

function toEdit(item: any) {
  editModal.value = true;
  type.value = 'edit';
  selectRow.value = item;
}

const subjectId = ref('');
function toDelete(item: any) {
  confirmModal.value = true;
  type.value = 'delete';
  subjectId.value = item.id;
}
function confirmCancel(val: boolean) {
  confirmModal.value = val;
}
function cancelModal(val: boolean) {
  editModal.value = val;
}

onMounted(() => {
  getPage();
  getTypeList();
});
function changeDateSuccess(item: any) {
  pageRequest.value.begin = item.begin;
  pageRequest.value.end = item.end;
  pageChange(1);
}
const info = ref({});
function toCode(item: any) {
  codeModal.value = true;
  info.value = item;
}
function cancel(val: boolean) {
  codeModal.value = val;
}
function toApply(item: any) {
  if (item.status === 'BeforeEnroll') {
    return;
  }
  router.push({
    name: AdminNames.ContentCenterCourseRegister,
    query: {
      name: item.name,
      id: item.id
    }
  });
}
async function toSure(item: string) {
  if (item === 'delete') {
    let res = await postDeleteStudent({ id: subjectId.value });
    if (res.code === '0') {
      getPage();
      Message.success('删除成功！');
      confirmModal.value = false;
      if (list.value.length === 1 && currentPage.value > 1) {
        currentPage.value = currentPage.value - 1;
      }
    }
  }
}
function toUpdate() {
  getList();
}
</script>
<style lang="scss" scoped>
.grey-status {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #e5e5e5;
  border-radius: 50%;
  margin-right: 8px;
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
.icon-gengduo {
  color: #4182fa;
  font-size: 28px;
  cursor: pointer;
}
</style>