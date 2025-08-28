<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
		// @import "/common.scss";
	@font-face {
	  font-family: 'Alibaba-PuHuiTi-Bold'; // 自定义字体名称
	  src: url('@/static/font/Alibaba-PuHuiTi-Bold.otf');
	  font-weight: normal;
	  font-style: normal;
	}

	view {
		box-sizing: border-box;
		 // font-family: 'Alibaba-PuHuiTi-Bold';
	}
	
</style>
