<template>
	<view class="content">
		<view class="" style="height: 250rpx;">

		</view>
		<view class="logo-box">
			<image src="/static/iden/logo.png" mode="widthFix" class="logo"></image>
		</view>

		<view class="" style="height: 30vh;">

		</view>

		<view class="logo-box1">
			<image src="/static/iden/12.png" mode="widthFix" class="logos"></image>
			<view class=" ">{{$t('welcome.desc')}}</view>
		</view>
		<view @click="loginTest" class="login-btn">
			{{$t('welcome')}}
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
					url: '/pages/setting/setting'
				})
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
			width: 225rpx;
			height: 54rpx;
		}


	

	}

	.logo-box1 {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		color: #fff;
		text-align: center;
		text-transform: uppercase;
		width: 600rpx;
		margin: 20rpx auto;
		font-size: 26rpx;

		.logos {
			width: 120rpx;
			height: 120rpx;
			margin-bottom: 20rpx;
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
		// position: absolute;
		background: #063a69;
		// bottom: 100rpx;
		// left: 50%;
		// transform: translate(-50%, 0);
		border-radius: 20rpx;
		margin-top: 80rpx;
		color: #fff;
		text-align: center;
		line-height: 120rpx;
		font-size: 30rpx;

	}
</style>