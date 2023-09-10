<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <Select
      v-model="info.paymentMethod"
      clearable
      style="width: 100px"
      transfer
      @on-select="toUpdateResult"
      @on-clear="clearResult"
    >
      <Option
        v-for="(item) in payType"
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

const payType = ref([
  {
    value: 'Unpaid',
    label: '未缴费'
  },
  {
    value: 'QrCode',
    label: '扫码支付'
  },
  {
    value: 'Offline',
    label: '线下支付'
  },
  {
    value: 'Gift',
    label: '兑换卡支付'
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