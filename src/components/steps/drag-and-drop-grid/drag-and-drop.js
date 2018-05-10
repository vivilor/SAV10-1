/* eslint-disable no-return-assign */
import $ from 'jquery'

window.jQuery = $
require('webpack-jquery-ui/draggable')
require('webpack-jquery-ui/droppable')
require('jquery-ui-touch-punch')

/**
 * CSS classes for validation state of label
 */
const CSS_CLASS_WRONG = 'wrong'
const CSS_CLASS_CORRECT = 'correct'

const trapSelector = '.trap'
const labelSelector = '.label'

const DROPPABLE_TRAP_CONF = {
  tolerance: 'pointer',
  drop: (ev, ui) => {
    let $label = ui.draggable
    let $oldPlace = $label.parent()
    let $newPlace = $(ev.target)
    let labelIndex = $label.data('index')
    let newPos = getRowAndColumn($newPlace)

    if (isTrap($oldPlace)) {
      let oldPos = getRowAndColumn($oldPlace)

      unsetValidity($label)
      resetTrapValue(oldPos.row, oldPos.column)
      $newPlace.empty()
    } else {
      $label = $label.clone()
    }

    resetTrapValue(newPos.row, newPos.column, labelIndex)
    trapLabel($newPlace, $label)
  }
}
const DRAGGABLE_LABEL_CONF = {
  helper: 'clone',
  revert: 'invalid'
}
const TRAPPED_DRAGGABLE_LABEL_CONF = {
  helper: 'clone',
  revertDuration: 0,
  revert (isDroppable) {
    if (!isDroppable) {
      $(this).remove()
    }

    return !isDroppable
  },
  start (ev) {
    $(ev.target).hide()
  },
  stop (ev) {
    unsetValidity(this)
    $(ev.target).show()
  }
}

export let TRAPPED_LABEL_INDEXES_GRID

const createTrappedLabelIndexesGrid = content => {
  TRAPPED_LABEL_INDEXES_GRID = Array.from(content, row => Array.from(row, cell => -1))
  window.traps = TRAPPED_LABEL_INDEXES_GRID
}

/**
 * Lambda-getters of DOM-elements (NativeJS & jQuery)
 */
// const $label = i => $(`.label[data-index=${i}]`)
const $labelWrapper = index => $(`.label-wrapper[data-index=${index}]`)
const $trap = (row, column) => $(`.trap[data-row=${row}][data-column=${column}]`)
const $createLabel = (html, index) => $(`<div class='label' data-index='${index}'>${html}</div>`)
const $trappedLabel = (row, column) => $trap(row, column).find('div.label')

const createLabels = labels => labels.forEach((html, index) => placeLabel($createLabel(html, index), index))
const removeLabels = () => $('.label-wrapper').empty()
const removeTrappedLabels = () => $(trapSelector).empty()

const resetTrapValue = (i, j, value = -1) => TRAPPED_LABEL_INDEXES_GRID[i][j] = value

/**
 * Lambdas for bool checks
 */
const isTrap = $el => $el.hasClass('trap')
// const isTrapped = $label => $label[0].hasAttribute('data-trapped')

/**
 * Lambdas for DOM-mutations (NativeJS & jQuery)
 */
const setTrapped = $label => $label.attr('data-trapped', '')
// const setFree = $label => $label.removeAttr('data-trapped')

export const setValidity = (i, j, isValid) => $trappedLabel(i, j).addClass(isValid ? CSS_CLASS_CORRECT : CSS_CLASS_WRONG)
export const unsetValidity = label => $(label).removeClass([CSS_CLASS_WRONG, CSS_CLASS_CORRECT].join(' '))

const placeLabel = ($label, index) => $labelWrapper(index).append($label)
const trapLabel = ($trap, $label) => {
  $label.removeAttr('style').draggable(TRAPPED_DRAGGABLE_LABEL_CONF)
  $trap.append($label)
  setTrapped($label)
}

/**
 * Get position of the trap
 * @param $trap
 * @returns {{row: *, column: *}}
 */
const getRowAndColumn = $trap => {
  return {
    row: $trap.data('row'),
    column: $trap.data('column')
  }
}

const enableLabels = () => $(labelSelector).draggable(DRAGGABLE_LABEL_CONF)
const enableTraps = () => $(trapSelector).droppable(DROPPABLE_TRAP_CONF)

export const initDnD = content => {
  let labels = content.labels
  let answers = content.correct

  createTrappedLabelIndexesGrid(answers)
  createLabels(labels)

  enableLabels()
  enableTraps()
}

export const resetDnD = () => {
  removeLabels()
  removeTrappedLabels()
  TRAPPED_LABEL_INDEXES_GRID.map(row => row.fill(-1))
}
