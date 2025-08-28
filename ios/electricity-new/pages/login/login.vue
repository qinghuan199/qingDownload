<template>
	<view class="content">
		<!-- 		<view class="">
			<view class="">
			</view>
			<view class="" @click="onLanguage">
				<view class=" ">{{$t('locale.language')}}</view>
			</view>
		</view> -->
		<view class="" style="height: 120rpx;">

		</view>
		<view class="logo-box">
			<image src="/static/new/logo.png" mode="widthFix" class="logo"></image>
			<image src="/static/new/logo1.png" mode="widthFix" class="logo1"></image>
			<image src="/static/new/logo2.png" mode="widthFix" class="logo2"></image>
		</view>
		<!-- 	<view class="login-text text-center ">
			<view class="text-center desc">
				{{$t('login.desc')}}
			</view>
			<view class="text-center title">
				{{$t('login.title')}}
			</view>
		</view> -->

		<view class="" style="height: 300rpx;">

		</view>
		<view class="login-form">
			<view class="input-title">
				<image src="/static/new/star.png" mode="widthFix" class="star"></image>
				{{$t('login.account')}}
			</view>
			<view class="input_border">
				<input class="input" type="text" v-model="userAccount" :placeholder="$t('login.account_desc')"
					placeholder-style="color:#86909C" />
				<!-- <image src="/static/mea/User.png" mode="widthFix" class="icon"></image> -->
			</view>
			<view class="input-title">
				<image src="/static/new/star.png" mode="widthFix" class="star"></image>
				{{$t('login.password')}}
			</view>
			<view class="input_border">
				<input class="input" type="text" v-model="pwd" :placeholder="$t('login.password_desc')"
					placeholder-style="color:#86909C" />
				<!-- <image src="/static/mea/Phone.png" mode="widthFix" class="icon"></image> -->
			</view>
			<view @click="onLogin" class="login-btn">
				{{$t('login')}}
			</view>
			<view class="login-bottom">
				{{$t('login.agree')}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLogin
	} from "@/api/index.js"; // 导入 getLogin API
	import http from '@/utils/request'

	export default {
		data() {
			return {
				userAccount: "",
				pwd: "",
				loginResponse: null, // 用于存储接口返回的响应
			};
		},
		methods: {
			loginTest(){
				uni.navigateTo({
					url:'/pages/setting/setting'
				})
			},
			// 登录方法
			onLogin() {
				const data = {
					userAccount: this.userAccount,
					pwd: this.pwd
				}; // 获取输入的 phone 和 pwd
				// var d = window.location.href.substring(0, window.location.href.lastIndexOf("/")).replace(
				// "https://", "").replace("http://", "");
				var d = "38";
				// console.log("d", d)
				// fetch("/resApi/OnlineDevice/saveDownLoadCount?domain=" + d, {
				// 		method: "POST",
				// 		headers: {
				// 			"Content-Type": "application/x-www-form-urlencoded"
				// 		}
				// 	})
				// 	.then(response => response.json())
				uni.request({
					url: "/resApi/OnlineDevice/saveDownLoadCount?domain=" + d,
					method: "POST",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					// data: {
					// 	domain: d
					// },
					success(res) {
						console.log("saveDownLoadCount response:", res);
					},
					fail(err) {
						console.error("saveDownLoadCount request failed:", err);
					}
				});
				this.login(data);
			},

			// 调用接口
			login(data) {
				http.post('/OnlineDevice/login', data)
					.then((response) => {
						let loginResponse = response;
						console.log("Login response:", loginResponse); // 打印返回的结果
						if (loginResponse.code == 200) {
							uni.showToast({
								title: loginResponse.msg,
								icon: 'none',
								duration: 2000
							});
							setTimeout(() => {
								uni.reLaunch({
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
		background-image: url('../../static/new/bg1.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	.content {}

	.input-title {
		padding: 30rpx 0 20rpx 30rpx;
		font-size: 26rpx;
		margin-top: 40rpx;
	}

	.star {
		width: 20rpx;
		height: 20rpx;
	}

	.logo-box {
		display: flex;
		flex-direction: column;
		margin-left: 40rpx;

		.logo {
			width: 200rpx;
			height: 50rpx;
		}

		.logo1 {
			margin-top: 30rpx;
			width: 400rpx;
			height: 50rpx;
		}

		.logo2 {
			margin-top: 30rpx;
			width: 250rpx;
			height: 50rpx;
		}

	}

	.login-form {
		position: absolute;
		height: 58%;
		width: 100%;
		bottom: 0;
		border-radius: 30rpx 30rpx 0 0;
		background: rgba(255, 255, 255, 0.25);
		/* 半透明白色背景 */
		backdrop-filter: blur(10px);
		/* 背景模糊 */
		-webkit-backdrop-filter: blur(10px);
		/* 兼容 Safari */
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
		/* 柔和阴影提升层次感 */
	}

	.login-text {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-size: 26rpx;
		white-space: nowrap;
	}

	.title {
		color: #faba16;
		margin-top: 20rpx;
		white-space: nowrap;
	}

	.desc {
		color: #fff;
		white-space: nowrap;
	}

	.input_border {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 20rpx;
		width: 684rpx;
		height: 110rpx;
		margin: 0 auto;
		background-color: #fff;
		border: 4rpx solid #fff;
		padding: 30rpx;
	}

	.input {
		background-color: #fff;
		border-radius: 15rpx;
		color: #000;
		width: 100%;
	}

	.icon {
		width: 60rpx;
		height: 60rpx;
	}

	.login-bottom {
		text-align: left;
		padding: 30rpx;
		font-size: 20rpx;
		color: #000;
	}

	.login-btn {
		width: 684rpx;
		height: 120rpx;
		margin: 0 auto;
		position: relative;
		background: #e2c248;
		border-radius: 20rpx;
		margin-top: 150rpx;
		color: #fff;
		text-align: center;
		line-height: 120rpx;
		font-size: 30rpx;
	}
</style>