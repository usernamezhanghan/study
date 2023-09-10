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
import { defineEmits, defineProps, ref, reactive, unref, onMounted } from 'vue';
import moment from 'moment';

const dateBeginPicker: any = ref('');
const dateEndPicker: any = ref('');
const startOptions = ref({});
const endOptions = ref({});
onMounted(() => {
  initDate();
  initDateEnd();
});

function changeStartEndDate() {
  const params: any = {
    begin: dateBeginPicker.value
      ? moment(dateBeginPicker.value).format('YYYY-MM-DD HH:mm:ss')
      : null,
    end: dateEndPicker.value ? moment(dateEndPicker.value).format('YYYY-MM-DD HH:mm:ss') : null
  };
  emit('changeDateSuccess', params);
}

function changeStartDate(date: any) {
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

function changeEndDate(date: any) {
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
