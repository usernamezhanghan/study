<template>
  <div style="border: 1px solid #ccc; z-index: 99;margin-top:10px;border-radius: 4px;">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
    />
    <Editor
      style="height: 600px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
      @onChange="handleChange"
      @onDestroyed="handleDestroyed"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      @customAlert="customAlert"
      @customPaste="customPaste"
    />
  </div>
</template>
<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  defineEmits,
  defineProps,
  nextTick,
  watch
} from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
const prop = defineProps({
  html: {
    type: String,
    default: ''
  }
});

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('');
const toolbarConfig: any = {};
watch(
  () => prop.html,
  (val: any) => {
    if (prop.html === null) {
      editorRef.value.clear();
    } else {
      valueHtml.value = val;
    }
  }
);

type InsertFnType = (url: string) => void;
const editorConfig: any = { placeholder: '请输入...', MENU_CONF: {} };
editorConfig.MENU_CONF['uploadImage'] = {
  server: '/api/v1/file/upload/image',
  fieldName: 'file',
  headers: {
    Authorization: JSON.parse(localStorage.getItem('userInfo') as any).jwt
  },
  customInsert(res: any, insertFn: InsertFnType) {
    // TS 语法

    insertFn(res.data);
  }
};
editorConfig.MENU_CONF['uploadVideo'] = {
  server: '/api/v1/file/upload/image',
  fieldName: 'file',
  headers: {
    Authorization: JSON.parse(localStorage.getItem('userInfo') as any).jwt
  },
  customInsert(res: any, insertFn: InsertFnType) {
    // TS 语法

    insertFn(res.data);
  }
};
// toolbarConfig.excludeKeys = ['emotion', 'todo', 'numberedList', 'bulletedList'];
toolbarConfig.toolbarKeys = [
  // 菜单 key
  'headerSelect',
  'blockquote',
  '|',
  'bold',
  'italic',
  'underline',
  'italic',

  {
    key: 'group-more-style',
    title: '更多',
    iconSvg:
      '<svg viewBox="0 0 1024 1024"><path d="M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path></svg>', // 可选
    menuKeys: ['clearStyle']
  },
  'color',
  'bgColor',
  'fontSize',
  'fontFamily',
  'lineHeight',
  'insertLink',
  {
    key: 'group-image',
    title: '图片',
    iconSvg:
      '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>', // 可选
    menuKeys: ['uploadImage']
  },
  // 'insertTable',
  // {
  //   key: 'group-video', // 必填，要以 group 开头
  //   title: '视频', // 必填
  //   iconSvg: '<svg viewBox=\"0 0 1024 1024\"><path d=\"M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.264 244.16 42.816 351.904C186.464 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.264-244.16-42.816-351.904zM384 704V320l320 192-320 192z\"></path></svg>', // 可选
  //   menuKeys: ['uploadVideo', 'insertVideo'] // 下级菜单 key ，必填
  // },

  // 'divider',
  // 'codeBlock',
  '|',
  'undo',
  'redo',
  '|',
  'fullScreen'
];

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor === null) {
    return;
  }

  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor: any) => {
  emit('changeText', editor.getHtml());
};
const handleDestroyed = (editor: any) => {};
const handleFocus = (editor: any) => {};
const handleBlur = (editor: any) => {};
const customAlert = (info: any, type: any) => {};
const customPaste = (editor: any, event: any, callback: any) => {
  console.log('ClipboardEvent 粘贴事件对象', event);
  // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
  const text = event.clipboardData.getData('text/plain'); // 获取粘贴的纯文本
  // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

  // 自定义插入内容
  editor.insertText(text);

  // 返回 false ，阻止默认粘贴行为
  event.preventDefault();
  callback(false); // 返回值（注意，vue 事件的返回值，不能用 return）

  // 返回 true ，继续默认的粘贴行为
  // callback(true)
};
const emit = defineEmits(['changeText']);
</script>
