<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <Select
      v-model="info.visitResult"
      clearable
      style="width: 100px"
      transfer
      @on-select="toUpdateResult"
      @on-clear="clearResult"
    >
      <Option
        v-for="(item) in accountStatus"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </Option>
    </Select>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive, defineEmits, defineProps } from 'vue';
const prop = defineProps({
  info: {
    type: Object as any,
    default: () => {
      return {};
    }
  }
});

const accountStatus = ref([
  {
    value: 'UnVisit',
    label: '暂未回访'
  },
  {
    value: 'Invalid',
    label: '确认不参加'
  },
  {
    value: 'Unpaid',
    label: '确认参加，未缴费'
  },
  {
    value: 'Paid',
    label: '确认参加，已缴费'
  },
  {
    value: 'Unreachable',
    label: '无法取得联系'
  }
]);

function toUpdateResult(item: any) {
  emit('changeValue', item.value, prop.info);
}
function clearResult() {
  emit('clearValue', null, prop.info);
}

const emit = defineEmits(['changeValue', 'clearValue']);
</script>