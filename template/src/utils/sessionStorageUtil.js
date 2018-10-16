export default {

    MCE_USER_ID: 'mace.user.id',//用户Id
    MCE_USER_INFO:'mace.user.info',//用户信息
    MCE_INS_INFO:'mace.ins.info',//机构信息
    MACE_SELECED_INS_ID:'mace_seleced_ins_id',//选择机构Id
    MACE_SELECED_INS_NAME:'mace_seleced_ins_name',//选择机构名称
    MACE_SELECED_DEP_ID:'mace_seleced_depId_id',//部门id
    MENU_LIST:'mace_menu_list',//菜单列表
    AUTH_MENU_LIST:'mace_auth_menu_list',//菜单列表
    ROLE_LIST:'mace_role_list',//角色列表

    setItem(name, content) {
        if (!name) return
        // content undefined是节点缺失，所以禁止保存
        if (typeof content === 'undefined'){
            return;
        }
        window.sessionStorage.setItem(name, JSON.stringify(content))
    },
    getItem(name) {
        if (!name) return
        return JSON.parse(window.sessionStorage.getItem(name))
    },
    removeItem(name) {
        if (!name) return
        window.sessionStorage.removeItem(name)
    },
}
