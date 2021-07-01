<template>
  <div class="content-container">
    <div class="tab-wrapper">
      <a-tabs size="small" :tabBarStyle="{ 'padding-left': '16px' }" type="card" >
        <a-tab-pane class="tab-pane" v-for="pane in [ { key: 1, title: 'title1', content: 'content1' }, { key: 2, title: 'title2', content: 'content2' } ]" :key="pane.key" :closable="true">
          <template #tab>
            <a-dropdown :trigger="['contextmenu']">
              <span>
                {{ pane.title }}
                <ReloadOutlined class="dropdown-menu-refresh-btn" />
                <CloseOutlined class="dropdown-menu-close-btn" />
              </span>

              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">关闭其他</a-menu-item>
                  <a-menu-item key="2">关闭到左侧</a-menu-item>
                  <a-menu-item key="3">关闭到右侧</a-menu-item>
                  <a-menu-item key="3">刷新当前页</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </a-tab-pane>
        <template #tabBarExtraContent>
          <a-dropdown>
            <MoreOutlined class="dropdown-menu-btn" />

            <template #overlay>
              <a-menu>
                <a-menu-item>关闭其他</a-menu-item>
                <a-menu-item>刷新当前页</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tabs>
      <div class="breadcrumb-wrapper" style="padding: 0 24px 16px 24px; ">
        <a-breadcrumb>
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>Application Center</a-breadcrumb-item>
          <a-breadcrumb-item>Application List</a-breadcrumb-item>
          <a-breadcrumb-item>An Application</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </div>
    <div class="content-wrapper">
      <a-layout-content>
        <div style="padding: 30px">Content</div>
        <div style="padding: 30px">Content</div>
        <div style="padding: 30px">Content</div>
        <div style="padding: 30px">Content</div>
        <div style="padding: 30px">Content</div>
        <div style="padding: 30px">Content</div>
        <div style="padding: 30px">Content</div>
        <div style="padding: 30px">Content</div>
        <div style="padding: 30px">Content</div>
        <div style="padding: 30px">Content</div>
        <div style="padding: 30px">Content</div>
      </a-layout-content>
      <!-- <a-layout-footer></a-layout-footer> -->
    </div>
  </div>
</template>

<script>
import { MoreOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons-vue'

export default {
  name: 'MainContent',
  components: {
    MoreOutlined,
    CloseOutlined,
    ReloadOutlined
  }
}
</script>

<style lang="less" scoped>
  .content-container {
    height: calc(100vh - 48px);
    overflow: auto;

    .tab-wrapper {
      margin: 0px;
      padding-top: 6px;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,.12),0 0 3px 0 rgba(0,0,0,.04);

      .tab-pane {
        overflow: hidden;
        position: absolute;
      }

      .dropdown-menu-refresh-btn,
      .dropdown-menu-close-btn {
        margin-right: 0; margin-left: 8px; color: rgba(0,0,0,.45); font-size: 12px;
      }

      .dropdown-menu-btn {
        cursor: pointer;
        margin-right: 8px;
        padding: 12px;
        font-size: 16px;

        &:hover {
          color: #1890ff;
        }
      }
    }

    .content-wrapper {
      height: calc(100% - 100px);
      overflow: auto;
    }
  }
</style>
