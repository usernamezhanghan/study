<template>
  <div>
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
              <div class="center-icon">
                <i class="icon iconfont icon-tupian center-icon"></i>
              </div>
              <div class="center-text-2">{{ '上传图片' }}</div>
            </div>
          </div>
        </Upload>
        <Progress
          class="upload-progress"
          :stroke-width="2"
          v-show="uploadLoading"
          :percent="uploadPercent"
        />

      </div>

      <div v-if="imgUrl">
        <div class="image-name">{{ imageName }}</div>
        <span
          class="icon iconfont icon-shanchu"
          @click="handleRemove"
        ></span>
      </div>
    </div>
    <div class="center-text ">尺寸：375 * 180，格式：png / jpg，大小：不超过2M</div>
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
  defaultFileName: {
    type: String as any,
    default: ''
  }
});
const imgUpload = ref();
watch(
  () => {
    prop.defaultFile;
  },
  () => {
    if (prop.defaultFile) {
      imgUrl.value = prop.defaultFile;
    } else {
      imgUrl.value = '';
    }
  },
  { deep: true }
);

watch(
  () => {
    prop.defaultFileName;
  },
  () => {
    if (prop.defaultFileName) {
      imageName.value = prop.defaultFileName;
    } else {
      imageName.value = '';
    }
  },
  { deep: true }
);

onMounted(() => {
  if (prop.defaultFile) {
    imgUrl.value = prop.defaultFile;
  }
});
const uploadLoading = ref(false);
function handleClearFiles() {
  (imgUpload as any).value.clearFiles();
  uploadLoading.value = true;
}

function clearFiles() {
  (imgUpload as any).clearFiles();
  emit('clear');
}
function handleFormatError() {
  uploadLoading.value = false;
  Message.error('上传格式错误');
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
  console.log(error, file);

  Message.error(file.error.message);
}
const imgUrl: any = ref('');
const imageName: any = ref('');
function uploadSuccess(data: any, file: any) {
  if (data.error) {
    Message.error(data.msg);
    uploadPercent.value = 0;
    uploadLoading.value = false;
  } else {
    uploadLoading.value = false;
    imgUrl.value = data.data;
    imageName.value = data.data;
    emit('upload', data.data);
  }
}

function handleBeforeUpload(file: any) {
  if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
    Message.error('请上传png、jpg、jpeg图片格式');
    return false;
  }
}
function handleRemove() {
  imgUrl.value = '';
  imageName.value = '';
  emit('clear');
}
const emit = defineEmits(['clear', 'upload']);
</script>

<style lang="scss" scoped>
.upload-img {
  background: #fff;
  width: 140px;
  height: 72px;
  border-radius: 4px;
  overflow: hidden;
  &:hover {
    .have-edit {
      display: block;
    }
  }

  .up-none {
    border: 1px dashed #e5e5e5;
    width: 140px;
    height: 72px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 4px;
  }

  .center-img {
    width: 140px;
    height: 72px;
    border-radius: 4px;
    cursor: pointer;
  }

  .center-icon {
    font-size: 24px;
    color: rgba(74, 74, 74, 0.15);
    text-align: center;
  }

  .center-text-2 {
    color: 333;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
  }

  .up-img {
    position: relative;
    width: 140px;
    height: 72px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px dashed #e5e5e5;
  }

  .upload-list-cover {
    display: none;
    position: absolute;
    width: 140px;
    height: 38px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 0px 0px 4px 4px;
    opacity: 0.9;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    color: #fff;
  }

  .up-img:hover .upload-list-cover {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .upload-progress {
    width: 100%;
  }
}
.icon-shanchu {
  margin-left: 12px;
  cursor: pointer;
  &:hover {
    color: #4182fa;
  }
}
.center-text {
  font-size: 12px;
  font-weight: 400;
  color: #999;
  line-height: 20px;
  margin-top: 10px;
}
.image-name {
  margin-left: 12px;
  max-width: 188px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
}
</style>
