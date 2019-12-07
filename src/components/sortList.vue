<template>
  <div>
    <el-container>
      <el-table
        ref="leftRef"
        :data="leftList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="leftHandleSelectionChange"
        select-on-indeterminate:fasle
        :select-on-indeterminate="false"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="不显示" show-overflow-tooltip></el-table-column>
      </el-table>

      <el-table
        ref="rightRef"
        :data="rightList"
        tooltip-effect="dark"
        :select-on-indeterminate="false"
        style="width: 100%"
        @selection-change="rightHandleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="显示" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-container>
    <el-button @click="moveToLeft">向左</el-button>
    <el-button @click="moveToRight">向右</el-button>
    <el-button @click="moveToUp">向上</el-button>
    <el-button @click="moveToDown">向下</el-button>
    <el-button @click="submit">提交</el-button>
  </div>
</template>

<script>
import fn from '../fn/fn'
export default {
  props: {
    left: { type: [String, Array], required: true },
    right: { type: [String, Array], required: false }
  },
  data() {
    return {
      originalList: [],
      leftList: [],
      rightList: [],
      leftSelected: [],
      rightSelected: [],
      moveNumber: 0,
      moveDirection: ''
    }
  },
  methods: {
    moveToLeft() {
      //  移动到左边
      this.rightSelected.forEach(currentValue => {
        this.leftList.push(currentValue)
      })

      this.moveNumber = this.rightSelected.length
      this.moveDirection = 'left'
      //  右边列表内容删除
      fn.arrDeleteArg(this.rightList, this.rightSelected)
    },
    moveToRight() {
      this.leftSelected.forEach(currentValue => {
        this.rightList.push(currentValue)
      })

      this.moveDirection = 'right'
      this.moveNumber = this.leftSelected.length
      //  右边列表内容删除
      fn.arrDeleteArg(this.leftList, this.leftSelected)
    },
    moveToUp() {
      var upIndex = []
      this.leftSelected.forEach(val => {
        upIndex.push(
          this.leftList.findIndex((item, index) => {
            if (item == val) return index
          })
        )
        console.log(upIndex)
        upIndex.forEach(item => {
          fn.swapItems(this.leftList, item, item - 1)
          console.log(item)
        })
        // this.leftLis = fn.swapItems(this.leftList, upIndex, upIndex - 1)
      })
    },
    moveToDown() {},
    submit() {
      let submitStr = []
      this.leftList.forEach(item => {
        submitStr.push(item.name)
      })
      submitStr = submitStr.join(' ')
      console.log(submitStr)
      this.$emit('childByValue', submitStr)
    },
    leftHandleSelectionChange(val) {
      this.leftSelected = val
      console.log(val)
    },
    rightHandleSelectionChange(val) {
      this.rightSelected = val
      console.log(val)
      // console.log(val, this.rightSelected)
    },
    // 移动后恢复选中
    moved(LR) {
      if (LR == 'left') {
        let selected = []
        for (let i = 1; i < this.moveNumber + 1; i++) {
          selected.push(this.leftList[this.leftList.length - i])
        }
        console.log(selected)
        selected.reverse().forEach(row => {
          this.$refs.leftRef.toggleRowSelection(row)
        })
      } else {
        let selected = []
        for (let i = 1; i < this.moveNumber + 1; i++) {
          selected.push(this.rightList[this.rightList.length - i])
        }
        console.log(selected)
        selected.reverse().forEach(row => {
          this.$refs.rightRef.toggleRowSelection(row)
        })
      }
    }
  },
  computed: {},
  created() {
    if (typeof this.left === 'string') {
      this.left
        .trim()
        .split(/\s+/)
        .forEach(element => {
          this.leftList.push({ name: element })
        })
    } else {
      this.left.forEach(element => {
        this.leftList.push({ name: element })
      })
    }
    if (typeof this.right === 'string') {
      this.right
        .trim()
        .split(/\s+/)
        .forEach(element => {
          this.rightList.push({ name: element })
        })
    } else {
      this.right.forEach(element => {
        this.rightList.push({ name: element })
      })
    }
  },
  updated() {
    this.moved(this.moveDirection)

    // let aaa = JSON.parse(
    //   '[{"index":0,"picture":"http://media.xiangzq.cn/ASY_SHARE5342a62424d44b0fbc3b853a2fd948ed","desc":"滴滴滴滴1部"}]'
    // )[0]

    // let bbb = []
    // console.log(aaa)
    // for (let item in aaa) {
    //   console.log(item)
    //   bbb.push(aaa[item])
    // }
    // console.log('bbb', bbb)
    // // aaa.values()
  }
}
</script>

<style>
</style>