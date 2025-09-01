<template>
    <div class="page-container">
        <el-card class="password-history">
            <el-row class="top" justify="space-between" align="center">
                <el-col :span="18" class="u-flex u-flex-items-center">
                    <span class="font-size-13 m-r-10">{{ $t('通讯录列表') }}</span>
                    <el-button class="btn" type="success" icon="lock" size="mini"> {{$t('导出Excel')}}</el-button>
                </el-col>
                <el-col :span="6" class="u-flex u-flex-items-center u-flex-end">
                    <el-button type="" class="btn" icon="refresh" size="mini"> {{$t('刷新')}}</el-button>
                </el-col>
            </el-row>
            <el-row align="center" class="middle">
                <el-col class="item" :span="4">{{$t('名字')}}</el-col>
                <el-col class="item" :span="20">{{$t('手机')}}</el-col>

            </el-row>
            <el-empty :image-size="50" class="bottom" />
            <el-pagination class="u-flex u-flex-end" size="small" background layout="prev, pager, next" :total="50"  />
        </el-card>

    </div>



</template>

<style scoped lang="scss">
.page-container {
    display: flex;
    justify-content: space-between;

}

.btn {
    height: 25px;
    font-size: 12px;
}

.password-history {
    flex: 1;


    .middle {
        font-size: 12px;
        border: 1px solid #ddd;
        background-color: #fafafc;

        .item {
            padding: 5px;
            border-right: 1px solid #ddd;

        }

        .item:last-child {
            border-right: none;
        }
    }
}


.el-row {
    margin-bottom: 10px;
}

.el-row:last-child {
    margin-bottom: 0;
}
</style>