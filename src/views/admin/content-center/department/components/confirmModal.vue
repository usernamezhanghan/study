<template>
  <Modal
    :value="value"
    :mask-closable="false"
    @on-visible-change="visibleChange"
    :width="320"
    class="confirm-modal"
  >
    <div class="modal-confirm">
      <div class="modal-confirm-header">
        <i class="icon iconfont icon-jingshi"></i>
        <slot name="confirmTip"></slot>
      </div>

      <p class="modal-confirm-body">
        <slot name="confirmAffect"></slot>
      </p>
    </div>

    <template #footer>
      <div v-if="type === 'unenable'">
        <Button type="primary" @click="cancel" style="margin-left: 8px">知道了</Button>
      </div>
      <div v-else>
        <Button type="text" @click="cancel" style="margin-left: 8px">取消</Button>
        <Button type="primary" @click="async" :loading="loading">确定</Button>
      </div>
    </template>
  </Modal>
</template>
<script lang="ts" setup>
  import { defineEmits, defineProps, computed, ref, reactive, unref } from 'vue';
  const prop = defineProps({
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    info: {
      type: Object,
      default: () => {
        return {};
      }
    }
  });

  const loading = ref(false);
  async function visibleChange(val: boolean) {
    if (!val) {
      emit('close-modal', val);
    }
  }

  function cancel() {
    emit('close-modal', false);
  }

  async function async() {
    loading.value = true;
    if (prop.type === 'delete') {
      try {
        loading.value = false;
        emit('success', 'delete');
      } catch (error) {
        loading.value = false;
      }
    } else {
      try {
        loading.value = false;
        emit('success', 'enable');
      } catch (error) {
        loading.value = false;
      }
    }
  }

  const emit = defineEmits(['close-modal', 'success']);
</script>
<style lang="scss" scoped>
  .modal-confirm {
    .modal-confirm-header {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      i {
        color: #FF9900;
        font-size: 20px;
        margin-right: 12px;
      }
    }
  }
</style>
<style lang="scss">
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }

  .confirm-modal {
    .ivu-modal-close {
      display: none;
    }

    .ivu-modal-header {
      padding: 14px 24px;
    }

    .ivu-modal-body {
      padding: 24px;
    }

    .ivu-modal-footer {
      padding: 0 24px 24px;
      border-top: 0;
    }
  }
</style>
