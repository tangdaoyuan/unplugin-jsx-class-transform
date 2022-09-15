/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  computed,
  defineComponent,
  h,
  ref,
  watch,
} from '@vue/composition-api'
import type { IOptionConfigItem } from '@/store/config/state'

/**
 * notation
 */
export default defineComponent({
  name: 'ProEnhanceElOption',
  props: {
    currentValue: {
      type: [Boolean, String, Number] as PropType<string | number | boolean>,
    },
    data: {
      type: Object as PropType<IOptionConfigItem>,
      default: () => ({}),
    },
  },
  setup(_props) {
    const visible = ref(true)

    const disable = computed(() => {
      if (_props.currentValue === _props.data?.id && !visible.value)
        return true
      else
        return false
    })

    watch(
      () => _props.data.is_display,
      (nVal) => {
        if (nVal === undefined)
          return

        visible.value = !!nVal
      },
      {
        immediate: true,
      },
    )

    return {
      visible,
      disable,
    }
  },
})
