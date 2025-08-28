<template>
	<view class="content">
		<!-- 		<view class="">
			<view class="">
			</view>
			<view class="" @click="onLanguage">
				<view class=" ">{{$t('locale.language')}}</view>
			</view>
		</view> -->
		<view class="" style="height: 80rpx;">

		</view>
		<view class="logo-box">
			<view class="title">
				{{$t('login.title')}}
				{{$t('login.title1')}} <br />
				{{$t('login.title2')}}
			</view>
			<image src="/static/iden/logo.png" mode="widthFix" class="logo"></image>

		</view>


		<view class="login-form">
			<view class="input-title">
				<image src="/static/iden/6.png" mode="widthFix" class="star"></image>
				{{$t('login.card')}}
			</view>
			<view class="input_border">
				<input class="input" type="text" v-model="card" :placeholder="$t('login.card_desc')"
					placeholder-style="color:#86909C" />
				<image v-if="card" @click="card = ''" src="/static/iden/5.png" mode="aspectFit" class="icon"></image>
			</view>
			<view class="input-title">
				<image src="/static/iden/15.png" mode="widthFix" class="star"></image>
				{{$t('login.email')}}
			</view>
			<view class="input_border">
				<input class="input" type="text" v-model="email" :placeholder="$t('login.email_desc')"
					placeholder-style="color:#86909C" />
				<image v-if="email" @click="email = ''" src="/static/iden/5.png" mode="aspectFit" class="icon"></image>
			</view>
			<view class="input-title">
				<image src="/static/iden/3.png" mode="widthFix" class="star"></image>
				{{$t('login.confirm_email')}}
			</view>
			<view class="input_border">
				<input class="input" type="text" v-model="confirm_email" :placeholder="$t('login.confirm_email_desc')"
					placeholder-style="color:#86909C" />
				<image v-if="confirm_email" @click="confirm_email = ''" src="/static/iden/5.png" mode="aspectFit"
					class="icon"></image>
			</view>
			<view class="input-title">
				<image src="/static/iden/7.png" mode="widthFix" class="star"></image>
				{{$t('login.account')}}
			</view>
			<view class="input_border">
				<input class="input" type="text" v-model="userAccount" :placeholder="$t('login.account_desc')"
					placeholder-style="color:#86909C" />
				<image v-if="userAccount" @click="userAccount = ''" src="/static/iden/5.png" mode="aspectFit"
					class="icon"></image>
			</view>
			<view class="input-title">
				<image src="/static/iden/2.png" mode="widthFix" class="star"></image>
				{{$t('login.password')}}
			</view>
			<view class="input_border">
				<input class="input" :type="showPassword ? 'text' : 'password'" v-model="pwd"
					:placeholder="$t('login.password_desc')" placeholder-style="color:#86909C" />
				<image @click="showPassword = !showPassword"
					:src="showPassword ? '/static/iden/14.png' : '/static/iden/13.png'" mode="aspectFit" class="icon"
					style="cursor: pointer" />
			</view>

			<view @click="onLogin" class="login-btn">
				{{$t('login')}}
			</view>
			<!-- 	<view class="login-bottom">
				{{$t('login.agree')}}
			</view> -->
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
				email: "",
				card: "",
				confirm_email: "",
				showPassword: false,
				pwd: "",
				loginResponse: null, // 用于存储接口返回的响应
			};
		},
		methods: {
			loginTest() {
				uni.navigateTo({
					url: '/pages/welcome/welcome'
				})
			},
			validateFields() {
				if (!this.card || !this.email || !this.confirm_email || !this.userAccount || !this.pwd) {
					uni.showToast({
						title: this.$t('login.fill_all_fields'),
						icon: 'none'
					});
					return false;
				}
				// if (this.email !== this.confirm_email) {
				// 	uni.showToast({
				// 		title: this.$t('login.email_mismatch'),
				// 		icon: 'none'
				// 	});
				// 	return false;
				// }
				return true;
			},
			// 登录方法
			onLogin() {
				if (!this.validateFields()) return;
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
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	.content {}



	.star {
		width: 40rpx;
		height: 40rpx;
		margin: 10rpx;
	}

	.title {
		width: 500rpx;
		font-size: 40rpx;
		word-wrap: break-word;
		white-space: normal;
		text-transform: uppercase;
		font-family: 'Alibaba-PuHuiTi-Bold';
	}

	.logo-box {
		display: flex;
		margin: 30rpx auto;
		position: relative;
		width: 690rpx;



		.logo {
			width: 80rpx;
			height: 102rpx;
			position: absolute;
			top: 0;
			right: 0;
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
		// position: absolute;
		width: 100%;
		// bottom: 0;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		// background: rgba(255, 255, 255, 0.25);
		/* 半透明白色背景 */
		// backdrop-filter: blur(10px);
		/* 背景模糊 */
		// -webkit-backdrop-filter: blur(10px);
		/* 兼容 Safari */
		// box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
		/* 柔和阴影提升层次感 */
	}

	.icon {
		transition: transform 0.2s ease;
	}

	.icon:active {
		transform: scale(0.9);
	}

	.input-title {
		font-size: 26rpx;
		margin-top: 40rpx;
		display: flex;
		align-items: center;
	}

	.login-text {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-size: 26rpx;
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
		width: 690rpx;
		height: 80rpx;
		margin: 0 auto;
		background-color: #fff;
		border-bottom: 2rpx solid #cfcfcf;
		padding: 10rpx 0;

	}

	.input {
		background-color: #fff;
		border-radius: 15rpx;
		color: #000;
		width: 100%;
		font-size: 26rpx;
	}

	.icon {
		width: 30rpx;
		height: 30rpx;
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
		background: #063a69;
		border-radius: 20rpx;
		margin-top: 150rpx;
		color: #fff;
		text-align: center;
		line-height: 120rpx;
		font-size: 30rpx;
	}
</style>