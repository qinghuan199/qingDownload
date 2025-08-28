<template>
	<view class="content">
<!-- 		<view class="">
			<view class="">
			</view>
			<view class="" @click="onLanguage">
				<view class=" ">{{$t('locale.language')}}</view>
			</view>
		</view> -->
		<view class="" style="height: 200rpx;">
			
		</view>
		<view class="logo">
			<image src="/static/mea/logo-1.png" mode="widthFix" class="logo"></image>
		</view>
		<view class="" style="height: 250rpx;">

		</view>
		<view class="login-form">
			<view class="input_border">
				<input class="input" type="text" v-model="pwd" :placeholder="$t('login.account_desc')" />
				<image src="/static/mea/User.png" mode="widthFix" class="icon"></image>
			</view>
			<view class="input_border">
				<input class="input" type="password" v-model="userAccount" :placeholder="$t('login.password_desc')" />
				<image src="/static/mea/Phone.png" mode="widthFix" class="icon"></image>
			</view>
			<view @click="onLogin" class="login-btn">
				{{$t('login')}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLogin
	} from "@/api/index.js"; // 导入 getLogin API

	export default {
		data() {
			return {
				userAccount: "",
				pwd: "",
				loginResponse: null, // 用于存储接口返回的响应
			};
		},
		methods: {
			// 登录方法
			onLogin() {
				const data = {
					userAccount: this.userAccount,
					pwd: this.pwd
				}; // 获取输入的 phone 和 pwd
				this.login(data);

			},

			// 调用接口
			login(data) {
				getLogin(data)
					.then((response) => {
						var loginResponse = response; // 假设返回的响应是 response.data
						console.log("Login response:", this.loginResponse); // 打印返回的结果
						if (loginResponse.code == 200) {
							uni.showToast({
								title: loginResponse.msg,
								icon: 'none',
								duration: 2000
							});
							setTimeout(() => {
								uni.navigateTo({
									url: "/pages/index/index" // 登录成功后跳转到首页
								});
							}, 2000);
							uni.setStorageSync('showState', false);
						} else {
							uni.showToast({
								title: loginResponse.msg,
								icon: 'none',
								duration: 2000
							});
							console.log(loginResponse.code, loginResponse.msg); // 打印返回的结果
						}
					})
					.catch((error) => {
						console.error("Login failed:", error); // 捕获并打印错误
					});
			},

			// 切换语言的方法
			onLanguage() {
				var that = this;
				uni.showActionSheet({
					itemList: [that.$t('locale.en'), that.$t('locale.pe'), that.$t('locale.me')],
					success: function(res) {
						var language = "pe";
						switch (res.tapIndex) {
							case 0:
								language = "en";
								break;
							case 1:
								language = "pe";
								break;
							case 2:
								language = "me";
								break;
							default:
								break;
						}
						if (that.isAndroid) {
							uni.showModal({
								content: that.$t('locale.language-change-confirm'),
								success: (res) => {
									if (res.confirm) {
										uni.setLocale(language);
									}
								}
							});
						} else {
							uni.setLocale(language);
							that.$i18n.locale = language;
						}
					}
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	page {
		height: 100vh;
		background-image: url('../../static/mea/bg.png');
		background-size: 100% 48%;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	.content {}

	.logo {
		height: 300rpx;
		width: 300rpx;
		margin: 0 auto 200rpx;
		text-align: center;
	}

	.input_border {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 20rpx;
		width: 684rpx;
		height: 100rpx;
		margin: 0 auto;
		background-color: #e9e7f3;
		margin-bottom: 50rpx;
		border: 4rpx solid #ddd;
		padding: 30rpx;
	}

	.input {
		background-color: #e9e7f3;
		border-radius: 15rpx;
		font-weight: bold;
		line-height: 100rpx;
	}

	.icon {
		width: 60rpx;
		height: 60rpx;
	}

	.login-form {}

	.login-btn {
		width: 684rpx;
		height: 120rpx;
		margin: 0 auto;
		position: relative;
		background: #9d20c3;
		border-radius: 20rpx;
		margin-top: 20rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 120rpx;
		font-size: 30rpx;
	}
</style>