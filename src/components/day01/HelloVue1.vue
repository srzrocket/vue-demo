<template>
  <div id="vue">Hello1 Vue.js! {{ message }}</div>
</template>
<script type="text/javascript">
  import qs from "qs";
  import Utils from '@/../static/js/utils';
  import pako from '@/../static/js/pako.min.js';

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
          }
        ;
        this.$http({
          method: "post",
          url: "/esb/server/invoke.html",
          data: {param:Utils.getmaxParam()},
          headers:{'Content-Type': 'application/x-www-form-urlencoded'},
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
            var restored = pako.ungzip( res.data, { to: 'string' } );
            var decData = JSON.parse(Utils.DecData(restored)) ;
            console.log(decData);
            this.hydtData = decData;
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
