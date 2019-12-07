<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <h1>{{ name }}</h1>
    <button @click="reverse">翻转</button>
    <sortList
      :left="title"
      :right="[1,2,3,4]"
      @childByValue="childByValue"
      v-if="hackReset == true"
    ></sortList>
    <sz
      :displayConfig="szObj"
      :leftConfigData="leftData"
      :rightConfigData="rightData"
      maxlength="10"
    ></sz>
  </div>
</template>

<script>
import sortList from './sortList'
import sz from './sz'
export default {
  data() {
    return {
      name: '',
      title: '',
      hackReset: true,
      leftData: [
        { itemName: 'aaa1', width: 10, prop: 'itemName1' },
        { itemName: 'aaa2', width: 10, prop: 'itemName2' },
        { itemName: 'aaa3', width: 10, prop: 'itemName3' },
        { itemName: 'aaa4', width: 10, prop: 'itemName4' },
        { itemName: 'aaa5', width: 10, prop: 'itemName5' }
      ],
      rightData: [
        { itemName: 'bbb1', width: 10, prop: 'ccc1' },
        { itemName: 'bbb2', width: 10, prop: 'ccc2' },
        { itemName: 'bbb3', width: 10, prop: 'ccc3' },
        { itemName: 'bbb4', width: 10, prop: 'ccc4' },
        { itemName: 'bbb5', width: 10, prop: 'ccc5' },
        { itemName: 'bbb6', width: 10, prop: 'ccc6' }
      ],
      szObj: {
        null_display: 'wd',
        height: 350,
        left: [
          {
            name: 'name',
            width: 200,
            prop: 'itemName'
          }
        ],
        right: [
          {
            name: 'name2',
            width: 200,
            prop: 'itemName'
          }
        ]
      }
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    sortList,
    sz
  },
  created() {
    this.title = this.msg
    this.checkEmail('1')
    this.checkEmail('1.1')
    this.checkEmail('0.1')
    console.log('上面都ok,下面都no')
    this.checkEmail('1.')
    this.checkEmail('01.')
    this.checkEmail('.')
    this.checkEmail('.0')
    this.checkEmail('1.0')
    this.checkEmail('00')
  },
  methods: {
    checkEmail(str) {
      // var re = /^(([1-9][0-9]{1,13}|0)\.([0-9]{1,4})$)|^([1-9][0-9]{0,13}|0)$/

      var re = /^[+-]?(0|([1-9]\d*))(\.\d{1,4})?$/g
      // var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (re.test(str)) {
        console.log('ok', str)
      } else {
        console.log('no', str)
      }
    },
    reverse() {
      this.title = this.title
        .split('')
        .reverse()
        .join('')
      console.log(this.title)
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
      })
    },
    childByValue(childValue) {
      // childValue就是子组件传过来的值
      this.name = childValue
      this.title = this.name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
