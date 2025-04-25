<template>
  <div>
    <command-button :command="openEditImageDialog" :enable-tooltip="enableTooltip"
      :tooltip="t('editor.extensions.Image.buttons.image_options.tooltip')" icon="ellipsis-h"
      :button-icon="buttonIcon" />

    <el-dialog v-model="editImageDialogVisible" :title="t('editor.extensions.Image.control.edit_image.title')"
      :append-to-body="true" width="400px" class="el-tiptap-edit-image-dialog" @open="syncImageAttrs">
      <el-form :model="imageAttrs" label-position="top" size="small">
        <el-form-item v-if="!imageAttrs.isPlaceholder"
          :label="t('editor.extensions.Image.control.edit_image.form.src')">
          <el-upload style="width: 100%;" :http-request="uploadImage" :show-file-list="false" class="el-tiptap-upload"
            action="#" drag accept="image/*">
            <div class="el-tiptap-upload__icon">
              <i class="fa fa-upload" />
            </div>
            <div class="el-tiptap-upload__text">
              {{ t('editor.extensions.Image.control.upload_image.button') }}
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item :label="t('editor.extensions.Image.control.edit_image.form.alt')">
          <el-input v-model="imageAttrs.alt" autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-col :span="11">
            <el-form-item :label="t('editor.extensions.Image.control.edit_image.form.width')
              ">
              <el-input v-model="imageAttrs.width" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item :label="t('editor.extensions.Image.control.edit_image.form.height')
              ">
              <el-input v-model="imageAttrs.height" type="number" />
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button size="small" round @click="closeEditImageDialog">
          {{ t('editor.extensions.Image.control.edit_image.cancel') }}
        </el-button>

        <el-button type="primary" size="small" round @click="updateImageAttrs">
          {{ t('editor.extensions.Image.control.edit_image.confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { nodeViewProps } from '@tiptap/vue-3';
import {
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElCol,
  ElLoading,
  ElUpload,
  ElButton,
} from 'element-plus';
import CommandButton from '../CommandButton.vue';
import { readFileDataUrl } from '@/utils/shared';
import Logger from '@/utils/logger';

export default defineComponent({
  components: {
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
    ElCol,
    ElUpload,
    ElButton,
    CommandButton,
  },

  props: {
    node: nodeViewProps['node'],
    updateAttrs: nodeViewProps['updateAttributes'],
    buttonIcon: {
      default: '',
      type: String
    }
  },

  data() {
    return {
      editImageDialogVisible: false,

      imageAttrs: this.getImageAttrs(),
    };
  },

  setup() {
    const t = inject('t');
    const enableTooltip = inject('enableTooltip', true);

    return { t, enableTooltip };
  },

  methods: {
    syncImageAttrs() {
      this.imageAttrs = this.getImageAttrs();
    },

    getImageAttrs() {
      return {
        isPlaceholder: this.node!.attrs.isPlaceholder,
        src: this.node!.attrs.src,
        alt: this.node!.attrs.alt,
        width: this.node!.attrs.width,
        height: this.node!.attrs.height,
      };
    },

    updateImageAttrs() {
      let { width, height } = this.imageAttrs;

      // input converts it to string
      width = parseInt(width as string, 10);
      height = parseInt(height as string, 10);

      this.updateAttrs!({
        alt: this.imageAttrs.alt,
        width: width >= 0 ? width : null,
        height: height >= 0 ? height : null,
        src: this.imageAttrs.src
      });

      this.closeEditImageDialog();
    },

    async uploadImage(requestOptions: any) {
      const { file } = requestOptions;

      const loadingInstance = ElLoading.service({
        target: '.el-tiptap-upload',
      });
      try {
        const url = await readFileDataUrl(file);
        console.log(url)
        this.imageAttrs.src = url
      } catch (e) {
        Logger.error(String(e));
      } finally {
        this.$nextTick(() => {
          loadingInstance.close();
        });
      }
    },

    openEditImageDialog() {
      this.editImageDialogVisible = true;
    },

    closeEditImageDialog() {
      this.editImageDialogVisible = false;
    },
  },
});
</script>
