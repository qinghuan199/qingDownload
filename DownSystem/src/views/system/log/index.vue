<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item :label="$t('设备ID')" prop="deviceId">
        <el-input
          v-model="queryParams.deviceId"
          :placeholder="$t('请输入设备ID')"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('当地年月日')" prop="localServerDate">
        <el-input
          v-model="queryParams.localServerDate"
          :placeholder="$t('请输入当地年月日')"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('当地时分秒')" prop="localServerTime">
        <el-input
          v-model="queryParams.localServerTime"
          :placeholder="$t('请输入当地时分秒')"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('管理员设备ID')" prop="adminId">
        <el-input
          v-model="queryParams.adminId"
          :placeholder="$t('请输入管理员设备ID')"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('应用包名')" prop="currentApp">
        <el-input
          v-model="queryParams.currentApp"
          :placeholder="$t('请输入应用包名')"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('操作类型')" prop="packTypeValue">
        <el-select
          v-model="queryParams.packTypeValue"
          :placeholder="$t('请选择内容类型')"
          clearable
        >
          <el-option
            v-for="dict in dict.type.biz_pack_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('内容类型')" prop="isSystem">
        <el-select
          v-model="queryParams.opType"
          :placeholder="$t('请选择内容类型')"
          clearable
        >
          <el-option
            v-for="dict in dict.type.biz_input_content"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('内容')" prop="packBody">
        <el-input
          v-model="queryParams.packBody"
          :placeholder="$t('请输入内容')"
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
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >{{$t('搜索')}}</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >{{ $t('重置') }}</el-button
        >
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
      <!--          v-hasPermi="['system:log:add']"-->
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
      <!--          v-hasPermi="['system:log:edit']"-->
      <!--        >{{$t('修改')}}</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="danger"-->
      <!--          plain-->
      <!--          icon="el-icon-delete"-->
      <!--          size="mini"-->
      <!--          :disabled="multiple"-->
      <!--          @click="handleDelete"-->
      <!--          v-hasPermi="['system:log:remove']"-->
      <!--        >{{ $t('删除') }}</el-button>-->
      <!--      </el-col>-->
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:log:export']"
          >导出</el-button
        >
      </el-col> -->
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="logList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('ID')" align="center" prop="id" />
      <el-table-column :label="$t('环境标识')" align="center" prop="env" />
      <el-table-column :label="$t('设备ID')" align="center" prop="deviceId" />
      <el-table-column :label="$t('设备时区')" align="center" prop="deviceTimeZone" />
      <el-table-column
        :label="$t('服务器时区')"
        align="center"
        prop="serverTimeZone"
      />
      <el-table-column
        :label="$t('当地年月日')"
        align="center"
        prop="localServerDate"
      />
      <el-table-column
        :label="$t('当地时分秒')"
        align="center"
        prop="localServerTime"
      />
      <el-table-column :label="$t('管理员设备ID')" align="center" prop="adminId" />
      <el-table-column :label="$t('应用包名')" align="center" prop="currentApp" />
      <el-table-column :label="$t('操作类型')" align="center" prop="packTypeValue">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.biz_pack_type"
            :value="scope.row.packTypeValue"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('内容')" align="center" prop="packBody" />
      <el-table-column :label="$t('内容类型')" align="center" prop="opType">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.biz_input_content"
            :value="scope.row.opType"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('备注')" align="center" prop="remark" />
      <el-table-column
        :label="$t('创建时间')"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('操作')"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:log:edit']"
            >{{ $t('修改') }}</el-button
          >
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            type="text"-->
          <!--            icon="el-icon-delete"-->
          <!--            @click="handleDelete(scope.row)"-->
          <!--            v-hasPermi="['system:log:remove']"-->
          <!--          >{{$t('删除')}}</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改管理端日志对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('环境标识')" prop="env">
          <el-input disabled v-model="form.env" :placeholder="$t('请输入环境标识')" />
        </el-form-item>
        <el-form-item :label="$t('设备ID')" prop="deviceId">
          <el-input
            disabled
            v-model="form.deviceId"
            :placeholder="$t('请输入设备ID')"
          />
        </el-form-item>
        <el-form-item :label="$t('设备时区')" prop="deviceTimeZone">
          <el-input
            disabled
            v-model="form.deviceTimeZone"
            :placeholder="$t('请输入设备时区')"
          />
        </el-form-item>
        <el-form-item :label="$t('服务器时区')" prop="serverTimeZone">
          <el-input
            disabled
            v-model="form.serverTimeZone"
            :placeholder="$t('请输入服务器时区')"
          />
        </el-form-item>
        <el-form-item :label="$t('当地年月日')" prop="localServerDate">
          <el-input
            disabled
            v-model="form.localServerDate"
            :placeholder="$t('请输入当地年月日')"
          />
        </el-form-item>
        <el-form-item :label="$t('当地时分秒')" prop="localServerTime">
          <el-input
            disabled
            v-model="form.localServerTime"
            :placeholder="$t('请输入当地时分秒')"
          />
        </el-form-item>
        <el-form-item :label="$t('管理员设备ID')" prop="adminId">
          <el-input
            disabled
            v-model="form.adminId"
            placeholder=""
            :placeholder="$t('请输入管理员设备ID')"
          />
        </el-form-item>
        <el-form-item :label="$t('应用包名')" prop="currentApp">
          <el-input
            disabled
            v-model="form.currentApp"
            :placeholder="$t('请输入应用包名')"
          />
        </el-form-item>
        <el-form-item :label="$t('操作类型')" prop="packTypeValue">
          <el-select
            disabled
            v-model="form.packTypeValue"
            :placeholder="$t('操作类型')"
          >
            <el-option
              v-for="dict in dict.type.biz_pack_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('内容')" prop="packBody">
          <el-input disabled v-model="form.packBody" :placeholder="$t('请输入内容')" />
        </el-form-item>
        <el-form-item :label="$t('内容类型')" prop="opType">
          <el-select v-model="form.opType" :placeholder="$t('内容类型')">
            <el-option
              v-for="dict in dict.type.biz_input_content"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注":label="$t('环境标识')" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('确定')}}</el-button>
        <el-button @click="cancel">{{$t('取消')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import useDictStore from "@/store/modules/dict";
import { listLog, getLog, delLog, addLog, updateLog } from "@/api/system/log";
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
export default {
  name: "Log",
  dicts: ["biz_input_content", "biz_pack_type"],
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
      // 管理端日志表格数据
      logList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deviceId: null,
        localServerDate: null,
        localServerTime: null,
        adminId: null,
        currentApp: null,
        packTypeValue: null,
        packBody: null,
        remark: null,
        opType: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        deviceId: [
          { required: true, message: t('设备ID')+t('不能为空'), trigger: "blur" },
        ],
        adminId: [
          { required: true, message: t('管理员设备ID')+t('不能为空'), trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询管理端日志列表 */
    getList() {
      this.loading = true;
      listLog(this.queryParams).then((response) => {
        this.logList = response.rows;
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
        deviceId: null,
        deviceTimeZone: null,
        serverTimeZone: null,
        localServerDate: null,
        localServerTime: null,
        adminId: null,
        currentApp: null,
        packTypeValue: null,
        packBody: null,
        opType: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
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
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = t('添加管理端日志');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getLog(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = t('修改管理端日志');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateLog(this.form).then((response) => {
              this.$modal.msgSuccess(t('修改成功'));
              this.open = false;
              this.getList();
            });
          } else {
            addLog(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
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
      this.$modal
        .confirm(t('是否确认删除管理端日志编号为') + ids + t('的数据项？'))
        .then(function () {
          return delLog(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess(t('删除成功'));
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/log/export",
        {
          ...this.queryParams,
        },
        `log_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
