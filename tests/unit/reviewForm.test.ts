import { expect, test } from "vitest"

import { mount } from '@vue/test-utils'
import Component from '@/components/ReviewForm.vue'

test('all inputs rendered', async () => {
  expect(Component).toBeTruthy()

  const wrapper = mount(Component)

  await expect(wrapper.html()).toContain('form')

  await expect(wrapper.find('select[name=rating]').exists()).toBe(true)
  await expect(wrapper.find('textarea[name=body]').exists()).toBe(true)
  await expect(wrapper.find('button').exists()).toBe(true)
})

test('validates as expected', async () => {
  expect(Component).toBeTruthy()

  const wrapper = mount(Component)

  await wrapper.find('select[name="rating"]').setValue(1)
  await wrapper.find('button').trigger('click')
  await expect(wrapper.text()).toContain('Value is required')

  await wrapper.find('select[name="rating"]').setValue("")
  await wrapper.find('textarea[name="body"]').setValue('test body')
  await wrapper.find('button').trigger('click')
  await expect(wrapper.text()).toContain('Value is required')

  await wrapper.find('select[name="rating"]').setValue(1)
  await wrapper.find('textarea[name="body"]').setValue('test body')
  await wrapper.find('button').trigger('click')
  await expect(wrapper.text()).not.toContain('Value is required')
})