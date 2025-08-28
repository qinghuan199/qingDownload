<template>
	<view class="content">
		<view class="" style="height: 200rpx;">
			
		</view>
		<!-- <image class="logo" src="/static/new/logo.png"></image> -->
		<view class="login-title">
			{{$t('index.title')}}
		</view>

		<view class="big-box">
						<image class="image" src="/static/iden/logo.png"></image>
						<image class="gif" src="/static/iden/start.gif"></image>
		
		</view>
		<text class="box-content">{{$t('index.text')}}</text>
		<!-- 		<view @click="openWin('setting')" class="login-btn">
			{{$t('index.login')}}
		</view> -->

		<!-- 	<view v-if="isShow1" class="" style="margin-top: 200rpx;">
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
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				// progress: 10, // 直线初始进度为 0
				timer: null, // 定时器引用
				isShow: true,
				isShow1: true,
				progress: 60, // 初始进度为 60%
				target: 100, // 目标进度为 100%
				duration: 24 * 60 * 60 * 10000 * 3, // 1天的毫秒数
				startTime: Date.now(), // 记录开始时间
				interval: null, // 定时器
			};
		},
		onLoad() {},
		mounted() {
			this.startProgress1();
		},
		beforeDestroy() {
			// 清理定时器
			if (this.interval) {
				clearInterval(this.interval);
			}
		},
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
			},
			//环形进度条
			startProgress1() {
				const totalTime = this.duration;
				const totalSteps = this.target - this.progress;
				const stepInterval = totalTime / totalSteps; // 计算每一步需要的时间间隔

				// 设置定时器，每步更新进度
				this.interval = setInterval(() => {
					const elapsedTime = Date.now() - this.startTime;
					let newProgress = this.progress + (elapsedTime / totalTime) * totalSteps;

					// 保证 newProgress 是数字，并使用 toFixed(4) 保证小数点后四位
					newProgress = parseFloat(newProgress.toFixed(4));

					if (newProgress >= this.target) {
						this.progress = this.target.toFixed(4); // 设置精度为四位小数
						clearInterval(this.interval); // 结束定时器
					} else {
						this.progress = newProgress; // 设置精度为四位小数
					}
				}, 1000); // 每秒更新一次
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
		height: 100vh;

	}

	.login-title {
		text-align: center;
		color: #fff;
		font-weight: bold;
	}

	.logo {
		height: 120rpx;
		width: 250rpx;
		margin: 120rpx auto 50rpx;
		text-align: center;
	}

	.big-box {
		width: 600rpx;
		height: 600rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		margin: 50rpx auto;
		position: relative;
	}

	.box-text {
		color: #fff;
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.box-content {
		color: #fff;
		text-align: center;
		font-size: 26rpx;
		padding: 0 100rpx;
		margin-top: 100rpx;

	}

	.image {
		height: 310rpx;
		width: 240rpx;
		margin: 0 auto;
		text-align: center;
	}
	.gif{
		height: 150rpx;
		width: 400rpx;
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