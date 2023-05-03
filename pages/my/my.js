// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        template:{
            0:{
                IsFar:true,
                IsChild:false,
                planList:{}
            },
        }
    },
    onSave(e){
        let IDX = e.currentTarget.dataset.idx
        let nextIDX = parseInt(IDX)+1
        let Plantemp = wx.getStorageSync('key');
        let temp = this.data.template
        temp[IDX].planList = Plantemp
        if(temp[0].planList[0].inputVal=="")
        {
            wx.showToast({
              title: '目前没有计划哦~',
              icon:'error'
            })
        }else{
            temp[IDX].IsFar = false
            temp[IDX].IsChild = true
            console.log()
            Object.assign(temp,{[nextIDX]:{IsFar:true,IsChild:false,planList:{}}})
            wx.setStorageSync('save', temp)
            this.setData({
                template:temp
            })
        }
    },
    clearBtn(e){
        let IDX = e.currentTarget.dataset.idx
        let temp = this.data.template
        for(let i = parseInt(IDX);i<Object.getOwnPropertyNames(temp).length;i++){
            temp[i] = temp[i+1]
        }
        delete temp[parseInt(Object.getOwnPropertyNames(temp).length)-1]
        wx.setStorageSync('save', temp)
        this.setData({
            template:temp
        })
    },
    applyBtn(e){
        let IDX = e.currentTarget.dataset.idx
        let temp = this.data.template
        wx.setStorageSync('key', temp[IDX].planList)
        wx.showToast({
            title: '应用成功',
            icon:'success'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let temp = wx.getStorageSync('save') || {0:{IsFar:true,IsChild:false,planList:{}}}
        console.log(temp);
        this.setData({
            template:temp
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})