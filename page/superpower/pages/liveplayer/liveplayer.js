Page({
  data: {

    playing: false,
    videoContext: {},
    fullScreen: false,
    playUrl: 'http://5815.liveplay.myqcloud.com/live/5815_89aad37e06ff11e892905cb9018cf0d4_550.flv',
    muted: false,
    snapshotUrl: '',
  },
  onShareAppMessage() {
    return {
      title: 'liveplayer',
      path: 'page/superpower/pages/liveplayer/liveplayer',
    };
  },
  onReady() {
    this.createContext();
    console.log(this.data.videoContext);
    qq.setKeepScreenOn({
      keepScreenOn: true,
    });
  },
  onPlayClick() {
    this.setData({
      playing: true,
    });

    if (this.data.playing) {
      this.data.videoContext.play();
      console.log('play');
      qq.showLoading({
        title: '',
      });
    }
  },
  togglePause() {
    if (this.data.playing) {
      this.data.videoContext.pause();
      console.log('pause');
    } else {
      this.data.videoContext.resume();
      console.log('resume');
    }
    this.setData({
      playing: !this.data.playing,
    });
  },

  onMuteClick() {
    this.setData({
      muted: !this.data.muted,
    });
  },

  toggleFullScreen() {
    if (!this.data.fullScreen) {
      this.data.videoContext.requestFullScreen({
        direction: 0,
      });
    } else {
      this.data.videoContext.exitFullScreen();
    }
  },

  onPlayEvent(e) {
    console.log(e.detail.code);
    if (e.detail.code === -2301) {
      this.stop();
      qq.showToast({
        title: '网络断连，且多次重连无效',
      });
    }
    if (e.detail.code === 2004) {
      qq.hideLoading();
    }
  },

  onFullScreenChange(e) {
    this.setData({
      fullScreen: e.detail.fullScreen,
    });
    console.log(e);
  },

  onStopClick() {
    this.setData({
      playing: false,
      muted: false,
      fullScreen: false,
    });
    this.data.videoContext.stop();
    qq.hideLoading();
  },
  onSnapshotClick() {
    this.data.videoContext.snapshot({
      success: (res) => {
        console.log('snapshot success', res);
        this.setData({
          snapshotUrl: res.tempImagePath,
        });
      },
    });
  },

  createContext() {
    this.setData({
      videoContext: qq.createLivePlayerContext('video-livePlayer'),
    });
  },
});
