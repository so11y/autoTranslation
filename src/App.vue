<template>
  <div>
    <div
      class="xxx"
      :qp="{
        qp: '  确实',
        gpg: {
          f: 'bn好啊'
        }
      }"
      qcd="哈哈"
      :dd="() => '3535'"
      :gg="1 + 2 ? '可以吗' : () => '22神魔恋'"
    >
      {{ "ddasdd是滴" }}
    </div>
    {{ "aag" + "=哈哈5455" }}
    <div>硅谷{{ "kg快点哦2" }} {{ "vdvd" }}</div>
  </div>
</template>
<script lang="ts" setup>
console.log("ddasdd是滴");
console.log(`${1 + 1} ${`kg快点哦2`}`);

console.log(`1,2好的 , 啊1b啊2b${"啊3" + 3 + `我的前雾灯 `}`);
</script>
