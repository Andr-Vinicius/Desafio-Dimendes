<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next';

    interface ConfirmModalProps{
        open:boolean,
        title: string,
        message: string,
        confirmText?: string,
        cancelText?: string,
    }

    defineProps<ConfirmModalProps>();
    defineEmits(['confirm', 'cancel']);

</script>
<template>
    <dialog class="modal" :class="{'modal-open': open}">
        <div class="modal-box border border-base-200 shadow-2xl">
            <div class="flex items-start gap-4">
                <div class="p-3 bg-warning/10 rounded-full text-warning">
                    <AlertTriangle class="h-6 w-6"/>
                </div>
                <div>
                    <h3 class="font-bold text-lg">{{ title }}</h3>
                    <p class="">{{ message }}</p>
                </div>
            </div>
            <div class="modal-action">
                <button class="btn btn-ghost" @click="$emit('cancel', $event)">
                    {{ cancelText || 'Cancelar' }}
                </button>
                <button class="btn btn-error" @click="$emit('confirm', $event)">
                    {{ confirmText || 'Confirmar' }}
                </button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button @click="$emit('cancel', $event)">Fechar</button>
        </form>
    </dialog>
</template>