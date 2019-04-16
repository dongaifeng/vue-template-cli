<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card>
                    <div slot="header">
                        <span>本周新用户</span>
                    </div>
                    <div>
                        <div id="userChart" style="font-size: 30px">324</div>
                    </div>
                    <div>
                        <span>日新增 32</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">
                        <span>本周UV</span>
                    </div>
                    <div>
                        <div id="uvChart" style="font-size: 30px">5325</div>
                    </div>
                    <div>
                        <span>日新增 180</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">
                        <span>本周PV</span>
                    </div>
                    <div>
                        <div id="pvChart" style="font-size: 30px">96546</div>
                    </div>
                    <div>
                        <span>转化率 78%</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">
                        <span>本周订单</span>
                    </div>
                    <div>
                        <div id="orderChart" style="font-size: 30px">¥ 645435</div>
                    </div>
                    <div>
                        <span>日新增 6</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="18">
                <el-card>
                    <div slot="header">
                        <span>动态</span>
                    </div>
                    <el-row v-for="n in 10" :key="n">
                        <el-col :span="20">张三 新建了项目 <span class="text-primary">Element Admin</span></el-col>
                        <el-col :span="4" class="text-info"> 2018-3-1 13:43</el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <el-col>
                        <el-card>
                            <div slot="header">
                                <span>热销商品</span>
                            </div>
                            <div class="text-primary">2018新款韩版潮流男士夏装丅恤上衣服
                                <el-tag type="danger" size="mini" class="float-right">¥ 302</el-tag>
                            </div>
                            <hr>
                            <div class="text-primary">2018新款韩版潮流男士夏装丅恤上衣服
                                <el-tag type="danger" size="mini" class="float-right">¥ 102</el-tag>
                            </div>
                            <hr>
                            <div class="text-primary">2018新款韩版潮流男士夏装丅恤上衣服
                                <el-tag type="danger" size="mini" class="float-right">¥ 59</el-tag>
                            </div>
                            <hr>
                            <div class="text-primary">2018新款韩版潮流男士夏装丅恤上衣服
                                <el-tag type="danger" size="mini" class="float-right">¥ 1239</el-tag>
                            </div>
                            <hr>
                            <div class="text-primary">2018新款韩版潮流男士夏装丅恤上衣服
                                <el-tag type="danger" size="mini" class="float-right">¥ 1239</el-tag>
                            </div>
                            <hr>
                            <div class="text-primary">2018新款韩版潮流男士夏装丅恤上衣服
                                <el-tag type="danger" size="mini" class="float-right">¥ 302</el-tag>
                            </div>
                            <hr>
                            <div class="text-primary">2018新款韩版潮流男士夏装丅恤上衣服
                                <el-tag type="danger" size="mini" class="float-right">¥ 102</el-tag>
                            </div>
                            <hr>
                            <div class="text-primary">2018新款韩版潮流男士夏装丅恤上衣服
                                <el-tag type="danger" size="mini" class="float-right">¥ 59</el-tag>
                            </div>
                            <hr>
                            <div class="text-primary">2018新款韩版潮流男士夏装丅恤上衣服
                                <el-tag type="danger" size="mini" class="float-right">¥ 1239</el-tag>
                            </div>
                            <hr>
                            <div class="text-primary">2018新款韩版潮流男士夏装丅恤上衣服
                                <el-tag type="danger" size="mini" class="float-right">¥ 1239</el-tag>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
<script>
import G2 from "@antv/g2";

export default {
  name: "Dashboard",
  data() {
    return {
      data: [
        {
          date: "2018-1-1",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-2",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-3",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-4",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-5",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-6",
          value: Math.ceil(Math.random() * 10)
        },
        {
          date: "2018-1-7",
          value: Math.ceil(Math.random() * 10)
        }
      ],
      userChart: null,
      uvChart: null,
      pvChart: null,
      orderChart: null
    };
  },
  methods: {
    drawUserChart: function() {
      this.userChart = new G2.Chart({
        container: "userChart",
        forceFit: true,
        height: 100,
        padding: [40, 0, 0, 0]
      });
      this.userChart.source(this.data);
      this.userChart.scale({
        date: {
          type: "time",
          alias: "日期"
        }
      });
      this.userChart.area().position("date*value");
      this.userChart
        .line()
        .position("date*value")
        .size(2);
      this.userChart.render();
    },
    drawUvChart: function() {
      this.uvChart = new G2.Chart({
        container: "uvChart",
        forceFit: true,
        height: 100,
        padding: [40, 0, 0, 0]
      });
      this.uvChart.source(this.data);
      this.uvChart.scale({
        date: {
          type: "time",
          alias: "日期"
        }
      });
      this.uvChart.interval().position("date*value");
      //this.uvChart.axis(false);
      this.uvChart.render();
    },
    drawPvChart: function() {
      this.pvChart = new G2.Chart({
        container: "pvChart",
        forceFit: true,
        height: 100,
        padding: [40, 0, 0, 0]
      });
      this.pvChart.source(this.data);
      this.pvChart.scale({
        date: {
          type: "time",
          alias: "日期"
        }
      });
      this.pvChart.line().position("date*value");
      this.pvChart.render();
    },
    drawOrderChart: function() {
      this.orderChart = new G2.Chart({
        container: "orderChart",
        forceFit: true,
        height: 100,
        padding: [40, 0, 0, 0]
      });
      this.orderChart.source(this.data);
      this.orderChart.scale({
        date: {
          type: "time",
          alias: "日期"
        }
      });
      this.orderChart.interval().position("date*value");
      this.orderChart.render();
    }
  },
  mounted() {
    this.drawUserChart();
    this.drawUvChart();
    this.drawPvChart();
    this.drawOrderChart();
  }
};
</script>
