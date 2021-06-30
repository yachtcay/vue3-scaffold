<template>
  <a-dropdown v-model:visible="bellVisible">
    <span class="icon-wrapper">
      <BellOutlined :style="{ 'font-size': '18px' }" />
    </span>

    <template #overlay>
      <div>
        <div class="bell-container">
          <a-tabs v-model:activeKey="activeKey" size="small" :animated="{ tabPane: false }" :tabBarStyle="{ padding: '0 90px' }">
            <a-tab-pane key="1" tab="通知">
              <div class="content-container">
                <a-list item-layout="horizontal">
                  <a-list-item>
                    <a-list-item-meta title="通知标题1" description="4 years ago">
                      <template #avatar>
                        <NotificationTwoTone />
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                  <a-list-item>
                    <a-list-item-meta title="通知标题2" description="4 years ago">
                      <template #avatar>
                        <NotificationTwoTone />
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                  <a-list-item>
                    <a-list-item-meta title="通知标题3" description="4 years ago">
                      <template #avatar>
                        <NotificationTwoTone />
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="消息">
              <div class="content-container">
                <a-list item-layout="horizontal">
                  <a-list-item>
                    <a-list-item-meta title="消息标题1" description="4 years ago">
                      <template #avatar>
                        <MessageTwoTone />
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                  <a-list-item>
                    <a-list-item-meta title="消息标题2" description="4 years ago">
                      <template #avatar>
                        <MessageTwoTone />
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                  <a-list-item>
                    <a-list-item-meta title="消息标题3" description="4 years ago">
                      <template #avatar>
                        <MessageTwoTone />
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </div>
            </a-tab-pane>
          </a-tabs>
          <div class="bottom">更多</div>
        </div>
      </div>
    </template>
  </a-dropdown>
  <a-dropdown>
    <span class="username-wrapper">
      <a class="ant-dropdown-link" @click.prevent>
        {{ userInfo && userInfo.username }}
        <DownOutlined />
      </a>
    </span>

    <template #overlay>
      <a-menu>
        <a-menu-item @click="handleLogout">
          <span>登出</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {
  BellOutlined,
  NotificationTwoTone,
  MessageTwoTone,
  DownOutlined
} from '@ant-design/icons-vue'

export default {
  name: 'HeaderControl',
  components: {
    BellOutlined,
    NotificationTwoTone,
    MessageTwoTone,
    DownOutlined
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const activeKey = ref('1')
    const bellVisible = ref(false)
    const userInfo = computed(() => store.state.user.user)

    const handleLogout = () => {
      store.dispatch('auth/logout').then(() => {
        router.replace({
          name: 'Login'
        })
      })
    }

    return {
      activeKey,
      bellVisible,
      userInfo,
      handleLogout
    }
  }
}
</script>

<style lang="less" scoped>
  :deep(.bell-container) {
    width: 340px;
    padding: 10px 0;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 4px;

    .bottom {
      height: 46px;
      color: rgba(0,0,0,.85);
      line-height: 46px;
      text-align: center;
      border-top: 1px solid #f0f0f0;
      border-radius: 0 0 2px 2px;
      transition: all .3s;
      cursor: pointer;
    }
  }

  :deep(.ant-list-item) {
    padding-right: 24px;
    padding-left: 24px;
    overflow: hidden;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      background: #e6f7ff;
    }
  }

  .icon-wrapper,
  .username-wrapper {
    display: inline-block;
    padding: 0 12px;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      background: rgba(0, 0, 0, .025);
    }
  }
</style>
