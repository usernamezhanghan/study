/* eslint-disable vue/no-reserved-component-names */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'view-ui-plus/dist/styles/viewuiplus.css';
import { AdminNames, ErrorNames } from '@/router/routerNames';

const app = createApp(App);

app.use(router);

// 按需引入
import {
  Button,
  Spin,
  Input,
  Select,
  Option,
  Poptip,
  Form,
  FormItem,
  Table,
  Page,
  Message,
  Modal,
  Dropdown,
  DropdownMenu,
  Switch,
  DatePicker,
  Tooltip,
  Upload,
  Progress,
  Tabs,
  TabPane
} from 'view-ui-plus';
app.component('Button', Button);
app.component('Spin', Spin);
app.component('Input', Input);
app.component('Select', Select);
app.component('Option', Option);
app.component('Poptip', Poptip);
app.component('Form', Form);
app.component('FormItem', FormItem);
app.component('Table', Table);
app.component('Page', Page);
app.component('Page', Page);
app.component('Message', Message);
app.component('Modal', Modal);
app.component('Dropdown', Dropdown);
app.component('DropdownMenu', DropdownMenu);

app.component('Switch', Switch);
app.component('DatePicker', DatePicker);
app.component('Tooltip', Tooltip);
app.component('Upload', Upload);
app.component('Progress', Progress);
app.component('Tabs', Tabs);
app.component('TabPane', TabPane);
app.mount('#app');

app.config.globalProperties.AdminNames = AdminNames;
app.config.globalProperties.ErrorNames = ErrorNames;
