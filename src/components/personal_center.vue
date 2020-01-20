<template>
    <div id="personal">
        <h2 class="title">个人资料</h2>
        <hr>
        <el-row>
        <div class="avatar">
            <el-avatar :size="70" :src="avatarUrl" class="avatar"></el-avatar>
        </div>
        </el-row>

    </div>
</template>

<script>
export default {
  name: 'personal',
};
</script>

<style lang="less" scoped>
#personal{
    .title{
        text-align: left;
        margin-left: 5%;
    }
    .avatar{
        text-align: left;
        margin-left: 8%;
    }
}
</style>
