<template>
  <div>
    <DatePicker
      v-model="dateBeginPicker"
      type="date"
      :editable="false"
      :options="startOptions"
      placement="bottom-end"
      class="date-picker"
      placeholder="开始日期"
      @on-clear="initDate"
      @on-change="changeEndDate"
    ></DatePicker>
    <span style="margin: 0 10px">至</span>
    <DatePicker
      v-model="dateEndPicker"
      type="date"
      :editable="false"
      :options="endOptions"
      placement="bottom-end"
      class="date-picker"
      placeholder="截止日期"
      @on-clear="initDateEnd"
      @on-change="changeStartDate"
    ></DatePicker>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, reactive, unref, watch, nextTick } from 'vue';
import moment from 'moment';
const prop = defineProps({
  typeDate: {
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
const dateBeginPicker: any = ref('');
const dateEndPicker: any = ref('');
const startOptions = ref({});
const endOptions = ref({});
const edit: any = ref({});

watch(
  () => prop.selectRow,
  (val: any) => {
    if (val) {
      edit.value = val;
      if (prop.typeDate === 'training') {
        dateEndPicker.value = edit.value.trainingEnd;
        dateBeginPicker.value = edit.value.trainingBegin;
      }
      if (prop.typeDate === 'service') {
        dateEndPicker.value = edit.value.serviceEnd;
        dateBeginPicker.value = edit.value.serviceBegin;
      }

      if (prop.typeDate === 'enroll') {
        dateEndPicker.value = edit.value.enrollEnd;
        dateBeginPicker.value = edit.value.enrollBegin;
      }

      if (prop.typeDate === 'report') {
        dateEndPicker.value = edit.value.reportEnd;
        dateBeginPicker.value = edit.value.reportBegin;
      }
    }
  }
);

function changeStartEndDate() {
  const params: any = {
    begin: dateBeginPicker.value
      ? moment(dateBeginPicker.value).format('YYYY-MM-DD HH:mm:ss')
      : null,
    end: dateEndPicker.value ? moment(dateEndPicker.value).format('YYYY-MM-DD HH:mm:ss') : null
  };
  emit('changeDateSuccess', params);
}

function changeStartDate() {
  startOptions.value = {
    disabledDate: (item: any) => {
      if (dateEndPicker.value) {
        return item && item.valueOf() > dateEndPicker.value.valueOf();
      }

      return false;
    }
  };

  changeStartEndDate();
}

function changeEndDate() {
  endOptions.value = {
    disabledDate: (item: any) => {
      if (dateBeginPicker.value) {
        return item && item.valueOf() < dateBeginPicker.value.valueOf();
      }

      return false;
    }
  };

  changeStartEndDate();
}

function initDate() {
  dateBeginPicker.value = '';
}
function initDateEnd() {
  dateEndPicker.value = '';
}
const emit = defineEmits(['changeDateSuccess']);
</script>

<style scoped lang="scss">
.date-picker {
  width: 124px;
}
</style>
