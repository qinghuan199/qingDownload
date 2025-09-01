<template>
    <div class="header">
        <el-select v-model="value" :placeholder="$t('请选择')" size="middle" class="header" style="width: 130px"
            @change="switchLanguage(value)">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </div>
</template>

<script setup>
import { loadLanguage } from '@/main';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const value = ref('');  // 默认语言为 'en'

// 可供选择的语言选项
const options = ref([
    { label: "English", value: 'en' },
    { label: '中文', value: 'cn' },
    { label: 'แบบไทย', value: 'th' },
    // { label: '繁體', value: 'hk' },
    // { label:  'Tiếng Việt', value: 'vi' },
    // { label: 'Melayu', value: 'ms' },
]);
// 如果没有设置语言，则使用 'en' 作为默认
// 初始化语言
const storedLocale = localStorage.getItem('locale') || 'cn';
loadLanguage(storedLocale);
const switchLanguage = (locale) => {
    localStorage.setItem('locale', locale);
    loadLanguage(locale);
    window.location.reload();
};
</script>
<style lang="scss" scoped>
.header {
    // position: fixed;
    // right: 20px;
    // top: 20px;
}
</style>