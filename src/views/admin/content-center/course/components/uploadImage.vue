<template>
  <div class="flex-center">
    <div class="upload-img">
      <Upload
        ref="imgUpload"
        :show-upload-list="false"
        :before-upload="handleBeforeUpload"
        :action="importUrl.url || ''"
        :headers="importUrl.header || null"
        :format="importUrl.format || []"
        :disabled="uploadLoading"
        accept=".jpeg,.png,.jpg"
        :on-format-error="handleFormatError"
        :on-progress="uploadProgress"
        :on-success="uploadSuccess"
        :on-error="uploadError"
      >
        <div
          v-if="imgUrl"
          class="up-img"
        >
          <img
            class="center-img"
            :src="imgUrl"
          />
          <div class="upload-list-cover">
            替换图片
          </div>
        </div>
        <div
          class="up-none"
          v-else
        >
          <div class="up-center">
            <div class="center-text-2">选择图片 </div>
          </div>
        </div>
      </Upload>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineEmits, defineProps, watch } from 'vue';
import * as _ from 'lodash';
import { Message } from 'view-ui-plus';
const prop = defineProps({
  importUrl: {
    type: Object as any,
    default: () => {
      return {};
    }
  },
  defaultFile: {
    type: String as any,
    default: ''
  },
  info: {
    type: Object as any,
    default: () => {
      return {};
    }
  }
});
const imgUpload = ref();
watch(
  () => {
    prop.info;
  },
  (value: any) => {
    if (prop.info) {
      uploadSuccessState.value = true;
      imgUrl.value = prop.info.paymentVoucher;
    }
  },
  { deep: true }
);

onMounted(() => {
  if (prop.defaultFile) {
    uploadSuccessState.value = true;
    imgUrl.value = prop.info.paymentVoucher;
  }
});
const uploadLoading = ref(false);

function handleFormatError() {
  uploadLoading.value = false;
  Message.error('格式错误');
}
const uploadPercent = ref(0);
function uploadProgress(event: any, file: any, fileList: any) {
  uploadLoading.value = true;
  event.target.onprogress = (event: any) => {
    uploadPercent.value = Number(((event.loaded / event.total) * 100).toFixed(1));
  };
}
function uploadError(error: any, file: any) {
  uploadLoading.value = false;
  Message.error(file.error.message);
}
const uploadSuccessState = ref(false);
const imgUrl: any = ref('');
function uploadSuccess(data: any, file: any) {
  if (data.error) {
    Message.error(data.msg);
    uploadPercent.value = 0;
    uploadLoading.value = false;
    uploadSuccessState.value = true;
  } else {
    uploadLoading.value = false;
    uploadSuccessState.value = true;
    imgUrl.value = data.data;
    emit('upload', data, prop.info);
  }
}

function handleBeforeUpload(file: any) {
  if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
    Message.error('请上传png、jpg、jpeg图片格式');
    return false;
  }
}

const emit = defineEmits(['clear', 'upload']);
</script>

<style lang="scss" scoped>
.upload-img {
  height: 30px;
  line-height: 30px;
  .up-none {
    cursor: pointer;
    border-radius: 4px;
  }

  .center-img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  .center-text-2 {
    color: #4182fa;
  }

  .up-img {
    height: 30px;
    display: flex;
  }

  .upload-list-cover {
    cursor: pointer;
    color: #4182fa;
    margin-left: 15px;
  }
}
</style>
