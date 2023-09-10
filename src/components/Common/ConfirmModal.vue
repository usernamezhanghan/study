<template>
  <Modal
    :value="value"
    :title="modalTitle"
    :mask-closable="false"
    :width="406"
    class-name="reset-modal"
    @on-visible-change="visibleChange"
  >
    <div class="modal-confirm">
      <div class="confirm-content">
        <slot name="confirmContent"></slot>
      </div>

      <slot name="confirmTips"></slot>

      <div class="confirm-form">
        <slot name="confirmForm"></slot>
      </div>
    </div>

    <template #footer>
      <Button @click="cancel" type="text">取消</Button>
      <Button
        type="primary"
        :loading="confirmSaveLoading"
        :disabled="confirmSaveLoading"
        @click="save"
      >
        确定
      </Button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
  defineProps({
    value: {
      type: Boolean,
      default: false
    },

    isEdit: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: 'delete'
    },

    modalTitle: {
      type: String,
      default: '删除'
    },

    btnType: {
      type: String,
      default: '删除'
    },

    confirmSaveLoading: {
      type: Boolean,
      default: false
    }
  });

  async function visibleChange(value: boolean) {
    if (value) {
      console.log(value);
    }
  }

  function cancel() {
    emit('close-modal', false);
  }

  function save() {
    emit('confirm-save');
  }

  const emit = defineEmits(['confirm-save', 'close-modal']);
</script>

<style lang="scss" scoped>
  .modal-confirm {
    .confirm-header {
      display: flex;
      align-items: center;

      i {
        width: 28px;
        height: 28px;
        margin-right: 16px;
        font-size: 28px;
        line-height: 28px;
        color: #f90;
      }

      .content {
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        color: #333;
        text-align: left;
      }
    }

    .confirm-form {
      margin-top: 14px;
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

    .delete-btn {
      background-color: #f26666;
      border-color: #f26666;

      &:hover {
        background-color: #f59393;
        border-color: #f59393;
      }

      &:disabled {
        color: #c5c8ce;
        background-color: #f7f7f7;
        border-color: #dcdee2;
      }
    }
  }
</style>
