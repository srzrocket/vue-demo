<template>
  <div id="vue">Hello Vue.js! {{ message }}</div>
</template>

<script type="text/javascript">
  import qs from "qs";
  export default { //这里需要将模块引出，可在其他地方使用
    name: "HelloVue",
    data (){ //注意：data即使不需要传数据，也必须return,否则会报错
      return {
        message: "啦啦啦啦啦",
        hydtData: []
      }
    },
    mounted: function() {
      this.getTableData();
    },
    methods : {
      getTableData() {
        let obj = {
            curPage: "1",
            pageSize: 5,
            sortOrder: "DESC",
            queryCondition: {
              title: "",
              module: "技经动态",
              existCoverPhoto: "",
              publishIdentify: "已发布"
            }
          }
        ;
        this.$http({
          method: "post",
          url: "/hyzx/api/h/news/findPageByDynamic",
          data: {queryInfo:JSON.stringify(obj)},
          headers:{'Content-Type': 'application/x-www-form-urlencoded','token':"eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNpEjcsKgzAURP9l1gqJb7PvolAoWLoqJURzF2k1isZSEP-9aZEKs7gc7pxZMM01BOaJRqs6QvA7pdEbPGqPpqYfCOKG6nw6yOvlUOEewPZW0nswI_lnN860dTs1QCx4qdZo6YyXCkQ8LtMs5TkrywJrAF-E-FMewCgHwdMdkFV1u6u_a23fPHfycMabWcYVZToKWaqTMIljFhYqL8Kal0xpinwirB8AAAD__w.Rs0tIXRjOf08p59XX6amhRzs8s4IjKnNBCuTCsaClao"},
          transformRequest:[function (data) {
            let ret = ''
              // 序列化
              for (let it in data) {

                if(!(typeof data[it] === 'string' || typeof data[it] === 'number' || typeof data[it] === 'boolean')){
                  data[it] = JSON.stringify(data[it]);
                }
              }
              ret = qs.stringify(data);
            return ret
          }],
        })
          .then(res => {
            console.log(res.data.data);
            this.hydtData = res.data.data;
          })
          .catch();
      }
    }
  }


</script>

<style type="text/css">
  #vue{
    color: green;
    font-size: 28px;
  }
</style>
