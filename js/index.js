(function () {
    let setFont = function () {
        // 因为以防变量污染,所以每个一
        // 获取页面
        let html = document.documentElement

        // 获取宽度
        let width = html.clientWidth
        // console.log(width)
        // 判断 如果小于1024就等于1024
        // 如果大于1920宽就等于1920
        if (width < 1024) width = 1024
        if (width > 1920) width = 1920
        // 计算大小 html的字体大小
        let fontSize = width / 80 + 'px'
        // console.log(fontSize)
        // 设置给html
        html.style.fontSize = fontSize
    }
    setFont()
    // 吃寸发生改变的时候也要动态的计算适配
    window.addEventListener('resize', function () {
        setFont()
    })
})();


(function () {
    $('.monitor').on('click', '.tabs a', function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.monitor .content').eq(this.dataset.index).show().siblings('.content').hide()
    })
    // 轮播效果
    $('.monitor .content .marquee').each(function () {
        // 先克隆10个盒子
        let cloneList = $(this).children().clone()
        // 追加到元素内
        $(this).append(cloneList)
    })
})();

// 饼线图
(function () {
    let myChat = echarts.init(document.querySelector('.pie'))
    let option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
            name: '分布统计',
            type: 'pie',
            radius: [10, 100],

            roseType: 'area',
            data: [{
                    value: 16,
                    name: '云南'
                },
                {
                    value: 18,
                    name: '北京'
                },
                {
                    value: 20,
                    name: '山东'
                },
                {
                    value: 22,
                    name: '河北'
                },
                {
                    value: 24,
                    name: '江苏'
                },
                {
                    value: 26,
                    name: '浙江'
                },
                {
                    value: 28,
                    name: '四川'
                },
                {
                    value: 30,
                    name: '湖北'
                }
            ]
        }]
    };

    myChat.setOption(option);
})();
(function () {
    let myChat = echarts.init(document.querySelector('.bar'))
    let option = {
        // 工具提示
        tooltip: {
            // 触发类型  经过轴触发axis  经过轴触发item
            trigger: 'axis',
            // 轴触发提示才有效
            axisPointer: {
                // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果       
                type: 'shadow'
            }
        },
        // 图表边界控制
        grid: {
            // 距离 上右下左 的距离
            left: '3%',
            right: '4%',
            bottom: '3%',
            // 大小是否包含文本【类似于boxsizing】
            containLabel: true
        },
        // 控制x轴
        xAxis: [{
            // 使用类目，必须有data属性
            type: 'category',
            // 使用 data 中的数据设为刻度文字
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            // 刻度设置
            axisTick: {
                // true意思：图形在刻度中间
                // false意思：图形在刻度之间
                alignWithLabel: true
            }
        }],
        // 控制y轴
        yAxis: [{
            // 使用数据的值设为刻度文字
            type: 'value',
            // 刻度设置
            axisTick: {
                show: false
            },
            // 文字
            axisLabel: {
                color: '#4c9bfd'
            }
        }],
        // 控制x轴
        xAxis: [{
            // 使用类目，必须有data属性
            type: 'category',
            // 使用 data 中的数据设为刻度文字
            data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
            // 刻度设置
            axisTick: {
                // true意思：图形在刻度中间
                // false意思：图形在刻度之间
                alignWithLabel: true,
                alignWithLabel: false,
                show: false
            },
            // 文字
            axisLabel: {
                color: '#4c9bfd'
            }
        }],
        // 颜色
        itemStyle: {
            // 提供的工具函数生成渐变颜色
            color: new echarts.graphic.LinearGradient(
                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                0, 0, 0, 1,
                [{
                        offset: 0,
                        color: '#00fffb'
                    }, // 0 起始颜色
                    {
                        offset: 1,
                        color: '#0061ce'
                    } // 1 结束颜色
                ]
            )
        },
        series: [{
            // 图表数据名称
            name: '用户统计',
            // 图表类型
            type: 'bar',
            // 柱子宽度
            barWidth: '60%',
            // 数据
            data: [2100, 1900, 1700, 1560, 1400, 1200, 1200, 1200, 900, 750, 600, 480, 240]
        }]
    };
    myChat.setOption(option)
})();

