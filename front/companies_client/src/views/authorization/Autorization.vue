<script setup lang="ts">
    import { RouterLink, RouterView } from 'vue-router'
    import { useAuthorizationStore } from '@/stores/modules/authorization'
    import { useRouter } from 'vue-router'
    import { ref, computed } from 'vue'
    import { useNotificationStore } from '@/stores/modules/notification'


    const notify = useNotificationStore()

    const store = useAuthorizationStore()
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const isFormValid = computed(() => {
        return (
            emailRule(email.value) === true &&
            minLengthRule(password.value) === true &&
            hasUpperCaseRule(password.value) === true &&
            hasDigitRule(password.value) === true &&
            hasLowerCaseRule(password.value)
        )
    })
    
    // Простые правила валидации
    const requiredRule = (v: string) => !!v || 'Обязательное поле'
    const minLengthRule = (v: string) =>
    (v && v.length >= 7) || 'Минимум 7 символов'
    
    const hasUpperCaseRule = (v: string) =>
    /[A-ZА-Я]/.test(v) || 'Должна быть хотя бы одна заглавная буква'

    const hasLowerCaseRule = (v: string) =>
    /[a-zа-я]/.test(v) || 'Должна быть хотя бы одна строчная буква'
    
    const hasDigitRule = (v: string) =>
    /\d/.test(v) || 'Должна быть хотя бы одна цифра'
    const emailRule = (v: string) => /.+@.+\..+/.test(v) || 'Введите корректный email'
    
    async function handleSubmit() {
        console.log('Регистрация:', email.value, password.value)
        try{
            await store.sendLogin(password.value, email.value)
            await router.push({name: 'preview'})
        }catch(e){
            notify.error('Неверный email или пароль')
        }
    }
    
    

</script>

<template>

    <v-container >
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
            <v-card class="pa-2 submit-form__card" >
                <v-card-title class="text-h5 text-center mb-1 ">Авторизация</v-card-title>
                <v-form  @submit.prevent="handleSubmit">
                <v-text-field
                    v-model="email"
                    label="Email"
                    type="email"
                    autocomplete="email"
                    :rules="[requiredRule, emailRule]"
                    variant="outlined"
                    class="mb-4"
                />
                <v-text-field
                    v-model="password"
                    label="Пароль"
                    type="password"
                    autocomplete="new-password"
                    :rules="[requiredRule, minLengthRule, hasUpperCaseRule, hasLowerCaseRule, hasDigitRule]"
                    variant="outlined"
                    class="mb-1"
                />
                <v-btn type="submit" color="primary" block :disabled="!isFormValid">Войти</v-btn>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
    </v-container>
</template>

<style>

</style>
