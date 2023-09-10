<template>
  <Modal
    :value="value"
    :title="title"
    :mask-closable="false"
    @on-visible-change="visibleChange"
    :width="400"
    class="teacher-modal"
  >
    <Form
      ref="form"
      :model="edit"
      :rules="ruleValidate"
      :label-width="80"
      label-position="left"
    >
      <FormItem
        label="讲师姓名"
        prop="name"
      >
        <Input
          v-model="edit.name"
          placeholder="请输入"
          style="width: 278px"
        ></Input>
      </FormItem>

      <FormItem
        label="单位"
        prop="organizationId"
      >
        <Select
          style="width: 278px"
          clearable
          ref="subject"
          v-model="edit.organizationId"
          filterable
          filter-by-label
          class="select-style"
        >
          <Option
            v-for="item in organizationList"
            :value="item.id"
            :key="item.id"
            :label="item.name"
          >{{ item.name }}</Option>
        </Select>
      </FormItem>

      <FormItem
        label="科目"
        prop="subjectId"
      >
        <Select
          style="width: 278px"
          clearable
          ref="subject"
          v-model="edit.subjectId"
          filterable
          filter-by-label
          class="select-style"
        >
          <Option
            v-for="item in subjectList"
            :value="item.id"
            :key="item.id"
            :label="item.name"
          >{{ item.name }}</Option>
        </Select>
      </FormItem>

      <FormItem
        label="职称"
        prop="proTitle"
      >
        <Select
          style="width: 278px"
          clearable
          v-model="edit.proTitleId"
          filterable
          filter-by-label
          class="select-style"
        >
          <Option
            v-for="item in protitleList"
            :value="item.id"
            :key="item.id"
            :label="item.name"
          >{{ item.name }}</Option>
        </Select>
      </FormItem>

      <FormItem label="描述">
        <Input
          v-model="edit.description"
          placeholder="请输入"
          style="width: 278px"
          type="textarea"
        ></Input>
      </FormItem>

      <FormItem
        label="默认状态"
        prop="disabled"
      >
        <RadioGroup v-model="edit.disabled">
          <Radio :label="false">使用中</Radio>
          <Radio
            :label="true"
            style="margin-left: 68px"
          >禁用</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <template #footer>
      <Button
        type="text"
        @click="cancel"
      >取消</Button>
      <Button
        type="primary"
        :loading="loading"
        @click="async"
      >保存</Button>
    </template>
  </Modal>
</template>
<script lang="ts" setup>
import { defineEmits, defineProps, computed, ref, reactive, unref } from 'vue';
import { EditTeacher } from '@/types/admin/deparment/index.ts';
import { RadioGroup, Radio, Message, Cascader } from 'view-ui-plus';
import {
  postAddTeacher,
  getTeacherDetail,
  postUpdateTeacher,
  getSubject,
  getProtitle,
  getOrganization
} from '@/api/admin/deparment/deparment';

const prop = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: ''
  },
  selectRow: {
    type: Object as any,
    default: () => {
      return {};
    }
  }
});

const loading = ref(false);
const edit = ref(new EditTeacher());
const form = ref();

const ruleValidate = ref({
  name: [{ required: true, message: '请输入讲师姓名', trigger: 'blur' }],
  disabled: [{ required: true, message: '', trigger: 'change' }],
  organizationId: [
    {
      required: true,
      message: '请选择科目',
      validator: organizationRules,
      trigger: 'change'
    }
  ],
  subjectId: [
    {
      required: true,
      message: '请选择科目',
      validator: subjectRules,
      trigger: 'change'
    }
  ],
  proTitleId: [
    {
      required: true,
      validator: proTitleRules,
      trigger: 'blur'
    }
  ]
});
function proTitleRules(rule: any, value: any, callback: any) {
  if (!edit.value.proTitleId) {
    callback(new Error('请输入职称'));
  } else {
    callback();
  }
}
function organizationRules(rule: any, value: any, callback: any) {
  if (!edit.value.organizationId) {
    callback(new Error('请输入职称'));
  } else {
    callback();
  }
}
function subjectRules(rule: any, value: any, callback: any) {
  if (!edit.value.subjectId) {
    callback(new Error('请选择科目'));
  } else {
    callback();
  }
}
const title: any = computed(() => {
  if (prop.type === 'edit') {
    return '编辑';
  }

  return '新增';
});

async function getInfoDetail(id: any) {
  let res = await getTeacherDetail({ id: id });
  edit.value = res.data;

  edit.value.disabled = res.data.disabled;
}

const subjectList: any = ref([]);
async function getSubjectList() {
  let res = await getSubject();
  subjectList.value = res.data;
}
const protitleList: any = ref([]);
async function getProtitleList() {
  let res = await getProtitle();
  protitleList.value = res.data;
}

const organizationList: any = ref([]);
async function getOrganizationList() {
  let res = await getOrganization();
  subjectList.value = res.data;
}

async function visibleChange(val: boolean) {
  if (!val) {
    emit('close-modal', val);
    form.value.resetFields();
  } else {
    await getSubjectList();
    await getProtitleList();
    await getOrganizationList();
    if (prop.type === 'edit') {
      edit.value.id = prop.selectRow.id;
      await getInfoDetail(prop.selectRow.id);
    } else {
      edit.value = new EditTeacher();
      edit.value.disabled = false;
    }
  }
}

function cancel() {
  emit('close-modal', false);
}

async function async() {
  const myform: any = unref(form);
  if (!form.value) {
    return;
  }
  const valid = await myform.validate();
  if (valid) {
    let params: any = {
      name: edit.value.name,
      disabled: edit.value.disabled,
      description: edit.value.description,
      proTitleId: edit.value.proTitleId,
      subjectId: edit.value.subjectId,
      organizationId: edit.value.organizationId
    };
    loading.value = true;
    if (prop.type === 'edit') {
      try {
        params.id = edit.value.id;
        let res = await postUpdateTeacher(params);

        if (res.code === '0') {
          Message.success('编辑成功！');
          emit('close-modal');
          emit('save-success', 'edit');
        }
        loading.value = false;
      } catch (error) {
        loading.value = false;
      }
    } else {
      try {
        let res = await postAddTeacher(params);

        if (res.code === '0') {
          Message.success('添加成功！');
          emit('close-modal');
          emit('save-success', 'add');
        }
        loading.value = false;
      } catch (error) {
        loading.value = false;
      }
    }
  }
}

const emit = defineEmits(['close-modal', 'save-success']);
</script>
<style lang="scss">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}

.teacher-modal {
  .ivu-modal-close {
    right: 14px;
  }

  .ivu-modal-header {
    padding: 14px 24px;
  }

  .ivu-modal-body {
    padding: 16px 24px 20px;
  }

  .ivu-modal-footer {
    padding: 9px 24px;
  }
}
</style>
