<template>
  <div class="sort-order">
    <div class="so-left">
      <el-table
        :data="leftTableData"
        width="100%"
        v-on:selection-change="multipleSelectionLeft"
        :height="displayConfig.height"
      >
        <el-table-column type="selection" width="35"></el-table-column>
        <!--<el-table-column label="待选择项目名称" prop="itemName"  width="210">-->
        <!--</el-table-column>-->
        <el-table-column
          v-for="(item, index) in displayConfig.left"
          :key="index"
          :label="item.name"
          :prop="item.prop"
          :width="item.width"
        >
          <template slot="header" v-if="index === 0">
            <!-- <leftTextRightIcon v-if="flag1 === false">
              <span slot="left">{{item.name}}</span>
              <i class="el-icon-search" slot="right" @click="flag1 = true"></i>
            </leftTextRightIcon>-->
            <el-input
              v-focus
              @blur="flag1 = !!searchName"
              style="padding-left: 0;height: 24px"
              clearable
              v-if="flag1"
              v-model="searchName"
              size="mini"
              placeholder="项目名称"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </template>
        </el-table-column>
        <span slot="empty">{{displayConfig.null_display}}</span>
      </el-table>
    </div>
    <div class="so-middle">
      <div class="middle-son">
        <div class="parent-son" @click="toRight">
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="parent-son" @click="toLeft">
          <i class="el-icon-arrow-left"></i>
        </div>
      </div>
    </div>
    <div class="so-right">
      <el-table
        :data="rightConfigData"
        width="100%"
        v-on:selection-change="multipleSelectionRight"
        :height="displayConfig.height"
        ref="sortTable"
      >
        <el-table-column type="selection" width="35"></el-table-column>
        <!--<el-table-column label="已选择项目名称" prop="itemName"  width="210">-->
        <!--</el-table-column>-->
        <el-table-column
          v-for="(item, index) in displayConfig.right"
          :key="index"
          :label="item.name"
          :prop="item.prop"
          :width="item.width"
        >
          <template slot="header" v-if="index === 0">
            <!-- <leftTextRightIcon v-if="flag2 === false">
              <span slot="left">{{item.name}}</span>
              <i class="el-icon-search" slot="right" @click="flag2 = true"></i>
            </leftTextRightIcon>-->
            <el-input
              v-focus
              @blur="flag2 = !!searchName2"
              style="padding-left: 0;height: 24px"
              clearable
              v-if="flag2"
              v-model="searchName2"
              size="mini"
              placeholder="项目名称"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </template>
          <template slot-scope="scope">
            <!--{{scope.row[item.itemCode]}}-->
            <span
              :style="{color: searchName2 && scope.row[item.prop].match(searchName2) !== null ? '#E14C46' : '#555555'}"
            >{{scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
        <span slot="empty">{{displayConfig.null_display}}</span>
      </el-table>
    </div>
    <div class="so-option">
      <div class="middle-son">
        <div class="bt-20" @click="toTop">
          <el-button type="info" class="min-width-72">置顶</el-button>
        </div>
        <div class="bt-20" @click="toUpper">
          <el-button type="info" class="min-width-72">上移</el-button>
        </div>
        <div class="bt-20" @click="toLowwer">
          <el-button type="info" class="min-width-72">下移</el-button>
        </div>
        <div class="bt-20" @click="toBottom">
          <el-button type="info" class="min-width-72">置底</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fn from '../fn/fn'
// import leftTextRightIcon from '@/pages/salary/common/components/leftTextRightIcon'
export default {
  name: 'sortOrder',
  components: {
    // leftTextRightIcon
  },
  props: {
    leftConfigData: {
      type: Array,
      default: () => []
    },
    displayConfig: {
      type: Object,
      default: () => {
        return {
          null_display: '暂无数据',
          height: 350,
          left: [
            {
              name: '待选择项目名称',
              width: '',
              prop: 'itemName'
            }
          ],
          right: [
            {
              name: '已选择项目名称',
              width: '',
              prop: 'itemName'
            }
          ]
        }
      }
    },
    rightConfigData: {
      type: Array,
      default: () => []
    },
    detailInfo: {
      type: Object,
      default: () => {}
    },
    maxLength: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      flag1: false,
      flag2: false,
      leftSelectData: [],
      rightSelectData: [],
      flag: true,
      selectedIndex: [],
      searchName: '',
      searchName2: ''
    }
  },
  methods: {
    multipleSelectionLeft: function(val) {
      this.leftSelectData = val
    },
    multipleSelectionRight: function(val) {
      this.rightSelectData = val
    },
    toTop() {
      if (!this.rightSelectData.length) return
      let tempArr = this.rightConfigData
        .map((v, index) => index)
        .slice(0, this.rightIndex.length)
      while (JSON.stringify(this.rightIndex) !== JSON.stringify(tempArr)) {
        this.toUpper()
      }
    },
    toBottom() {
      if (!this.rightSelectData.length) return
      let tempArr = this.rightConfigData
        .map((v, index) => index)
        .slice(-this.rightIndex.length)
      while (JSON.stringify(this.rightIndex) !== JSON.stringify(tempArr)) {
        this.toLowwer()
      }
    },
    // 上移一格
    toUpper() {
      if (!this.rightSelectData.length) return
      this.rightIndex.forEach((v, index) => {
        if (v !== index) fn.swapItems(this.rightConfigData, v, v - 1)
      })
    },
    // 下移一格
    toLowwer() {
      if (!this.rightSelectData.length) return
      let tempArr = this.rightConfigData
        .map((v, index) => index)
        .slice(-this.rightIndex.length)
      console.log(tempArr)
      this.rightIndex
        .slice()
        .reverse()
        .forEach((v, index) => {
          if (v !== tempArr.slice().reverse()[index])
            fn.swapItems(this.rightConfigData, v, v + 1)
        })
    },
    toRight: function() {
      if (this.maxLength) {
        let leftLen = this.leftSelectData.length
        let rightLen = this.rightConfigData.length
        if (
          leftLen > this.maxLength ||
          rightLen > this.maxLength ||
          leftLen + rightLen > this.maxLength
        ) {
          this.$message({
            message: `选择数据最多为${this.maxLength}个！`,
            type: 'warning'
          })
        } else {
          if (this.leftSelectData && this.leftSelectData.length) {
            // this.rightTableData = this.leftSelectData.forEach(v => this.rightTableData.push(v))
            this.rightConfigData.splice(-1, 0, ...this.leftSelectData)
            fn.arrDeleteArg(this.leftConfigData, this.leftSelectData)
          } else {
            this.$message({
              message: '请先选中数据',
              type: 'warning'
            })
          }
        }
      } else {
        if (this.leftSelectData && this.leftSelectData.length) {
          // this.rightTableData = this.leftSelectData.forEach(v => this.rightTableData.push(v))
          console.log(this.rightConfigData)
          this.rightConfigData.splice(-1, 0, ...this.leftSelectData)
          fn.arrDeleteArg(this.leftConfigData, this.leftSelectData)
        } else {
          this.$message({
            message: '请先选中数据',
            type: 'warning'
          })
        }
      }
    },
    toLeft: function() {
      if (this.rightSelectData && this.rightSelectData.length) {
        // this.leftTableData = this.rightSelectData.forEach(v => this.leftTableData.push(v))
        this.leftConfigData.splice(-1, 0, ...this.rightSelectData)
        fn.arrDeleteArg(this.rightConfigData, this.rightSelectData)
      } else {
        this.$message({
          message: '请先选中数据',
          type: 'warning'
        })
      }
    },
    save: function() {
      this.$emit('hehe')
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.querySelector('input').focus()
      }
    }
  },
  computed: {
    rightIndex: function() {
      return this.rightSelectData
        .map(item =>
          this.rightConfigData.findIndex(v => v.itemCode === item.itemCode)
        )
        .sort(function(ele1, ele2) {
          if (ele1 < ele2) return -1
          //  return -1
          else if (ele1 > ele2) return 1
          // return 1
          else return 0
        })
    },
    secondIndex: function() {
      return this.rightIndex
        .slice()
        .reverse()
        .map(v => this.rightSelectData.length - 1 - v)
    },
    leftTableData() {
      return this.leftConfigData
        .slice()
        .filter(v => v.itemName && v.itemName.match(this.searchName) !== null)
    }
  },
  mounted() {}
}
</script>

