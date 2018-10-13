/* eslint-disable no-return-assign */
import Vue from 'vue'

const state = {
  values: [[''], ['', '', ''], ['', '', '']],
  validity: [[false], [false, false, false], [false, false, false]],
  highlight: [[false], [false, false, false], [false, false, false]],
  activeQuestion: -1
}

const getters = {
  activeQuestion: state => state.activeQuestion,
  isHighlighted: state => (qIndex, fIndex) => state.highlight[qIndex][fIndex],
  getFieldValue: state => (qIndex, fIndex) => state.values[qIndex][fIndex],
  isValid: state => (qIndex, fIndex) => state.validity[qIndex][fIndex]
}

const mutations = {
  /**
   * Сбросить индекс активного вопроса
   * @param state - ссылка на экземпляр хранилища
   */
  RESET_ACTIVE_QUESTION: state => state.activeQuestion = -1,

  /**
   * Сбросить подсветку полей ответов (правильно/неправильно)
   * @param state - ссылка на экземпляр хранилища
   */
  RESET_HIGHLIGHT: state => state.highlight = Array.from(
    state.highlight,
    question => Array.from(question, () => false)
  ),

  /**
   * Установить индекс активного вопроса
   * @param state - ссылка на экземпляр хранилища
   * @param qIndex {Number} - индекс выбранного вопроса
   */
  SET_ACTIVE_QUESTION: (state, qIndex) => state.activeQuestion = qIndex,

  /**
   * Обновить полностью валидность всех ответов на все вопросы
   * @param state - ссылка на экземпляр хранилища
   * @param validity - новый массив значений валидности ответов
   */
  UPDATE_VALIDITY: (state, validity) => state.validity = validity,

  /**
   * Убрать подсветку заданного поля ответа у заданного вопроса
   * @param state - ссылка на экземпляр хранилища
   * @param qIndex - индекс вопроса
   * @param fIndex - индекс поля ответа
   */
  RESET_FIELD_HIGHLIGHT: (state, qIndex, fIndex) =>
    Vue.set(state.highlight[qIndex], fIndex, false),

  /**
   * Подстветить все поля ответов (подсветка верно/неверно)
   * @param state - ссылка на экземпляр хранилища
   */
  HIGHLIGHT_ALL: state =>
    state.highlight = Array.from(
      state.highlight,
      question => Array.from(question, field => true)
    ),

  /**
   * Сбросить все значения всех полей ответов всех вопросов
   * @param state - ссылка на экземпляр хранилища
   */
  RESET_ALL_VALUES: state =>
    state.values = Array.from(
      state.values,
      question => Array.from(question, field => '')
    ),

  /**
   * Сбросить значения валидности для всех ответов на все вопросы
   * @param state - ссылка на экземпляр хранилища
   */
  RESET_VALIDITY: state =>
    state.values = Array.from(
      state.values,
      question => Array.from(question, field => '')
    ),

  /**
   * Установить заданное значение заданного поля ответа в заданном вопросе
   * @param state - ссылка на экземпляр хранилища
   * @param qIndex {Number} - индекс вопроса
   * @param fIndex {Number} - индекс поля ответа в вопросе
   * @param newValue {String} - значение ответа
   */
  SET_FIELD_VALUE: (state, qIndex, fIndex, newValue) =>
    Vue.set(state.values[qIndex], fIndex, newValue)
}

const actions = {
  prepareField: (context, qIndex, fIndex) => {
    if (context.getters.isHighlighted(qIndex, fIndex)) {
      context.commit('RESET_HIGHLIGHT', qIndex, fIndex)
    }
    context.commit('SET_ACTIVE_QUESTION', qIndex)
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
