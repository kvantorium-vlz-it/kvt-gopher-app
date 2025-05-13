<template>
  <ComboboxRoot v-model="value" @update:modelValue="handleSelection">
    <div class="combobox-wrapper">
      <ComboboxTrigger class="trigger">
        <ComboboxInput 
          class="input"
          :placeholder="placeholder"
        />
        <ComboboxAnchor>
          <span class="icon">▼</span>
        </ComboboxAnchor>
      </ComboboxTrigger>

      <ComboboxPortal>
        <ComboboxContent class="content" position="popper">
          <ComboboxViewport>
            <ComboboxItem 
              v-for="(item) in filteredItems" 
              :key="item.documentId"
              :value="item.name"
              class="item"
            @click="() => {
              handleItemClick( item.documentId )
              
              
              
              }"
            >
              <ComboboxItemIndicator class="indicator">
                ✓
              </ComboboxItemIndicator>
              {{ item.name }}
            </ComboboxItem>
            <TwelveText v-if="filteredItems.length === 0" class="empty-state">
              нет одежды
            </TwelveText>
          </ComboboxViewport>
        </ComboboxContent>
      </ComboboxPortal>
    </div>
  </ComboboxRoot>
</template>

<script setup>
import {
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxInput,
  ComboboxPortal,
  ComboboxContent,
  ComboboxViewport,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxAnchor,
} from 'radix-vue'
import { ref, computed } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'выберите одежду'
  },
  clothes: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['update:hasSelection', 'clothesSelected'])

const value = ref('')
const filteredItems = computed(() => {
  return props.clothes
})

const handleSelection = (newValue) => {
  emit('update:hasSelection', Boolean(newValue))
}

const handleItemClick = (cloth, index) => {
  const originalIndex = props.clothes.indexOf(cloth)
  emit('clothesSelected', { cloth, index: originalIndex })
}
</script>

<style>
.combobox-wrapper {
  position: relative;
  width: 100%;
}

.trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  padding: 14px 16px;
  gap: 8px;
  background-color: white;
  border: 2px solid #e2e8f0;
  width: 100%;
}

.trigger:hover {
  border-color: #94a3b8;
}

.trigger:focus-within {
  border-color: #64748b;
  outline: none;
}

.input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  color: #1e293b;
  background: transparent;
  font-weight: 450;
  letter-spacing: -0.01em;
  font-family:'Gothic 60' ;
  font-size: 12px;
}

.input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.icon {
  font-size: 10px;
  color: #64748b;
}

.trigger[data-state="open"] .icon {
  /* transform: rotate(180deg); */
}

.content {
  overflow: hidden;
  background-color: white;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  width: auto;
  margin-top: 8px;
  max-height: 350px;
  z-index: 50;
}

.item {
  padding: 14px 18px;
  padding-left: 44px;
  outline: none;
  cursor: pointer;
  position: relative;
  font-size: 15px;
  color: #1e293b;
  border-left: 3px solid transparent;
  font-family:'Gothic 60' ;
  font-size: 12px;
}

.item[data-highlighted] {
  background-color: #f8fafc;
  border-left-color: #94a3b8;
}

.item[data-state="checked"] {
  background-color: #f1f5f9;
  font-weight: 500;
  border-left-color: #64748b;
}

.indicator {
  position: absolute;
  left: 0;
  width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 14px;
}

.empty-state {
  padding: 20px;
  text-align: center;
  color: #64748b;
  font-size: 14px;
  font-style: italic;
  background-color: #f8fafc;
}

@keyframes slideDown {
  /* from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  } */
}
</style>