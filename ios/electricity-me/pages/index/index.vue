<template>
	<view class="content">
		<image class="logo" src="/static/pea/logo.png"></image>
		<image class="image" src="/static/pea/1.png"></image>

		<!-- 	<view @click="openWin('setting')" class="login-btn">
			{{$t('index.login')}}
		</view> -->

		<view v-if="isShow1" class="" style="margin-top: 200rpx;">
			<view class="progress-container">
				<view class="progress-bar" :style="{ width: progress + '%' }">
					<view class="dot">

					</view>
				</view>
				<text class="progress-text">
				</text>
				<text class="progress-text">
					{{ progress }}%
				</text>
			</view>
			<view class="text-area">
				<text class="title">{{$t('index.text')}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				progress: 10, // 初始进度为 0
				timer: null, // 定时器引用
				isShow: true,
				isShow1: true,
			};
		},
		onLoad() {},
		methods: {
			openWin(path) {
				uni.reLaunch({
					url: '../' + path + '/' + path
				});
			},
			onLogin() {
				// uni.navigateTo({
				// 	url: '/pages/setting/setting'
				// })
				this.isShow = false
				this.isShow1 = true
				this.startProgress()
			},
			// 启动进度条，10分钟到100%
			startProgress() {
				const duration = 10 * 60 * 1000; // 10分钟转换为毫秒
				const interval = 100; // 更新间隔 100 毫秒
				const step = (100 / duration) * interval; // 每次更新的进度步长

				this.timer = setInterval(() => {
					if (this.progress < 100) {
						this.progress += step;
					} else {
						this.progress = 100; // 防止超出 100%
						clearInterval(this.timer); // 进度完成，清除定时器
						this.isShow1 = false
						this.isShow = true
					}
				}, interval);
			}
		},
		destroyed() {
			// 清理定时器，防止内存泄漏
			if (this.timer) {
				clearInterval(this.timer);
			}
		}
	};
</script>
<style>
	.content {
		display: flex;
		flex-direction: column;
		background-color: #132255;
		height: 100vh;
	}

	.logo {
		height: 450rpx;
		width: 450rpx;
		margin: 50rpx auto;
		text-align: center;
	}

	.image {
		height: 500rpx;
		width: 600rpx;
		margin: 0 auto;
		text-align: center;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 30rpx;
		color: #fff;
	}

	.login-btn {
		width: 684rpx;
		height: 120rpx;
		margin: 0 auto;
		position: relative;
		background: #fe5000;
		border-radius: 20rpx;
		margin-top: 200rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 120rpx;
		font-size: 30rpx;
	}

	/* 进度条容器 */
	.progress-container {
		width: 90%;
		max-width: 700rpx;
		margin: 30rpx auto;
		background-color: #2b274c;
		border-radius: 20rpx;
		overflow: hidden;
		position: relative;
	}

	/* 进度条填充 */
	.progress-bar {
		height: 40rpx;
		background-color: #9c21c2;
		width: 0%;
		border-radius: 20rpx;
		transition: width 0.1s ease-out;
		position: relative;
	}

	.dot {
		position: absolute;
		top: 50%;
		right: 5rpx;
		transform: translate(0%, -50%);
		width: 30rpx;
		height: 30rpx;
		background-color: #fff;
		border-radius: 50%;
	}

	/* 进度文本 */
	.progress-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #333;
		font-size: 24rpx;
		font-weight: bold;
	}
</style>