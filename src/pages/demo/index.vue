<template>
    <div>
        <v-test-component></v-test-component>
    </div>
</template>

<script>
import { customAsync } from "@/api/async";
export default {
    created() {},
    mounted() {
        console.log(1);
        customAsync({
            that: this,
            method: "getDicList",
            paramObj: { dcCodeMain: "01" },
            callback: () => {}
        });
    }
};
</script>

<style>
</style>
