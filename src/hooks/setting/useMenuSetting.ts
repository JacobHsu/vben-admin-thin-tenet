import type { MenuSetting } from '/#/config';

import { computed, unref, ref } from 'vue';

import { useAppStore } from '/@/store/modules/app';

import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '/@/enums/appEnum';
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '/@/enums/menuEnum';
import { useFullContent } from '/@/hooks/web/useFullContent';

export function useMenuSetting() {
  const { getFullContent: fullContent } = useFullContent();
  const appStore = useAppStore();

  const getShowSidebar = computed(() => {
    return (
      unref(getSplit) ||
      (unref(getShowMenu) && unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && !unref(fullContent))
    );
  });

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

  const getMenuType = computed(() => appStore.getMenuSetting.type);

  const getMenuMode = computed(() => appStore.getMenuSetting.mode);

  const getMenuFixed = computed(() => appStore.getMenuSetting.fixed);

  const getShowMenu = computed(() => appStore.getMenuSetting.show);

  const getMenuHidden = computed(() => appStore.getMenuSetting.hidden);

  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth);

  const getTrigger = computed(() => appStore.getMenuSetting.trigger);

  const getMenuTheme = computed(() => appStore.getMenuSetting.theme);

  const getSplit = computed(() => appStore.getMenuSetting.split);

  const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor);

  const getCanDrag = computed(() => appStore.getMenuSetting.canDrag);

  const getAccordion = computed(() => appStore.getMenuSetting.accordion);

  const getTopMenuAlign = computed(() => appStore.getMenuSetting.topMenuAlign);

  const getCloseMixSidebarOnChange = computed(
    () => appStore.getMenuSetting.closeMixSidebarOnChange,
  );

  const getIsSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR);

  const getIsTopMenu = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU);

  const getCollapsedShowTitle = computed(() => appStore.getMenuSetting.collapsedShowTitle);

  const getShowTopMenu = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL || unref(getSplit);
  });

  const getShowHeaderTrigger = computed(() => {
    if (
      unref(getMenuType) === MenuTypeEnum.TOP_MENU ||
      !unref(getShowMenu) ||
      unref(getMenuHidden)
    ) {
      return false;
    }

    return unref(getTrigger) === TriggerEnum.HEADER;
  });

  const getIsHorizontal = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL;
  });

  const getIsMixMode = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX;
  });

  const getRealWidth = computed(() => {
    return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth);
  });

  const getMiniWidthNumber = computed(() => {
    const { collapsedShowTitle } = appStore.getMenuSetting;
    return collapsedShowTitle ? SIDE_BAR_SHOW_TIT_MINI_WIDTH : SIDE_BAR_MINI_WIDTH;
  });

  const getCalcContentWidth = computed(() => {
    const width =
      unref(getIsTopMenu) || !unref(getShowMenu) || (unref(getSplit) && unref(getMenuHidden))
        ? 0
        : 0
        ? unref(getCollapsed)
          ? SIDE_BAR_MINI_WIDTH
          : SIDE_BAR_SHOW_TIT_MINI_WIDTH
        : unref(getRealWidth);

    return `calc(100% - ${unref(width)}px)`;
  });

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting });
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }
  return {
    setMenuSetting,

    toggleCollapsed,

    getMenuFixed,
    getRealWidth,
    getMenuType,
    getMenuMode,
    getShowMenu,
    getCollapsed,
    getMiniWidthNumber,
    getCalcContentWidth,
    getMenuWidth,
    getTrigger,
    getSplit,
    getMenuTheme,
    getCanDrag,
    getCollapsedShowTitle,
    getIsHorizontal,
    getIsSidebarType,
    getAccordion,
    getShowTopMenu,
    getShowHeaderTrigger,
    getTopMenuAlign,
    getMenuHidden,
    getIsTopMenu,
    getMenuBgColor,
    getShowSidebar,
    getIsMixMode,
    getCloseMixSidebarOnChange,
  };
}
