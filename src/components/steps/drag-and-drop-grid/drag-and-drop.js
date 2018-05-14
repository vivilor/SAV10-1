/* eslint-disable no-return-assign */
import $ from 'jquery'

window.jQuery = $
require('webpack-jquery-ui/draggable')
require('webpack-jquery-ui/droppable')
require('jquery-ui-touch-punch')

/**
 * CSS classes for validation state of label
 */

const CSSClasses = {
  wrong: 'wrong',
  correct: 'correct'
}

const Selectors = {
  stepWrapper: '.step-wrapper',
  trap: '.trap',
  label: '.label'
}

export let TRAPPED_LABEL_INDEXES_GRID

const DROPPABLE_TRAP_CONF = {
  tolerance: 'pointer',
  drop: (ev, ui) => {
    console.log('drop()')
    let $label = ui.draggable
    let $oldPlace = $label.parent()
    let $newPlace = $(ev.target)
    let labelIndex = $label.data('index')
    let newPos = getRowAndColumn($newPlace)

    if (isTrap($oldPlace)) {
      let oldPos = getRowAndColumn($oldPlace)

      unsetValidity($label)
      resetTrapValue(oldPos.row, oldPos.column)
      if (newPos.row !== oldPos.row && newPos.column !== oldPos.column) {
        $newPlace.empty()
      }
    } else {
      $label = $label.clone()
    }

    resetTrapValue(newPos.row, newPos.column, labelIndex)
    trapLabel($newPlace, $label)
  }
}
const DRAGGABLE_LABEL_CONF = {
  appendTo: Selectors.stepWrapper,
  helper: 'clone',
  revert: 'invalid'
}

const TRAPPED_DRAGGABLE_LABEL_CONF = {
  appendTo: Selectors.stepWrapper,
  helper: 'original',
  revertDuration: 0,
  revert (isDroppable) {
    if (!isDroppable) {
      $(this).remove()
    }
    return false
  },
  stop () {
    $(this).draggable(TRAPPED_DRAGGABLE_LABEL_CONF)
  }
}

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
const removeTrappedLabels = () => $(Selectors.trap).empty()

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

export const setValidity = (i, j, isValid) => $trappedLabel(i, j).addClass(isValid ? CSSClasses.correct : CSSClasses.wrong)
export const unsetValidity = label => $(label).removeClass([CSSClasses.wrong, CSSClasses.correct].join(' '))

const placeLabel = ($label, index) => $labelWrapper(index).append($label)
const trapLabel = ($trap, $label) => {
  $label.css({top: 0, left: 0})
  $trap.append($label)
  $label.draggable(TRAPPED_DRAGGABLE_LABEL_CONF)
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

const enableLabels = () => $(Selectors.label).draggable(DRAGGABLE_LABEL_CONF)
const enableTraps = () => $(Selectors.trap).droppable(DROPPABLE_TRAP_CONF)

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
