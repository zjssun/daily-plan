Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal:"",
    PlanList:{
        0:{
            date:'',
            dateIs:true,
            PlanItem:{
                0:{
                    inputIs:false,
                    BtnText:"+",
                    inputDis:false,
                    inputVal:"",
                    bgc:"#e0e0e0cc"
                },
            },
        },
    }
  },
 //点击添加按钮
  AddPlan(e){
      let IDX = e.currentTarget.dataset.idx
      let nextIDX = parseInt(IDX)+1
      let ListIDX = e.currentTarget.dataset.lidx
      let lastIDX = parseInt(IDX)-1
      let val = this.data.inputVal
      let temp = this.data.PlanList
      //注入active
      if(this.data.PlanList[ListIDX].PlanItem[IDX].inputIs==false){
        temp[ListIDX].PlanItem[IDX].inputIs = true
        temp[ListIDX].PlanItem[IDX].BtnText = "-"
        if(IDX>0){
            temp[ListIDX].PlanItem[IDX-1].inputVal = val
            temp[ListIDX].PlanItem[IDX-1].inputDis = true
            this.setData({
                inputVal:""
            })
        }
        //给对象添加属性
        if(nextIDX  == Object.getOwnPropertyNames(temp[ListIDX].PlanItem).length){
            Object.assign(temp[ListIDX].PlanItem,{[nextIDX]:{inputIs:false,BtnText:"+",inputDis:false,inputVal:"",inputDis:false,bgc:"#e0e0e0cc"}})
        }
        //判断是否染色
        if(parseInt(IDX)%2 != 0){
            temp[ListIDX].PlanItem[IDX].bgc = "#fcfcfc"
        }
        this.setData({
            PlanList:temp
          })
          wx.setStorageSync('key',this.data.PlanList)
      }else{//清除active
        temp[ListIDX].PlanItem[IDX].inputIs = false
        temp[ListIDX].PlanItem[IDX].BtnText = "+"
        temp[ListIDX].PlanItem[IDX].inputDis = false
        temp[ListIDX].PlanItem[IDX].inputVal = ""
        //更改对象序列
        for(let i = parseInt(IDX);i<Object.getOwnPropertyNames(temp[ListIDX].PlanItem).length;i++){
            temp[ListIDX].PlanItem[i]=temp[ListIDX].PlanItem[i+1]
        }
        //删除末尾对象
        delete temp[ListIDX].PlanItem[parseInt(Object.getOwnPropertyNames(temp[ListIDX].PlanItem).length)-1]
        this.setData({
            PlanList:temp
          })
        wx.setStorageSync('key',this.data.PlanList)
      }
      console.log(temp);
  },
  //input输入时
  InpIn(e){
      let val = e.detail.value
      this.setData({
        inputVal:val
      })
  },
  //点击键盘上完成按钮
  InpDone(e){
    let IDX = e.currentTarget.dataset.idx
    let temp = this.data.PlanList
    let ListIDX = e.currentTarget.dataset.lidx
    let val = e.detail.value
    temp[ListIDX].PlanItem[IDX].inputVal = val
    temp[ListIDX].PlanItem[IDX].inputDis = true
    this.setData({
        PlanList:temp
    })
    wx.setStorageSync('key',this.data.PlanList)
  },
  //选择时间
  DateChange(e){
    let temp = this.data.PlanList
    let IDX = e.currentTarget.dataset.idx
    temp[IDX].date = e.detail.value
    this.setData({
        PlanList:temp
    })
    wx.setStorageSync('key',this.data.PlanList)
  },
  //新建日期
  addDate(e){
    let temp = this.data.PlanList
    let ListIDX = e.currentTarget.dataset.lidx
    let nextIDX = parseInt(ListIDX)+1
    let date = new Date(Date.parse(new Date())+ 60*60*1000*8).toISOString().substring(0,10)
    temp[ListIDX].dateIs = false
    Object.assign(temp,{[nextIDX]:{date:date,dateIs:true,PlanItem:{0:{inputIs:false,BtnText:"+",inputDis:false,inputVal:"",inputDis:false,bgc:"#e0e0e0cc"}}}})
    this.setData({
        PlanList:temp
    })
    wx.setStorageSync('key',this.data.PlanList)
  },
  //清除日期
  clearDate(e){
    let temp = this.data.PlanList
    let ListIDX = e.currentTarget.dataset.lidx
    for(let i = parseInt(ListIDX);i<Object.getOwnPropertyNames(temp).length;i++){
        temp[i] = temp[i+1]
    }
    delete temp[parseInt(Object.getOwnPropertyNames(temp).length)-1]
    temp[parseInt(Object.getOwnPropertyNames(temp).length)-1].dateIs = true
    this.setData({
        PlanList:temp
    })
    wx.setStorageSync('key',this.data.PlanList)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date(Date.parse(new Date())+ 60*60*1000*8).toISOString().substring(0,10)
    let getStorage = wx.getStorageSync('key') || {0:{date:date,dateIs:true,PlanItem:{0:{dateIs:true,date:date,inputIs:false,BtnText:"+",inputDis:false,inputVal:"",inputDis:false,bgc:"#e0e0e0cc"}}}}
    this.setData({
        PlanList:getStorage
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let date = new Date(Date.parse(new Date())+ 60*60*1000*8).toISOString().substring(0,10)
    let getStorage = wx.getStorageSync('key') || {0:{date:date,dateIs:true,PlanItem:{0:{dateIs:true,date:date,inputIs:false,BtnText:"+",inputDis:false,inputVal:"",inputDis:false,bgc:"#e0e0e0cc"}}}}
    this.setData({
        PlanList:getStorage
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})