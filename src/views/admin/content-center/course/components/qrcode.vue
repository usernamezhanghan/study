<template>
  <Modal
    :value="value"
    :title="'课程二维码'"
    :mask-closable="false"
    @on-visible-change="visibleChange"
    :width="400"
    class="detail-modal"
    class-name="vertical-center-modal"
  >
    <div
      class="QRCode"
      style="width:180px; height:180px"
      v-if="info.qrCode"
    >
      <canvas
        :id="'canvas_'+ info.qrCode"
        style="transform: scale(1,1);"
      ></canvas>
      <div class="code">
        {{ info.name }}
      </div>
    </div>
    <template #footer>
      <Button
        type="text"
        @click="cancel"
      >取消</Button>
      <Button
        type="primary"
        :loading="loading"
        @click.stop="async"
      >保存
      </Button>
    </template>
  </Modal>
</template>
<script lang="ts" setup>
import { defineEmits, defineProps, ref, reactive, unref, nextTick } from 'vue';
import QRCode from 'qrcode';

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
function cancel() {
  emit('close-modal', false);
}
async function visibleChange(val: boolean) {
  if (!val) {
    emit('close-modal', val);
  } else {
    nextTick(async () => {
      await useqrcode();
    });
  }
}
async function async() {
  loading.value = true;
  try {
    loading.value = false;
    handleDowndloadPng();

    emit('close-modal', false);
  } catch (error) {
    loading.value = false;
  }
}

function useqrcode() {
  let canvas: any = document.getElementById('canvas_' + prop.info.qrCode);

  QRCode.toCanvas(canvas, prop.info.qrCode, function (res: any) {
    console.log(res);
  });
}

const handleDowndloadPng = () => {
  let canvas: any = document.getElementById('canvas_' + prop.info.qrCode);
  const dataURL = canvas.toDataURL();
  const link: any = document.createElement('a');
  link.style.display = 'none';
  link.href = dataURL;
  link.setAttribute('download', `${prop.info.name}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const emit = defineEmits(['close-modal']);
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

.detail-modal {
  word-break: break-all;
  .ivu-modal-close {
    right: 14px;
  }

  .ivu-modal-header {
    padding: 14px 24px;
  }

  .ivu-modal-body {
    padding: 16px 24px 60px;
  }

  .ivu-modal-footer {
    padding: 9px 24px;
  }
}
.QRCode {
  text-align: center;
  margin: auto;
  img {
    width: 180px;
    height: 180px;
  }
}
.code {
  max-width: 180px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
}
</style>
