<template>
  <div class="DragAndDropGridTask">
    <div class="labels">
      <div v-for="(label, i) in content.labels" :data-index="i" class="label-wrapper"></div>
    </div>
    <div v-html="content.tip" class="tip"></div>
    <table class="traps-wrapper">
      <tr>
        <th class="empty"></th>
        <th v-for="label in content.labels" v-html="label" class="column-name"></th>
      </tr>
      <tr v-for="(label, i) in content.labels">
        <td v-html="label" class="row-name"></td>
        <td v-for="(label, j) in content.labels" class="cell">
          <div :data-row="i" :data-column="j" class="trap"></div>
        </td>
      </tr>
    </table>
    <!--button(@click="debug__fillGrid") "help"-->
  </div>
</template>

<script>
import Content from '@/locale/ru-ru'
import { mapState } from 'vuex'
import { TRAPPED_LABEL_INDEXES_GRID, resetDnD, initDnD, setValidity } from './drag-and-drop'
import $ from 'jquery'

window.$ = $

export default {
  name: 'DragAndDropGridTask',
  data () {
    return {
      stepIndex: 1,
      content: Content.steps.data[1]
    }
  },
  computed: {
    ...mapState(['eventBus'])
  },
  methods: {
    // debug__fillGrid () {
    //   resetGrid(this.content.correct)
    // },
    onReset (stepIndex, isFull) {
      if (stepIndex !== this.stepIndex) { return }

      if (isFull) {
        resetDnD()
        initDnD(this.content)
      }
    },
    onValidate (stepIndex) {
      if (stepIndex !== this.stepIndex) { return }

      let traps = TRAPPED_LABEL_INDEXES_GRID
      let correct = this.content.correct
      let isValid = true
      let validity = false

      for (let i = 0; i < correct.length; i++) {
        for (let j = 0; j < correct[i].length; j++) {
          validity = traps[i][j] === correct[i][j]
          if (traps[i][j] !== -1) {
            setValidity(i, j, validity)
          }

          if (traps[i][j] !== correct[i][j]) {
            isValid = false
          }
        }
      }

      this.eventBus.$emit(isValid ? 'validation-pass' : 'validation-fail')
    },
    handleEvents () {
      this.eventBus.$on('validate', this.onValidate)
      this.eventBus.$on('reset', this.onReset)
    }
  },
  mounted () {
    this.handleEvents()
    initDnD(this.content)
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/default";

.label {
  color: $main-clr;
  width: 70px;
  height: 25px;
  cursor: pointer;
  @include normalText;
  background: white;
  text-align: center;
  box-shadow: 0px 0px 3px rgba(0,0,0,0.2);
  border-radius: 2px;
  border-bottom: 2px solid;

  &:not(:hover) {
    border-bottom-color: $main-clr
  }
  &:hover {
    border-bottom-color: $warning-clr
  }
  &.correct {
    border-bottom-color: $label-correct-outline-clr;
  }
  &.wrong {
    border-bottom-color: $danger-clr;
  }
}

.trap {
  margin-left: 2px;
  width: 70px;
  height: 27px;
  border-radius: 2px;
  box-shadow: inset 2px 1px 8px rgba(0,0,0,0.2);
  &:not(.ui-droppable-hover) {
    background: #f9f9f9;
  }
  &.ui-droppable-hover {
    background: $warning-clr
  }
}
</style>

<style lang="scss" scoped>
@import "~@/assets/styles/default";

$border-style: 1px solid #e3e3e3;

.DragAndDropGridTask {
  margin-left: 25px;
  .labels, .tip {
    margin-left: 82px;
  }
  .labels {
    display: flex;
    flex-direction: row;
    .label-wrapper {
      width: 70px;
      height: 27px;
      &:not(:first-child) {
        margin-left: 7px;
      }
    }
  }
  .tip {
    font: 12px/14px ConquerorSans, sans-serif;
    color: #9d9b9b;
    padding: 5px 0;
  }
  table {
    @include normalText;
    th.column-name, th.empty, td.cell {
      min-width: 72px;
      max-width: 72px;
    }
    th.column-name {
      font-weight: normal;
      border-left: $border-style;
      height: 23px;
    }
    td.row-name, th.row-name {
      text-align: right;
      border-top: $border-style;
    }
    td.cell {
      border-left: $border-style;
      border-top: $border-style;
      height: 34px;
    }
  }
}
</style>
