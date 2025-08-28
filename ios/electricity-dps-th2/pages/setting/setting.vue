<template>
	<view class="content">
		<image @click="goback" class="back" src="/static/pea/back.png"></image>
		<view class="text-area">
			<text class="title">{{$t('setting.text')}}</text>
			<image @click="change" class="btn" :src="show==true?'/static/pea/btn2.png':'/static/pea/btn1.png'"></image>
		</view>
		<view @click="onLogin" class="login-btn">
			{{$t('index.login')}}
		</view>
		<!-- 	<view class="text-area">
			<text class="title">{{$t('setting.text1')}}</text>
			<image @click="change1" class="btn" :src="show1==true?'/static/mea/btn1.png':'/static/mea/btn2.png'"></image>
		</view> -->
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
		onLoad() {

		},
		methods: {
			onLogin() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
				// this.isShow = false
				// this.isShow1 = true
				// this.startProgress()
			},
			goback() {
				if (this.show == true && this.show1 == true) {
					uni.navigateTo({
						url: '/pages/loading/loading'
					})
				} else {
					uni.navigateTo({
						url: '/pages/index/index'
					})
				}
			},
			change() {
				var that = this;
				this.show = !this.show
				uni.showToast({
					title: that.$t('setting.login'),
					icon: 'none',
					duration: 2000
				});
				if (this.show == false) {
					uni.showToast({
						title: that.$t('setting.cancel'),
						icon: 'none',
						duration: 2000
					});
					uni.setStorageSync('showState', this.show);
				} else {
					uni.setStorageSync('showState', this.show);
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/index/index" // 登录成功后跳转到首页
						});
					}, 2000);
				}


			},
			change1() {
				this.show1 = !this.show1
				if (this.show1 == true) {
					uni.navigateTo({
						url: '/pages/loading/loading'
					})
				}
			}

		}
	}
</script>

<style>
	page{
		color: #000;
	}
		
	.content {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		background-color: #fff;
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

	.text-area {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690rpx;
		margin: 0 auto 30rpx;
		color: #000;
		font-size: 30rpx;
	}

	.title {}

	.btn {
		width: 100rpx;
		height: 60rpx;
	}

	.back {
		width: 80rpx;
		height: 80rpx;
		margin: 40rpx 50rpx 80rpx 40rpx;
	}
</style>