<template lang="pug">
.DragAndDropGridTask
  .labels
    .label-wrapper(v-for="(label, i) in content.labels", :data-index="i")
  .tip(v-html="content.tip")
  table.traps-wrapper
    tr
      th.empty
      th.column-name(v-for="label in content.labels", v-html="label")
    tr(v-for="(label, i) in content.labels")
      td.row-name(v-html="label")
      td.cell(v-for="(label, j) in content.labels")
        .trap(:data-row="i", :data-column="j")
</template>

<script>
import Content from '@/locale/ru-ru'
import $ from 'jquery'
require('webpack-jquery-ui/draggable')
require('webpack-jquery-ui/droppable')

window.jQuery = $;
require('jquery-ui-touch-punch');

const $labelWrapper = index =>
  $(`.label-wrapper[data-index=${index}]`)

// const $label = i =>
//   $(`.label[data-index=${i}`)
//
// const $trap = (row, column) =>
//   $(`.trap[data-row=${row}][data-column=${column}`)

const $createLabel = (html, index) =>
  $(`<div class='label' data-index='${index}'>${html}</div>`)

const placeLabel = ($label, index) =>
  $labelWrapper(index).append($label)

const trapLabel = ($trap, $label) => {
  $label.removeAttr('style').draggable({
    helper: 'clone',
    revert: 'invalid',
    start: ev => $(ev.target).hide(),
    stop: ev => $(ev.target).show()
  })
  $trap.append($label)
}

const isTrap = $el => $el.hasClass('trap')

const getRowAndColumn = ($trap) => {
  return {
    row: $trap.data('row'),
    column: $trap.data('column')
  }
}

export default {
  name: 'DragAndDropGridTask',
  data () {
    return {
      stepIndex: 1,
      content: Content.steps.data[1],
      traps: Array.from(Array(6), () => Array(6).fill(-1))
    }
  },
  props: {
    eventBus: { type: Object, required: true }
  },
  methods: {
    onReset (stepIndex) {
      if (stepIndex !== this.stepIndex) return
      this.traps = Array.from(Array(6), () => Array(6).fill(-1))
    },
    onValidate (stepIndex) {
      if (stepIndex !== this.stepIndex) return
      let correct = this.content.correct

      for (let i = 0; i < correct.length; i++) {
        for (let j = 0; j < correct[i].length; j++) {
          if (this.traps[i][j] !== correct[i][j]) {
            this.eventBus.$emit('validation-fail')
            return
          }
        }
      }

      this.eventBus.$emit('validation-pass')
    },
    setTrapValue (row, column, value) {
      this.$set(this.traps[row], column, value)
    },
    removeLabels () {
      $('.label-wrapper').empty()
    },
    removeTrappedLabels () {
      $('.trap').empty()
    },
    enableTraps () {
      $('.trap').droppable({
        tolerance: 'pointer',
        drop: (ev, ui) => {
          let $label = ui.draggable
          let $oldPlace = $label.parent()
          let $newPlace = $(ev.target)
          let labelIndex = $label.data('index')
          let newPos = getRowAndColumn($newPlace)

          if (isTrap($oldPlace)) {
            let oldPos = getRowAndColumn($oldPlace)
            this.setTrapValue(oldPos.row, oldPos.column, -1)
            $newPlace.empty()
          } else {
            $label = $label.clone()
          }

          this.setTrapValue(newPos.row, newPos.column, labelIndex)
          trapLabel($newPlace, $label)
        }
      })
    },
    enableLabels () {
      $('.label').draggable({
        helper: 'clone',
        revert: 'invalid'
      })
    },
    enableDragAndDrop () {
      this.enableTraps()
      this.enableLabels()
    },
    createLabels () {
      this.content.labels.forEach((html, index) => placeLabel($createLabel(html, index), index))
    },
    handleEvents () {
      this.eventBus.$on('validate', this.onValidate)
      this.eventBus.$on('reset', this.onReset)
    }
  },
  mounted () {
    window.$ = $
    this.createLabels()
    this.enableDragAndDrop()
    this.handleEvents()
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/default";

.label {
  text-align: center;
  color: $main-clr;
  cursor: pointer;
  @include normalText;
  background: white;
  border-radius: 2px;
  box-shadow: 0px 0px 3px rgba(0,0,0,0.2);
  width: 70px;
  height: 25px;
  border-bottom: 2px solid;
  &:not(:hover) {
    border-bottom-color: $main-clr
  }
  &:hover {
    border-bottom-color: $warning-clr
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
