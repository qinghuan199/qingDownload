<template>
	<view class="content">
		<image @click="goback" class="back" src="/static/new/button.png"></image>
		<view class="text-box">
			<view class="text-area">
				<view class="images">
					<image class="icon" src="/static/new/1.png"></image>
					<image @click="change" class="btn" :src="show?'/static/new/3.png':'/static/new/2.png'">
					</image>
				</view>
				<text class="title">{{$t('setting.text')}}</text>
			</view>
			<view class="text-area">
				<view class="images">
					<image class="icon" src="/static/new/4.png"></image>
					<image @click="change1" class="btn" :src="show1?'/static/new/3.png':'/static/new/2.png'">
					</image>
				</view>
				<text class="title">{{$t('setting.text1')}}</text>
			</view>
		</view>
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
				const message = isEnabled ? that.$t('setting.login') : that.$t('setting.cancel');
				
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
		color: #000;
	}

	.content {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		background-color: #f7f8fa;
		color: #000;
		height: 100vh;
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
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-box {
		display: flex;
		justify-content: space-between;
	}

	.text-area {
		display: flex;
		flex-direction: column;
		width: 330rpx;
		background-color: #FFFFFF;
		margin: 0 auto 30rpx;
		padding: 20rpx;
		border-radius: 30rpx;
		color: #292E39;
		font-size: 30rpx;
	}

	.images {
		display: flex;
		justify-content: space-between;
		margin-bottom: 50rpx;
	}

	.title {
		font-size: 26rpx;
	}

	.btn {
		width: 100rpx;
		height: 50rpx;
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