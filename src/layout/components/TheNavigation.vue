<template>
  <a-menu
    id="dddddd"
    style="width: 100%; height: 100%;"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    @click="handleClick"
  >
    <a-sub-menu key="sub1" @titleClick="titleClick">
      <template #title>
        <span>
          <MailOutlined />
          <span>Navigation One</span>
        </span>
      </template>
      <a-menu-item-group key="g1">
        <template #title>
          <QqOutlined />
          <span>Item 1</span>
        </template>
        <a-menu-item key="a1">Option 1</a-menu-item>
        <a-menu-item key="a2">Option 2</a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group key="g2" title="Item 2">
        <a-menu-item key="a3">Option 3</a-menu-item>
        <a-menu-item key="a4">Option 4</a-menu-item>
      </a-menu-item-group>
    </a-sub-menu>
    <a-sub-menu key="sub2" @titleClick="titleClick">
      <template #title>
        <span>
          <AppstoreOutlined />
          <span>Navigation Two</span>
        </span>
      </template>
      <a-menu-item key="5">Option 5</a-menu-item>
      <a-menu-item key="6">Option 6</a-menu-item>
      <a-sub-menu key="sub3" title="Submenu">
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
    </a-sub-menu>
    <a-sub-menu key="sub4">
      <template #title>
        <span>
          <SettingOutlined />
          <span>Navigation Three</span>
        </span>
      </template>
      <a-menu-item key="9">Option 9</a-menu-item>
      <a-menu-item key="10">Option 10</a-menu-item>
      <a-menu-item key="11">Option 11</a-menu-item>
      <a-menu-item key="12">Option 12</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub5">
      <template #title>
        <span>
          <SettingOutlined />
          <span>Navigation Three</span>
        </span>
      </template>
      <a-menu-item key="c9">Option 9</a-menu-item>
      <a-menu-item key="c10">Option 10</a-menu-item>
      <a-menu-item key="c11">Option 11</a-menu-item>
      <a-menu-item key="c12">Option 12</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
import { ref } from 'vue'
import {
  MailOutlined,
  QqOutlined,
  AppstoreOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'

export default {
  name: 'TheNavigation',
  components: {
    MailOutlined,
    QqOutlined,
    AppstoreOutlined,
    SettingOutlined
  },
  setup() {
    const selectedKeys = ref(['1'])
    const openKeys = ref(['sub1'])

    const handleClick = (e) => {
      console.log('click', e)
    }

    const titleClick = (e) => {
      console.log('titleClick', e)
    }

    return {
      selectedKeys,
      openKeys,
      handleClick,
      titleClick
    }
  }
}
</script>
