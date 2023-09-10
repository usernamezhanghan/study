import { ref } from 'vue';

export function useListAction<T>(
  api: any,
  queryParams: any,
  isPage: boolean = true,
  dataCallBack?: any
) {
  const loading = ref(true);
  const totalCount = ref(0);
  const pageNum = ref(0);
  const currentPage = ref(1);
  const list = ref<T[]>([]);

  const getList = async () => {
    try {
      loading.value = true;
      const res = await api(queryParams.value);
      console.log(queryParams.value);
      if (isPage) {
        totalCount.value = res.data.total;
        list.value = res.data.records;
        dataCallBack && dataCallBack(list.value);
        pageNum.value = res.data.pages;
      } else {
        list.value = res.data;
      }
    } finally {
      loading.value = false;
    }
  };

  const pageChange = (num: number) => {
    currentPage.value = num;
    queryParams.value.pageNo = num;
    getList();
  };

  const pageChangeBySize = (num: number) => {
    currentPage.value = num;
    queryParams.value.pageNo = num;
    getList();
    document.documentElement.scrollTop = 0;
  };

  return { loading, totalCount, pageNum, currentPage, list, getList, pageChange, pageChangeBySize };
}
