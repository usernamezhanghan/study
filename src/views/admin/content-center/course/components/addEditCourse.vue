<template>
  <Modal
    :value="value"
    :title="title"
    :mask-closable="false"
    @on-visible-change="visibleChange"
    :width="1152"
  >
    <Form
      ref="form"
      :model="edit"
      :rules="ruleValidate"
      label-position="left"
      :label-width="80"
    >
      <Row :gutter="16">
        <Col span="8">
        <FormItem
          label="课程名称"
          prop="name"
        >
          <Input
            v-model="edit.name"
            placeholder="请输入"
            style="width: 278px"
          ></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="课程ID">
          <Input
            style="width: 278px"
            disabled
            v-model="edit.code"
          ></Input>
        </FormItem>
        </Col>
        <!-- <Col span="8">
          <FormItem label="URL">
            <Input v-model="edit.reviewUrl" placeholder="请输入" style="width: 278px"></Input>
          </FormItem>
        </Col> -->
      </Row>
      <Row :gutter="16">
        <Col span="8">
        <FormItem
          label="课程类型"
          prop="typeId"
        >
          <Select
            v-model="edit.typeId"
            clearable
            style="width: 278px"
            filterable
            filter-by-label
            class="select-style"
          >
            <Option
              v-for="(item, index) in accountType"
              :key="index"
              :value="item.id"
              :label="item.name"
            >
              {{ item.name }}
            </Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem
          label="科目"
          prop="subjectId"
        >
          <Select
            filterable
            filter-by-label
            style="width: 278px"
            clearable
            v-model="edit.subjectId"
            class="select-style"
          >
            <Option
              v-for="item in subjectList"
              :value="item.id"
              :key="item.id"
              :label="item.name"
            >{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem
          label="讲师"
          prop="lecturerId"
        >
          <Select
            style="width: 278px"
            clearable
            v-model="edit.lecturerId"
            :filterable="true"
            :filter-by-label="true"
            class="select-style"
          >
            <Option
              v-for="item in teacherList"
              :value="item.id"
              :key="item.id"
              :label="item.name"
            >{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <FormItem label="课程目录">
        <div
          v-for="(item,index) in catalogs"
          :key="index"
        >
          <Row
            :gutter="16"
            style="margin-bottom:24px"
          >
            <Col span="11">
            <div class="flex-center">
              <Input
                placeholder="请输入"
                style="width: 278px"
                v-model="item.name"
              >
              <template #prepend>
                <div style="width:32px;color: #999;">{{index + 1}}</div>
              </template>
              </Input>
              <Button
                style="margin-left:8px"
                @click="toAddZ(item)"
              >+新增章</Button>
              <Button
                style="margin-left:8px"
                @click="toAddZJ(item)"
              >+新增节</Button>
            </div>
            </Col>
            <Col span="11">
            <span style="margin-right:8px">章回看URL</span>
            <Input
              v-model="item.reviewUrl"
              placeholder="请输入"
              style="width: 278px"
            ></Input>
            <span
              class="icon iconfont icon-shanchu"
              style="margin-left:8px;cursor: pointer;"
              @click="delCatalog(item)"
              v-if="index > 0"
            ></span>
            </Col>
          </Row>
          <div
            v-for="(items,indexs) in item.children"
            :key="indexs"
          >
            <Row
              :gutter="16"
              style="margin-bottom:24px"
            >
              <Col span="11">
              <div class="flex-center">
                <Input
                  placeholder="请输入"
                  style="width: 278px"
                  v-model="items.name"
                >
                <template #prepend>
                  <div style="width:32px;color: #999;">{{index + 1}}-{{ indexs + 1 }}</div>
                </template>
                </Input>
              </div>
              </Col>
              <Col span="11">
              <span style="margin-right:8px">节回看URL</span>
              <Input
                v-model="items.reviewUrl"
                placeholder="请输入"
                style="width: 278px"
              ></Input>
              <span
                class="icon iconfont icon-shanchu"
                style="margin-left:8px;cursor: pointer;"
                @click="delCatalogChildren(items)"
                v-if="index > 0 || indexs>0"
              ></span>
              </Col>
            </Row>
          </div>
        </div>
      </FormItem>
      <FormItem
        label="课程封面"
        prop="thumbnail"
      >
        <upload-img
          :importUrl="formImportImg"
          :defaultFile="edit.thumbnail"
          @clear="handleClear"
          @upload="uploadPicture"
        ></upload-img>
      </FormItem>
      <Row :gutter="16">
        <Col span="16">
        <FormItem
          label="课程费用"
          prop="discountedPrice"
        >
          <span>现价</span>
          <InputNumber
            v-model="edit.discountedPrice"
            controls-outside
            :min="0"
            :precision="0"
            style="width:212px;margin:0 8px 0 15px"
          />
          <span>元</span>

          <span style="margin:0 20px">原价</span>
          <InputNumber
            v-model="edit.originalPrice"
            controls-outside
            :min="0"
            :precision="0"
            style="width:212px;margin:0 8px 0 0"
          />
          <span>元</span>
        </FormItem>
        </Col>
        <!-- <Col span="8">
          <FormItem label="叠加优惠" >
            <CheckboxGroup v-model="edit.discountType">
              <Checkbox :label="'Stackable'">是</Checkbox>
              <Checkbox :label="'NoDiscount'">否</Checkbox>
              <Checkbox :label="'Half'">有购买记录在享5折</Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Col> -->
      </Row>
      <Row>
        <Col span="8">
        <FormItem
          label="实训时间"
          prop="trainingBegin"
        >
          <switch-date
            @changeDateSuccess="toApply"
            :typeDate="'training'"
            :selectRow="edit"
          ></switch-date>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem
          label="线上服务"
          prop="serviceBegin"
        >
          <switch-date
            @changeDateSuccess="toService"
            :typeDate="'service'"
            :selectRow="edit"
          ></switch-date>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem
          label="招生人数"
          prop="studentCount"
        >
          <InputNumber
            v-model="edit.studentCount"
            controls-outside
            :min="0"
            :precision="0"
          />
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
        <FormItem
          label="报名时间"
          prop="enrollBegin"
        >
          <switch-date
            @changeDateSuccess="toEnroll"
            :typeDate="'enroll'"
            :selectRow="edit"
          ></switch-date>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem
          label="报到时间"
          prop="reportBegin"
        >
          <switch-date
            @changeDateSuccess="toReport"
            :typeDate="'report'"
            :selectRow="edit"
          ></switch-date>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="报名人数">
          <InputNumber
            v-model="edit.enrollBase"
            controls-outside
            :min="0"
            :precision="0"
          />
        </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="24">
        <FormItem
          label="实训地址"
          prop="addressCodes"
        >
          <div class="flex-center">
            <Cascader
              :data="city"
              v-model="edit.addressCodes"
              @on-change="changeCity"
              style="width:278px"
            />
            <Input
              v-model="edit.detailAddress"
              placeholder="请输入详细地址"
              style="width: 730px;margin-left:20px"
            ></Input>
          </div>
        </FormItem>
        </Col>
      </Row>
      <FormItem
        label="课程介绍"
        prop="description"
      >
        <rich-editor
          :html="edit.description"
          @changeText="changeContent"
          v-if="richModal"
        ></rich-editor>
      </FormItem>
    </Form>
    <template #footer>
      <Button
        type="text"
        @click="cancel"
      >取消</Button>
      <Button
        type="primary"
        :loading="loading"
        @click="async"
      >保存</Button>
    </template>
  </Modal>
</template>
<script lang="ts" setup>
import { defineEmits, defineProps, computed, ref, reactive, unref } from 'vue';
import { EditCourse } from '@/types/admin/deparment/index.ts';
import { CheckboxGroup, Checkbox, Message, Row, Col, InputNumber, Cascader } from 'view-ui-plus';
import {
  postAddCourse,
  getCourseDetail,
  postUpdateCourse,
  getCourseTypeList,
  getSubject,
  getTeacher
} from '@/api/admin/deparment/deparment';
import RichEditor from './richEditor.vue';
import SwitchDate from './SwitchDate.vue';
import UploadImg from './uploadImg.vue';
import shortid from 'shortid';
import { findIndex } from 'lodash';
import city from '@/utils/city.json';
const prop = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  type: {
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
const formImportImg = ref({
  url: '/api/v1/admin/course/thumbnail/upload',
  header: {
    Authorization: JSON.parse(localStorage.getItem('userInfo') as any).jwt
  },
  format: ['jpg', 'jpeg', 'png']
});
const accountType: any = ref([]);
const richModal = ref(true);
const loading = ref(false);
const edit: any = ref(new EditCourse());
const form = ref();

const ruleValidate = reactive({
  name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
  typeId: [
    {
      required: true,
      validator: typeRules,
      trigger: 'change'
    }
  ],
  subjectId: [
    {
      required: true,
      validator: subjectRules,
      trigger: 'change'
    }
  ],
  lecturerId: [
    {
      required: true,
      validator: lecturerRules,
      trigger: 'change'
    }
  ],
  thumbnail: [
    {
      required: true,
      validator: thumbnailRules,
      trigger: 'change'
    }
  ],
  discountedPrice: [
    {
      required: true,
      validator: discountedPriceRules,
      trigger: 'change'
    }
  ],

  trainingBegin: [
    {
      required: true,
      validator: trainingRules,
      trigger: 'change'
    }
  ],
  serviceBegin: [
    {
      required: true,
      validator: serviceRules,
      trigger: 'change'
    }
  ],
  studentCount: [
    {
      required: true,
      validator: studentCountRules,
      trigger: 'change'
    }
  ],
  reportBegin: [
    {
      required: true,
      validator: reportBeginRules,
      trigger: 'change'
    }
  ],
  enrollBegin: [
    {
      required: true,
      validator: enrollBeginRules,
      trigger: 'change'
    }
  ],
  description: [
    {
      required: true,
      validator: decRules,
      trigger: 'change'
    }
  ],
  enrollBase: [
    {
      required: true,
      validator: enrollBaseRules,
      trigger: 'change'
    }
  ],
  addressCodes: [
    {
      required: true,
      validator: addressCodesRules,
      trigger: 'change'
    }
  ]
});

function typeRules(rule: any, value: any, callback: any) {
  if (!edit.value.typeId) {
    callback(new Error('请选择课程类型'));
  } else {
    callback();
  }
}

function lecturerRules(rule: any, value: any, callback: any) {
  if (!edit.value.lecturerId) {
    callback(new Error('请选择讲师'));
  } else {
    callback();
  }
}

function subjectRules(rule: any, value: any, callback: any) {
  if (!edit.value.subjectId) {
    callback(new Error('请选择科目'));
  } else {
    callback();
  }
}

function thumbnailRules(rule: any, value: any, callback: any) {
  if (!edit.value.thumbnail) {
    callback(new Error('请选择课程封面'));
  } else {
    callback();
  }
}

function trainingRules(rule: any, value: any, callback: any) {
  if (!edit.value.trainingBegin || !edit.value.trainingEnd) {
    callback(new Error('请选择实训时间'));
  } else {
    callback();
  }
}

function serviceRules(rule: any, value: any, callback: any) {
  if (!edit.value.serviceBegin || !edit.value.serviceEnd) {
    callback(new Error('请选择线上服务时间'));
  } else {
    callback();
  }
}

function studentCountRules(rule: any, value: any, callback: any) {
  if (edit.value.studentCount === 0 || edit.value.studentCount === null) {
    callback(new Error('请输入招生人数'));
  } else {
    callback();
  }
}

function discountedPriceRules(rule: any, value: any, callback: any) {
  if (
    edit.value.discountedPrice === 0 ||
    edit.value.originalPrice === 0 ||
    edit.value.discountedPrice === null ||
    edit.value.originalPrice === null
  ) {
    callback(new Error('请输入课程费用'));
  } else {
    callback();
  }
}

function reportBeginRules(rule: any, value: any, callback: any) {
  if (!edit.value.reportBegin || !edit.value.reportEnd) {
    callback(new Error('请选择线上报到时间'));
  } else if (edit.value.enrollBegin >= edit.value.reportBegin) {
    callback(new Error('请检查报到时间'));
  } else if (edit.value.reportEnd >= edit.value.trainingBegin) {
    callback(new Error('请检查实训时间'));
  } else {
    callback();
  }
}

function enrollBeginRules(rule: any, value: any, callback: any) {
  if (!edit.value.enrollBegin || !edit.value.enrollEnd) {
    callback(new Error('请选择线上报名时间'));
  } else if (edit.value.enrollEnd >= edit.value.trainingBegin) {
    callback(new Error('请检查报名时间'));
  } else {
    callback();
  }
}

function decRules(rule: any, value: any, callback: any) {
  if (!edit.value.description) {
    callback(new Error('请输入课程介绍'));
  } else {
    callback();
  }
}

function enrollBaseRules(rule: any, value: any, callback: any) {
  if (edit.value.enrollBase === 0) {
    callback(new Error('请输入报名人数'));
  } else {
    callback();
  }
}

function addressCodesRules(rule: any, value: any, callback: any) {
  if (edit.value.addressCodes.length === 0) {
    callback(new Error('请选择实训地址'));
  } else if (!edit.value.detailAddress) {
    callback(new Error('请输入详细地址'));
  } else {
    callback();
  }
}
const title: any = computed(() => {
  if (prop.type === 'edit') {
    return '编辑';
  }

  return '新增';
});
async function getTypeList() {
  let res = await getCourseTypeList();
  accountType.value = res.data;
}
async function getInfoDetail(id: any) {
  let res = await getCourseDetail({ id: id });
  edit.value = res.data;
  edit.value.addressCodes = JSON.parse(res.data.addressCodes);
  catalogs.value = res.data.catalogs;
}
const subjectList: any = ref([]);
async function getSubjectList() {
  let res = await getSubject();
  subjectList.value = res.data;
}
const teacherList: any = ref([]);
async function getTeacherList() {
  let res = await getTeacher();
  teacherList.value = res.data;
}
async function visibleChange(val: boolean) {
  if (!val) {
    emit('close-modal', val);
    form.value.resetFields();
    richModal.value = false;
    edit.value = new EditCourse();
  } else {
    richModal.value = true;
    getTypeList();
    getSubjectList();
    getTeacherList();
    if (prop.type === 'edit') {
      edit.value.id = prop.selectRow.id;

      await getInfoDetail(prop.selectRow.id);
    } else {
      edit.value.description = null;
      edit.value.enrollBase = 0;
      edit.value.studentCount = 0;
      edit.value.discountedPrice = 0;
      edit.value.originalPrice = 0;
      edit.value.detailAddress = null;

      catalogs.value = [
        {
          children: [
            {
              duration: '',
              id: shortid.generate(),
              name: '',
              reviewUrl: ''
            }
          ],
          duration: '',
          id: shortid.generate(),
          name: '',
          reviewUrl: ''
        }
      ];

      form.value.resetFields();
    }
  }
}

function cancel() {
  emit('close-modal', false);
}

async function async() {
  const myform: any = unref(form);
  if (!form.value) {
    return;
  }
  const valid = await myform.validate();
  if (valid) {
    let params: any = {
      name: edit.value.name,
      addressCodes: JSON.stringify(edit.value.addressCodes),
      catalogs: catalogs.value,
      city: edit.value.city,
      district: edit.value.district,
      description: edit.value.description,
      detailAddress: edit.value.detailAddress,
      discountType: edit.value.discountType,
      discountedPrice: edit.value.discountedPrice,
      province: edit.value.province,
      enrollBase: edit.value.enrollBase,
      enrollBegin: edit.value.enrollBegin,
      enrollEnd: edit.value.enrollEnd,
      lecturerId: edit.value.lecturerId,
      originalPrice: edit.value.originalPrice,
      reportBegin: edit.value.reportBegin,
      reportEnd: edit.value.reportEnd,
      reviewUrl: edit.value.reviewUrl,
      serviceBegin: edit.value.serviceBegin,
      serviceEnd: edit.value.serviceEnd,
      studentCount: edit.value.studentCount,
      subjectId: edit.value.subjectId,
      thumbnail: edit.value.thumbnail,
      trainingBegin: edit.value.trainingBegin,
      trainingEnd: edit.value.trainingEnd,
      typeId: edit.value.typeId
    };
    loading.value = true;
    if (prop.type === 'edit') {
      try {
        params.id = edit.value.id;
        let res = await postUpdateCourse(params);

        if (res.code === '0') {
          Message.success('编辑成功！');
          emit('close-modal');
          emit('save-success', 'edit');
        }
        loading.value = false;
      } catch (error) {
        loading.value = false;
      }
    } else {
      try {
        let res = await postAddCourse(params);

        if (res.code === '0') {
          Message.success('添加成功！');
          emit('close-modal');
          emit('save-success', 'add');
        }
        loading.value = false;
      } catch (error) {
        loading.value = false;
      }
    }
  } else {
    Message.error('请完成信息填写后再进行提交！');
  }
}
function toApply(item: any) {
  edit.value.trainingBegin = item.begin;
  edit.value.trainingEnd = item.end;
}
function toReport(item: any) {
  edit.value.reportBegin = item.begin;
  edit.value.reportEnd = item.end;
}
function toService(item: any) {
  edit.value.serviceBegin = item.begin;
  edit.value.serviceEnd = item.end;
}
function uploadPicture(item: any) {
  edit.value.thumbnail = item;
}
function toEnroll(item: any) {
  edit.value.enrollBegin = item.begin;
  edit.value.enrollEnd = item.end;
}
function handleClear() {
  edit.value.thumbnail = '';
}
function changeContent(item: any) {
  // console.log(item);

  edit.value.description = item;
}
// 课程目录
const catalogs: any = ref([
  {
    children: [
      {
        duration: '',
        id: shortid.generate(),
        name: '',
        reviewUrl: ''
      }
    ],
    duration: '',
    id: shortid.generate(),
    name: '',
    reviewUrl: ''
  }
]);

function toAddZ(item: any) {
  catalogs.value.push({
    duration: '',
    id: shortid.generate(),
    name: '',
    reviewUrl: '',
    children: []
  });
}
function toAddZJ(item: any) {
  let index = findIndex(catalogs.value, { id: item.id });

  catalogs.value[index].children.push({
    duration: '',
    id: shortid.generate(),
    name: '',
    reviewUrl: ''
  });
}
function delCatalog(item: any) {
  let index = findIndex(catalogs.value, { id: item.id });
  if (index !== -1) {
    catalogs.value.splice(index, 1);
  }
}
function delCatalogChildren(item: any) {
  catalogs.value.forEach((row: any) => {
    let index = findIndex(row.children, { id: item.id });
    if (index !== -1) {
      row.children.splice(index, 1);
    }
  });
}

function changeCity(value: any, item: any) {
  edit.value.addressCodes = value;

  edit.value.province = item[0].label;
  edit.value.city = item[1].label;
  edit.value.district = item[2].label;
}
const emit = defineEmits(['close-modal', 'save-success']);
</script>

