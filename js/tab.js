/**
 * 可复用 Tab 选项卡模块。
 * 使用方式：zhw_tab.init({ tabs: '.zhw_tab_item', panels: '.zhw_tab_panel', activeClass: 'zhw_tab_active' })
 * 核心逻辑：监听每个 tab 的点击，先清除所有 tab 和 panel 的 active 类，再给当前元素加上 active。
 */
const zhw_tab = (function () {

    /**
     * 根据传入的选择器初始化一组 tab。
     * @param {Object} cfg 配置对象
     * @param {string} cfg.tabs       tab 选项卡按钮的选择器（例如 '.zhw_tab_item'）
     * @param {string} cfg.panels     tab 对应内容面板的选择器（例如 '.zhw_tab_panel'）
     * @param {string} cfg.activeClass 选中态的类名（默认 'zhw_tab_active'）
     */
    function zhw_init(cfg) {
        const tabs       = document.querySelectorAll(cfg.tabs);
        const panels     = document.querySelectorAll(cfg.panels);
        const activeCls  = cfg.activeClass || 'zhw_tab_active';

        if (tabs.length !== panels.length) {
            console.warn('[zhw_tab] 选项卡数量与面板数量不一致');
        }

        tabs.forEach(function (tabEl, index) {
            /**
             * 单个 tab 按钮的点击监听：清除全部选中态 → 激活当前 tab → 显示对应面板。
             */
            tabEl.addEventListener('click', function () {
                // ① 先清除所有选项卡的选中状态
                tabs.forEach(function (t) { t.classList.remove(activeCls); });
                panels.forEach(function (p) { p.classList.remove(activeCls); });

                // ② 再设置当前元素的选中状态
                tabEl.classList.add(activeCls);
                if (panels[index]) panels[index].classList.add(activeCls);
            });
        });
    }

    return { init: zhw_init };
})();
