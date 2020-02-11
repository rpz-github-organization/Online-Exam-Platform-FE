<template>
    <div id="personal">
        <h2 class="title">个人资料</h2>
        <hr>
        <el-row>
            <div class="card_personal">
                <div class="avatar">
                    <el-avatar :size="70" class="avatar"></el-avatar>
                </div>
                <div class="rowa">
                    <label>学号:  {{this.uid}}</label>
                </div>
                <div class="rowa">
                    <label>姓名:  {{this.name}}</label>
                </div>
            </div>
        </el-row>

    </div>
</template>

<script>
export default {
  name: 'personal',
  data() {
    return {
      uid: 'yuyan',
      name: '张菲燕',
    };
  },
};
</script>

<style lang="less" scoped>
#personal{
    .title{
        text-align: left;
        margin-left: 5%;
    }
    .card_personal{
        width: 45vw;
        margin: 5px auto;
        padding: 10px 0;
        border-radius: 15px;
        border: 1px solid rgba(0, 0, 0, 0.20);
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);

        .row{
            width: 80%;
        }
    }
    .avatar{
        text-align: left;
        margin-left: 8%;
    }
}
</style>
