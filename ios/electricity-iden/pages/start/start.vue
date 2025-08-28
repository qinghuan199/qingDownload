<template>
	<view class="content">
		<!-- 		<view class="">
			<view class="">
			</view>
			<view class="" @click="onLanguage">
				<view class=" ">{{$t('locale.language')}}</view>
			</view>
		</view> -->
		<view class="" style="height: 250rpx;">

		</view>
		<view class="logo-box">
			<image src="/static/iden/logo.png" mode="widthFix" class="logo"></image>
		</view>


		<view class="" style="height: 300rpx;">

		</view>

		<view @click="loginTest" class="login-btn">
			{{$t('start')}}
		</view>
		<!-- 	<view class="login-bottom">
				{{$t('login.agree')}}
			</view> -->
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
			loginTest() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
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
		background-image: url('../../static/iden/bg.png');
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
		justify-content: center;


		.logo {
			width: 250rpx;
			height: 60rpx;
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
		position: absolute;
		background: #063a69;
		bottom: 100rpx;
		left: 50%;
		transform: translate(-50%,0);
		border-radius: 20rpx;
		margin-top: 150rpx;
		color: #fff;
		text-align: center;
		line-height: 120rpx;
		font-size: 30rpx;
		
	}
</style>