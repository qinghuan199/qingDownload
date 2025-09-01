<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('当地年月日')" prop="localServerDate">
        <el-input
          v-model="queryParams.localServerDate"
          :placeholder="$t('请输入当地年月日')"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('备注')" prop="remark">
        <el-input
          v-model="queryParams.remark"
          :placeholder="$t('请输入备注')"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('搜索')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('重置')}}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['amount:daily:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          plain-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['amount:daily:edit']"-->
<!--        >$t('修改')</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          plain-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['amount:daily:remove']"-->
<!--        >{{$t('删除')}}</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['amount:daily:export']"
        >{{ $t('导出') }}</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="dailyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('ID')" align="center" prop="id" />
      <el-table-column :label="$t('服务器时区')" align="center" prop="serverTimeZone" />
      <el-table-column :label="$t('当地年月日')" align="center" prop="localServerDate" />
      <el-table-column :label="$t('总额')" align="center" prop="amount" />
      <el-table-column :label="$t('备注')" align="center" prop="remark" />
      <el-table-column :label="$t('创建时间')" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('更新时间')" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('操作')" align="center" class-name="small-padding fixed-width">
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['amount:daily:edit']"-->
<!--          >$t('修改')</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['amount:daily:remove']"-->
<!--          >{{$t('删除')}}</el-button>-->
<!--        </template>-->
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改每日汇总对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('环境标识')" prop="env">
          <el-input v-model="form.env" :placeholder="$t('请输入环境标识')" />
        </el-form-item>
        <el-form-item :label="$t('服务器时区')" prop="serverTimeZone">
          <el-input v-model="form.serverTimeZone" :placeholder="$t('请输入服务器时区')" />
        </el-form-item>
        <el-form-item :label="$t('当地年月日')" prop="localServerDate">
          <el-input v-model="form.localServerDate" :placeholder="$t('请输入当地年月日')" />
        </el-form-item>
        <el-form-item :label="$t('总额')" prop="amount">
          <el-input v-model="form.amount" :placeholder="$t('请输入总额')" />
        </el-form-item>
        <el-form-item :label="$t('备注')" prop="remark">
          <el-input v-model="form.remark" :placeholder="$t('请输入备注')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('确定')}}</el-button>
        <el-button @click="cancel">{{ $t('取消') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDaily, getDaily, delDaily, addDaily, updateDaily } from "@/api/amount/daily";
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
export default {
  name: "Daily",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 每日汇总表格数据
      dailyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        localServerDate: null,
        remark: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        localServerDate: [
          { required: true, message: this('当地年月日')+t('不能为空'), trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询每日汇总列表 */
    getList() {
      this.loading = true;
      listDaily(this.queryParams).then(response => {
        this.dailyList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        env: null,
        serverTimeZone: null,
        localServerDate: null,
        amount: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = t('添加每日汇总');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDaily(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = t('修改每日汇总');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDaily(this.form).then(response => {
              this.$modal.msgSuccess(t('修改成功'));
              this.open = false;
              this.getList();
            });
          } else {
            addDaily(this.form).then(response => {
              this.$modal.msgSuccess(t('新增成功'));
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm(t('是否确认删除每日汇总编号为') + ids + t('的数据项？')).then(function() {
        return delDaily(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess(t('删除成功'));
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('amount/daily/export', {
        ...this.queryParams
      }, `daily_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
