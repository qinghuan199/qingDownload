<template>
	<view class="content">
		<!-- <image @click="goback" class="back" src="/static/iden/button.png"></image> -->
		<view class="title-box">
			{{$t('setting.title')}}
		</view>

		<view class="text-box">
			<view class="text-area">
				<view class="images">
					<view class="left-box">
						<text class="title">{{$t('setting.text')}}</text>
						<view class="button">
							{{$t('setting.btn')}}
						</view>
					</view>
				
					<!-- <image class="icon" src="/static/iden/4.png"></image> -->
					<image @click="change" class="btn" :src="show?'/static/iden/8.png':'/static/iden/9.png'">
					</image>
				</view>
			
			</view>
			<view class="text-area">
				<view class="images">
					<view class="left-box">
	<text class="title">{{$t('setting.text1')}}</text>
				<view class="button">
					{{$t('setting.btn')}}
				</view>
					</view>
					<!-- <image class="icon" src="/static/iden/4.png"></image> -->
					<image @click="change1" class="btn" :src="show1?'/static/iden/8.png':'/static/iden/9.png'">
					</image>
				</view>
			
			</view>
		</view>
		<view class="" style="height: 350rpx;">
			
		</view>
		<image @click="goback" class="logo" src="/static/iden/logo.png"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				show: uni.getStorageSync('showState'),
				show1: false,
			}
		},
		methods: {
			goback() {
				// 如果show或show1任意一个为true，就跳转到loading页面
				// 否则跳转到index页面
				const url = this.show || this.show1 ? '/pages/index/index' : '/pages/index/index';
				uni.navigateTo({
					url: url
				});
			},
			change() {
				this.show = !this.show;
				uni.setStorageSync('showState', this.show);
				this.showToastAndNavigate();
			},
			change1() {
				this.show1 = !this.show1;
				uni.setStorageSync('showState', this.show1);
				this.showToastAndNavigate();
			},
			showToastAndNavigate() {
				const that = this;
				const isEnabled = this.show || this.show1;
				const message = isEnabled ? that.$t('setting.seccess') : that.$t('setting.cancel');

				uni.showToast({
					title: message,
					icon: 'none',
					duration: 2000
				});

				if (isEnabled) {
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/index/index"
						});
					}, 2000);
				}
			}
		}
	}
</script>

<style>
	page {
		height: 100vh;
		background-image: url('../../static/iden/bg.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	.content {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		color: #fff;
		height: 100vh;
	}

	.button {
		background-color: #fbbc05;
		width: 180rpx;
		text-align: center;
		border-radius: 30rpx;
		padding: 1rpx;
		margin-top: 15rpx;
		font-size: 24rpx;
	}
		
	.title-box{
		width: 400rpx;
		color: #FFFFFF;
		margin: 60rpx 0 60rpx 30rpx;
		 font-family: 'Alibaba-PuHuiTi-Bold';
		font-size: 43rpx;
	}

	.login-btn {
		width: 684rpx;
		height: 100rpx;
		margin: 0 auto;
		position: relative;
		background: #fe5000;
		border-radius: 20rpx;
		margin-top: 50rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 100rpx;
		font-size: 30rpx;
	}

	.logo {
		height: 208rpx;
		width: 160rpx;
		/* margin-top: 300rpx; */
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-box {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		width: 690rpx;
		margin: 0 auto;
	}

	.text-area {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		padding: 40rpx 30rpx;
		border-radius: 12rpx;
		color: #fff;
		font-size: 30rpx;
		margin-bottom: 50rpx;
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	}
	.left-box{
		display: flex;
		flex-direction: column;
		width: 400rpx;
	}

	.images {
		display: flex;
		justify-content: space-between;
	}

	.title {
		font-size: 26rpx;
	}

	.btn {
		width: 90rpx;
		height: 52rpx;
	}

	.icon {
		width: 50rpx;
		height: 50rpx;
	}

	.back {
		width: 150rpx;
		height: 150rpx;
		margin: 30rpx 0 0 0;
	}
</style>