(function () {
    // 订单功能
    (function () {
        // 1. 准备数据
        var data = {
            day365: {
                orders: '20,301,987',
                amount: '99834'
            },
            day90: {
                orders: '301,987',
                amount: '9834'
            },
            day30: {
                orders: '1,987',
                amount: '3834'
            },
            day1: {
                orders: '987',
                amount: '834'
            }
        }
        // 获取显示 订单数量 容器
        var $h4Orders = $('.order h4:eq(0)')
        // 获取显示 金额数量 容器
        var $h4Amount = $('.order h4:eq(1)')
        $('.order').on('click', '.filter a', function () {
            // 2. 点击切换激活样式
            $(this).addClass('active').siblings().removeClass('active')
            // 3. 点击切换数据
            var currdata = data[this.dataset.key]
            $h4Orders.html(currdata.orders)
            $h4Amount.html(currdata.amount)
        })
        // 4. 开启定时器切换数据
        var index = 0
        var $allTab = $('.order .filter a')
        setInterval(function () {
            index++
            if (index >= 4) index = 0
            $allTab.eq(index).click()
        }, 5000)
    })();
})();
(function () {
    var option = {
        // 工具提示
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                show: false // 去除刻度线
            },
            axisLabel: {
                color: '#4c9bfd' // 文本颜色
            },
            axisLine: {
                show: false // 去除轴线
            },
            boundaryGap: false // 去除轴内间距
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false // 去除刻度
            },
            axisLabel: {
                color: '#4c9bfd' // 文字颜色
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a' // 分割线颜色
                }
            }
        },
        // 图例组件
        legend: {
            textStyle: {
                color: '#4c9bfd' // 图例文字颜色
                //  fontSize
            },
            right: '10%' // 距离右边10%
        },
        // 设置网格样式
        grid: {
            show: true, // 显示边框
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            borderColor: '#012f4a', // 边框颜色
            containLabel: true // 包含刻度文字在内
        },
        series: [{
            name: '预期销售额',
            data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#00f2f1' // 线颜色
            }
        }, {
            name: '实际销售额',
            data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#ed3f35' // 线颜色
            }
        }]
    };
    let myChart = echarts.init($('.line')[0])
    myChart.setOption(option)

    var data = {
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    }
    // 切换
    $('.sales').on('click', '.caption a', function () {
        // 样式
        $(this).addClass('active').siblings().removeClass('active')
        // currData 当前对应的数据  
        // this.dataset.type 标签上的data-type属性值，对应data中的属性                  
        var currData = data[this.dataset.type]
        // 修改图表1的数据
        option.series[0].data = currData[0]
        // 修改图表2的数据                  
        option.series[1].data = currData[1]
        // 重新设置数据  让图标重新渲染                  
        myChart.setOption(option)
    })

    // 反复定时器
    let index = 0
    let timer = window.setInterval(function () {
        // 改变索引值
        index++
        if (index > 3) index = 0
        // 找到对应的a
        $('.sales .caption a').eq(index).trigger('click')
    }, 1000)

    $('.line').mouseenter(function () {
        window.clearInterval(timer)
    }).mouseleave(function () {
        timer = window.setInterval(function () {
            // 改变索引值
            index++
            if (index > 3) index = 0
            // 找到对应的a
            $('.sales .caption a').eq(index).trigger('click')
        }, 1000)
    })
})();

// 销量进度-饼状图
(function () {
    var option = {
        series: [{
            type: 'pie',
            radius: ['130%', '150%'],
            center: ['48%', '80%'],
            label: {
                show: false,
            },
            startAngle: 180,
            data: [{
                    value: 100,
                },
                {
                    value: 100,
                    itemStyle: {
                        color: 'transparent'
                    }
                },
                {
                    value: 200,
                    itemStyle: {
                        color: 'transparent'
                    }
                }
            ]
        }]
    }
    var myChart = echarts.init($('.gauge')[0])
    myChart.setOption(option)
})()