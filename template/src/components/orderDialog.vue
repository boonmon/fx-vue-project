<template>
    <div class="order-dialog-main">
        <div class="order-dialog-header">
            <i class="iconfont icon-huaban-"></i>
            <div class="circle-ripple"></div>
            <div>信息保护中请放心提交</div>
        </div>
        <div class="order-dialog-body">
            <div class="input-cell">
                <i class="iconfont icon-character"></i>
                <input v-model="info.contactName" type="text" placeholder="请输入您的姓名">
            </div>
            <div class="input-cell">
                <i class="iconfont icon-login_shouji"></i>
                <input v-model="info.mobilePhone" type="text" placeholder="请输入您的手机号">
            </div>
            <div class="input-cell">
                <i class="iconfont icon-icon_address"></i>
                <input
                    readonly
                    @click="openPicker"
                    v-model="info.areaName"
                    type="text"
                    placeholder="请选择所在的区域"
                >
            </div>
            <button @click="submit()">立即提交</button>
        </div>
    </div>
</template>

<script>
import { standardAsync } from "@/api/async";
import { areaDataHandler } from "@/utils/handler";
import { Toast } from "mint-ui";
export default {
    props: {
        show: Boolean,
        purchaseParams: {
            type: Object,
            default: () => ({
                productId: ""
            })
        }
    },
    data() {
        return {
            info: {
                areaName: "",
                areaCode: "",
                contactName: "",
                mobilePhone: ""
            },
            areaList: []
        };
    },
    created() {
        this.getAllArea();
    },
    methods: {
        checkForm() {
            if (!this.info.contactName) {
                Toast("请输入您的名称");
                return false;
            }
            if (!this.info.mobilePhone) {
                Toast("请输入您的手机号码");
                return false;
            } else {
                let reg = /^\d{11}$/;
                if (!reg.test(this.info.mobilePhone)) {
                    Toast("请输入正确的手机号码");
                    return false;
                }
            }
            if (!this.info.areaCode) {
                Toast("请选择您所在的省份、城市");
                return false;
            }
            return true;
        },
        submit() {
            if (!this.checkForm()) {
                return;
            }
            let params = {
                ...this.purchaseParams,
                ...this.info,
                channel: "2"
            };
            standardAsync(this, "purchaseIntention", params, res => {
                this.$emit("submit");
                Toast(res.body.message);
            });
        },
        getAllArea() {
            standardAsync(this, "queryAllArea", {}, res => {
                this.areaList = areaDataHandler(res.body);
            });
        },
        openPicker() {
            let that = this;
            weui.picker(this.areaList, {
                className: "custom-classname",
                defaultValue: [440000, 440500],
                depth: 2,
                onChange: function(result) {},
                onConfirm: function(result) {
                    if (result.length >= 2) {
                        if (result[1].label == "全部") {
                            that.info.areaCode = result[0].value;
                            that.info.areaName = result[0].label;
                        } else {
                            that.info.areaCode = result[1].value;
                            that.info.areaName =
                                result[0].label + " " + result[1].label;
                        }
                    } else {
                    }
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">
$color: #fff;
.mint-popup {
    background: none;
}
.order-dialog-main {
    width: 8.426667rem /* 632/75 */;
    margin: 0 auto;
    border-radius: 0.24rem /* 18/75 */;
    overflow: hidden;
    background: #fff;
    .order-dialog-header {
        position: relative;
        background: orange;
        width: 100%;
        height: 2.56rem /* 192/75 */;
        overflow: hidden;
        text-align: center;
        line-height: 2.56rem;
        font-size: 0.48rem /* 36/75 */;
        color: #fff;
        i {
            position: absolute;
            line-height: normal;
            left: 50%;
            top: 50%;
            margin-left: -0.4rem;
            margin-top: -0.46rem;
            font-size: 0.8rem /* 60/75 */;
            color: #ffffff;
            opacity: 0.4;
        }
        .circle-ripple {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 0.8rem /* 60/75 */;
            height: 0.8rem /* 60/75 */;
            margin-left: -0.4rem;
            margin-top: -0.4rem;
            border-radius: 50%;
            background: #fff;
            opacity: 0.4;
            animation: ripple 1s linear infinite;
        }
    }
    .order-dialog-body {
        padding: 0.533333rem /* 40/75 */ 0.666667rem /* 50/75 */ 0.613333rem
            /* 46/75 */;
        .input-cell {
            display: flex;
            font-size: 0.426667rem /* 32/75 */;
            padding: 0.186667rem /* 14/75 */ 0.4rem /* 30/75 */;
            border-radius: 0.133333rem /* 10/75 */;
            border: solid 1px #cccccc;
            margin-bottom: 0.386667rem /* 29/75 */;
            &:last-child {
                margin-bottom: 0.533333rem /* 40/75 */;
            }
            i {
                font-size: 0.426667rem /* 32/75 */;
                margin-right: 0.08rem /* 6/75 */;
            }
            input {
                width: 100%;
            }
        }
        button {
            width: 6.933333rem /* 520/75 */;
            height: 1.2rem /* 90/75 */;
            background-image: linear-gradient(84deg, #f17712 0%, #ffa127 100%),
                linear-gradient(#f0f0f0, #f0f0f0);
            background-blend-mode: normal, normal;
            border-radius: 0.586667rem /* 44/75 */;
            border: 0;
            font-size: 0.48rem /* 36/75 */;
            color: #fff;
        }
    }
}
@keyframes ripple {
    0% {
        box-shadow: 0 0 0 0 rgba($color, 0.3), 0 0 0 1em rgba($color, 0.3),
            0 0 0 2em rgba($color, 0.3), 0 0 0 3em rgba($color, 0.3),
            0 0 0 4em rgba($color, 0.3), 0 0 0 5em rgba($color, 0.3),
            0 0 0 6em rgba($color, 0.3), 0 0 0 7em rgba($color, 0.3),
            0 0 0 8em rgba($color, 0.3);
    }
    100% {
        box-shadow: 0 0 0 1em rgba($color, 0.3), 0 0 0 2em rgba($color, 0.3),
            0 0 0 3em rgba($color, 0.3), 0 0 0 4em rgba($color, 0.3),
            0 0 0 5em rgba($color, 0.3), 0 0 0 6em rgba($color, 0.3),
            0 0 0 7em rgba($color, 0.3), 0 0 0 8em rgba($color, 0.3),
            0 0 0 9em rgba($color, 0);
    }
}
</style>
