// 入口函数
$(function () {

    // 0. 准备一个对象, 记录所有可以影响页面主体内容的数据
    const list_info = {
      cat_one: 'all',
      cat_two: 'all',
      cat_three: 'all',
      sort_method: '综合',
      sort_type: 'ASC',
      current: 1,
      pagesize: 15
    }
  
    // 1. 请求一级分类列表
    getCateOne()
    async function getCateOne() {
      // 1-2. 发送请求获取
      const cat_one_list = await $.get('./php/getCateOne.php', null, null, 'json')
      console.log(cat_one_list)
  
      // 1-3. 进行列表渲染
      let str = `<a data-type="all" class="first">全部</a>`
  
      cat_one_list.list.forEach(item => {
        str += `
          <a data-type="${ item.cat_one_id }">${ item.cat_one_id }</a>
        `
      })
  
      $('.goods_head_1 > .goods_head_right').html(str)
    }
    
    //请求2级分类列表
    async function getCateTwo() {
        // 1. 请求二级分类列表数据
        const cate_two_list = await $.get('./php/getCateTwo.php', { cat_one: list_info.cat_one }, null, 'json')
    
        // 2. 根据二级列表数据渲染页面
        let str = '<a data-type="all" class="active">全部</a>'
        cate_two_list.list.forEach(item => {
          str += `<a data-type="${ item.cat_two_id }">${ item.cat_two_id }</a>`
        })
        $('.goods_head_2 > .goods_head_right').html(str)
    
      }
    


      // 1-3. 请求三级分类列表
    async function getCateThree() {
        // 1. 请求二级分类列表数据
        const cate_three_list = await $.get('./php/getCateThree.php', { cat_one: list_info.cat_one, cat_two: list_info.cat_two }, null, 'json')

        // 2. 根据二级列表数据渲染页面
        let str = '<a data-type="all" class="active">全部</a>'
        cate_three_list.list.forEach(item => {
        str += `<a data-type="${ item.cat_three_id }">${ item.cat_three_id }</a>`
        })
        $('.goods_head_3 > .goods_head_right').html(str)

    }





    // 2. 请求总页数, 回来渲染分页器
    getTotalPage()
    async function getTotalPage() {
      // 2-1. 请求分页数据
      const totalInfo = await $.get('./php/getTotalPage.php', list_info, null, 'json')
  
      // 2-2. 渲染分页内容
      // jquery-pagination 插件
      $('.pagination').pagination({
        pageCount: totalInfo.total,
        current:1,
        prevContent:'上一页',
        nextContent:'下一页',
        coping:true,
        homePage:'首页',
        endPage:'末页',
        jump:true,
        jumpIptCls:'inp',
        jumpBtnCls:'btn',
        jumpBtn:'跳转',
        callback(index){
          //会在每一页切换的时候进行执行
          //index表示当前页的页数
        //   console.log(index.getCurrent())
        list_info.current = index.getCurrent()
        //重新请求商品列表
          getGoodsList()
        }
      })
    }
  

    // 3. 请求商品列表数据
  getGoodsList()
  async function getGoodsList() {
    // 3-1. 请求商品列表
    const goodsList = await $.get('./php/getGoodsList.php', list_info, null, 'json')

    // 给全局变量 list 进行赋值
    list = goodsList.list

    // 3-2. 渲染页面
    let str = ''
    goodsList.list.forEach(item => {
        str += `
        <div class="goods_b_1">
            <div class="good_b_img">
                <img src="${ item.goods_big_logo }" alt="">
                <img src="./images/秒杀.png" alt="">
            </div>
            <p class="goods_price">
                <em class="month_price">月付</em>
                <span class="fenqi_price">￥${ item.goods_price }</span>
                <span class="line">|</span>
                <span class="s_price">￥${(item.goods_price * 2.3).toFixed(2)}</span>
            </p>
            <a class="discrip" href="#" data-id="${ item.goods_id }">${ item.goods_name }</a>
            <div class="sale_num">
                <span>销量196</span>
            </div>
            <a href="#" class="shop">东方星官方旗舰店</a>
            <div class="end_over">
                秒杀
            </div>
            <div class="cart11">
                <a href="./cart.html">去结算</a>
                <a href="#" data-id="${ item.goods_id }">加入购物车</a>
            </div>
        </div>
        `
    })
    $('.goods_body').html(str)


    //一级分类的点击事件
      // 4. 一级分类的点击事件
  // 4-1. 事件委托的形式进行事件绑定
  $('.goods_head_1').on('click', '.goods_head_right>a', function () {
    // 4-2. 操作类名
    $(this).addClass('.first').siblings().removeClass('first')

    // 4-3. 拿到你点击的是哪一个
    const type = $(this).data('type')

    // 4-6. 只要一级分类进行切换, 修改二级分类为 all
    // 4-6. 只要一级分类进行切换, 修改三级分类为 all
    list_info.cat_two = 'all'
    list_info.cat_three = 'all'
    // 让当前页回到第一页
    list_info.current = 1

    // 4-4. 修改 list_info
    list_info.cat_one = type
    // 从新渲染分类信息和列表数据
    getTotalPage()
    getGoodsList()
    $('.goods_head_3 .goods_head_right').html('<a data-type="all" class="first">全部</a>')

    // 4-5. 判断 type 是否为 all 信息
    if (type === 'all') {
      // 让二级列表回到 全部 状态
      // 改变结构
      $('.goods_head_2 .goods_head_right').html('<a data-type="all" class="first">全部</a>')
    } else {
      // 根据一级分类 请求 二级分类列表 渲染
      getCateTwo()
    }
  })

  
//详情页
$('.goods_body').on('click', '.discrip', function () {
  console.log(this)
  // 9-2. 拿到 标签身上记录的商品 id
  const id = $(this).data('id')
  // 9-3. 把这个 id 存储到 cookie 中
  setCookie('goods_id', id)
  // 9-4. 进行页面跳转
  window.location.href = './detail.html'
})




















  







}})
  