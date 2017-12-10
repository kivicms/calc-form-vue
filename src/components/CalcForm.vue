<template>
  <el-row>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Габаритные и количественные данные объектов</span>
      </div>
      <div id="formDatas">
        <div v-for="(item, index) in items">
          <el-form :inline="true" :model="item">
            <el-form-item>
              <el-input-number :disabled="true" size="small" :min="1" :max="10" v-model="item.number"
                               placeholder="0"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-input size="small" v-model="item.title" placeholder="Наименование"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input-number size="small" :min="1" :max="2000" v-model="item.length"
                               placeholder="0"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-input-number size="small" :min="1" :max="100" v-model="item.width"
                               placeholder="0"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-input-number size="small" :min="1" :max="200" v-model="item.height"
                               placeholder="0"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-select size="small" v-model="item.shop" placeholder="Выберите цех">
                <el-option
                  v-for="opt in shopOptions"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="removeItem(index)" type="danger" size="small" plain icon="el-icon-minus"></el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Данные для расчета услуг</span>

        <el-button @click="addButton" plain size="small" icon="el-icon-plus" class="pull-rigth"
                   style="float: right">
          Добавить строку
        </el-button>
      </div>
      <el-form :inline="true" :model="form" :rules="rules" ref="form">
        <el-form-item>
          <el-input-number :disabled="true" size="small" :min="1" :max="10" v-model="form.number" placeholder="0"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-input size="small" v-model="form.title" placeholder="Наименование"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input-number size="small" :min="1" :max="2000" v-model="form.length" placeholder="0"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-input-number size="small" :min="1" :max="100" v-model="form.width" placeholder="0"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-input-number size="small" :min="1" :max="200" v-model="form.height" placeholder="0"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-select size="small" v-model="form.shop" placeholder="Выберите цех">
            <el-option
              v-for="item in shopOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="saveButton" type="success" size="small" icon="el-icon-plus">
            Сохранить и рассчитать
          </el-button>
        </el-form-item>
      </el-form>
      <el-col :span="24" v-show="showResult">
        <table class="result-table">
          <thead>
          <tr>
            <th>Номер</th>
            <th>Наименование</th>
            <th>Длина</th>
            <th>Ширина</th>
            <th>Высота</th>
            <th>Цех</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items">
            <td>{{item.number}}</td>
            <td>{{item.title}}</td>
            <td>{{item.length}}</td>
            <td>{{item.width}}</td>
            <td>{{item.height}}</td>
            <td>{{shopOptions[item.shop].label}}</td>
          </tr>
          </tbody>
        </table>
      </el-col>

    </el-card>

  </el-row>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElCard from '../../node_modules/element-ui/packages/card/src/main.vue'
  import ElInputNumber from '../../node_modules/element-ui/packages/input-number/src/input-number.vue'
  import ElFormItem from '../../node_modules/element-ui/packages/form/src/form-item.vue'
  import ElButton from '../../node_modules/element-ui/packages/button/src/button.vue'

  export default {
    components: {
      ElButton,
      ElFormItem,
      ElInputNumber,
      ElCard,
      ElCol,
      ElRow
    },
    name: 'CalcForm',
    data () {
      return {
        msg: 'CalcForm',
        items: [],
        form: {
          number: 1,
          title: '',
          length: 200,
          width: 100,
          height: 30,
          shop: ''
        },
        rules: {
          title: [
            { required: true, message: 'Поле обязательно для заполнения', trigger: 'blur' }
          ],
          shop: [
            { required: true, message: 'Поле обязательно для заполнения', trigger: 'blur' }
          ]
        },
        shopOptions: [
          {value: 0, label: 'Выберите цех'},
          {value: 1, label: 'Конвейер'},
          {value: 2, label: 'Калибровочный'},
          {value: 3, label: 'Тестировочный'}
        ],
        showResult: false
      }
    },
    methods: {
      recalcNumber () {
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].number = i + 1
        }
        this.form.number = this.items.length + 1
        this.showResult = false
      },
      addButton () {
        if (this.form.shop === 0 || this.form.shop === '') {
          this.$message('Выберите цех')
          return
        }
        if (this.form.title.trim() === '') {
          this.$message('Заполните наименование')
          return
        }
        const item = {
          number: this.form.number,
          title: this.form.title,
          length: this.form.length,
          width: this.form.width,
          height: this.form.height,
          shop: this.form.shop
        }
        this.items.push(item)
        this.recalcNumber()
      },
      removeItem (item) {
        this.items.splice(item, 1)
        this.recalcNumber()
      },
      saveButton () {
        if (this.items.length === 0) {
          this.$message('Нет данных для сохранения')
          return
        }
        this.$message('Сохраняю данные в vuex')
        this.showResult = true
        this.$store.commit('update', this.items)
      }
    }
  }
</script>

<style>
  .result-table {
    width: 100%;
  }

</style>
