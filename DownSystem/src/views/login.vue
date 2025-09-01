<template>
  <div class="login">
    <!-- <selectLanguage class="header"></selectLanguage> -->
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">{{ $t("下载系统") }}</h3>
      <!-- <button @click="switchLanguage('en')">{{ $t('中文') }}</button>
      <button @click="switchLanguage('cn')">{{ $t('中文') }}</button> -->
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" :placeholder="$t('账号')">
          <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" size="large" auto-complete="off" :placeholder="$t('密码')"
          @keyup.enter="handleLogin">
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-input v-model="loginForm.verifyCode" type="text" size="large" auto-complete="off" :placeholder="$t('验证码')"
          @keyup.enter="handleLogin">
          <template #prefix><svg-icon icon-class="code" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <!-- <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          v-model="loginForm.code"
          size="large"
          auto-complete="off"
          :placeholder="$t('验证码')"
          style="width: 63%"
          @keyup.enter="handleLogin"
        >
          <template #prefix
            ><svg-icon icon-class="validCode" class="el-input__icon input-icon"
          /></template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item> -->
      <!-- <el-checkbox
        v-model="loginForm.rememberMe"
        style="margin: 0px 0px 25px 0px"
        >{{ $t("记住密码") }}
      </el-checkbox> -->
      <el-form-item style="width: 100%">
        <el-button :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleLogin">
          <span v-if="!loading"> {{ $t("登录") }}</span>
          <span v-else> {{ $t("登录中...") }}</span>
        </el-button>
        <div style="float: right" v-if="register">
          <router-link class="link-type" :to="'/register'">{{
            $t("立即注册")
          }}</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <!-- <div class="el-login-footer">
      <span> {{ $t("版权所有 ©2018-2024 下载系统") }}</span>
    </div> -->
  </div>
</template>

<script setup>
import { getCodeImg, getIpAllow } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import useUserStore from "@/store/modules/user";
import { onMounted, ref } from "vue";
import selectLanguage from "@/components/selectLanguage";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const loginForm = ref({
  username: "",
  password: "",
  rememberMe: false,
  // code: "",
  verifyCode:"",
  // uuid: "",
});

const loginRules = {
  username: [{ required: true, trigger: "blur", message: t("请输入您的账号") }],
  password: [{ required: true, trigger: "blur", message: t("请输入您的密码") }],
  verifyCode: [{ required: true, trigger: "blur", message: t("请输入验证码") }],
  // code: [{ required: true, trigger: "change", message: t("请输入验证码") }],
};

const codeUrl = ref("");
const loading = ref(false);
// 验证码开关
const captchaEnabled = ref(true);
// 注册开关
const register = ref(false);
const redirect = ref(undefined);

watch(
  route,
  (newRoute) => {
    console.log("newRoute", newRoute);

    redirect.value = newRoute.query && newRoute.query.redirect;
  },
  { immediate: true }
);

const getIp = (id) => {

  // 可以通过route对象获取路由相关的信息
  // console.log('当前路由路径:', route.path);  // 获取当前路径
  // console.log('当前路由查询参数:', route.query);  // 获取查询参数（如果有）
  // console.log('当前路由参数:', route.params);  // 获取路由参数（如果有）

  // 创建查询参数，加入roleCode: 'user' 和当前的路由信息
  const query = {
    roleCode: "user",
    // roleCode: route.query.roleCode,
    id: id,
    // currentRoute: route.path,  // 将当前路由路径加入查询参数
  };

  getIpAllow(query)
    .then((res) => {
      console.log("成功", res);
    })
    .catch((error) => {
      console.error("失败", error);
      router.push({ path: '/404' }); // 跳转到 404 页面
    });
};


function handleLogin() {
  proxy.$refs.loginRef.validate((valid) => {
    if (valid) {
      loading.value = true;

      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set("username", loginForm.value.username, { expires: 30 });
        Cookies.set("password", encrypt(loginForm.value.password), {
          expires: 30,
        });
        Cookies.set("rememberMe", loginForm.value.rememberMe, { expires: 30 });
      } else {
        // 否则移除
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
      }

      // 调用action的登录方法
      userStore
        .login(loginForm.value)
        .then(() => {
          console.log("登陆方法");

          const query = route.query;
          const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
            if (cur !== "redirect") {
              acc[cur] = query[cur];
            }
            return acc;
          }, {});
          console.log("登陆", redirect.value);

          router.push({ path: redirect.value || "/", query: otherQueryParams });
        })
        .catch(() => {
          loading.value = false;
          // 重新获取验证码
          // if (captchaEnabled.value) {
          // getCode();
          // }
        });
    }
  });
}
onMounted(() => {
  // 判断 roleCode 是否存在，如果为空则跳转到 404 页面
  // const roleCode = route.query.roleCode;
  // Cookies.set("roleCode", route.query.roleCode);
  // if (!roleCode) {
  //   router.push({ path: '/404' }); // 跳转到 404 页面
  //   return;
  // } else {
  //   getIp();
  // }
  getIp();

});

// function getCode() {
//   getCodeImg().then((res) => {
//     captchaEnabled.value =
//       res.captchaEnabled === undefined ? true : res.captchaEnabled;
//     if (captchaEnabled.value) {
//       codeUrl.value = "data:image/gif;base64," + res.img;
//       loginForm.value.uuid = res.uuid;
//       Cookies.set("UUID", res.uuid);
//     }
//   });
// }

// function getCookie() {
//   const username = Cookies.get("username");
//   const password = Cookies.get("password");
//   const rememberMe = Cookies.get("rememberMe");
//   loginForm.value = {
//     username: username === undefined ? loginForm.value.username : username,
//     password:
//       password === undefined ? loginForm.value.password : decrypt(password),
//     rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
//   };
// }

// getCode();
// getCookie();
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  right: 20px;
  top: 20px;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/background.png");
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 40px;

    input {
      height: 40px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 40px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>
