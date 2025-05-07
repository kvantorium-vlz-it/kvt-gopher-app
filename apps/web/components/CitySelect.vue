<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxLabel, ComboboxRoot, ComboboxSeparator, ComboboxTrigger, ComboboxViewport } from 'reka-ui'

const options = [
  { name: '', children: [
    { name: 'Волжский' },
  ] },
]
</script>

<template>
  <ComboboxRoot
    class="relative"
  >
    <ComboboxAnchor class="min-w-[160px] inline-flex items-center justify-between rounded-lg border px-[15px] text-xs leading-none h-[35px] gap-[5px] bg-white text-grass11 hover:bg-stone-50 shadow-sm focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-grass9 outline-none">
      <ComboboxInput
        class="!bg-transparent outline-none text-grass11 h-full selection:bg-grass5 placeholder-stone-400"
        placeholder="Выберите город"
      />
      <ComboboxTrigger>
        <Icon
          icon="radix-icons:chevron-down"
          class="h-4 w-4 text-grass11"
        />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent class="absolute z-10 w-full mt-1 min-w-[160px] bg-white overflow-hidden rounded-lg shadow-sm border will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
      <ComboboxViewport class="p-[5px]">
        <ComboboxEmpty class="text-mauve8 text-xs font-medium text-center py-2" />

        <template
          v-for="(group, index) in options"
          :key="group.name"
        >
          <ComboboxGroup>
            <ComboboxSeparator
              v-if="index !== 0"
              class="h-[1px] bg-grass6 m-[5px]"
            />

            <ComboboxLabel class="px-[25px] text-xs leading-[25px] text-mauve11">
              {{ group.name }}
            </ComboboxLabel>

            <ComboboxItem
              v-for="option in group.children"
              :key="option.name"
              :value="option.name"
              class="text-xs leading-none text-grass11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1"
            >
              <ComboboxItemIndicator
                class="absolute left-0 w-[25px] inline-flex items-center justify-center"
              >
                <Icon icon="radix-icons:check" />
              </ComboboxItemIndicator>
              <span>
                {{ option.name }}
              </span>
            </ComboboxItem>
          </ComboboxGroup>
        </template>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>

<style>

button, input {
  all: unset;
}

.ComboboxRoot {
  position: relative;
}

.ComboboxAnchor {
  display: inline-flex;
  align-items: center;
  justify-content: between; 
  font-size: 13px;
  line-height: 1;
  height: 35px;
  padding: 0 15px;
  gap: 5px;
  background-color: white;
  color: var(--grass-11);
  border-radius: 4px;
  box-shadow: 0 2px 10px var(--black-a7);
}
.ComboboxAnchor:hover {
  background-color: var(--mauve-3);
}

.ComboboxInput {    
  height: 100%;
  background-color: transparent;
  color: var(--grass-11); 
}
.ComboboxInput[data-placeholder] {
  color: var(--grass-9);
}

.ComboboxIcon {
  width: 16px;
  height: 16px;
  color: var(--grass-11);
}

.ComboboxContent {
  z-index: 10;
  width: 100%;
  position: absolute;
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  margin-top: 8px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
}

.ComboboxViewport {
  padding: 5px;
}

.ComboboxEmpty {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500; 
  color: var(--mauve-11)
}

.ComboboxItem {
  font-size: 13px;
  line-height: 1;
  color: var(--grass-11);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
}
.ComboboxItem[data-disabled] {
  color: var(--mauve-8);
  pointer-events: none;
}
.ComboboxItem[data-highlighted] {
  outline: none;
  background-color: var(--grass-9);
  color: var(--grass-1);
}

.ComboboxLabel {
  padding: 0 25px;
  font-size: 12px;
  line-height: 25px;
  color: var(--mauve-11);
}

.ComboboxSeparator {
  height: 1px;
  background-color: var(--grass-6);
  margin: 5px;
}

.ComboboxItemIndicator {
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

</style>