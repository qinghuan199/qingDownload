<template>
    <div class="page-container">
        <el-card class="password-history">
            <el-row class="top" justify="space-between" align="center">
                <el-col :span="18" class="u-flex u-flex-items-center">
                    <span class="font-size-13">{{ $t('解锁密码记录') }}</span>
                    <el-input :placeholder="$t('请输入解锁密码')" class="width-200 m-0-10"></el-input>
                    <el-button type="primary" icon="lock" size="mini">{{ $t('解锁') }}</el-button>
                </el-col>
                <el-col :span="6" class="u-flex u-flex-items-center u-flex-end">
                    <el-button type="" icon="refresh" size="mini">{{ $t('刷新') }}</el-button>
                </el-col>
            </el-row>
            <el-row align="center" class="middle">
                <el-col class="item" :span="4">{{ $t('抓取时间') }}</el-col>
                <el-col class="item" :span="4">{{ $t('解锁方式') }}</el-col>
                <el-col class="item" :span="12">{{ $t('抓取结果') }}</el-col>
                <el-col class="item" :span="4">{{ $t('操作') }}</el-col>

            </el-row>
            <el-empty :image-size="50" class="bottom" />

        </el-card>
        <el-card class="bank-history">
            <el-row class="row-bg width-250" justify="space-between" align="center">
                <el-col :span="12" class="u-flex u-flex-items-center">
                    <span class="font-size-13">{{ $t('输入银行密码记录') }}</span>
                </el-col>
                <el-col :span="3" class="u-flex u-flex-items-center u-flex-end">
                    <el-button type="" icon="refresh" size="mini">{{ $t('刷新') }}</el-button>
                </el-col>
            </el-row>
            <el-empty :image-size="50" />
        </el-card>
    </div>



</template>

<style scoped lang="scss">
.page-container {
    display: flex;
    justify-content: space-between;

}

.password-history {
    flex: 1;
    .middle {
        font-size: 12px;
        border: 1px solid #ddd;
        background-color: #fafafc;

        .item {
            padding: 5px;
            text-align: center;
            border-right: 1px solid #ddd;

        }

        .item:last-child {
            border-right: none;
        }
    }
}
.bank-history{
    margin-left: 10px;
}

.el-row {
    margin-bottom: 10px;
}

.el-row:last-child {
    margin-bottom: 0;
}


</style>