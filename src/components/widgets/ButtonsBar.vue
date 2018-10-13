<template>
  <div class="ButtonsBar">
    <TextButton
      v-for="(buttonType, i) in currentStepButtonTypes" :key="i"
      :name="buttonType"
      :content="button(buttonType)"
      @click.native="onStepButtonClick(buttonType)"
  />
  </div>
</template>

<script>
import TextButton from '@/components/widgets/TextButton'
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  name: 'ButtonsBar',
  components: {TextButton},
  computed: {
    ...mapState([
      'eventBus'
    ]),
    ...mapGetters([
      'button',
      'currentStepButtonTypes'
    ])
  },
  methods: {
    ...mapActions('modalWindow', [
      'setAndShowModal'
    ]),
    onStepButtonClick (buttonType) {
      if (buttonType === 'validate') {
        this.validateStep()
        return
      }
      if (buttonType === 'tip') {
        this.setAndShowModal('tipRequested')
      }
    },
    validateStep () {
      this.eventBus.$emit('validate', this.currentStep)
    }
  }
}
</script>

<style lang="scss" scoped>
div.ButtonsBar {
  position: absolute;
  bottom: 0;
  right: 0;
  & > *:not(:first-child) {
    margin-left: 10px;
  }
}
</style>
