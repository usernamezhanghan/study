<template>
  <Modal
    :value="value"
    :title="title"
    :mask-closable="false"
    @on-visible-change="visibleChange"
    :width="400"
    class="reset-modal"
  >
    <Form
      ref="form"
      :model="edit"
      :rules="ruleValidate"
      label-position="left"
      :label-width="80"
    >
      <FormItem
        label="科目名称"
        prop="name"
      >
        <Input
          v-model="edit.name"
          placeholder="请输入"
          style="width: 270px"
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
import { EditInfor } from '@/types/admin/deparment/index.ts';
import { RadioGroup, Radio, Message } from 'view-ui-plus';
import { postAddPages, getDetail, postUpdate } from '@/api/admin/deparment/deparment';
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
const edit: any = ref(new EditInfor());
const form = ref();

const ruleValidate = reactive({
  name: [{ required: true, message: '科目名称不能为空', trigger: 'blur' }],
  disabled: [{ required: true, message: '', trigger: 'change' }]
});

const title: any = computed(() => {
  if (prop.type === 'edit') {
    return '编辑';
  }

  return '新增';
});
async function getInfoDetail(id: any) {
  let res = await getDetail({ id: id });
  edit.value = res.data;
  edit.value.disabled = res.data.disabled;
}
async function visibleChange(val: boolean) {
  if (!val) {
    emit('close-modal', val);
    form.value.resetFields();
  } else {
    if (prop.type === 'edit') {
      edit.value.id = prop.selectRow.id;

      await getInfoDetail(prop.selectRow.id);
    } else {
      edit.value = new EditInfor();
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
      disabled: edit.value.disabled
    };
    loading.value = true;
    if (prop.type === 'edit') {
      try {
        params.id = edit.value.id;
        let res = await postUpdate(params);

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
        let res = await postAddPages(params);

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
<style lang="scss"></style>
<style lang="scss">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}

.reset-modal {
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