<style lang="less">
.sort-order {
  .el-table__empty-block {
    height: 100% !important;
  }
  .el-table__header {
    .el-input__inner {
      border: none !important;
      background: inherit !important;
      border-bottom: 1px solid #d3d3d3 !important;
      border-radius: 0 !important;
      padding-right: 0px;
      padding-left: 20px;
    }
    .el-autocomplete.reference-com {
      padding-left: 0 !important;
      padding-right: 0 !important;
      text-overflow: clip !important;
    }
    .el-input__icon {
      width: 10px;
    }
  }
  display: flex;
  .so-left {
    /*flex-grow: 1;*/
    overflow: hidden;
    flex: 1;
  }
  .so-middle {
    width: 80px;
    /*background: red;*/
  }
  .middle-son {
    width: 30px;
    /*height: 160px;*/
    position: relative;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    .parent-son {
      width: 30px;
      height: 30px;
      border: 1px solid rgba(191, 191, 191, 1);
      border-radius: 100%;
      font-size: 20px;
      text-align: center;
      line-height: 28px;
      margin-top: 10px;
      &:hover {
        background: rgba(228, 228, 228, 1);
      }
    }
    .bt-20 {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  .so-right {
    /*flex-grow: 1;*/
    overflow: hidden;
    flex: 1;
  }
  .so-option {
    text-align: center;
    width: 100px;
    .middle-son {
      left: calc(~'50% - 10px');
    }
  }
}
</style>
